package com.rolaface.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.rolaface.entities.Cause;
import com.rolaface.entities.CauseDocument;
import com.rolaface.entities.FlexErrorCause;
import com.rolaface.entities.User;
import com.rolaface.model.ContextUser;
import com.rolaface.repositories.CauseDocumentRepository;
import com.rolaface.services.CauseService;
import com.rolaface.services.EmailService;
import com.rolaface.services.FlexErrorCauseService;
import com.rolaface.services.FlexErrorSubscribeService;
import com.rolaface.services.UserService;

@RestController
@RequestMapping({ "/cause" })
public class CauseController {

	private final static String SUBSCRIPTION_SUBJECT = "ROLAGURU Notification : Solution has been updated";

	private final static String CAUSE_ADD_MESSAGE = "A solution has been added by %s to your subscribed error \n Error ID - %d \n Solution ID - %d";

	private final static String CAUSE_UPDATE_MESSAGE = "A solution has been updated by %s for your subscribed error \n Error ID - %d \n Solution ID - %d";

	private final static String CAUSE_DELETE_MESSAGE = "A solution has been deleted by %s from your subscribed error \n Error ID - %d \n Solution ID - %d";

	private final static String CAUSE_FILE_UPLOADED_MESSAGE = "A file has been uploaded by %s to the solution for your subscribed error \n Error ID  \n Solution ID - %d";

	private final static String CAUSE_FILE_DELETED_MESSAGE = "A file has been deleted by %s from the solution for your subscribed error \n Error ID  \n Solution ID - %d";

	@Autowired
	private CauseService causeService;

	@Autowired
	private FlexErrorCauseService errorCauseService;

	@Autowired
	// private CauseDocumentService causeDocumentService;
	private CauseDocumentRepository causeDocumentRepository;

	@Autowired
	private UserService userService;

	@Autowired
	private FlexErrorSubscribeService flexErrorSubscribeService;

	@Autowired
	private EmailService emailService;

	@PostMapping
	public Cause create(@RequestBody CauseDTO causeDTO) {
		ContextUser contextUser = (ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = userService.findById(contextUser.getUserId());

		Cause cause = causeDTO.getCause();
		cause.setUser(user);
		cause.setErrid(causeDTO.getErrid());
		cause.setCreatedTimestamp(new Date());
		cause = causeService.create(cause);

		FlexErrorCause errorCause = new FlexErrorCause();
		errorCause.setCauseid(cause.getCauseid());
		errorCause.setErrid(causeDTO.getErrid());
		errorCauseService.create(errorCause);

		String message = String.format(CAUSE_ADD_MESSAGE, contextUser.getFirstName(), causeDTO.getErrid(),
				cause.getCauseid());
		notifySubscription(cause.getErrid(), message);

		return cause;
	}

	@GetMapping(path = { "/{id}" })
	public Cause findOne(@PathVariable("id") int id) {
		return causeService.findById(id);
	}

	@PutMapping(path = { "/{id}" })
	public Cause update(@RequestBody Cause cause) {
		ContextUser user = (ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (user.getUserId() == cause.getUser().getUserid()) {
			cause = causeService.update(cause);

			String message = String.format(CAUSE_UPDATE_MESSAGE, user.getFirstName(), cause.getErrid(),
					cause.getCauseid());
			notifySubscription(cause.getErrid(), message);
		}
		return cause;
	}

	@DeleteMapping(path = { "/{id}" })
	public Cause delete(@PathVariable("id") int id) {
		ContextUser user = (ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Cause cause = causeService.findById(id);
		if (user.getUserId() == cause.getUser().getUserid()) {
			cause = causeService.delete(id);

			String message = String.format(CAUSE_DELETE_MESSAGE, user.getFirstName(), cause.getErrid(),
					cause.getCauseid());
			notifySubscription(cause.getErrid(), message);
		}
		return cause;
	}

	@GetMapping
	public List<Cause> findAll() {
		return causeService.findAll();
	}

	@PostMapping("/addfilestocause")
	public ResponseEntity<Cause> handleFileUpload(@RequestParam("file") MultipartFile file,
			@RequestParam("causeid") String causeid, @RequestParam("category") String category) {
		ContextUser user = (ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		int causeId = Integer.parseInt(causeid);
		CauseDocument causeDocument = new CauseDocument();
		causeDocument.setFilename(file.getOriginalFilename());
		causeDocument.setCreatedTimestamp(new Date());
		causeDocument.setContentType(file.getContentType());
		causeDocument.setSize(file.getSize());
		causeDocument.setCauseid(causeId);
		causeDocument.setCategory(category);
		try {
			causeDocument.setContent(file.getBytes());
			// causeDocumentService.create(causeDocument);
			causeDocumentRepository.save(causeDocument);
			Cause cause = causeService.findById(causeId);

			String message = String.format(CAUSE_FILE_UPLOADED_MESSAGE, user.getFirstName(), cause.getErrid(),
					cause.getCauseid());
			notifySubscription(cause.getErrid(), message);
			return ResponseEntity.status(HttpStatus.OK).body(cause);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(null);
		}
	}

	@GetMapping("/downloadfilefromcause/{id}")
	public ResponseEntity<byte[]> download(@PathVariable("id") int id) {
		// CauseDocument causeDocument = causeDocumentService.findByCauseDocId(id);
		CauseDocument causeDocument = causeDocumentRepository.findByCauseDocId(id);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.parseMediaType(causeDocument.getContentType()));
		headers.setContentDispositionFormData("inline", causeDocument.getFilename());
		return new ResponseEntity<>(causeDocument.getContent(), headers, HttpStatus.OK);
	}

	@DeleteMapping(path = { "/deletefilefromcause/{id}" })
	public Cause deleteCauseDocument(@PathVariable("id") int id) {
		ContextUser user = (ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		// CauseDocument causeDocument = causeDocumentService.findByCauseDocId(id);
		CauseDocument causeDocument = causeDocumentRepository.findByCauseDocId(id);
		Cause cause = causeService.findById(causeDocument.getCauseid());
		if (user.getUserId() == cause.getUser().getUserid()) {
			causeDocumentRepository.delete(causeDocument);
			cause.getFiles().remove(causeDocument);

			String message = String.format(CAUSE_FILE_DELETED_MESSAGE, user.getFirstName(), cause.getErrid(),
					cause.getCauseid());
			notifySubscription(cause.getErrid(), message);
		}
		return cause;
	}

	public void notifySubscription(int errid, String message) {
		List<String> subscriptions = flexErrorSubscribeService.findSubscribedEmails(errid);
		emailService.sendMails(subscriptions, SUBSCRIPTION_SUBJECT, message);
	}

}

class CauseDTO {

	private Cause cause;

	private int errid;

	public Cause getCause() {
		return cause;
	}

	public void setCause(Cause cause) {
		this.cause = cause;
	}

	public int getErrid() {
		return errid;
	}

	public void setErrid(int errid) {
		this.errid = errid;
	}

	@Override
	public String toString() {
		return "CauseDTO [cause=" + cause + ", errid=" + errid + "]";
	}
}

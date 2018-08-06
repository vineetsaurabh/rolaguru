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
import com.rolaface.services.FlexErrorCauseService;
import com.rolaface.services.UserService;

@RestController
@RequestMapping({ "/cause" })
public class CauseController {

	@Autowired
	private CauseService causeService;

	@Autowired
	private FlexErrorCauseService errorCauseService;

	@Autowired
	// private CauseDocumentService causeDocumentService;
	private CauseDocumentRepository causeDocumentRepository;

	@Autowired
	private UserService userService;

	@PostMapping
	public Cause create(@RequestBody CauseDTO causeDTO) {
		int userId = ((ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserId();
		User user = userService.findById(userId);

		Cause cause = causeDTO.getCause();
		cause.setUser(user);
		cause.setCreatedTimestamp(new Date());
		cause = causeService.create(cause);

		FlexErrorCause errorCause = new FlexErrorCause();
		errorCause.setCauseid(cause.getCauseid());
		errorCause.setErrid(causeDTO.getErrid());
		errorCauseService.create(errorCause);
		return cause;
	}

	@GetMapping(path = { "/{id}" })
	public Cause findOne(@PathVariable("id") int id) {
		return causeService.findById(id);
	}

	@PutMapping(path = { "/{id}" })
	public Cause update(@RequestBody Cause cause) {
		int userId = ((ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserId();
		if (userId == cause.getUser().getUserid()) {
			cause = causeService.update(cause);
		}
		return cause;
	}

	@DeleteMapping(path = { "/{id}" })
	public Cause delete(@PathVariable("id") int id) {
		int userId = ((ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserId();
		Cause cause = causeService.findById(id);
		if (userId == cause.getUser().getUserid()) {
			cause = causeService.delete(id);
		}
		return cause;
	}

	@GetMapping
	public List<Cause> findAll() {
		return causeService.findAll();
	}

	@PostMapping("/addfilestocause")
	public ResponseEntity<Cause> handleFileUpload(@RequestParam("file") MultipartFile file,
			@RequestParam("causeid") String causeid) {
		int causeId = Integer.parseInt(causeid);
		CauseDocument causeDocument = new CauseDocument();
		causeDocument.setCauseid(causeId);
		causeDocument.setFilename(file.getOriginalFilename());
		causeDocument.setCreatedTimestamp(new Date());
		causeDocument.setContentType(file.getContentType());
		causeDocument.setSize(file.getSize());
		try {
			causeDocument.setContent(file.getBytes());
			// causeDocumentService.create(causeDocument);
			causeDocumentRepository.save(causeDocument);
			Cause cause = causeService.findById(causeId);
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
		int userId = ((ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserId();
		// CauseDocument causeDocument = causeDocumentService.findByCauseDocId(id);
		CauseDocument causeDocument = causeDocumentRepository.findByCauseDocId(id);
		Cause cause = causeService.findById(causeDocument.getCauseid());
		if (userId == cause.getUser().getUserid()) {
			causeDocumentRepository.delete(causeDocument);
			cause.getFiles().remove(causeDocument);
		}
		return cause;
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

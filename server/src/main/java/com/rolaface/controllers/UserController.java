package com.rolaface.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
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

import com.rolaface.entities.FlexErrorSubscribe;
import com.rolaface.entities.ProfilePicture;
import com.rolaface.entities.User;
import com.rolaface.model.ContextUser;
import com.rolaface.repositories.ProfilePictureRepository;
import com.rolaface.services.EmailService;
import com.rolaface.services.FlexErrorSubscribeService;
import com.rolaface.services.UserService;
import com.rolaface.util.PasswordGenerator;

@RestController
@RequestMapping({ "/user" })
public class UserController {

	private static final String NEW_USER_WELCOME_SUBJECT = "Welcome to Rolaguru";

	private static final String NEW_USER_WELCOME_MESSAGE = "Dear %s \n\nWelcome to Rolaguru. \nYour username is %s\nYour password is %s\nKidnly change this password after login.";

	private final static int INITIAL_PASSWORD_LENGTH = 8;

	private static final String PASSWORD_CHANGE_SUBJECT = "Your password has been changed";

	private static final String PASSWORD_CHANGE_MESSAGE = "Dear %s \nYour password has been successfully changed. \nIf you have not changed your password, please contact admin immediately.";

	@Autowired
	private UserService userService;

	@Autowired
	// private ProfilePictureService profilePictureService;
	private ProfilePictureRepository profilePictureRepository;

	@Autowired
	private FlexErrorSubscribeService flexErrorSubscribeService;

	@Autowired
	private EmailService emailService;

	@PostMapping
	public User create(@RequestBody User user) {
		PasswordGenerator passwordGenerator = new PasswordGenerator.PasswordGeneratorBuilder().useDigits(true)
				.useLower(true).useUpper(true).build();
		String password = passwordGenerator.generate(INITIAL_PASSWORD_LENGTH);
		user.setPassword(password);
		user = userService.create(user);
		String message = String.format(NEW_USER_WELCOME_MESSAGE, user.getFirstName(), user.getUsername(), password);
		emailService.sendMail(user.getEmail(), NEW_USER_WELCOME_SUBJECT, message);
		return user;

	}

	@GetMapping(path = { "/{id}" })
	public User findById(@PathVariable("id") int id) {
		return userService.findById(id);
	}

	@PutMapping(path = { "/{id}" })
	public User update(@RequestBody User user) {
		return userService.update(user);
	}

	@Transactional
	@DeleteMapping(path = { "/{id}" })
	public User delete(@PathVariable("id") int id) {
		User deletedUser = userService.delete(id);
		if (deletedUser != null) {
			List<FlexErrorSubscribe> subscribedErrors = flexErrorSubscribeService.findByUserid(id);
			for (FlexErrorSubscribe subscribedError : subscribedErrors) {
				flexErrorSubscribeService.delete(subscribedError);
			}
		}
		return deletedUser;
	}

	@GetMapping
	public List<User> findAll() {
		return userService.findAll();
	}

	@GetMapping(value = "/findbyusername", params = "username")
	public User findByUsername(@RequestParam("username") String username) {
		return userService.findOne(username);
	}

	@GetMapping(value = "/findbyemail", params = "email")
	public User findByEmail(@RequestParam("email") String email) {
		return userService.findByEmail(email);
	}

	@Transactional
	@GetMapping(value = "/deleteusers", params = "userids")
	public boolean deleteUsers(@RequestParam("userids") String userids) {
		try {
			for (String id : userids.split(",")) {
				delete(Integer.parseInt(id));
			}
			return true;
		} catch (Exception e) {
			// TODO : ExceptionHandling
		}
		return false;
	}

	@PostMapping("/uploadProfilePicture")
	public ResponseEntity<User> uploadProfilePicture(@RequestParam("file") MultipartFile file) {
		int userId = ((ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserId();
		ProfilePicture profilePicture = new ProfilePicture();
		profilePicture.setUserid(userId);
		profilePicture.setFilename(file.getOriginalFilename());
		profilePicture.setCreatedTimestamp(new Date());
		profilePicture.setSize(file.getSize());
		try {
			profilePicture.setContent(file.getBytes());
			// profilePictureService.create(profilePicture);
			ProfilePicture existingProfilePicture = profilePictureRepository.findByUserid(userId);
			if (existingProfilePicture != null) {
				profilePictureRepository.delete(existingProfilePicture);
			}
			profilePictureRepository.save(profilePicture);
			User user = userService.findById(userId);
			return ResponseEntity.status(HttpStatus.OK).body(user);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(null);
		}
	}

	@GetMapping("/downloadprofilepic/{id}")
	public ResponseEntity<byte[]> download(@PathVariable("id") int id) {
		// CauseDocument causeDocument = profilePicturetService.findByUserid(id);
		ProfilePicture profilePicture = profilePictureRepository.findByUserid(id);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.IMAGE_JPEG);
		headers.setContentDispositionFormData("inline", profilePicture.getFilename());
		return new ResponseEntity<>(profilePicture.getContent(), headers, HttpStatus.OK);
	}

	@DeleteMapping(path = { "/deleteprofilepicture/{id}" })
	public User deleteProfilePicture(@PathVariable("id") int id) {
		int userId = ((ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserId();
		User user = userService.findById(userId);
		// ProfilePicture profilePicture = profilePictureService.findById(id);
		ProfilePicture profilePicture = profilePictureRepository.findByProfilePictureId(id);
		if (userId == profilePicture.getUserid()) {
			// profilePictureService.delete(profilePicture);
			profilePictureRepository.delete(profilePicture);
		}
		return user;
	}

	@PutMapping(path = { "/changepassword/{id}" })
	public User changePassword(@RequestBody User user) {
		int userId = ((ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserId();
		if (userId == user.getUserid()) {
			user = userService.changePassword(user);
			if (user != null) {
				String message = String.format(PASSWORD_CHANGE_MESSAGE, user.getFirstName());
				emailService.sendMail(user.getEmail(), PASSWORD_CHANGE_SUBJECT, message);
			}
		}
		return user;
	}

}
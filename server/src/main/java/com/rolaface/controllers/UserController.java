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
import org.springframework.web.bind.annotation.CrossOrigin;
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

import com.rolaface.entities.ProfilePicture;
import com.rolaface.entities.User;
import com.rolaface.model.ContextUser;
import com.rolaface.repositories.ProfilePictureRepository;
import com.rolaface.services.UserService;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping({ "/user" })
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	// private ProfilePictureService profilePictureService;
	private ProfilePictureRepository profilePictureRepository;

	@PostMapping
	public User create(@RequestBody User user) {
		return userService.create(user);
	}

	@GetMapping(path = { "/{id}" })
	public User findById(@PathVariable("id") int id) {
		return userService.findById(id);
	}

	@PutMapping(path = { "/{id}" })
	public User update(@RequestBody User user) {
		return userService.update(user);
	}

	@DeleteMapping(path = { "/{id}" })
	public User delete(@PathVariable("id") int id) {
		return userService.delete(id);
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
			user.setProfilePic(null);
		}
		return user;
	}
}
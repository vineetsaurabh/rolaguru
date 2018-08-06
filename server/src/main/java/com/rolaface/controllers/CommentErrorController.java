package com.rolaface.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.rolaface.entities.CommentError;
import com.rolaface.entities.User;
import com.rolaface.model.ContextUser;
import com.rolaface.services.CommentErrorService;
import com.rolaface.services.UserService;

@RestController
@RequestMapping({ "/comment-error" })
public class CommentErrorController {

	@Autowired
	private CommentErrorService commentService;

	@Autowired
	private UserService userService;

	@PostMapping
	public CommentError create(@RequestBody CommentError commentError) {
		int userId = ((ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserId();
		User user = userService.findById(userId);
		commentError.setUser(user);
		commentError.setCreatedTimestamp(new Date());
		return commentService.create(commentError);
	}

	@PutMapping(path = { "/{id}" })
	public CommentError update(@RequestBody CommentError commentError) {
		int userId = ((ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserId();
		if (userId == commentError.getUser().getUserid()) {
			commentError = commentService.update(commentError);
		}
		// TODO : ExceptionHandling
		return commentError;
	}

	@DeleteMapping(path = { "/{id}" })
	public CommentError delete(@PathVariable("id") int id) {
		int userId = ((ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserId();
		CommentError commentError = commentService.findById(id);
		if (userId == commentError.getUser().getUserid()) {
			commentError = commentService.delete(id);
		}
		// TODO : ExceptionHandling
		return commentError;
	}

	@GetMapping(value = "/findbyerrid", params = "errid")
	public List<CommentError> findByErrorId(@RequestParam("errid") String errid) {
		return commentService.findByErrid(Integer.parseInt(errid));
	}

}

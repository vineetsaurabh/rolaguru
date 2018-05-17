package com.rolaface.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rolaface.entities.FlexErrorCause;
import com.rolaface.services.FlexErrorCauseService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping({ "/error-cause" })
public class FlexErrorCauseController {

	@Autowired
	private FlexErrorCauseService flexErrorCauseService;

	@PostMapping
	public FlexErrorCause create(@RequestBody FlexErrorCause flexErrorCause) {
		System.out.println("\n\n\n " + flexErrorCause + "\n\n\n");
		return flexErrorCauseService.create(flexErrorCause);
	}

	@GetMapping(path = { "/{id}" })
	public FlexErrorCause findOne(@PathVariable("id") int id) {
		return flexErrorCauseService.findById(id);
	}

	@DeleteMapping(path = { "/{id}" })
	public FlexErrorCause delete(@PathVariable("id") int id) {
		return flexErrorCauseService.delete(id);
	}

	@GetMapping
	public List<FlexErrorCause> findAll() {
		return flexErrorCauseService.findAll();
	}

}
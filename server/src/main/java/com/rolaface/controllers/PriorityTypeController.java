package com.rolaface.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rolaface.entities.PriorityType;
import com.rolaface.services.PriorityTypeService;

@RestController
@RequestMapping({ "/prioritytype" })
public class PriorityTypeController {

	@Autowired
	public PriorityTypeService priorityTypeService;

	@PostMapping
	public PriorityType create(@RequestBody PriorityType priorityType) {
		return priorityTypeService.create(priorityType);
	}

	@GetMapping(path = { "/{id}" })
	public PriorityType findById(@PathVariable("id") int id) {
		return priorityTypeService.findById(id);
	}

	@GetMapping
	public List<PriorityType> findAll() {
		return priorityTypeService.findAll();
	}

	@PutMapping(path = { "/{id}" })
	public PriorityType update(@RequestBody PriorityType priorityType) {
		return priorityTypeService.update(priorityType);
	}

	@Transactional
	@DeleteMapping(path = { "/{id}" })
	public PriorityType delete(@PathVariable("id") int id) {
		return priorityTypeService.delete(id);
	}

}

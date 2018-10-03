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

import com.rolaface.entities.Module;
import com.rolaface.services.ModuleService;

@RestController
@RequestMapping({ "/module" })
public class ModuleController {

	@Autowired
	public ModuleService moduleService;

	@PostMapping
	public Module create(@RequestBody Module module) {
		return moduleService.create(module);
	}

	@GetMapping(path = { "/{id}" })
	public Module findById(@PathVariable("id") int id) {
		return moduleService.findById(id);
	}

	@GetMapping
	public List<Module> findAll() {
		return moduleService.findAll();
	}

	@PutMapping(path = { "/{id}" })
	public Module update(@RequestBody Module module) {
		return moduleService.update(module);
	}

	@Transactional
	@DeleteMapping(path = { "/{id}" })
	public Module delete(@PathVariable("id") int id) {
		return moduleService.delete(id);
	}

}

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

import com.rolaface.entities.Domain;
import com.rolaface.services.DomainService;

@RestController
@RequestMapping({ "/domain" })
public class DomainController {

	@Autowired
	public DomainService domainService;

	@PostMapping
	public Domain create(@RequestBody Domain domain) {
		return domainService.create(domain);
	}

	@GetMapping(path = { "/{id}" })
	public Domain findById(@PathVariable("id") int id) {
		return domainService.findById(id);
	}

	@GetMapping
	public List<Domain> findAll() {
		return domainService.findAll();
	}

	@PutMapping(path = { "/{id}" })
	public Domain update(@RequestBody Domain domain) {
		return domainService.update(domain);
	}

	@Transactional
	@DeleteMapping(path = { "/{id}" })
	public Domain delete(@PathVariable("id") int id) {
		return domainService.delete(id);
	}

}

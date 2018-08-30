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

import com.rolaface.entities.Role;
import com.rolaface.services.RoleService;

@RestController
@RequestMapping({ "/role" })
public class RoleController {
	
	@Autowired
	public RoleService roleService;
	
	@PostMapping
	public Role create(@RequestBody Role role) {
		return roleService.create(role);
	}
	
	@GetMapping(path = { "/{id}" })
	public Role findById(@PathVariable("id") int id) {
		return roleService.findById(id);
	}
	
	@GetMapping
	public List<Role> findAll() {
		return roleService.findAll();
	}
	
	@PutMapping(path = { "/{id}" })
	public Role update(@RequestBody Role role) {
		return roleService.update(role);
	}

	@Transactional
	@DeleteMapping(path = { "/{id}" })
	public Role delete(@PathVariable("id") int id) {
		return roleService.delete(id);
	}

}

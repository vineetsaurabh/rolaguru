package com.rolaface.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.rolaface.entities.FlexError;
import com.rolaface.entities.UserPreference;
import com.rolaface.model.ContextUser;
import com.rolaface.services.UserPreferenceService;

@RestController
@RequestMapping({ "/userpreference" })
public class UserPreferenceController {
	
	@Autowired
	public UserPreferenceService userPreferenceService;
	
	@PostMapping
	public UserPreference create(@RequestBody UserPreference userPreference) {
		return userPreferenceService.create(userPreference);
	}
	
	@GetMapping(path = { "/{id}" })
	public UserPreference findById(@PathVariable("id") int id) {
		return userPreferenceService.findById(id);
	}
	
	@GetMapping
	public UserPreference findPreferences() {
		ContextUser contextUser = (ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return userPreferenceService.findByUserid(contextUser.getUserId());
	}
	
	@PutMapping(path = { "/{id}" })
	public UserPreference update(@RequestBody UserPreference userPreference) {
		return userPreferenceService.update(userPreference);
	}

	@Transactional
	@DeleteMapping(path = { "/{id}" })
	public UserPreference delete(@PathVariable("id") int id) {
		return userPreferenceService.delete(id);
	}

}

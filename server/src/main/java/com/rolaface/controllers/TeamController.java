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

import com.rolaface.entities.Team;
import com.rolaface.services.TeamService;

@RestController
@RequestMapping({ "/team" })
public class TeamController {
	
	@Autowired
	public TeamService teamService;
	
	@PostMapping
	public Team create(@RequestBody Team team) {
		return teamService.create(team);
	}
	
	@GetMapping(path = { "/{id}" })
	public Team findById(@PathVariable("id") int id) {
		return teamService.findById(id);
	}
	
	@GetMapping
	public List<Team> findAll() {
		return teamService.findAll();
	}
	
	@PutMapping(path = { "/{id}" })
	public Team update(@RequestBody Team team) {
		return teamService.update(team);
	}

	@Transactional
	@DeleteMapping(path = { "/{id}" })
	public Team delete(@PathVariable("id") int id) {
		return teamService.delete(id);
	}

}

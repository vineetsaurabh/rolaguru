package com.rolaface.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rolaface.entities.Team;

@Service
public interface TeamService {
	
	Team create(Team team);
	
	Team findById(int id);
	
	List<Team> findAll();
	
	Team update(Team team);
	
	Team delete(int id);

}

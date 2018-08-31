package com.rolaface.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rolaface.entities.Team;
import com.rolaface.repositories.TeamRepository;

@Service(value = "teamService")
public class TeamServiceImpl implements TeamService {
	
	@Autowired
	public TeamRepository repository;

	@Override
	public Team create(Team team) {
		return repository.save(team);
	}

	@Override
	public Team findById(int id) {
		return repository.findByTeamid(id);
	}

	@Override
	public List<Team> findAll() {
		return repository.findAll();
	}

	@Override
	public Team update(Team team) {
		Team teamToUpdate = findById(team.getTeamid());
		if(teamToUpdate != null) {
			teamToUpdate.setTeamName(team.getTeamName());
			teamToUpdate.setDescription(team.getDescription());
		}
		return repository.save(teamToUpdate);
	}

	@Override
	public Team delete(int id) {
		Team teamToDelete = findById(id);
		if(teamToDelete != null) {
			repository.delete(teamToDelete);
		}
		return teamToDelete;
	}

}

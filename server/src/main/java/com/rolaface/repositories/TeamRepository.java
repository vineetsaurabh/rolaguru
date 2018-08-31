package com.rolaface.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rolaface.entities.Team;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

	@Override
	Team save(Team team);

	Team findByTeamName(String name);

	Team findByTeamid(int teamid);

	@Override
	List<Team> findAll();

	@Override
	void delete(Team team);

}

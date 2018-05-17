package com.rolaface.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rolaface.entities.Cause;

@org.springframework.stereotype.Repository
public interface CauseRepository extends JpaRepository<Cause, Long> {

	@Override
	void delete(Cause cause);

	@Override
	List<Cause> findAll();

	Cause findByCauseid(int id);

	@Override
	Cause save(Cause cause);

}
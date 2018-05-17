package com.rolaface.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rolaface.entities.FlexErrorCause;

@org.springframework.stereotype.Repository
public interface FlexErrorCauseRepository extends JpaRepository<FlexErrorCause, Long> {

	@Override
	void delete(FlexErrorCause flexErrorCause);

	@Override
	List<FlexErrorCause> findAll();

	FlexErrorCause findByErrcauseid(int errcauseid);

	@Override
	FlexErrorCause save(FlexErrorCause flexErrorCause);

}
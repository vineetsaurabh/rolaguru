package com.rolaface.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rolaface.entities.FlexError;

@org.springframework.stereotype.Repository
public interface FlexErrorRepository extends JpaRepository<FlexError, Long> {

	@Override
	void delete(FlexError flexError);

	@Override
	List<FlexError> findAll();

	FlexError findByErrid(int errid);

	@Override
	FlexError save(FlexError flexError);

	FlexError findByErrcode(String errCode);
}
package com.rolaface.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rolaface.entities.FlexError;

@org.springframework.stereotype.Repository
public interface FlexErrorRepository extends JpaRepository<FlexError, Long> {

	@Override
	void delete(FlexError flexError);

	@Override
	List<FlexError> findAll();
	
	@Query(value = "SELECT * FROM errors ORDER BY created DESC LIMIT 5", nativeQuery = true)
	List<FlexError> findLatestCreatedErrors();
	
	@Query(value = "SELECT * FROM errors WHERE modified != '' ORDER BY modified DESC LIMIT 5", nativeQuery = true)
	List<FlexError> findLatestModifiedErrors();

	FlexError findByErrid(int errid);
	
	List<FlexError> findByPriority(String priority);

	@Override
	FlexError save(FlexError flexError);

	FlexError findByErrcode(String errCode);

	@Query(value = "SELECT * FROM errors f WHERE f.domain_domain_id = ?1", nativeQuery = true)
	List<FlexError> findErrorsByDomain(String domain);

	@Query(value = "SELECT * FROM errors f WHERE f.description LIKE %:input% OR f.errcode LIKE %:input%", nativeQuery = true)
	List<FlexError> findErrors(String input);
}
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

	FlexError findByErrid(int errid);

	@Override
	FlexError save(FlexError flexError);

	FlexError findByErrcode(String errCode);

	@Query(value = "SELECT * FROM flexerrors f WHERE f.category = ?1", nativeQuery = true)
	List<FlexError> findErrorsByCategory(String category);

	@Query(value = "SELECT * FROM flexerrors f WHERE f.message LIKE %:input% OR f.errcode LIKE %:input%", nativeQuery = true)
	List<FlexError> findErrors(String input);
}
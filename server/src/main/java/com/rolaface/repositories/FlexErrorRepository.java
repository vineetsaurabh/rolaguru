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

	FlexError findById(int id);

	@Override
	FlexError save(FlexError flexError);

	@Query(value = "SELECT * FROM flexerror f WHERE f.err_code = ?1", nativeQuery = true)
	FlexError findByErrorCode(String errCode);
}
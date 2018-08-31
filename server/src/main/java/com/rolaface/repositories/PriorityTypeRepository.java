package com.rolaface.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.rolaface.entities.PriorityType;

@Repository
public interface PriorityTypeRepository extends JpaRepository<PriorityType, Long> {

	@Override
	PriorityType save(PriorityType priorityType);

	PriorityType findByPriorityTypeName(String name);

	PriorityType findByPriorityTypeId(int priorityTypeId);

	@Query(value = "SELECT * FROM priority_types t WHERE t.default_priority_type = true", nativeQuery = true)
	PriorityType findDefaultPriorityType();

	@Override
	List<PriorityType> findAll();

	@Override
	void delete(PriorityType priorityType);

}

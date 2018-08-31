package com.rolaface.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rolaface.entities.PriorityType;

@Service
public interface PriorityTypeService {

	PriorityType create(PriorityType priorityType);

	PriorityType findById(int id);

	List<PriorityType> findAll();

	PriorityType update(PriorityType priorityType);

	PriorityType delete(int id);

}

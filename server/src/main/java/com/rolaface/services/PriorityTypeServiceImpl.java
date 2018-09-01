package com.rolaface.services;

import java.util.SortedSet;
import java.util.TreeSet;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rolaface.entities.PriorityType;
import com.rolaface.repositories.PriorityTypeRepository;

@Service(value = "priorityTypeService")
public class PriorityTypeServiceImpl implements PriorityTypeService {

	@Autowired
	public PriorityTypeRepository repository;

	@Override
	public PriorityType create(PriorityType priorityType) {
		return repository.save(priorityType);
	}

	@Override
	public PriorityType findById(int id) {
		return repository.findByPriorityTypeId(id);
	}

	@Override
	public SortedSet<PriorityType> findAll() {
		return new TreeSet<PriorityType>(repository.findAll());
	}

	@Transactional
	@Override
	public PriorityType update(PriorityType priorityType) {
		PriorityType defaultPriorityType = null;
		PriorityType priorityTypeToUpdate = findById(priorityType.getPriorityTypeId());
		if (priorityTypeToUpdate != null) {
			priorityTypeToUpdate.setPriorityTypeName(priorityType.getPriorityTypeName());
			priorityTypeToUpdate.setDescription(priorityType.getDescription());
			priorityTypeToUpdate.setSla(priorityType.getSla());
			priorityTypeToUpdate.setEscalateTo(priorityType.getEscalateTo());
			priorityTypeToUpdate.setTimeToResolve(priorityType.getTimeToResolve());
			if (priorityType.isDefaultPriorityType() && !priorityTypeToUpdate.isDefaultPriorityType()) {
				defaultPriorityType = repository.findDefaultPriorityType();
				if (defaultPriorityType != null) {
					defaultPriorityType.setDefaultPriorityType(Boolean.FALSE);
					repository.save(defaultPriorityType);
				}
				priorityTypeToUpdate.setDefaultPriorityType(priorityType.isDefaultPriorityType());
			}
		}
		return repository.save(priorityTypeToUpdate);
	}

	@Override
	public PriorityType delete(int id) {
		PriorityType priorityTypeToDelete = findById(id);
		if (priorityTypeToDelete != null) {
			repository.delete(priorityTypeToDelete);
		}
		return priorityTypeToDelete;
	}

}

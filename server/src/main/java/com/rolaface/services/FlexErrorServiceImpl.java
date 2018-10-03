package com.rolaface.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rolaface.entities.FlexError;
import com.rolaface.repositories.FlexErrorRepository;

@Service
public class FlexErrorServiceImpl implements FlexErrorService {

	@Autowired
	private FlexErrorRepository repository;

	@Override
	public FlexError create(FlexError flexError) {
		return repository.save(flexError);
	}

	@Override
	public FlexError delete(int errid) {
		FlexError flexError = findById(errid);
		if (flexError != null) {
			repository.delete(flexError);
		}
		return flexError;
	}

	@Override
	public List<FlexError> findAll() {
		return repository.findAll();
	}

	@Override
	public List<FlexError> findAll(String domain) {
		return repository.findErrorsByDomain(domain);
	}

	@Override
	public FlexError findById(int errid) {
		return repository.findByErrid(errid);
	}

	@Override
	public FlexError update(FlexError flexError) {
		FlexError flexErrorToUpdate = findById(flexError.getErrid());
		if (flexErrorToUpdate != null) {
			flexErrorToUpdate.setErrcode(flexError.getErrcode());
			flexErrorToUpdate.setDescription(flexError.getDescription());
			flexErrorToUpdate.setDomain(flexError.getDomain());
			flexErrorToUpdate.setModule(flexError.getModule());
			flexErrorToUpdate.setOperation(flexError.getOperation());
			flexErrorToUpdate.setPriority(flexError.getPriority());
			flexErrorToUpdate.setSeverity(flexError.getSeverity());
			flexErrorToUpdate.setFrequency(flexError.getFrequency());
			flexError = repository.save(flexErrorToUpdate);
		}
		return flexError;
	}

	@Override
	public FlexError findByErrorCode(String errCode) {
		return repository.findByErrcode(errCode);
	}
	
	@Override
	public List<FlexError> findByPriority(String priority) {
		return repository.findByPriority(priority);
	}

	@Override
	public List<FlexError> findErrors(String input) {
		return repository.findErrors(input);
	}
}
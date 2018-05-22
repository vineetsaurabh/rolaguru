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
	public FlexError findById(int errid) {
		return repository.findByErrid(errid);
	}

	@Override
	public FlexError update(FlexError flexError) {
		FlexError flexErrorToUpdate = findById(flexError.getErrid());
		if (flexErrorToUpdate != null) {
			flexErrorToUpdate.setErrcode(flexError.getErrcode());
			flexErrorToUpdate.setMessage(flexError.getMessage());
			flexErrorToUpdate.setCauses(flexError.getCauses());
			flexErrorToUpdate.setErrortype(flexError.getErrortype());
			flexErrorToUpdate.setBatchtype(flexError.getBatchtype());
			flexError = repository.save(flexError);
		}
		return flexError;
	}

	@Override
	public FlexError findByErrorCode(String errCode) {
		return repository.findByErrcode(errCode);
	}
}
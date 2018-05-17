package com.rolaface.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rolaface.entities.FlexErrorCause;
import com.rolaface.repositories.FlexErrorCauseRepository;

@Service
public class FlexErrorCauseServiceImpl implements FlexErrorCauseService {

	@Autowired
	private FlexErrorCauseRepository repository;

	@Override
	public FlexErrorCause create(FlexErrorCause flexErrorCause) {
		return repository.save(flexErrorCause);
	}

	@Override
	public FlexErrorCause delete(int causeid) {
		FlexErrorCause flexErrorCause = findById(causeid);
		if (flexErrorCause != null) {
			repository.delete(flexErrorCause);
		}
		return flexErrorCause;
	}

	@Override
	public List<FlexErrorCause> findAll() {
		return repository.findAll();
	}

	@Override
	public FlexErrorCause findById(int errcauseid) {
		return repository.findByErrcauseid(errcauseid);
	}

}
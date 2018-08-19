package com.rolaface.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rolaface.entities.Cause;
import com.rolaface.repositories.CauseRepository;

@Service(value = "causeService")
public class CauseServiceImpl implements CauseService {

	@Autowired
	private CauseRepository repository;

	@Override
	public Cause create(Cause cause) {
		return repository.save(cause);
	}

	@Override
	public Cause delete(int causeid) {
		Cause cause = findById(causeid);
		if (cause != null) {
			repository.delete(cause);
		}
		return cause;
	}

	@Override
	public List<Cause> findAll() {
		return repository.findAll();
	}

	@Override
	public Cause findById(int causeid) {
		return repository.findByCauseid(causeid);
	}

	@Override
	public Cause update(Cause cause) {
		Cause causeToUpdate = findById(cause.getCauseid());
		if (causeToUpdate != null) {
			causeToUpdate.setDescription(cause.getDescription());
			causeToUpdate.setBankingScenerio(cause.getBankingScenerio());
			causeToUpdate.setRootCause(cause.getRootCause());
			causeToUpdate.setRatings(cause.getRatings());
			causeToUpdate.setFiles(cause.getFiles());
			causeToUpdate.setModifiedTimestamp(new Date());
			cause = repository.save(causeToUpdate);
		}
		return cause;
	}

}
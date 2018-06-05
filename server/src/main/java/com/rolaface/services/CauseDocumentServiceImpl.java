package com.rolaface.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rolaface.entities.CauseDocument;
import com.rolaface.repositories.CauseDocumentRepository;

@Service(value = "causeDocumentService")
public class CauseDocumentServiceImpl {

	@Autowired
	private CauseDocumentRepository repository;

	CauseDocument create(CauseDocument causeDocument) {
		return repository.save(causeDocument);
	}

	CauseDocument delete(int id) {
		CauseDocument causeDocument = findById(id);
		if (causeDocument != null) {
			repository.delete(causeDocument);
		}
		return causeDocument;
	}

	CauseDocument findById(int id) {
		return repository.findByCauseDocId(id);
	}

	List<CauseDocument> findByCauseid(int causeid) {
		return repository.findByCauseid(causeid);
	}

}

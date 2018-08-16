package com.rolaface.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rolaface.entities.ErrorDocument;
import com.rolaface.repositories.ErrorDocumentRepository;

@Service(value = "errorDocumentService")
public class ErrorDocumentServiceImpl implements ErrorDocumentService {

	@Autowired
	private ErrorDocumentRepository repository;

	@Override
	public ErrorDocument create(ErrorDocument errorDocument) {
		return repository.save(errorDocument);
	}

	@Override
	public ErrorDocument delete(int id) {
		ErrorDocument errorDocument = findById(id);
		if (errorDocument != null) {
			repository.delete(errorDocument);
		}
		return errorDocument;
	}

	@Override
	public ErrorDocument findById(int id) {
		return repository.findByErrorDocId(id);
	}

	@Override
	public List<ErrorDocument> findByErrid(int errid) {
		return repository.findByErrid(errid);
	}

}

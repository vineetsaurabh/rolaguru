package com.rolaface.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rolaface.entities.CauseDocument;

@Service
public interface CauseDocumentService {

	CauseDocument create(CauseDocument causeDocument);

	CauseDocument delete(int id);

	CauseDocument findById(int id);

	List<CauseDocument> findByCauseid(int causeid);

}
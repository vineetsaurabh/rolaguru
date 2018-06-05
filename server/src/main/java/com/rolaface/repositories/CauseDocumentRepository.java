package com.rolaface.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rolaface.entities.CauseDocument;

@org.springframework.stereotype.Repository
public interface CauseDocumentRepository extends JpaRepository<CauseDocument, Long> {

	@Override
	void delete(CauseDocument causeDocument);

	@Override
	List<CauseDocument> findAll();

	@Override
	CauseDocument save(CauseDocument causeDocument);

	List<CauseDocument> findByCauseid(int causeid);

	CauseDocument findByCauseDocId(int id);

}
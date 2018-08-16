package com.rolaface.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rolaface.entities.ErrorDocument;

@org.springframework.stereotype.Repository
public interface ErrorDocumentRepository extends JpaRepository<ErrorDocument, Long> {

	@Override
	void delete(ErrorDocument errorDocument);

	@Override
	List<ErrorDocument> findAll();

	@Override
	ErrorDocument save(ErrorDocument errorDocument);

	List<ErrorDocument> findByErrid(int errid);

	ErrorDocument findByErrorDocId(int id);

}
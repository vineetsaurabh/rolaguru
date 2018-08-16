package com.rolaface.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rolaface.entities.ErrorDocument;

@Service
public interface ErrorDocumentService {

	ErrorDocument create(ErrorDocument errorDocument);

	ErrorDocument delete(int id);

	ErrorDocument findById(int id);

	List<ErrorDocument> findByErrid(int errid);

}
package com.rolaface.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rolaface.entities.Domain;

@Service
public interface DomainService {

	Domain create(Domain domain);

	Domain findById(int id);

	List<Domain> findAll();

	Domain update(Domain domain);

	Domain delete(int id);

}

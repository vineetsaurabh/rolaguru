package com.rolaface.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rolaface.entities.Cause;

@Service
public interface CauseService {

	Cause create(Cause cause);

	Cause delete(int causeid);

	List<Cause> findAll();

	Cause findById(int causeid);

	Cause update(Cause cause);

}
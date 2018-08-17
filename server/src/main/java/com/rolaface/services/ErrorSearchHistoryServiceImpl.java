package com.rolaface.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rolaface.entities.ErrorSearchHistory;
import com.rolaface.model.SearchStringAndCount;
import com.rolaface.repositories.ErrorSearchHistoryRepository;

@Service
public class ErrorSearchHistoryServiceImpl implements ErrorSearchHistoryService {

	@Autowired
	private ErrorSearchHistoryRepository repository;

	@Override
	public ErrorSearchHistory create(ErrorSearchHistory errorSearchHistory) {
		return repository.save(errorSearchHistory);
	}

	@Override
	public List<ErrorSearchHistory> findBySearchString(String searchString) {
		return repository.findBySearchString(searchString);
	}

	@Override
	public ErrorSearchHistory findById(int errorSearchHistoryId) {
		return repository.findByErrorSearchHistoryId(errorSearchHistoryId);
	}

	@Override
	public List<ErrorSearchHistory> findAll() {
		return repository.findAll();
	}

	@Override
	public List<SearchStringAndCount> findMostSearchedString() {
		return repository.findMostSearchedString();
	}

	@Override
	public ErrorSearchHistory delete(int errorSearchHistoryId) {
		ErrorSearchHistory errorSearchHistory = findById(errorSearchHistoryId);
		if (errorSearchHistory != null) {
			repository.delete(errorSearchHistory);
		}
		return errorSearchHistory;
	}

}

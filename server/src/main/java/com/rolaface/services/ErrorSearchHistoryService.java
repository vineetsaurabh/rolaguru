package com.rolaface.services;

import java.util.List;

import com.rolaface.entities.ErrorSearchHistory;

public interface ErrorSearchHistoryService {

	ErrorSearchHistory create(ErrorSearchHistory errorSearchHistory);

	List<ErrorSearchHistory> findBySearchString(String searchString);

	ErrorSearchHistory findById(int errorSearchHistoryId);

	List<ErrorSearchHistory> findAll();

	ErrorSearchHistory delete(int errorSearchHistoryId);

}

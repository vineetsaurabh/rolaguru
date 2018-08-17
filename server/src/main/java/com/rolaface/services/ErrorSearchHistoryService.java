package com.rolaface.services;

import java.util.List;

import com.rolaface.entities.ErrorSearchHistory;
import com.rolaface.model.SearchStringAndCount;

public interface ErrorSearchHistoryService {

	ErrorSearchHistory create(ErrorSearchHistory errorSearchHistory);

	List<ErrorSearchHistory> findBySearchString(String searchString);

	ErrorSearchHistory findById(int errorSearchHistoryId);

	List<ErrorSearchHistory> findAll();

	List<SearchStringAndCount> findMostSearchedString();

	ErrorSearchHistory delete(int errorSearchHistoryId);

}

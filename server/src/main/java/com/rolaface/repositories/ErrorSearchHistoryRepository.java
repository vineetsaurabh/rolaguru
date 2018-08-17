package com.rolaface.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rolaface.entities.ErrorSearchHistory;
import com.rolaface.entities.User;
import com.rolaface.model.SearchStringAndCount;

@org.springframework.stereotype.Repository
public interface ErrorSearchHistoryRepository extends JpaRepository<ErrorSearchHistory, Long> {

	@Override
	ErrorSearchHistory save(ErrorSearchHistory errorSearchHistory);

	ErrorSearchHistory findByErrorSearchHistoryId(int errorSearchHistoryId);

	List<ErrorSearchHistory> findByUser(User user);

	List<ErrorSearchHistory> findBySearchString(String searchString);

	@Query(value = "SELECT search_string as searchString, COUNT(search_string) as searchStringCount "
			+ "FROM error_search_history GROUP BY search_string ORDER BY COUNT(search_string) DESC LIMIT 25", nativeQuery = true)
	List<SearchStringAndCount> findMostSearchedString();

	@Override
	List<ErrorSearchHistory> findAll();

	@Override
	void delete(ErrorSearchHistory errorSearchHistory);

}
package com.rolaface.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rolaface.entities.ErrorSearchHistory;
import com.rolaface.entities.User;

@org.springframework.stereotype.Repository
public interface ErrorSearchHistoryRepository extends JpaRepository<ErrorSearchHistory, Long> {

	@Override
	ErrorSearchHistory save(ErrorSearchHistory errorSearchHistory);

	ErrorSearchHistory findByErrorSearchHistoryId(int errorSearchHistoryId);

	List<ErrorSearchHistory> findByUser(User user);

	List<ErrorSearchHistory> findBySearchString(String searchString);

	@Override
	List<ErrorSearchHistory> findAll();

	@Override
	void delete(ErrorSearchHistory errorSearchHistory);

}
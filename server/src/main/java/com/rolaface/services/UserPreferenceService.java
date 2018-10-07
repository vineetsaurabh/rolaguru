package com.rolaface.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rolaface.entities.UserPreference;

@Service
public interface UserPreferenceService {

	UserPreference create(UserPreference userPreference);

	UserPreference findById(int id);
	
	UserPreference findByUserid(int userid);

	List<UserPreference> findAll();

	UserPreference update(UserPreference userPreference);

	UserPreference delete(int id);

}

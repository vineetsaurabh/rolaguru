package com.rolaface.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rolaface.entities.UserPreference;

@org.springframework.stereotype.Repository
public interface UserPreferenceRepository extends JpaRepository<UserPreference, Long> {
	
	@Override
	UserPreference save(UserPreference userPreference);

	UserPreference findByUserPreferenceId(int userPreferenceId);
	
	UserPreference findByUserid(int userid);

	@Override
	List<UserPreference> findAll();

	@Override
	void delete(UserPreference userPreference);

}

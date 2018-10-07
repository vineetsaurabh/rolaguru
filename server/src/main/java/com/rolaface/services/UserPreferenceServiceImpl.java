package com.rolaface.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.rolaface.entities.UserPreference;
import com.rolaface.model.ContextUser;
import com.rolaface.repositories.UserPreferenceRepository;

@Service(value = "userPreferenceService")
public class UserPreferenceServiceImpl implements UserPreferenceService {

	@Autowired
	public UserPreferenceRepository repository;

	@Override
	public UserPreference create(UserPreference userPreference) {
		ContextUser contextUser = (ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		userPreference.setUserid(contextUser.getUserId());
		return repository.save(userPreference);
	}

	@Override
	public UserPreference findById(int id) {
		return repository.findByUserPreferenceId(id);
	}
	
	@Override
	public UserPreference findByUserid(int userid) {
		return repository.findByUserid(userid);
	}

	@Override
	public List<UserPreference> findAll() {
		return repository.findAll();
	}

	@Override
	public UserPreference update(UserPreference userPreference) {
		UserPreference userPreferenceToUpdate = findById(userPreference.getUserPreferenceId());
		if (userPreferenceToUpdate != null) {
			userPreferenceToUpdate.setPagination(userPreference.getPagination());
			userPreferenceToUpdate.setErrorTableColumns(userPreference.getErrorTableColumns());
		} else {
			return create(userPreference);
		}
		return repository.save(userPreferenceToUpdate);
	}

	@Override
	public UserPreference delete(int id) {
		UserPreference userPreferenceToDelete = findById(id);
		if (userPreferenceToDelete != null) {
			repository.delete(userPreferenceToDelete);
		}
		return userPreferenceToDelete;
	}

}

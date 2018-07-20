package com.rolaface.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rolaface.entities.ProfilePicture;
import com.rolaface.repositories.ProfilePictureRepository;

@Service(value = "profilePictureService")
public class ProfilePictureServiceImpl implements ProfilePictureService {

	@Autowired
	private ProfilePictureRepository repository;

	@Override
	public ProfilePicture create(ProfilePicture profilePicture) {
		return repository.save(profilePicture);
	}

	@Override
	public void delete(ProfilePicture profilePicture) {
		repository.delete(profilePicture);
	}

	@Override
	public ProfilePicture findById(int profilePictureId) {
		return repository.findByProfilePictureId(profilePictureId);
	}

	@Override
	public ProfilePicture findByUserid(int userid) {
		return repository.findByUserid(userid);
	}

}

package com.rolaface.services;

import org.springframework.stereotype.Service;

import com.rolaface.entities.ProfilePicture;

@Service(value = "profilePictureService")
public interface ProfilePictureService {

	ProfilePicture create(ProfilePicture profilePicture);

	void delete(ProfilePicture profilePicture);

	ProfilePicture findById(int profilePictureId);

	ProfilePicture findByUserid(int userid);

}
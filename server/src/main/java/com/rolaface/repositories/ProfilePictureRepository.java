package com.rolaface.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rolaface.entities.ProfilePicture;

@org.springframework.stereotype.Repository
public interface ProfilePictureRepository extends JpaRepository<ProfilePicture, Long> {

	@Override
	ProfilePicture save(ProfilePicture profilePicture);

	ProfilePicture findByProfilePictureId(int profilePictureId);

	ProfilePicture findByUserid(int userid);

	@Override
	void delete(ProfilePicture profilePicture);

}
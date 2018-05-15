package com.rolaface.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rolaface.entities.User;
import com.rolaface.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository repository;

	@Override
	public User create(User user) {
		return repository.save(user);
	}

	@Override
	public User delete(int id) {
		User user = findById(id);
		if (user != null) {
			repository.delete(user);
		}
		return user;
	}

	@Override
	public List<User> findAll() {
		return repository.findAll();
	}

	@Override
	public User findById(int id) {
		return repository.findById(id);
	}

	@Override
	public User update(User user) {
		User userToUpdate = findById(user.getId());
		if (userToUpdate != null) {
			userToUpdate.setFirstName(user.getFirstName());
			userToUpdate.setLastName(user.getLastName());
			userToUpdate.setEmail(user.getEmail());
			user = repository.save(userToUpdate);
		}
		System.out.println("\n\n\n Updated \n\n\n");
		return user;
	}

	@Override
	public User findByEmail(String email) {
		return repository.findByEmail(email);
	}
}
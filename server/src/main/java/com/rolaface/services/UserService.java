package com.rolaface.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rolaface.entities.User;

@Service
public interface UserService {

	User create(User user);

	User delete(int id);

	List<User> findAll();

	User findOne(String username);

	User findById(int id);

	User update(User user);

	User findByEmail(String email);
}
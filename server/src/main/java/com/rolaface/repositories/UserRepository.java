package com.rolaface.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import com.rolaface.entities.User;

@org.springframework.stereotype.Repository
public interface UserRepository extends Repository<User, Long> {

	void delete(User user);

	List<User> findAll();

	User findById(int id);

	User save(User user);

	@Query(value = "SELECT * FROM user u WHERE u.email = ?1", nativeQuery = true)
	User findByEmail(String email);
}
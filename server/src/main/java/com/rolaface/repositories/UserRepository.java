package com.rolaface.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rolaface.entities.User;

@org.springframework.stereotype.Repository
public interface UserRepository extends JpaRepository<User, Long> {

	@Override
	void delete(User user);

	@Override
	List<User> findAll();

	User findByUserid(int id);

	@Override
	User save(User user);

	@Query(value = "SELECT * FROM users u WHERE u.email = ?1", nativeQuery = true)
	User findByEmail(String email);
}

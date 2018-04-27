package com.rolaface.repositories;

import org.springframework.data.repository.Repository;

import com.rolaface.entities.User;

import java.util.List;

@org.springframework.stereotype.Repository
public interface UserRepository extends Repository<User, Long> {

    void delete(User user);

    List<User> findAll();

    User findById(int id);

    User save(User user);
}
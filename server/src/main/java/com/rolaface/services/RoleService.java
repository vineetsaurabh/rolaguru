package com.rolaface.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rolaface.entities.Role;

@Service
public interface RoleService {
	
	Role create(Role role);
	
	Role findById(int id);
	
	List<Role> findAll();
	
	Role update(Role role);
	
	Role delete(int id);

}

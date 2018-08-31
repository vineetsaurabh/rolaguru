package com.rolaface.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rolaface.entities.Role;
import com.rolaface.repositories.RoleRepository;

@Service(value = "roleService")
public class RoleServiceImpl implements RoleService {
	
	@Autowired
	public RoleRepository repository;

	@Override
	public Role create(Role role) {
		return repository.save(role);
	}

	@Override
	public Role findById(int id) {
		return repository.findByRoleid(id);
	}

	@Override
	public List<Role> findAll() {
		return repository.findAll();
	}

	@Override
	public Role update(Role role) {
		Role roleToUpdate = findById(role.getRoleid());
		if(roleToUpdate != null) {
			roleToUpdate.setRoleName(role.getRoleName());
			roleToUpdate.setDescription(role.getDescription());
		}
		return repository.save(roleToUpdate);
	}

	@Override
	public Role delete(int id) {
		Role roleToDelete = findById(id);
		if(roleToDelete != null) {
			repository.delete(roleToDelete);
		}
		return roleToDelete;
	}

}

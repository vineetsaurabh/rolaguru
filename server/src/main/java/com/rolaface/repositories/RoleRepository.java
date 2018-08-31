package com.rolaface.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rolaface.entities.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
	
	@Override
	Role save(Role role);

    Role findByRoleName(String name);
    
    Role findByRoleid(int roleid);
    
    @Override
    List<Role> findAll();

    @Override
    void delete(Role role);

}

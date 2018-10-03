package com.rolaface.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rolaface.entities.Module;

@Repository
public interface ModuleRepository extends JpaRepository<Module, Long> {

	@Override
	Module save(Module module);

	Module findByModuleName(String name);

	Module findByModuleId(int moduleId);

	@Override
	List<Module> findAll();

	@Override
	void delete(Module module);

}

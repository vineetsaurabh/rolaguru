package com.rolaface.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rolaface.entities.Module;

@Service
public interface ModuleService {

	Module create(Module module);

	Module findById(int id);

	List<Module> findAll();

	Module update(Module module);

	Module delete(int id);

}

package com.rolaface.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rolaface.entities.Module;
import com.rolaface.repositories.ModuleRepository;

@Service(value = "moduleService")
public class ModuleServiceImpl implements ModuleService {

	@Autowired
	public ModuleRepository repository;

	@Override
	public Module create(Module module) {
		return repository.save(module);
	}

	@Override
	public Module findById(int id) {
		return repository.findByModuleId(id);
	}

	@Override
	public List<Module> findAll() {
		return repository.findAll();
	}

	@Override
	public Module update(Module module) {
		Module moduleToUpdate = findById(module.getModuleId());
		if (moduleToUpdate != null) {
			moduleToUpdate.setModuleName(module.getModuleName());
			moduleToUpdate.setDescription(module.getDescription());
			moduleToUpdate.setModuleOwner(module.getModuleOwner());
		}
		return repository.save(moduleToUpdate);
	}

	@Override
	public Module delete(int id) {
		Module moduleToDelete = findById(id);
		if (moduleToDelete != null) {
			repository.delete(moduleToDelete);
		}
		return moduleToDelete;
	}

}

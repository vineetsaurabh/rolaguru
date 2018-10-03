package com.rolaface.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rolaface.entities.Domain;
import com.rolaface.repositories.DomainRepository;

@Service(value = "domainService")
public class DomainServiceImpl implements DomainService {

	@Autowired
	public DomainRepository repository;

	@Override
	public Domain create(Domain domain) {
		return repository.save(domain);
	}

	@Override
	public Domain findById(int id) {
		return repository.findByDomainId(id);
	}

	@Override
	public List<Domain> findAll() {
		return repository.findAll();
	}

	@Override
	public Domain update(Domain domain) {
		Domain defaultDomain = null;
		Domain domainToUpdate = findById(domain.getDomainId());
		if (domainToUpdate != null) {
			domainToUpdate.setDomainName(domain.getDomainName());
			domainToUpdate.setDescription(domain.getDescription());
			domainToUpdate.setModules(domain.getModules());
			domainToUpdate.setDomainOwner(domain.getDomainOwner());
			if (domain.isDefaultDomain() && !domainToUpdate.isDefaultDomain()) {
				defaultDomain = repository.findDefaultDomain();
				if (defaultDomain != null) {
					defaultDomain.setDefaultDomain(Boolean.FALSE);
					repository.save(defaultDomain);
				}
				domainToUpdate.setDefaultDomain(domain.isDefaultDomain());
			}
		}
		return repository.save(domainToUpdate);
	}

	@Override
	public Domain delete(int id) {
		Domain domainToDelete = findById(id);
		if (domainToDelete != null) {
			repository.delete(domainToDelete);
		}
		return domainToDelete;
	}

}

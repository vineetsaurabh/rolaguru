package com.rolaface.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.rolaface.entities.Domain;

@Repository
public interface DomainRepository extends JpaRepository<Domain, Long> {

	@Override
	Domain save(Domain domain);

	Domain findByDomainName(String name);

	Domain findByDomainId(int domainId);

	@Query(value = "SELECT * FROM domains d WHERE d.default_domain = true", nativeQuery = true)
	Domain findDefaultDomain();

	@Override
	List<Domain> findAll();

	@Override
	void delete(Domain domain);

}

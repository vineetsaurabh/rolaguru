package com.rolaface.entities;

import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "domains")
public class Domain {

	@Id
	@Column(name = "domain_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int domainId;

	@Column(name = "domain_name", unique = true, nullable = false)
	private String domainName;

	@Column
	private String description;

	@OneToMany(mappedBy = "domain", cascade = CascadeType.ALL)
	private Collection<Module> modules;

	@ManyToOne
	private User domainOwner;

	@Column(name = "default_domain", columnDefinition = "BOOLEAN DEFAULT false")
	private boolean defaultDomain;

	public int getDomainId() {
		return domainId;
	}

	public void setDomainId(int domainId) {
		this.domainId = domainId;
	}

	public String getDomainName() {
		return domainName;
	}

	public void setDomainName(String domainName) {
		this.domainName = domainName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Collection<Module> getModules() {
		return modules;
	}

	public void setModules(Collection<Module> modules) {
		this.modules = modules;
	}

	public User getDomainOwner() {
		return domainOwner;
	}

	public void setDomainOwner(User domainOwner) {
		this.domainOwner = domainOwner;
	}

	public boolean isDefaultDomain() {
		return defaultDomain;
	}

	public void setDefaultDomain(boolean defaultDomain) {
		this.defaultDomain = defaultDomain;
	}

}
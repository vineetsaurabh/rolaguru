package com.rolaface.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

@Entity
@Table(name = "modules")
public class Module {

	@Id
	@Column(name = "module_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int moduleId;

	@Column(name = "module_name", unique = true, nullable = false)
	private String moduleName;

	@Column
	private String description;

	@ManyToOne
	private User moduleOwner;

	@ManyToOne
	@JoinColumn(name = "domain_id")
	@JsonProperty(access = Access.WRITE_ONLY)
	private Domain domain;

	public int getModuleId() {
		return moduleId;
	}

	public void setModuleId(int moduleId) {
		this.moduleId = moduleId;
	}

	public String getModuleName() {
		return moduleName;
	}

	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public User getModuleOwner() {
		return moduleOwner;
	}

	public void setModuleOwner(User moduleOwner) {
		this.moduleOwner = moduleOwner;
	}

	public Domain getDomain() {
		return domain;
	}

	public void setDomain(Domain domain) {
		this.domain = domain;
	}

}
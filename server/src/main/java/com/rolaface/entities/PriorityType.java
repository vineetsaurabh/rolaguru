package com.rolaface.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "priority_types")
public class PriorityType implements Comparable<PriorityType> {

	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int priorityTypeId;

	@Column(name = "priority_type_name", unique = true, nullable = false)
	private String priorityTypeName;

	@Column
	private String description;

	@Column(name = "default_priority_type", columnDefinition = "BOOLEAN DEFAULT false")
	private boolean defaultPriorityType;
	
	@Column
	private String sla;

	@Column
	private String escalateTo;

	@Column
	private int timeToResolve;

	public int getPriorityTypeId() {
		return priorityTypeId;
	}

	public void setPriorityTypeId(int priorityTypeId) {
		this.priorityTypeId = priorityTypeId;
	}

	public String getPriorityTypeName() {
		return priorityTypeName;
	}

	public void setPriorityTypeName(String priorityTypeName) {
		this.priorityTypeName = priorityTypeName;
	}

	public boolean isDefaultPriorityType() {
		return defaultPriorityType;
	}

	public void setDefaultPriorityType(boolean defaultPriorityType) {
		this.defaultPriorityType = defaultPriorityType;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	public String getSla() {
		return sla;
	}

	public void setSla(String sla) {
		this.sla = sla;
	}

	public String getEscalateTo() {
		return escalateTo;
	}

	public void setEscalateTo(String escalateTo) {
		this.escalateTo = escalateTo;
	}

	public int getTimeToResolve() {
		return timeToResolve;
	}

	public void setTimeToResolve(int timeToResolve) {
		this.timeToResolve = timeToResolve;
	}
	
	@Override
	public int compareTo(PriorityType p) {
		return this.timeToResolve - p.timeToResolve;
	}

}
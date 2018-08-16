package com.rolaface.entities;

import java.util.SortedSet;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.hibernate.annotations.SortComparator;

import com.rolaface.util.CauseComparator;

@Entity
@Table(name = "errors")
public class FlexError {

	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int errid;

	@Column(nullable = false)
	private String module;

	@Column(unique = true, nullable = false)
	private String errcode;

	@Lob
	@Column(nullable = false)
	private String description;

	@Column
	private String operation;

	@Column
	private String severity;

	@Column
	private String frequency;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "flexerror_cause", joinColumns = { @JoinColumn(name = "errid") }, inverseJoinColumns = {
			@JoinColumn(name = "causeid") })
	@SortComparator(CauseComparator.class)
	private SortedSet<Cause> causes;

	public int getErrid() {
		return errid;
	}

	public void setErrid(int errid) {
		this.errid = errid;
	}

	public String getModule() {
		return module;
	}

	public String getErrcode() {
		return errcode;
	}

	public String getDescription() {
		return description;
	}

	public String getOperation() {
		return operation;
	}

	public String getSeverity() {
		return severity;
	}

	public String getFrequency() {
		return frequency;
	}

	public SortedSet<Cause> getCauses() {
		return causes;
	}

	public void setModule(String module) {
		this.module = module;
	}

	public void setErrcode(String errcode) {
		this.errcode = errcode;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setOperation(String operation) {
		this.operation = operation;
	}

	public void setSeverity(String severity) {
		this.severity = severity;
	}

	public void setFrequency(String frequency) {
		this.frequency = frequency;
	}

	public void setCauses(SortedSet<Cause> causes) {
		this.causes = causes;
	}

	@Override
	public String toString() {
		return "FlexError [errid=" + errid + ", module=" + module + ", errcode=" + errcode + ", description="
				+ description + ", operation=" + operation + ", severity=" + severity + ", frequency=" + frequency
				+ "]";
	}

}
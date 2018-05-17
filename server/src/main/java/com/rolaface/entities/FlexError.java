package com.rolaface.entities;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "flexerrors")
public class FlexError {

	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int errid;

	@Column(unique = true, nullable = false)
	private String errcode;

	@Column(nullable = false)
	private String message;

	@Column
	private String errortype;

	@Column
	private String batchtype;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "flexerror_cause", joinColumns = { @JoinColumn(name = "errid") }, inverseJoinColumns = {
			@JoinColumn(name = "causeid") })
	private Set<Cause> causes;

	public int getErrid() {
		return errid;
	}

	public void setErrid(int errid) {
		this.errid = errid;
	}

	public String getErrcode() {
		return errcode;
	}

	public void setErrcode(String errcode) {
		this.errcode = errcode;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getErrortype() {
		return errortype;
	}

	public void setErrortype(String errortype) {
		this.errortype = errortype;
	}

	public String getBatchtype() {
		return batchtype;
	}

	public void setBatchtype(String batchtype) {
		this.batchtype = batchtype;
	}

	public Set<Cause> getCauses() {
		return causes;
	}

	public void setCauses(Set<Cause> causes) {
		this.causes = causes;
	}

	@Override
	public String toString() {
		return "FlexError [errid=" + errid + ", errcode=" + errcode + ", message=" + message + ", errortype="
				+ errortype + ", batchtype=" + batchtype + ", causes=" + causes + "]";
	}

}
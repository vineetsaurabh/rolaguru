package com.rolaface.entities;

import java.util.Date;
import java.util.Set;
import java.util.SortedSet;

import javax.persistence.CascadeType;
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
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

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
	private String domain;

	@Column(unique = true, nullable = false)
	private String errcode;

	@Lob
	@Column(nullable = false)
	private String description;

	@Column(nullable = false)
	private String module;

	@Column(nullable = false)
	private String operation;

	@Column
	private int severity = 1;

	@Column
	private int frequency = 0;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created")
	private java.util.Date createdTimestamp;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "modified")
	private Date modifiedTimestamp;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "userid")
	private User user;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "error_cause", joinColumns = { @JoinColumn(name = "errid") }, inverseJoinColumns = {
			@JoinColumn(name = "causeid") })
	@SortComparator(CauseComparator.class)
	private SortedSet<Cause> causes;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "errid")
	private Set<ErrorDocument> files;

	public int getErrid() {
		return errid;
	}

	public String getDomain() {
		return domain;
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

	public int getSeverity() {
		return severity;
	}

	public int getFrequency() {
		return frequency;
	}

	public SortedSet<Cause> getCauses() {
		return causes;
	}

	public Set<ErrorDocument> getFiles() {
		return files;
	}

	public void setErrid(int errid) {
		this.errid = errid;
	}

	public void setDomain(String domain) {
		this.domain = domain;
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

	public void setSeverity(int severity) {
		this.severity = severity;
	}

	public void setFrequency(int frequency) {
		this.frequency = frequency;
	}

	public void setCauses(SortedSet<Cause> causes) {
		this.causes = causes;
	}

	public void setFiles(Set<ErrorDocument> files) {
		this.files = files;
	}

	public Date getCreatedTimestamp() {
		return createdTimestamp;
	}

	public void setCreatedTimestamp(java.util.Date createdTimestamp) {
		this.createdTimestamp = createdTimestamp;
	}

	public Date getModifiedTimestamp() {
		return modifiedTimestamp;
	}

	public void setModifiedTimestamp(Date modifiedTimestamp) {
		this.modifiedTimestamp = modifiedTimestamp;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "FlexError [errid=" + errid + ", domain=" + domain + ", module=" + module + ", errcode=" + errcode
				+ ", description=" + description + ", operation=" + operation + ", severity=" + severity
				+ ", frequency=" + frequency + "]";
	}

}
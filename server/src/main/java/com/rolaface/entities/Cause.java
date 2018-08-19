package com.rolaface.entities;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "causes")
public class Cause {

	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int causeid;

	@Lob
	@Column(nullable = false)
	private String description;

	@Lob
	@Column
	private String bankingScenerio;

	@Column(nullable = false)
	private String rootCause;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created")
	private java.util.Date createdTimestamp;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "modified")
	private Date modifiedTimestamp;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "userid")
	private User user;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "causeid")
	private Set<CauseRating> ratings;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "causeid")
	private Set<CauseDocument> files;

	public int getCauseid() {
		return causeid;
	}

	public String getDescription() {
		return description;
	}

	public String getBankingScenerio() {
		return bankingScenerio;
	}

	public String getRootCause() {
		return rootCause;
	}

	public java.util.Date getCreatedTimestamp() {
		return createdTimestamp;
	}

	public Date getModifiedTimestamp() {
		return modifiedTimestamp;
	}

	public User getUser() {
		return user;
	}

	public Set<CauseRating> getRatings() {
		return ratings;
	}

	public Set<CauseDocument> getFiles() {
		return files;
	}

	public void setCauseid(int causeid) {
		this.causeid = causeid;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setBankingScenerio(String bankingScenerio) {
		this.bankingScenerio = bankingScenerio;
	}

	public void setRootCause(String rootCause) {
		this.rootCause = rootCause;
	}

	public void setCreatedTimestamp(java.util.Date createdTimestamp) {
		this.createdTimestamp = createdTimestamp;
	}

	public void setModifiedTimestamp(Date modifiedTimestamp) {
		this.modifiedTimestamp = modifiedTimestamp;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public void setRatings(Set<CauseRating> ratings) {
		this.ratings = ratings;
	}

	public void setFiles(Set<CauseDocument> files) {
		this.files = files;
	}

	@Override
	public String toString() {
		return "Cause [causeid=" + causeid + ", description=" + description + ", bankingScenerio=" + bankingScenerio
				+ ", rootCause=" + rootCause + ", createdTimestamp=" + createdTimestamp + ", modifiedTimestamp="
				+ modifiedTimestamp + ", user=" + user.getFirstName() + ", ratings=" + ratings + ", files="
				+ files.size() + "]";
	}

}

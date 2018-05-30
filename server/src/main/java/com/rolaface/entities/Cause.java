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

	@Column(nullable = false)
	private String description;

	@Column
	private String solution;

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

	public int getCauseid() {
		return causeid;
	}

	public void setCauseid(int causeid) {
		this.causeid = causeid;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getSolution() {
		return solution;
	}

	public void setSolution(String solution) {
		this.solution = solution;
	}

	public java.util.Date getCreatedTimestamp() {
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

	public Set<CauseRating> getRatings() {
		return ratings;
	}

	public void setRatings(Set<CauseRating> ratings) {
		this.ratings = ratings;
	}

	@Override
	public String toString() {
		return "Cause [causeid=" + causeid + ", description=" + description + ", solution=" + solution
				+ ", createdTimestamp=" + createdTimestamp + ", modifiedTimestamp=" + modifiedTimestamp + ", user="
				+ user + ", ratings=" + ratings + "]";
	}

}

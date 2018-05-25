package com.rolaface.entities;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

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

	public Set<CauseRating> getRatings() {
		return ratings;
	}

	public void setRatings(Set<CauseRating> ratings) {
		this.ratings = ratings;
	}

	@Override
	public String toString() {
		return "Cause [causeid=" + causeid + ", description=" + description + ", solution=" + solution + ", ratings="
				+ ratings + "]";
	}

}

package com.rolaface.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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

	@Column
	private int rating;

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

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	@Override
	public String toString() {
		return "Cause [description=" + description + ", solution=" + solution + ", rating=" + rating + "]";
	}

}

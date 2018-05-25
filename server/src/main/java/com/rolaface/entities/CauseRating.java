package com.rolaface.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "cause_ratings")
public class CauseRating {

	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int ratingid;

	@Column
	private int rating;

	@Column(name = "causeid")
	private int causeid;

	@Column
	private int userid;

	public int getRatingid() {
		return ratingid;
	}

	public void setRatingid(int ratingid) {
		this.ratingid = ratingid;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public int getCauseid() {
		return causeid;
	}

	public void setCauseid(int causeid) {
		this.causeid = causeid;
	}

	public int getUserid() {
		return userid;
	}

	public void setUserid(int userid) {
		this.userid = userid;
	}

	@Override
	public String toString() {
		return "CauseRating [rating=" + rating + ", causeid=" + causeid + ", userid=" + userid + "]";
	}

}

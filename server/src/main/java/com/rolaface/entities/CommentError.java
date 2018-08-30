package com.rolaface.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "comments_error")
public class CommentError {

	@Id
	@Column(name = "comment_error_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int commentErrorId;

	@Column(nullable = false)
	private int errid;

	@Lob
	@Column
	private String comment;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created")
	private Date createdTimestamp;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "modified")
	private Date modifiedTimestamp;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "userid")
	private User user;

	public int getCommentErrorId() {
		return commentErrorId;
	}

	public void setCommentErrorId(int commentErrorId) {
		this.commentErrorId = commentErrorId;
	}

	public int getErrid() {
		return errid;
	}

	public void setErrid(int errid) {
		this.errid = errid;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
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

	@Override
	public String toString() {
		return "CommentError [commentErrorId=" + commentErrorId + ", errid=" + errid + ", comment=" + comment
				+ ", createdTimestamp=" + createdTimestamp + ", modifiedTimestamp=" + modifiedTimestamp + ", user="
				+ user + "]";
	}

}

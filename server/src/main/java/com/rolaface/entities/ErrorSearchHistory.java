package com.rolaface.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "error_search_history")
public class ErrorSearchHistory {

	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int errorSearchHistoryId;

	@Column(name = "search_string")
	private String searchString;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "search_time")
	private Date searchTimestamp;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "userid")
	private User user;

	public int getErrorSearchHistoryId() {
		return errorSearchHistoryId;
	}

	public String getSearchString() {
		return searchString;
	}

	public Date getSearchTimestamp() {
		return searchTimestamp;
	}

	public User getUser() {
		return user;
	}

	public void setErrorSearchHistoryId(int errorSearchHistoryId) {
		this.errorSearchHistoryId = errorSearchHistoryId;
	}

	public void setSearchString(String searchString) {
		this.searchString = searchString;
	}

	public void setSearchTimestamp(Date searchTimestamp) {
		this.searchTimestamp = searchTimestamp;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "ErrorSearchHistory [errorSearchHistoryId=" + errorSearchHistoryId + ", searchString=" + searchString
				+ ", searchTimestamp=" + searchTimestamp + ", user=" + user.getFirstName() + "]";
	}

}

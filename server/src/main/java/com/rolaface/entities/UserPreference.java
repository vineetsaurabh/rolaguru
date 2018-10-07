package com.rolaface.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "user_preferences")
public class UserPreference {
	
	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userPreferenceId;
	
	@Column
	private int userid;
	
	@Column
	private String pagination;
	
	@Column
	private String errorTableColumns;

	public int getUserPreferenceId() {
		return userPreferenceId;
	}

	public void setUserPreferenceId(int userPreferenceId) {
		this.userPreferenceId = userPreferenceId;
	}

	public int getUserid() {
		return userid;
	}

	public void setUserid(int userid) {
		this.userid = userid;
	}

	public String getPagination() {
		return pagination;
	}

	public void setPagination(String pagination) {
		this.pagination = pagination;
	}

	public String getErrorTableColumns() {
		return errorTableColumns;
	}

	public void setErrorTableColumns(String errorTableColumns) {
		this.errorTableColumns = errorTableColumns;
	}
	
}

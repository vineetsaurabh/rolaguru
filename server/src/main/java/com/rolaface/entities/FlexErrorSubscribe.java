package com.rolaface.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "error_subscribe")
public class FlexErrorSubscribe {

	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int erruserid;

	@Column(nullable = false)
	private int errid;

	@Column(nullable = false)
	private int userid;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "subscribed")
	private java.util.Date subscribedTimestamp;

	public int getErruserid() {
		return erruserid;
	}

	public void setErruserid(int erruserid) {
		this.erruserid = erruserid;
	}

	public int getErrid() {
		return errid;
	}

	public void setErrid(int errid) {
		this.errid = errid;
	}

	public int getUserid() {
		return userid;
	}

	public void setUserid(int userid) {
		this.userid = userid;
	}

	public java.util.Date getSubscribedTimestamp() {
		return subscribedTimestamp;
	}

	public void setSubscribedTimestamp(java.util.Date subscribedTimestamp) {
		this.subscribedTimestamp = subscribedTimestamp;
	}

	@Override
	public String toString() {
		return "FlexErrorSubscribe [erruserid=" + erruserid + ", errid=" + errid + ", userid=" + userid
				+ ", subscribedTimestamp=" + subscribedTimestamp + "]";
	}

}
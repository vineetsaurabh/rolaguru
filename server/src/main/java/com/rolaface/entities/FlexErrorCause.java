package com.rolaface.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "flexerror_cause")
public class FlexErrorCause {

	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int errcauseid;

	@Column(nullable = false)
	private int errid;

	@Column(nullable = false)
	private int causeid;

	public int getErrcauseid() {
		return errcauseid;
	}

	public void setErrcauseid(int errcauseid) {
		this.errcauseid = errcauseid;
	}

	public int getErrid() {
		return errid;
	}

	public void setErrid(int errid) {
		this.errid = errid;
	}

	public int getCauseid() {
		return causeid;
	}

	public void setCauseid(int causeid) {
		this.causeid = causeid;
	}

	@Override
	public String toString() {
		return "FlexErrorCause [errcauseid=" + errcauseid + ", errid=" + errid + ", causeid=" + causeid + "]";
	}

}

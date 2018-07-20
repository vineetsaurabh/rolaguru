package com.rolaface.entities;

import java.util.Arrays;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "profile_pictures")
public class ProfilePicture {

	@Id
	@GeneratedValue
	@Column(name = "profile_pic_id")
	private Integer profilePictureId;

	@Column(unique = true, nullable = false)
	private Integer userid;

	@Column
	private long size;

	@Column
	private String filename;

	@Column(length = 100000)
	private byte[] content;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created")
	private Date createdTimestamp;

	public Integer getProfilePictureId() {
		return profilePictureId;
	}

	public void setProfilePictureId(Integer profilePictureId) {
		this.profilePictureId = profilePictureId;
	}

	public Integer getUserid() {
		return userid;
	}

	public void setUserid(Integer userid) {
		this.userid = userid;
	}

	public long getSize() {
		return size;
	}

	public void setSize(long size) {
		this.size = size;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public byte[] getContent() {
		return content;
	}

	public void setContent(byte[] content) {
		this.content = content;
	}

	public Date getCreatedTimestamp() {
		return createdTimestamp;
	}

	public void setCreatedTimestamp(Date createdTimestamp) {
		this.createdTimestamp = createdTimestamp;
	}

	@Override
	public String toString() {
		return "ProfilePicture [profilePictureId=" + profilePictureId + ", userid=" + userid + ", size=" + size
				+ ", filename=" + filename + ", content=" + Arrays.toString(content) + ", createdTimestamp="
				+ createdTimestamp + "]";
	}

}

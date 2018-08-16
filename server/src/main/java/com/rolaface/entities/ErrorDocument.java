package com.rolaface.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "error_documents")
public class ErrorDocument {

	@Id
	@GeneratedValue
	@Column(name = "error_doc_id")
	private Integer errorDocId;

	@Column
	private Integer errid;

	@Column
	private long size;

	@Column
	private String description;

	@Column
	private String filename;

	@Column(length = 100000)
	private byte[] content;

	@Column(name = "content_type")
	private String contentType;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created")
	private Date createdTimestamp;

	public Integer getErrorDocId() {
		return errorDocId;
	}

	public Integer getErrid() {
		return errid;
	}

	public long getSize() {
		return size;
	}

	public String getDescription() {
		return description;
	}

	public String getFilename() {
		return filename;
	}

	public byte[] getContent() {
		return content;
	}

	public String getContentType() {
		return contentType;
	}

	public Date getCreatedTimestamp() {
		return createdTimestamp;
	}

	public void setErrorDocId(Integer errorDocId) {
		this.errorDocId = errorDocId;
	}

	public void setErrid(Integer errid) {
		this.errid = errid;
	}

	public void setSize(long size) {
		this.size = size;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public void setContent(byte[] content) {
		this.content = content;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public void setCreatedTimestamp(Date createdTimestamp) {
		this.createdTimestamp = createdTimestamp;
	}

	@Override
	public String toString() {
		return "ErrorDocument [errorDocId=" + errorDocId + ", errid=" + errid + ", size=" + size + ", description="
				+ description + ", filename=" + filename + ", createdTimestamp=" + createdTimestamp + "]";
	}

}

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
@Table(name = "cause_documents")
public class CauseDocument {

	@Id
	@GeneratedValue
	@Column(name = "cause_doc_id")
	private Integer causeDocId;

	@Column
	private Integer causeid;

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

	public Integer getCauseDocId() {
		return causeDocId;
	}

	public void setCauseDocId(Integer causeDocId) {
		this.causeDocId = causeDocId;
	}

	public Integer getCauseid() {
		return causeid;
	}

	public void setCauseid(Integer causeid) {
		this.causeid = causeid;
	}

	public long getSize() {
		return size;
	}

	public void setSize(long size) {
		this.size = size;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public Date getCreatedTimestamp() {
		return createdTimestamp;
	}

	public void setCreatedTimestamp(Date createdTimestamp) {
		this.createdTimestamp = createdTimestamp;
	}

	@Override
	public String toString() {
		return "CauseDocument [causeDocId=" + causeDocId + ", causeid=" + causeid + ", size=" + size + ", description="
				+ description + ", filename=" + filename + "]";
	}

}

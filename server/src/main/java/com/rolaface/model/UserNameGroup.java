package com.rolaface.model;

import java.util.List;

import com.rolaface.entities.User;

public class UserNameGroup {

	private String letter;

	private List<User> assignees;

	public List<User> getAssignees() {
		return assignees;
	}

	public void setAssignees(List<User> assignees) {
		this.assignees = assignees;
	}

	public String getLetter() {
		return letter;
	}

	public void setLetter(String letter) {
		this.letter = letter;
	}

}

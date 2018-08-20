package com.rolaface.model;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class ContextUser extends User {

	private static final long serialVersionUID = 4879314128366420444L;

	private final int userId;

	private final String email;

	private final String firstName;

	public ContextUser(String username, String password, Collection<? extends GrantedAuthority> authorities, int userId,
			String firstName, String email) {
		super(username, password, authorities);
		this.userId = userId;
		this.firstName = firstName;
		this.email = email;
	}

	public int getUserId() {
		return userId;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getEmail() {
		return email;
	}
}

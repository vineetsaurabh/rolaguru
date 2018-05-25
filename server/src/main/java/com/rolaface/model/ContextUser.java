package com.rolaface.model;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class ContextUser extends User {

	private static final long serialVersionUID = 4879314128366420444L;

	private final int userId;

	public ContextUser(String username, String password, Collection<? extends GrantedAuthority> authorities,
			int userId) {
		super(username, password, authorities);
		this.userId = userId;
	}

	public int getUserId() {
		return userId;
	}
}

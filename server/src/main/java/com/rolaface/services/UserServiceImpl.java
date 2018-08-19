package com.rolaface.services;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.rolaface.entities.User;
import com.rolaface.model.ContextUser;
import com.rolaface.repositories.UserRepository;

@Service(value = "userService")
public class UserServiceImpl implements UserService, UserDetailsService {

	@Autowired
	private UserRepository repository;

	@Autowired
	private BCryptPasswordEncoder bcryptEncoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = repository.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException("Invalid username or password.");
		}
		return new ContextUser(user.getUsername(), user.getPassword(), getAuthority(), user.getUserid());
	}

	private List<SimpleGrantedAuthority> getAuthority() {
		return Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN"));
	}

	@Override
	public User create(User user) {
		User newUser = new User();
		newUser.setUsername(user.getUsername());
		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
		newUser.setFirstName(user.getFirstName());
		newUser.setLastName(user.getLastName());
		newUser.setDateOfBirth(user.getDateOfBirth());
		newUser.setEmail(user.getEmail());
		newUser.setPhone(user.getPhone());
		newUser.setAddress(user.getAddress());
		newUser.setExpertise(user.getExpertise());
		return repository.save(newUser);
	}

	@Override
	public User delete(int id) {
		User user = findById(id);
		if (user != null) {
			repository.delete(user);
		}
		return user;
	}

	@Override
	public List<User> findAll() {
		return repository.findAll();
	}

	@Override
	public User findById(int id) {
		return repository.findByUserid(id);
	}

	@Override
	public User findOne(String username) {
		return repository.findByUsername(username);
	}

	@Override
	public User update(User user) {
		User userToUpdate = findById(user.getUserid());
		if (userToUpdate != null) {
			userToUpdate.setFirstName(user.getFirstName());
			userToUpdate.setLastName(user.getLastName());
			userToUpdate.setDateOfBirth(user.getDateOfBirth());
			userToUpdate.setEmail(user.getEmail());
			userToUpdate.setPhone(user.getPhone());
			userToUpdate.setExpertise(user.getExpertise());
			userToUpdate.setAddress(user.getAddress());
			userToUpdate.setActive(user.isActive());
			user = repository.save(userToUpdate);
		}
		return user;
	}

	@Override
	public User findByEmail(String email) {
		return repository.findByEmail(email);
	}

	@Override
	public User findByUsername(String username) {
		return repository.findByUsername(username);
	}

	@Override
	public User findByPhone(String phone) {
		return repository.findByPhone(phone);
	}

	@Override
	public List<User> findByExpertise(String expertise) {
		return repository.findByExpertise(expertise);
	}

}
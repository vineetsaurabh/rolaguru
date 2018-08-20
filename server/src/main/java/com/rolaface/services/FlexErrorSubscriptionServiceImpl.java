package com.rolaface.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rolaface.entities.FlexErrorSubscribe;
import com.rolaface.repositories.FlexErrorSubscribeRepository;

@Service
public class FlexErrorSubscriptionServiceImpl implements FlexErrorSubscribeService {

	@Autowired
	private FlexErrorSubscribeRepository repository;

	@Override
	public FlexErrorSubscribe create(FlexErrorSubscribe flexErrorSubscribe) {
		return repository.save(flexErrorSubscribe);
	}

	@Override
	public void delete(FlexErrorSubscribe flexErrorSubscribe) {
		repository.delete(flexErrorSubscribe);
	}

	@Override
	public List<FlexErrorSubscribe> findAll() {
		return repository.findAll();
	}

	@Override
	public FlexErrorSubscribe findById(int erruserid) {
		return repository.findByErruserid(erruserid);
	}

	@Override
	public FlexErrorSubscribe findSubscription(int errid, int userid) {
		return repository.findSubscription(errid, userid);
	}

	@Override
	public List<FlexErrorSubscribe> findByErrid(int errid) {
		return repository.findByErrid(errid);
	}

	@Override
	public List<String> findSubscribedEmails(int errid) {
		return repository.findSubscribedEmails(errid);
	}

	@Override
	public List<FlexErrorSubscribe> findByUserid(int userid) {
		return repository.findByUserid(userid);
	}

}
package com.rolaface.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rolaface.entities.FlexErrorSubscribe;

@Service
public interface FlexErrorSubscribeService {

	FlexErrorSubscribe create(FlexErrorSubscribe flexErrorSubscribe);

	void delete(FlexErrorSubscribe flexErrorSubscribe);

	List<FlexErrorSubscribe> findAll();

	FlexErrorSubscribe findById(int erruserid);

	FlexErrorSubscribe findSubscription(int errid, int userid);

	List<FlexErrorSubscribe> findByErrid(int errid);

	List<String> findSubscribedEmails(int errid);

	List<FlexErrorSubscribe> findByUserid(int userid);

}
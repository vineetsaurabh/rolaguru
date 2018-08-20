package com.rolaface.controllers;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rolaface.entities.FlexError;
import com.rolaface.entities.FlexErrorSubscribe;
import com.rolaface.model.ContextUser;
import com.rolaface.services.EmailService;
import com.rolaface.services.FlexErrorService;
import com.rolaface.services.FlexErrorSubscribeService;

@RestController
@RequestMapping({ "/flex-error-subscribe" })
public class FlexErrorSubscribeController {

	private final static String SUBSCRIPTION_SUBJECT = "ROLAGURU Notification : Your are subscribed to Error";

	private final static String UN_SUBSCRIPTION_SUBJECT = "ROLAGURU Notification : Your are un-subscribed from Error";

	private final static String SUBSCRIPTION_MESSAGE = "You are subscribed to Error(s) \n Error ID - %d";

	private final static String UN_SUBSCRIPTION_MESSAGE = "You are un-subscribed to Error(s) \n Error ID - %d";

	@Autowired
	private FlexErrorSubscribeService flexErrorSubscribeService;

	@Autowired
	private FlexErrorService errorService;

	@Autowired
	private EmailService emailService;

	@PostMapping
	public FlexErrorSubscribe create(@RequestBody int errid) {
		ContextUser user = (ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		FlexErrorSubscribe flexErrorSubscribe = flexErrorSubscribeService.findSubscription(errid, user.getUserId());
		if (flexErrorSubscribe == null) {
			flexErrorSubscribe = new FlexErrorSubscribe();
			flexErrorSubscribe.setErrid(errid);
			flexErrorSubscribe.setUserid(user.getUserId());
			flexErrorSubscribe.setEmail(user.getEmail());
			flexErrorSubscribe.setSubscribedTimestamp(new Date());
			flexErrorSubscribe = flexErrorSubscribeService.create(flexErrorSubscribe);
		}
		if (flexErrorSubscribe != null) {
			String message = String.format(SUBSCRIPTION_MESSAGE, errid);
			emailService.sendMail(SUBSCRIPTION_SUBJECT, message);
		}
		return flexErrorSubscribe;
	}

	@DeleteMapping(path = { "/{id}" })
	public void delete(@PathVariable("id") int id) {
		int userId = ((ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserId();
		FlexErrorSubscribe flexErrorSubscribe = flexErrorSubscribeService.findSubscription(id, userId);
		if (flexErrorSubscribe != null) {
			flexErrorSubscribe = flexErrorSubscribeService.findSubscription(id, userId);
			flexErrorSubscribeService.delete(flexErrorSubscribe);
		}
		if (flexErrorSubscribe != null) {
			String message = String.format(UN_SUBSCRIPTION_MESSAGE, flexErrorSubscribe.getErrid());
			emailService.sendMail(UN_SUBSCRIPTION_SUBJECT, message);
		}
	}

	@Transactional
	@GetMapping(value = "/subscribederrors")
	public Set<FlexError> getSubscribedErrors() {
		int userId = ((ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserId();
		List<FlexErrorSubscribe> flexErrors = flexErrorSubscribeService.findByUserid(userId);
		Set<FlexError> subscribedErrors = new HashSet<>();
		for (FlexErrorSubscribe flexError : flexErrors) {
			subscribedErrors.add(errorService.findById(flexError.getErrid()));
		}
		return subscribedErrors;
	}

	@GetMapping(value = "/subscribederrorids")
	public Set<String> getSubscribedErrorIds() {
		int userId = ((ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserId();
		List<FlexErrorSubscribe> flexErrors = flexErrorSubscribeService.findByUserid(userId);
		Set<String> subscribedErrors = new HashSet<>();
		for (FlexErrorSubscribe flexError : flexErrors) {
			subscribedErrors.add(String.valueOf(flexError.getErrid()));
		}
		return subscribedErrors;
	}

	@Transactional
	@GetMapping(value = "/subscribeerrors", params = "errids")
	public int subscribeErrors(@RequestParam("errids") String errids) {
		ContextUser user = (ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		int noOfErrorSubscribed = 0;
		try {
			for (String errid : errids.split(",")) {
				FlexErrorSubscribe flexErrorSubscribe = flexErrorSubscribeService
						.findSubscription(Integer.parseInt(errid), user.getUserId());
				if (flexErrorSubscribe == null) {
					flexErrorSubscribe = new FlexErrorSubscribe();
					flexErrorSubscribe.setErrid(Integer.parseInt(errid));
					flexErrorSubscribe.setUserid(user.getUserId());
					flexErrorSubscribe.setEmail(user.getEmail());
					flexErrorSubscribe.setSubscribedTimestamp(new Date());
					flexErrorSubscribeService.create(flexErrorSubscribe);
					noOfErrorSubscribed++;
				}
			}
		} catch (Exception e) {
			// TODO : ExceptionHandling
		}
		String message = String.format(SUBSCRIPTION_MESSAGE, errids);
		emailService.sendMail(SUBSCRIPTION_SUBJECT, message);
		return noOfErrorSubscribed;
	}

	@Transactional
	@GetMapping(value = "/unsubscribeerrors", params = "errids")
	public int unsubscribeErrors(@RequestParam("errids") String errids) {
		int userId = ((ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserId();
		int noOfErrorUnsubscribed = 0;
		try {
			for (String errid : errids.split(",")) {
				FlexErrorSubscribe flexErrorSubscribe = flexErrorSubscribeService
						.findSubscription(Integer.parseInt(errid), userId);
				if (flexErrorSubscribe != null) {
					flexErrorSubscribeService.delete(flexErrorSubscribe);
					noOfErrorUnsubscribed++;
				}
			}
		} catch (Exception e) {
			// TODO : ExceptionHandling
		}
		String message = String.format(UN_SUBSCRIPTION_SUBJECT, errids);
		emailService.sendMail(UN_SUBSCRIPTION_SUBJECT, message);
		return noOfErrorUnsubscribed;
	}

}

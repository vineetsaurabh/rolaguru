package com.rolaface.controllers;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rolaface.entities.FlexErrorSubscribe;
import com.rolaface.model.ContextUser;
import com.rolaface.services.FlexErrorSubscribeService;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping({ "/flex-error-subscribe" })
public class FlexErrorSubscribeController {

	@Autowired
	private FlexErrorSubscribeService flexErrorSubscribeService;

	@PostMapping
	public FlexErrorSubscribe create(@RequestBody int errid) {
		int userId = ((ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserId();
		FlexErrorSubscribe flexErrorSubscribe = flexErrorSubscribeService.findSubscription(errid, userId);
		if (flexErrorSubscribe == null) {
			flexErrorSubscribe = new FlexErrorSubscribe();
			flexErrorSubscribe.setErrid(errid);
			flexErrorSubscribe.setUserid(userId);
			flexErrorSubscribe.setSubscribedTimestamp(new Date());
			flexErrorSubscribe = flexErrorSubscribeService.create(flexErrorSubscribe);
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
	}

	@GetMapping(value = "/subscribederrors")
	public Set<String> getSubscribedErrors() {
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
		int userId = ((ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserId();
		int noOfErrorSubscribed = 0;
		try {
			for (String errid : errids.split(",")) {
				FlexErrorSubscribe flexErrorSubscribe = flexErrorSubscribeService
						.findSubscription(Integer.parseInt(errid), userId);
				if (flexErrorSubscribe == null) {
					flexErrorSubscribe = new FlexErrorSubscribe();
					flexErrorSubscribe.setErrid(Integer.parseInt(errid));
					flexErrorSubscribe.setUserid(userId);
					flexErrorSubscribe.setSubscribedTimestamp(new Date());
					flexErrorSubscribeService.create(flexErrorSubscribe);
					noOfErrorSubscribed++;
				}
			}
		} catch (Exception e) {
			// TODO : ExceptionHandling
		}
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
		return noOfErrorUnsubscribed;
	}

}

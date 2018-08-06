package com.rolaface.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rolaface.entities.Cause;
import com.rolaface.entities.CauseRating;
import com.rolaface.model.ContextUser;
import com.rolaface.services.CauseRatingService;
import com.rolaface.services.CauseService;

@RestController
@RequestMapping({ "/cause-rating" })
public class CauseRatingController {

	@Autowired
	private CauseRatingService causeRatingService;

	@Autowired
	private CauseService causeService;

	@PostMapping
	public CauseRating create(@RequestBody CauseRating causeRating) {
		int userId = ((ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserId();
		Cause cause = causeService.findById(causeRating.getCauseid());
		if (userId != cause.getUser().getUserid()) {
			causeRating.setUserid(userId);
			causeRating = causeRatingService.create(causeRating);
		}
		return causeRating;
	}

	@GetMapping(path = { "/{id}" })
	public CauseRating findOne(@PathVariable("id") int id) {
		return causeRatingService.findById(id);
	}

	@PutMapping(path = { "/{id}" })
	public CauseRating update(@RequestBody CauseRating causeRating) {
		int userId = ((ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserId();
		CauseRating causeRatingToUpdate = findMyRatingForCause(causeRating.getCauseid(), userId);
		if (causeRatingToUpdate != null) {
			causeRatingToUpdate.setRating(causeRating.getRating());
			causeRating = causeRatingService.update(causeRatingToUpdate);
		}
		return causeRating;
	}

	@DeleteMapping(path = { "/{id}" })
	public CauseRating delete(@PathVariable("id") int id) {
		return causeRatingService.delete(id);
	}

	@GetMapping
	public List<CauseRating> findAll() {
		return causeRatingService.findAll();
	}

	private CauseRating findMyRatingForCause(int causeid, int userid) {
		return causeRatingService.findMyRatingForCause(causeid, userid);
	}

}

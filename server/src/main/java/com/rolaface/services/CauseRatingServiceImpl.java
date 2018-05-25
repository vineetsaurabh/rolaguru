package com.rolaface.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rolaface.entities.CauseRating;
import com.rolaface.repositories.CauseRatingRepository;

@Service(value = "causeRatingService")
public class CauseRatingServiceImpl implements CauseRatingService {

	@Autowired
	private CauseRatingRepository repository;

	@Override
	public CauseRating create(CauseRating causeRating) {
		return repository.save(causeRating);
	}

	@Override
	public CauseRating delete(int ratingid) {
		CauseRating causeRating = findById(ratingid);
		if (causeRating != null) {
			repository.delete(causeRating);
		}
		return causeRating;
	}

	@Override
	public List<CauseRating> findAll() {
		return repository.findAll();
	}

	@Override
	public CauseRating findById(int ratingid) {
		return repository.findByRatingid(ratingid);
	}

	@Override
	public CauseRating update(CauseRating causeRating) {
		CauseRating causeRatingToUpdate = findById(causeRating.getRatingid());
		if (causeRatingToUpdate != null) {
			causeRatingToUpdate.setRating(causeRating.getRating());
			causeRating = repository.save(causeRatingToUpdate);
		}
		return causeRating;
	}

	@Override
	public CauseRating findMyRatingForCause(int causeid, int userid) {
		return repository.findMyRatingForCause(causeid, userid);
	}

}

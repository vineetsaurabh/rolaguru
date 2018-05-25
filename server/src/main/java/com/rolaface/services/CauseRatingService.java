package com.rolaface.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rolaface.entities.CauseRating;

@Service
public interface CauseRatingService {

	CauseRating create(CauseRating causeRating);

	CauseRating delete(int ratingid);

	List<CauseRating> findAll();

	CauseRating findById(int ratingid);

	CauseRating update(CauseRating causeRating);

	CauseRating findMyRatingForCause(int causeid, int userid);

}

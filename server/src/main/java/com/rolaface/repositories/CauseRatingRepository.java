package com.rolaface.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rolaface.entities.CauseRating;

@org.springframework.stereotype.Repository
public interface CauseRatingRepository extends JpaRepository<CauseRating, Long> {

	@Override
	void delete(CauseRating causeRating);

	@Override
	List<CauseRating> findAll();

	CauseRating findByRatingid(int ratingid);

	@Override
	CauseRating save(CauseRating causeRating);

	List<CauseRating> findByCauseid(int causeid);

	List<CauseRating> findByUserid(int userid);

	@Query(value = "SELECT * FROM cause_ratings c WHERE c.causeid = ?1 AND c.userid = ?2", nativeQuery = true)
	CauseRating findMyRatingForCause(int causeid, int userid);

}

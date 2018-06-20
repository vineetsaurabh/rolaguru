package com.rolaface.util;

import java.util.Comparator;
import java.util.Set;

import com.rolaface.entities.Cause;
import com.rolaface.entities.CauseRating;

public class CauseComparator implements Comparator<Cause> {

	@Override
	public int compare(Cause cause1, Cause cause2) {
		Set<CauseRating> ratings1 = cause1.getRatings();
		Set<CauseRating> ratings2 = cause2.getRatings();
		float totalRating1 = 0;
		for (CauseRating rating : ratings1) {
			totalRating1 = +rating.getRating();
		}
		float totalRating2 = 0;
		for (CauseRating rating : ratings2) {
			totalRating2 = +rating.getRating();
		}
		int ret = 0;
		if (totalRating1 == totalRating2) {
			ret = cause2.getCreatedTimestamp().compareTo(cause1.getCreatedTimestamp());
		} else if (totalRating2 > totalRating1) {
			ret = 1;
		} else {
			ret = -1;
		}
		return ret;
	}

}

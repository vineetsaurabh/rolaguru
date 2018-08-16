package com.rolaface.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rolaface.entities.FlexErrorSubscribe;

@org.springframework.stereotype.Repository
public interface FlexErrorSubscribeRepository extends JpaRepository<FlexErrorSubscribe, Long> {

	@Override
	void delete(FlexErrorSubscribe flexErrorSubscribe);

	@Override
	List<FlexErrorSubscribe> findAll();

	FlexErrorSubscribe findByErruserid(int erruserid);

	List<FlexErrorSubscribe> findByErrid(int errid);

	List<FlexErrorSubscribe> findByUserid(int userid);

	@Query(value = "SELECT * FROM error_subscribe f WHERE f.errid = ?1 AND f.userid = ?2", nativeQuery = true)
	FlexErrorSubscribe findSubscription(int errid, int userid);

	@Override
	FlexErrorSubscribe save(FlexErrorSubscribe flexErrorSubscribe);

}
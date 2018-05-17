package com.rolaface.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rolaface.entities.FlexErrorCause;

@Service
public interface FlexErrorCauseService {

	FlexErrorCause create(FlexErrorCause flexErrorCause);

	FlexErrorCause delete(int errcauseid);

	List<FlexErrorCause> findAll();

	FlexErrorCause findById(int errcauseid);

}
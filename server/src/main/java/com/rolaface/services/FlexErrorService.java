package com.rolaface.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rolaface.entities.FlexError;

@Service
public interface FlexErrorService {

	FlexError create(FlexError flexError);

	FlexError delete(int id);

	List<FlexError> findAll();

	List<FlexError> findAll(String category);

	List<FlexError> findErrors(String input);
	
	List<FlexError> findByPriority(String priority);

	FlexError findById(int id);

	FlexError update(FlexError flexError);

	FlexError findByErrorCode(String errCode);
}
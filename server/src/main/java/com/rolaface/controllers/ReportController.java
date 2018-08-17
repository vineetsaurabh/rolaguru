package com.rolaface.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rolaface.entities.ErrorSearchHistory;
import com.rolaface.services.ErrorSearchHistoryService;

@RestController
@RequestMapping({ "/report" })
public class ReportController {

	@Autowired
	private ErrorSearchHistoryService errorSearchHistoryService;

	@GetMapping
	public List<ErrorSearchHistory> findAll() {
		return errorSearchHistoryService.findAll();
	}

}

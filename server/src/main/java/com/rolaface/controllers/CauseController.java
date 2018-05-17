package com.rolaface.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rolaface.entities.Cause;
import com.rolaface.entities.FlexErrorCause;
import com.rolaface.services.CauseService;
import com.rolaface.services.FlexErrorCauseService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping({ "/cause" })
public class CauseController {

	@Autowired
	private CauseService causeService;

	@Autowired
	private FlexErrorCauseService errorCauseService;

	@PostMapping
	public Cause create(@RequestBody CauseDTO causeDTO) {
		Cause cause = causeService.create(causeDTO.getCause());
		FlexErrorCause errorCause = new FlexErrorCause();
		errorCause.setCauseid(cause.getCauseid());
		errorCause.setErrid(causeDTO.getErrid());
		errorCauseService.create(errorCause);
		return cause;
	}

	@GetMapping(path = { "/{id}" })
	public Cause findOne(@PathVariable("id") int id) {
		return causeService.findById(id);
	}

	@PutMapping(path = { "/{id}" })
	public Cause update(@RequestBody Cause cause) {
		return causeService.update(cause);
	}

	@DeleteMapping(path = { "/{id}" })
	public Cause delete(@PathVariable("id") int id) {
		return causeService.delete(id);
	}

	@GetMapping
	public List<Cause> findAll() {
		return causeService.findAll();
	}

}

class CauseDTO {

	private Cause cause;

	private int errid;

	public Cause getCause() {
		return cause;
	}

	public void setCause(Cause cause) {
		this.cause = cause;
	}

	public int getErrid() {
		return errid;
	}

	public void setErrid(int errid) {
		this.errid = errid;
	}

	@Override
	public String toString() {
		return "CauseDTO [cause=" + cause + ", errid=" + errid + "]";
	}
}

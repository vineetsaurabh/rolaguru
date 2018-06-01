package com.rolaface.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rolaface.entities.FlexError;
import com.rolaface.services.FlexErrorService;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping({ "/flex-error" })
public class FlexErrorController {

	@Autowired
	private FlexErrorService flexErrorService;

	@PostMapping
	public FlexError create(@RequestBody FlexError flexError) {
		return flexErrorService.create(flexError);
	}

	@GetMapping(path = { "/{id}" })
	public FlexError findOne(@PathVariable("id") int id) {
		return flexErrorService.findById(id);
	}

	@PutMapping(path = { "/{id}" })
	public FlexError update(@RequestBody FlexError flexError) {
		return flexErrorService.update(flexError);
	}

	@DeleteMapping(path = { "/{id}" })
	public FlexError delete(@PathVariable("id") int id) {
		return flexErrorService.delete(id);
	}

	@GetMapping
	public List<FlexError> findAll() {
		return flexErrorService.findAll();
	}

	@GetMapping(value = "/findbyerrcode", params = "code")
	public FlexError findByErrorCode(@RequestParam("code") String errCode) {
		return flexErrorService.findByErrorCode(errCode);
	}

	@Transactional
	@GetMapping(value = "/deleteerrors", params = "errids")
	public boolean deleteErrors(@RequestParam("errids") String errids) {
		try {
			for (String id : errids.split(",")) {
				delete(Integer.parseInt(id));
			}
			return true;
		} catch (Exception e) {
			// TODO : ExceptionHandling
		}
		return false;
	}
}
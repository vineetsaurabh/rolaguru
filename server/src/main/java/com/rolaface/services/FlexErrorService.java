package com.rolaface.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rolaface.entities.FlexError;

@Service
public interface FlexErrorService {

    FlexError create(FlexError flexError);

    FlexError delete(int id);

    List<FlexError> findAll();

    FlexError findById(int id);

    FlexError update(FlexError flexError);
}
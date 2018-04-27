package com.rolaface.repositories;

import org.springframework.data.repository.Repository;

import com.rolaface.entities.FlexError;
import com.rolaface.entities.User;

import java.util.List;

@org.springframework.stereotype.Repository
public interface FlexErrorRepository extends Repository<FlexError, Long> {

    void delete(FlexError flexError);

    List<FlexError> findAll();

    FlexError findById(int id);

    FlexError save(FlexError flexError);
}
package com.rolaface.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rolaface.entities.CommentError;

@Service
public interface CommentErrorService {

	CommentError create(CommentError comment);

	CommentError delete(int commentId);

	List<CommentError> findByErrid(int errid);

	CommentError findById(int commentId);

	CommentError update(CommentError comment);

}

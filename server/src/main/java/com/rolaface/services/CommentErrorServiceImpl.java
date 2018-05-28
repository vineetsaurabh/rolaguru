package com.rolaface.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rolaface.entities.CommentError;
import com.rolaface.repositories.CommentErrorRepository;

@Service(value = "commentErrorService")
public class CommentErrorServiceImpl implements CommentErrorService {

	@Autowired
	private CommentErrorRepository repository;

	@Override
	public CommentError create(CommentError comment) {
		return repository.save(comment);
	}

	@Override
	public CommentError delete(int id) {
		CommentError comment = findById(id);
		if (comment != null) {
			repository.delete(comment);
		}
		return comment;
	}

	@Override
	public List<CommentError> findByErrid(int errid) {
		return repository.findByErrid(errid);
	}

	@Override
	public CommentError findById(int id) {
		return repository.findById(id);
	}

	@Override
	public CommentError update(CommentError comment) {
		CommentError commentToUpdate = findById(comment.getId());
		if (commentToUpdate != null) {
			commentToUpdate.setComment(comment.getComment());
			commentToUpdate.setModifiedTimestamp(new Date());
			comment = repository.save(commentToUpdate);
		}
		return comment;
	}

}

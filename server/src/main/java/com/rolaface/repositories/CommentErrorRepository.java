package com.rolaface.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rolaface.entities.CommentError;

@org.springframework.stereotype.Repository
public interface CommentErrorRepository extends JpaRepository<CommentError, Long> {

	@Override
	void delete(CommentError comment);

	@Override
	List<CommentError> findAll();

	List<CommentError> findByErrid(int errid);

	@Override
	CommentError save(CommentError comment);

	CommentError findByCommentErrorId(int id);

}

package com.rolaface.services;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.rolaface.model.ContextUser;

@Service
public class EmailService {

	ExecutorService executorService = Executors.newSingleThreadExecutor();

	private JavaMailSender javaMailSender;

	@Autowired
	public EmailService(JavaMailSender javaMailSender) {
		this.javaMailSender = javaMailSender;
	}

	public void sendMails(List<String> toEmails, String subject, String message) {
		SimpleMailMessage mailMessage = new SimpleMailMessage();
		mailMessage.setSubject(subject);
		mailMessage.setText(message);
		executorService.execute(new Runnable() {
			@Override
			public void run() {
				for (String toEmail : toEmails) {
					mailMessage.setTo(toEmail);
					javaMailSender.send(mailMessage);
				}
			}
		});
	}

	public void sendMail(String toEmail, String subject, String message) {
		SimpleMailMessage mailMessage = new SimpleMailMessage();
		mailMessage.setTo(toEmail);
		mailMessage.setSubject(subject);
		mailMessage.setText(message);

		executorService.execute(new Runnable() {
			@Override
			public void run() {
				javaMailSender.send(mailMessage);
			}
		});
	}

	public void sendMail(String subject, String message) {
		String toEmail = ((ContextUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal())
				.getEmail();
		sendMail(toEmail, subject, message);
	}

}
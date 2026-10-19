package com.ps.backend.notification_service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {
    private String fromEmail;

    private final JavaMailSender javaMailSender;

    public boolean sendEmail(String to,String subject,String body){
        boolean isSend = false;
        try{
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            javaMailSender.send(message);
            return true;
        }catch (Exception e){
            log.error(e.getMessage());
            return false;
        }
    }
}

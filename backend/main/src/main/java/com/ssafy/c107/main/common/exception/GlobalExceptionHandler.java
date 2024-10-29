package com.ssafy.c107.main.common.exception;

import com.ssafy.c107.main.domain.members.exception.MemberExistException;
import com.ssafy.c107.main.domain.members.exception.MemberNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MemberNotFoundException.class)
    public ResponseEntity<String> handleMemberNotFoundException(MemberNotFoundException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }

    @ExceptionHandler(MemberExistException.class)
    public ResponseEntity<String> handleMemberExistException(MemberExistException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }
}

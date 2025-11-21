package com.example.demo.Exception;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    private Map<String, Object> buildError(HttpStatus status, String message, String path) {
        Map<String, Object> error = new HashMap<>();
        error.put("timestamp", LocalDateTime.now().toString());
        error.put("status", status.value());
        error.put("error", status.getReasonPhrase());
        error.put("message", message);
        error.put("path", path);
        return error;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidation(MethodArgumentNotValidException ex, HttpServletRequest request) {
        Map<String, String> errors = new HashMap<>();
        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            errors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(buildError(HttpStatus.BAD_REQUEST, errors.toString(), request.getRequestURI()));
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Object> handleConstraintViolation(ConstraintViolationException ex, HttpServletRequest request) {
        Map<String, String> errors = new HashMap<>();
        for (ConstraintViolation<?> violation : ex.getConstraintViolations()) {
            String field = violation.getPropertyPath().toString();
            if (field.contains(".")) {
                field = field.substring(field.lastIndexOf('.') + 1);
            }
            errors.put(field, violation.getMessage());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(buildError(HttpStatus.BAD_REQUEST, errors.toString(), request.getRequestURI()));
    }

    @ExceptionHandler(TransactionSystemException.class)
    public ResponseEntity<Object> handleTransactionError(TransactionSystemException ex, HttpServletRequest request) {
        Throwable root = ex.getRootCause();
        if (root instanceof ConstraintViolationException cve) {
            return handleConstraintViolation(cve, request);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(buildError(HttpStatus.BAD_REQUEST, root != null ? root.getMessage() : ex.getMessage(), request.getRequestURI()));
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Object> handleDataIntegrity(DataIntegrityViolationException ex, HttpServletRequest request) {
        String message = ex.getRootCause() != null ? ex.getRootCause().getMessage() : ex.getMessage();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(buildError(HttpStatus.BAD_REQUEST, message, request.getRequestURI()));
    }

    @ExceptionHandler(HttpClientErrorException.class)
    public ResponseEntity<Object> handleFastApiClientError(HttpClientErrorException ex, HttpServletRequest request) {

        HttpStatus status = HttpStatus.valueOf(ex.getStatusCode().value());

        return ResponseEntity.status(status)
                .body(buildError(status, ex.getResponseBodyAsString(), request.getRequestURI()));
    }

    @ExceptionHandler(HttpServerErrorException.class)
    public ResponseEntity<Object> handleFastApiServerError(HttpServerErrorException ex, HttpServletRequest request) {

        HttpStatus status = HttpStatus.BAD_GATEWAY;

        return ResponseEntity.status(status)
                .body(buildError(status, "FastAPI Internal Error: " + ex.getResponseBodyAsString(), request.getRequestURI()));
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGeneral(Exception ex, HttpServletRequest request) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(buildError(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), request.getRequestURI()));
    }
}

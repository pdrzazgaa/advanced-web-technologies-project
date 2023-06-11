package com.company.project.controllers;

import com.company.project.exceptions.*;
import org.springframework.hateoas.MediaTypes;
import org.springframework.hateoas.mediatype.problem.Problem;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class FaultController {

    @ResponseBody
    @ExceptionHandler(FavouritePlaceDoesNotExistEx.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    ResponseEntity FPDNEHandler(FavouritePlaceDoesNotExistEx ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.NOT_FOUND)
                        .withTitle(HttpStatus.NOT_FOUND.name())
                        .withDetail(ex.getMessage()));
    }

    @ResponseBody
    @ExceptionHandler(BadRequestEx.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    ResponseEntity BREHandler(BadRequestEx ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.BAD_REQUEST)
                        .withTitle(HttpStatus.BAD_REQUEST.name())
                        .withDetail(ex.getMessage()));
    }

    @ResponseBody
    @ExceptionHandler(FavouritePlaceAlreadyExistsEx.class)
    @ResponseStatus(value = HttpStatus.CONFLICT)
    ResponseEntity FPAEHandler(FavouritePlaceAlreadyExistsEx ex) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.CONFLICT)
                        .withTitle(HttpStatus.CONFLICT.name())
                        .withDetail(ex.getMessage()));
    }

    @ResponseBody
    @ExceptionHandler(UserAlreadyExistsEx.class)
    @ResponseStatus(value = HttpStatus.CONFLICT)
    ResponseEntity UAEHandler(UserAlreadyExistsEx ex) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.CONFLICT)
                        .withTitle(HttpStatus.CONFLICT.name())
                        .withDetail(ex.getMessage()));
    }

    @ResponseBody
    @ExceptionHandler(LineDoesNotExistEx.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    ResponseEntity NLEHandler(LineDoesNotExistEx ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.NOT_FOUND)
                        .withTitle(HttpStatus.NOT_FOUND.name())
                        .withDetail(ex.getMessage()));
    }
    @ResponseBody
    @ExceptionHandler(StopDoesNotFoundEx.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    ResponseEntity SDNFHandler(StopDoesNotFoundEx ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .header(HttpHeaders.CONTENT_TYPE, MediaTypes.HTTP_PROBLEM_DETAILS_JSON_VALUE)
                .body(Problem.create()
                        .withStatus(HttpStatus.NOT_FOUND)
                        .withTitle(HttpStatus.NOT_FOUND.name())
                        .withDetail(ex.getMessage()));
    }
}

package com.ssafy.c107.main.common.exception;

import com.ssafy.c107.main.common.aws.InvalidS3Exception;
import com.ssafy.c107.main.domain.food.exception.FoodNotFoundException;
import com.ssafy.c107.main.domain.members.exception.InvalidMemberRoleException;
import com.ssafy.c107.main.domain.members.exception.MemberExistException;
import com.ssafy.c107.main.domain.members.exception.MemberNotFoundException;
import com.ssafy.c107.main.domain.members.exception.SellerNotFoundException;
import com.ssafy.c107.main.domain.order.exception.OrderCreationFailedException;
import com.ssafy.c107.main.domain.order.exception.OrderListNotFoundException;
import com.ssafy.c107.main.domain.pay.exception.BillingAuthFailedException;
import com.ssafy.c107.main.domain.pay.exception.BillingChargeFailedException;
import com.ssafy.c107.main.domain.pay.exception.ConfirmPaymentFailedException;
import com.ssafy.c107.main.domain.review.exception.*;
import com.ssafy.c107.main.domain.store.exception.StoreNotFoundException;
import com.ssafy.c107.main.domain.subscribe.exception.*;
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

    @ExceptionHandler(SellerNotFoundException.class)
    public ResponseEntity<String> handleSellerNotFoundException(SellerNotFoundException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }

    @ExceptionHandler(StoreNotFoundException.class)
    public ResponseEntity<String> handleStoreNotFoundException(StoreNotFoundException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }

    @ExceptionHandler(SubscribeNotFoundException.class)
    public ResponseEntity<String> handleSubscribeNotFoundException(SubscribeNotFoundException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }

    @ExceptionHandler(InvalidMemberRoleException.class)
    public ResponseEntity<String> handleInstantiationException(InvalidMemberRoleException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }

    @ExceptionHandler(FoodNotFoundException.class)
    public ResponseEntity<String> handleFoodNotFoundException(FoodNotFoundException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }

    @ExceptionHandler(SubscribeWeekNotFoundException.class)
    public ResponseEntity<String> handleSubscribeWeekNotFoundException(
            SubscribeWeekNotFoundException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }

    @ExceptionHandler(InvalidS3Exception.class)
    public ResponseEntity<String> handleS3Exception(InvalidS3Exception e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }

    @ExceptionHandler(OrderListNotFoundException.class)
    public ResponseEntity<String> handleOrderListNotFoundException(OrderListNotFoundException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<String> handleMaxUploadSizeExceededException(MaxUploadSizeExceededException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }

    @ExceptionHandler(InvalidOrderListException.class)
    public ResponseEntity<String> handleInvalidOrderListExceptionException(InvalidOrderListException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }

    @ExceptionHandler(ReviewNotFoundException.class)
    public ResponseEntity<String> handleReviewNotFoundException(ReviewNotFoundException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }

    @ExceptionHandler(SummeryNotFoundException.class)
    public ResponseEntity<String> handleSummeryNotFoundException(SummeryNotFoundException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }

    @ExceptionHandler(BillingAuthFailedException.class)
    public ResponseEntity<String> handleBillingAuthFailedException(BillingAuthFailedException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }

    @ExceptionHandler(BillingChargeFailedException.class)
    public ResponseEntity<String> handleBillingChargeFailedException(BillingChargeFailedException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }

    @ExceptionHandler(ConfirmPaymentFailedException.class)
    public ResponseEntity<String> handleConfirmPaymentFailedException(ConfirmPaymentFailedException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }

    @ExceptionHandler(ReviewAnalysisProcessingException.class)
    public ResponseEntity<String> handleReviewAnalysisProcessingException(ReviewAnalysisProcessingException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }

    @ExceptionHandler(ReviewInterruptedException.class)
    public ResponseEntity<String> handleReviewInterruptedException(ReviewInterruptedException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }

    @ExceptionHandler(FastApiCommunicationException.class)
    public ResponseEntity<String> handleFastApiCommunicationException(FastApiCommunicationException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }

    @ExceptionHandler(MemberSubscribeNotFoundException.class)
    public ResponseEntity<String> handleMemberSubscribeNotFoundException(MemberSubscribeNotFoundException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }

    @ExceptionHandler(OrderCreationFailedException.class)
    public ResponseEntity<String> handleOrderCreationFailedException(OrderCreationFailedException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }

    @ExceptionHandler(CannotCancelAfterEndDateException.class)
    public ResponseEntity<String> handleCannotCancelAfterEndDateException(CannotCancelAfterEndDateException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }

    @ExceptionHandler(SubscriptionNotFoundForMemberException.class)
    public ResponseEntity<String> handleSubscriptionNotFoundForMemberException(SubscriptionNotFoundForMemberException e) {
        return ResponseEntity.status(e.getStatus()).body(e.getMessage());
    }
}

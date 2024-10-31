package com.ssafy.c107.main.domain.store.exception;

public class StoreNotFoundException extends RuntimeException {

    @Override
    public String getMessage() {
        return StoreException.STORE_NOT_FOUND.getMessage();
    }

    public int getStatus() {
        return StoreException.STORE_NOT_FOUND.getCode();
    }
}

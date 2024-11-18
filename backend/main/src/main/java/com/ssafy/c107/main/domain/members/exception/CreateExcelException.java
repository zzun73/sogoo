package com.ssafy.c107.main.domain.members.exception;

public class CreateExcelException extends RuntimeException{
    @Override
    public String getMessage() {
        return MemberException.EXCEL_BYTE_ERROR.getMessage();
    }

    public int getStatus(){
        return MemberException.EXCEL_BYTE_ERROR.getCode();
    }
}

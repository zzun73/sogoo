package com.ssafy.c107.main.domain.members.dto.response;

import com.ssafy.c107.main.domain.members.dto.SalesValue;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MonthlySalesResponse {

    private SalesValue jan;
    private SalesValue feb;
    private SalesValue mar;
    private SalesValue apr;
    private SalesValue may;
    private SalesValue jun;
    private SalesValue jul;
    private SalesValue aug;
    private SalesValue sep;
    private SalesValue oct;
    private SalesValue nov;
    private SalesValue dec;
}

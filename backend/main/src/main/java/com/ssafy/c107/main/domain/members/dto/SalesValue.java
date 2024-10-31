package com.ssafy.c107.main.domain.members.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SalesValue {

    private int subscribeSales;
    private int tradeSales;
}

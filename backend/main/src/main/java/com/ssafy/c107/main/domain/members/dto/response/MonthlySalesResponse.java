package com.ssafy.c107.main.domain.members.dto.response;

import java.util.Map;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MonthlySalesResponse {

    private Map<String, Long> foodSales;
    private Map<String, Long> subscribeSales;
}

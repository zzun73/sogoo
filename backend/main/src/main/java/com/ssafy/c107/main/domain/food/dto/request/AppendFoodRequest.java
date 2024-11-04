package com.ssafy.c107.main.domain.food.dto.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class AppendFoodRequest {
    private String foodName;
    private int foodPrice;
    private String foodDescription;
    private MultipartFile img;
}

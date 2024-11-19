package com.ssafy.c107.main.domain.review.dto.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CreateReviewInfoRequest {
    private String comment;
    private MultipartFile img;
}

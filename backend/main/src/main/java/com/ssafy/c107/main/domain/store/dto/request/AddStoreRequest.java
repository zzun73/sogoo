package com.ssafy.c107.main.domain.store.dto.request;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
public class AddStoreRequest {

    private String name;
    private String address;
    private String description;
    private MultipartFile img;
}

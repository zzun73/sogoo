package com.ssafy.c107.main.domain.store.dto.request;

import com.ssafy.c107.main.domain.store.dto.StoreInformationDto;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
public class AddStoreRequest {

    private StoreInformationDto store;
    private MultipartFile img;
}

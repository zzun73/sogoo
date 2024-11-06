package com.ssafy.c107.main.domain.elasticsearch.dto.response;

import com.ssafy.c107.main.domain.elasticsearch.dto.SearchDetail;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SearchResponse {

    private List<SearchDetail> stores;
}

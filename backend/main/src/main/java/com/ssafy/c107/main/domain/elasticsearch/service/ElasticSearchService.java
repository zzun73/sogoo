package com.ssafy.c107.main.domain.elasticsearch.service;

import com.ssafy.c107.main.domain.elasticsearch.dto.response.SearchResponse;

public interface ElasticSearchService {

    SearchResponse getStores(String query, int page);
}

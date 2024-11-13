package com.ssafy.c107.main.domain.elasticsearch.controller;

import com.ssafy.c107.main.domain.elasticsearch.dto.response.SearchResponse;
import com.ssafy.c107.main.domain.elasticsearch.service.ElasticSearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/elastic")
public class ElasticSearchController {

    private final ElasticSearchService elasticSearchService;

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam(name = "query") String query) {
        try {
            SearchResponse response = elasticSearchService.getStores(query);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Elasticsearch 검색 중 오류 발생: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("검색 중 오류가 발생했습니다.");
        }
    }
}

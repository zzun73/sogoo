package com.ssafy.c107.main.domain.elasticsearch.controller;

import com.ssafy.c107.main.domain.elasticsearch.service.ElasticSearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
        return ResponseEntity.ok(elasticSearchService.getStores(query));
    }

}

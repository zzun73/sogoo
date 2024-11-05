package com.ssafy.c107.main.domain.elasticsearch.repository;

import com.ssafy.c107.main.domain.elasticsearch.entity.StoreSearchDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface StoreSearchRepository extends ElasticsearchRepository<StoreSearchDocument, Long> {


}

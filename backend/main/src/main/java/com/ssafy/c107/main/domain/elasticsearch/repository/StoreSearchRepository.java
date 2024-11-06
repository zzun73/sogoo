package com.ssafy.c107.main.domain.elasticsearch.repository;

import com.ssafy.c107.main.domain.elasticsearch.entity.StoreSearchDocument;
import java.util.List;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface StoreSearchRepository extends ElasticsearchRepository<StoreSearchDocument, Long> {

    @Query("{\"bool\": {\"should\": [{\"match\": {\"storeName\": \"?0\"}}, {\"nested\": {\"path\": \"foods\", \"query\": {\"match\": {\"foods.foodName\": \"?0\"}}}}]}}")
    List<StoreSearchDocument> findByStoreNameOrFoodName(String keyword);

}

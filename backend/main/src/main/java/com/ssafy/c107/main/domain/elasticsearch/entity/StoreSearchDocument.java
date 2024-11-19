package com.ssafy.c107.main.domain.elasticsearch.entity;

import java.util.List;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Getter
@Document(indexName = "stores")
public class StoreSearchDocument {

    @Id
    private Long id;

    @Field(type = FieldType.Text, analyzer = "nori")  // 한글 검색을 위한 nori 분석기 사용
    private String storeName;

    @Field(type = FieldType.Text)
    private String address;

    @Field(type = FieldType.Text)
    private String description;

    @Field(type = FieldType.Text)
    private String img;

    @Field(type = FieldType.Nested)  // 중첩 문서로 food 정보 저장
    private List<FoodInfo> foods;

    @Getter
    @Builder
    public static class FoodInfo {
        @Field(type = FieldType.Text, analyzer = "nori")
        private String foodName;

        @Field(type = FieldType.Integer)
        private int price;

        @Field(type = FieldType.Text)
        private String description;
    }

    public void addFood(FoodInfo food) {
        this.foods.add(food);
    }

    @Builder
    public StoreSearchDocument(Long id, String storeName, String address, String description,
        String img, List<FoodInfo> foods) {
        this.id = id;
        this.storeName = storeName;
        this.address = address;
        this.description = description;
        this.img = img;
        this.foods = foods;
    }
}

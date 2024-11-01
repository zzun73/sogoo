package com.ssafy.c107.main.domain.review.service;

import com.ssafy.c107.main.domain.review.dto.response.ReviewInfoResponse;
import com.ssafy.c107.main.domain.review.entity.Review;
import com.ssafy.c107.main.domain.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;

    // 반찬가게 상세 페이지[구매자용](긍/부정, 한 줄 요약)
    @Transactional(readOnly = true)
    public ReviewInfoResponse getReviewInfo(Long storeId) {
        // 가게에 해당하는 모든 리뷰 조회
        List<Review> reviews = reviewRepository.findAllByStoreId(storeId);

        // 전체 리뷰 수, 긍정 리뷰 수, 부정 리뷰 수 계산
        long totalReviewCount = reviews.size();
        long positiveCount = reviews.stream().filter(Review::isEmotion).count();
        long negativeCount = totalReviewCount - positiveCount;

        // 한 줄 요약 (예시로 단순히 가장 최근 리뷰의 댓글을 가져와 사용) 나중에 추가 구현
        String summary = reviews.stream().findFirst()
                .map(Review::getComment)
                .orElse("리뷰가 없습니다.");

        // 응답 객체 생성
        ReviewInfoResponse reviewInfoResponse = new ReviewInfoResponse();
        reviewInfoResponse.setReviewCount(totalReviewCount);
        reviewInfoResponse.setPositiveCount(positiveCount);
        reviewInfoResponse.setNegativeCount(negativeCount);
        reviewInfoResponse.setSummary(summary);

        return reviewInfoResponse;
    }
}

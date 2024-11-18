package com.ssafy.c107.main.domain.store.service;

import com.ssafy.c107.main.common.aws.FileService;
import com.ssafy.c107.main.domain.elasticsearch.entity.StoreSearchDocument;
import com.ssafy.c107.main.domain.elasticsearch.repository.StoreSearchRepository;
import com.ssafy.c107.main.domain.members.entity.Member;
import com.ssafy.c107.main.domain.members.exception.MemberNotFoundException;
import com.ssafy.c107.main.domain.members.repository.MemberRepository;
import com.ssafy.c107.main.domain.store.dto.GetStoreDto;
import com.ssafy.c107.main.domain.store.dto.SellerStoreDto;
import com.ssafy.c107.main.domain.store.dto.StoreDetailDto;
import com.ssafy.c107.main.domain.store.dto.request.AddStoreRequest;
import com.ssafy.c107.main.domain.store.dto.response.GetStoreResponse;
import com.ssafy.c107.main.domain.store.dto.response.SellerStoresResponse;
import com.ssafy.c107.main.domain.store.dto.response.StoreCountResponse;
import com.ssafy.c107.main.domain.store.dto.response.StoreRecommendResponse;
import com.ssafy.c107.main.domain.store.entity.Store;
import com.ssafy.c107.main.domain.store.exception.StoreNotFoundException;
import com.ssafy.c107.main.domain.store.repository.StoreRepository;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

    private final StoreRepository storeRepository;
    private final FileService fileService;
    private final MemberRepository memberRepository;
    private final StoreSearchRepository storeSearchRepository;

    //메인 페이지 조회
    @Transactional(readOnly = true)
    public GetStoreResponse getAllStores(int page) {
        Pageable pageable = PageRequest.of(page - 1, 20);

        List<Store> getStores = storeRepository.findAll(pageable).getContent();

        if (getStores.isEmpty()) {
            throw new StoreNotFoundException();
        }

        List<GetStoreDto> stores = getStores.stream().map(store -> {
            GetStoreDto dto = new GetStoreDto();
            dto.setStoreId(store.getId());
            dto.setName(store.getName());
            dto.setDescription(store.getDescription());
            dto.setImg(store.getImg());
            return dto;
        }).collect(Collectors.toList());

        GetStoreResponse getStoreResponse = new GetStoreResponse();
        getStoreResponse.setStores(stores);
        return getStoreResponse;
    }

    //반찬가게 상세페이지(반찬가게)
    @Transactional(readOnly = true)
    public GetStoreDto getStoreById(Long id) {
        Store store = storeRepository.findById(id).orElseThrow(StoreNotFoundException::new);

        GetStoreDto dto = new GetStoreDto();
        dto.setStoreId(store.getId());
        dto.setName(store.getName());
        dto.setDescription(store.getDescription());
        dto.setImg(store.getImg());

        return dto;
    }

    @Override
    public void addStore(AddStoreRequest addStoreRequest, Long userId) {
        Member member = memberRepository.findById(userId).orElseThrow(MemberNotFoundException::new);

        //이미지 저장
        String imgUrl = fileService.saveFile(addStoreRequest.getImg());

        //가게 등록
        Store store = storeRepository.save(Store
            .builder()
            .name(addStoreRequest.getName())
            .address(addStoreRequest.getAddress())
            .img(imgUrl)
            .description(addStoreRequest.getDescription())
            .member(member)
            .summary("없음")
            .build());

        storeSearchRepository.save(StoreSearchDocument
            .builder()
            .id(store.getId())
            .storeName(addStoreRequest.getName())
            .address(addStoreRequest.getAddress())
            .img(imgUrl)
            .description(addStoreRequest.getDescription())
            .foods(new ArrayList<>())
            .build());
    }

    @Override
    public SellerStoresResponse getAllSellerStores(Long userId) {
        List<SellerStoreDto> result = new ArrayList<>();
        List<Store> stores = storeRepository.findAllByMember_Id(userId);
        for (Store store : stores) {
            result.add(SellerStoreDto
                .builder()
                .storeId(store.getId())
                .storeName(store.getName())
                .build());
        }
        return SellerStoresResponse
            .builder()
            .stores(result)
            .build();
    }

    @Override
    public StoreCountResponse getStoreCount() {
        int count = (int) storeRepository.count();
        return StoreCountResponse
            .builder()
            .storeCount(count)
            .build();
    }

    @Override
    public StoreRecommendResponse getStoreRecommend() {
        List<Store> stores = storeRepository.findAll();

        Collections.shuffle(stores);

        if (stores.size() < 3) {
            List<StoreDetailDto> result = stores.subList(0, stores.size()).stream()
                .map(store -> StoreDetailDto
                    .builder()
                    .storeId(store.getId())
                    .storeImg(store.getImg())
                    .storeDescription(store.getDescription())
                    .storeName(store.getName())
                    .build()).toList();

            return StoreRecommendResponse
                .builder()
                .stores(result)
                .build();
        }

        List<StoreDetailDto> result = stores.subList(0, 3).stream().map(store -> StoreDetailDto
            .builder()
            .storeId(store.getId())
            .storeImg(store.getImg())
            .storeDescription(store.getDescription())
            .storeName(store.getName())
            .build()).toList();

        return StoreRecommendResponse
            .builder()
            .stores(result)
            .build();
    }

    @Override
    public StoreRecommendResponse getStoreRecommendById(Long id) {
        List<StoreDetailDto> result = new ArrayList<>();

        //사용자의 연령대 가져오기
        Member member = memberRepository.findById(id).orElseThrow(MemberNotFoundException::new);
        int memberRange = member.getRange();

        //해당 연령대가 많이 구매하는 가게 목록 가져오기
        List<Member> myRangeMembers = memberRepository.findByMemberRange(memberRange);

        Map<Long, Long> storeOrderCounts = myRangeMembers.stream()
            .flatMap(memb -> memb.getOrders().stream())
            .map(order -> order.getStore().getId())
            .collect(Collectors.groupingBy(
                Function.identity(),  // storeId -> storeId 대신
                () -> new TreeMap<Long, Long>(Comparator.reverseOrder()),  // 타입 명시
                Collectors.counting()
            ));

        // 가게가 3개 미만인 경우 전체 가게 목록을 가져오기
        if (storeOrderCounts.size() < 3) {
            List<Store> allStores = storeRepository.findAll();
            for (Store store : allStores) {
                result.add(StoreDetailDto
                    .builder()
                    .storeId(store.getId())
                    .storeName(store.getName())
                    .storeDescription(store.getDescription())
                    .storeImg(store.getImg())
                    .build());
            }
        } else {
            Map<Long, Long> top3StoreOrderCounts = storeOrderCounts.entrySet().stream()
                .limit(3)
                .collect(Collectors.toMap(
                    Map.Entry::getKey,
                    Map.Entry::getValue,
                    (e1, e2) -> e1,
                    LinkedHashMap::new
                ));

            //상위 3개 가게 정보 가져오기
            for (Long storeId : top3StoreOrderCounts.keySet()) {
                Store store = storeRepository.findById(storeId)
                    .orElseThrow(StoreNotFoundException::new);
                result.add(StoreDetailDto
                    .builder()
                    .storeId(store.getId())
                    .storeName(store.getName())
                    .storeDescription(store.getDescription())
                    .storeImg(store.getImg())
                    .build());
            }
        }

        if (result.isEmpty()) {
            List<Store> stores = storeRepository.findAll();

            Collections.shuffle(stores);

            if (stores.size() < 3) {
                result = stores.subList(0, stores.size()).stream()
                    .map(store -> StoreDetailDto
                        .builder()
                        .storeId(store.getId())
                        .storeImg(store.getImg())
                        .storeDescription(store.getDescription())
                        .storeName(store.getName())
                        .build()).toList();

                return StoreRecommendResponse
                    .builder()
                    .stores(result)
                    .build();
            }

            result = stores.subList(0, 3).stream().map(store -> StoreDetailDto
                .builder()
                .storeId(store.getId())
                .storeImg(store.getImg())
                .storeDescription(store.getDescription())
                .storeName(store.getName())
                .build()).toList();

            return StoreRecommendResponse
                .builder()
                .stores(result)
                .build();
        }
        return StoreRecommendResponse
            .builder()
            .stores(result)
            .build();
    }
}

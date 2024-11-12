package com.ssafy.c107.main.domain.store.service;

import com.ssafy.c107.main.common.aws.FileService;
import com.ssafy.c107.main.domain.elasticsearch.entity.StoreSearchDocument;
import com.ssafy.c107.main.domain.elasticsearch.repository.StoreSearchRepository;
import com.ssafy.c107.main.domain.members.entity.Member;
import com.ssafy.c107.main.domain.members.exception.MemberNotFoundException;
import com.ssafy.c107.main.domain.members.repository.MemberRepository;
import com.ssafy.c107.main.domain.store.dto.GetStoreDto;
import com.ssafy.c107.main.domain.store.dto.SellerStoreDto;
import com.ssafy.c107.main.domain.store.dto.request.AddStoreRequest;
import com.ssafy.c107.main.domain.store.dto.response.GetStoreResponse;
import com.ssafy.c107.main.domain.store.dto.response.SellerStoresResponse;
import com.ssafy.c107.main.domain.store.entity.Store;
import com.ssafy.c107.main.domain.store.exception.StoreNotFoundException;
import com.ssafy.c107.main.domain.store.repository.StoreRepository;
import java.util.ArrayList;
import java.util.List;
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
}

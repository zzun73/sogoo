package com.ssafy.c107.main.domain.members.repository;

import com.ssafy.c107.main.common.entity.BusinessCertification;
import org.springframework.data.repository.CrudRepository;

public interface BusinessCertificationRepository extends
    CrudRepository<BusinessCertification, Long> {

    boolean existsBySellerNumber(String sellerNumber);

}

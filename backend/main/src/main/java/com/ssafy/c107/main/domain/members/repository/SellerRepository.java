package com.ssafy.c107.main.domain.members.repository;

import com.ssafy.c107.main.domain.members.entity.Seller;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SellerRepository extends JpaRepository<Seller, Long> {
    Optional<Seller> findBySellerNumber(String sellerNumber);
}

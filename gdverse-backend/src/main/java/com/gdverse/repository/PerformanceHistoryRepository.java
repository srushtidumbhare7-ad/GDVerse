package com.gdverse.repository;

import com.gdverse.model.PerformanceHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PerformanceHistoryRepository extends JpaRepository<PerformanceHistory, Long> {
    List<PerformanceHistory> findByUserIdOrderByCreatedAtDesc(Long userId);
}

package com.gdverse.repository;

import com.gdverse.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {
    List<Topic> findByCategoryIgnoreCase(String category);
    List<Topic> findByNameContainingIgnoreCase(String keyword);
}

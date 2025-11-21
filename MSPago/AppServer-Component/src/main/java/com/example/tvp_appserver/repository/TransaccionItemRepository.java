package com.example.tvp_appserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.tvp_appserver.model.TransaccionItem;

@Repository
public interface TransaccionItemRepository extends JpaRepository<TransaccionItem, Long> {

    
} 

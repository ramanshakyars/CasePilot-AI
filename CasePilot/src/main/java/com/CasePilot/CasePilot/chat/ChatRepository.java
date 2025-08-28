package com.CasePilot.CasePilot.chat;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

import java.util.List;

@Repository
public interface ChatRepository extends ReactiveMongoRepository<ChatEntity,String> {
    Mono<ChatEntity> findById(String id);
}

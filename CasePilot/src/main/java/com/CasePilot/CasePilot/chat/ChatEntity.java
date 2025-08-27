package com.CasePilot.CasePilot.chat;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@Document("chat")
public class ChatEntity {
    @Id
    private String Id;
    private String prompt;
    private String model;
    private String response;
    private LocalDateTime createdAt;
}

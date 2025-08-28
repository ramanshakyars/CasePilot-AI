package com.CasePilot.CasePilot.chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@Document("chat")
@NoArgsConstructor
@AllArgsConstructor
public class ChatEntity {
    @Id
    private String Id;
    private String title;
    private String prompt;
    private String model;
    private String response;
    private LocalDateTime createdAt;
}

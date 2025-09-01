package com.CasePilot.CasePilot.chat;

import com.CasePilot.CasePilot.chat.dto.ChatMessage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@Document("chat")
@NoArgsConstructor
@AllArgsConstructor
public class ChatEntity {
    @Id
    private String id;
    private String title;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<ChatMessage> messages = new ArrayList<>();
}

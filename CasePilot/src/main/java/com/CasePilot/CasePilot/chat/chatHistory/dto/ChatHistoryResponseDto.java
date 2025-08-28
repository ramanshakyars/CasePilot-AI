package com.CasePilot.CasePilot.chat.chatHistory.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ChatHistoryResponseDto {
    private String chatId;
    private String title;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

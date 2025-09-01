package com.CasePilot.CasePilot.chat.dto;
import lombok.Data;

import java.util.List;

@Data
public class ConversationResponseDto {
    private String chatId;
    private String title;
    private List<ChatResponseDto> messages;
}

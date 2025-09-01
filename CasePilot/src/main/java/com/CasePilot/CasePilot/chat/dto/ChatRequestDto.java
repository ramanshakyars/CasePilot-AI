package com.CasePilot.CasePilot.chat.dto;

import lombok.Data;

@Data
public class ChatRequestDto {
    private String chatId;
    private String model = "model";
    private String prompt;
    private boolean stream = false;
}

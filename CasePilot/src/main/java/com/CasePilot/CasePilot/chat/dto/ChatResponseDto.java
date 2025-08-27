package com.CasePilot.CasePilot.chat.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ChatResponseDto {
    private String Id;
    private String model;
    private LocalDateTime createdAt;
    private String response;
    private String prompt;

}

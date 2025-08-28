package com.CasePilot.CasePilot.chat;

import com.CasePilot.CasePilot.chat.chatHistory.dto.ChatHistoryResponseDto;
import com.CasePilot.CasePilot.chat.dto.ChatRequestDto;
import com.CasePilot.CasePilot.chat.dto.ChatResponseDto;

import java.util.List;

public interface ChatService {
   ChatResponseDto generateSolution(ChatRequestDto chatRequestDto);
   List <ChatHistoryResponseDto> getChatHistory();
   List<ChatResponseDto> loadChatById(String chatId);
}

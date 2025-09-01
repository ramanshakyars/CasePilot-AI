package com.CasePilot.CasePilot.chat;

import com.CasePilot.CasePilot.chat.chatHistory.dto.ChatHistoryResponseDto;
import com.CasePilot.CasePilot.chat.dto.ChatRequestDto;
import com.CasePilot.CasePilot.chat.dto.ChatResponseDto;
import com.CasePilot.CasePilot.chat.dto.ConversationResponseDto;

import java.util.List;

public interface ChatService {
   ConversationResponseDto createOrContinueChat(ChatRequestDto requestDto);
   List<ChatHistoryResponseDto> getChatHistory();
   ConversationResponseDto loadChatById(String chatId);
   void renameChat(String chatId, String newTitle);
   void deleteChat(String chatId);
}

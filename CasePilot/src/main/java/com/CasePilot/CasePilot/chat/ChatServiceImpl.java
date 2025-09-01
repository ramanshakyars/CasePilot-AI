package com.CasePilot.CasePilot.chat;

import com.CasePilot.CasePilot.chat.chatHistory.dto.ChatHistory;
import com.CasePilot.CasePilot.chat.chatHistory.dto.ChatHistoryResponseDto;
import com.CasePilot.CasePilot.chat.dto.ChatMessage;
import com.CasePilot.CasePilot.chat.dto.ChatRequestDto;
import com.CasePilot.CasePilot.chat.dto.ChatResponseDto;
import com.CasePilot.CasePilot.chat.dto.ConversationResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {
    private final ChatRepository chatRepository;
    private final WebClient webClient = WebClient.builder().baseUrl("http://localhost:11434").build();

    @Override
    public ConversationResponseDto createOrContinueChat(ChatRequestDto chatRequestDto) {
        ChatResponseDto response = webClient.post()
                .uri("/api/generate")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(
                        java.util.Map.of(
                                "model", chatRequestDto.getModel(),
                                "prompt", chatRequestDto.getPrompt(),
                                "stream", false
                        )
                )
                .retrieve()
                .bodyToMono(ChatResponseDto.class)
                .block();

        LocalDateTime now = LocalDateTime.now();

        ChatMessage message = ChatMessage.builder()
                .prompt(chatRequestDto.getPrompt())
                .response(response.getResponse())
                .model(chatRequestDto.getModel())
                .createdAt(now)
                .build();

        ChatEntity chatEntity;

        if (chatRequestDto.getChatId() == null || chatRequestDto.getChatId().isBlank()) {
            // New chat
            String title = message.getPrompt().length() > 30 ? message.getPrompt().substring(0, 30) + "..." : message.getPrompt();
            chatEntity = ChatEntity.builder()
                    .title(title)
                    .createdAt(now)
                    .updatedAt(now)
                    .messages(new java.util.ArrayList<>(List.of(message)))
                    .build();
        } else {
            // Existing chat
            chatEntity = chatRepository.findById(chatRequestDto.getChatId()).block();
            if (chatEntity == null) throw new RuntimeException("Chat not found");
            chatEntity.getMessages().add(message);
            chatEntity.setUpdatedAt(now);
        }
        ChatEntity saved = chatRepository.save(chatEntity).block();

        return toConversationDto(saved);
    }

    @Override
    public List<ChatHistoryResponseDto> getChatHistory() {
        return chatRepository.findAll()
                .map(chat -> {
                    ChatHistoryResponseDto dto = new ChatHistoryResponseDto();
                    dto.setChatId(chat.getId());
                    dto.setTitle(chat.getTitle());
                    dto.setCreatedAt(chat.getCreatedAt());
                    dto.setUpdatedAt(chat.getUpdatedAt());
                    return dto;
                })
                .collectList().block();
    }

    @Override
    public ConversationResponseDto loadChatById(String chatId) {
        ChatEntity chatEntity = chatRepository.findById(chatId).block();
        if (chatEntity == null) throw new RuntimeException("Chat not found");
        return toConversationDto(chatEntity);
    }

    @Override
    public void renameChat(String chatId, String newTitle) {
        ChatEntity chatEntity = chatRepository.findById(chatId).block();
        if (chatEntity == null) throw new RuntimeException("Chat not found");
        chatEntity.setTitle(newTitle);
        chatEntity.setUpdatedAt(LocalDateTime.now());
        chatRepository.save(chatEntity).block();
    }

    @Override
    public void deleteChat(String chatId) {
        chatRepository.deleteById(chatId).block();
    }

    private ConversationResponseDto toConversationDto(ChatEntity chatEntity) {
        ConversationResponseDto dto = new ConversationResponseDto();
        dto.setChatId(chatEntity.getId());
        dto.setTitle(chatEntity.getTitle());
        dto.setMessages(
                chatEntity.getMessages().stream().map(msg -> {
                    ChatResponseDto rdto = new ChatResponseDto();
                    rdto.setId(msg.getId());
                    rdto.setChatId(chatEntity.getId());
                    rdto.setModel(msg.getModel());
                    rdto.setPrompt(msg.getPrompt());
                    rdto.setResponse(msg.getResponse());
                    rdto.setCreatedAt(msg.getCreatedAt());
                    return rdto;
                }).collect(Collectors.toList())
        );
        return dto;
    }


}

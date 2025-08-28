package com.CasePilot.CasePilot.chat;

import com.CasePilot.CasePilot.chat.chatHistory.dto.ChatHistory;
import com.CasePilot.CasePilot.chat.chatHistory.dto.ChatHistoryResponseDto;
import com.CasePilot.CasePilot.chat.dto.ChatRequestDto;
import com.CasePilot.CasePilot.chat.dto.ChatResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {
    private final ChatRepository chatRepository;
    private final WebClient webClient = WebClient.builder().baseUrl("http://localhost:11434").build();


    @Override
    public ChatResponseDto generateSolution(ChatRequestDto chatRequestDto) {
        ChatResponseDto response = webClient.post()
                .uri("/api/generate")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(Map.of(
                        "model", chatRequestDto.getModel(),
                        "prompt", chatRequestDto.getPrompt(),
                        "stream", false
                ))
                .retrieve()
                .bodyToMono(ChatResponseDto.class)
                .block();

        // generate short title
        String prompt = chatRequestDto.getPrompt();
        String title = prompt.length() > 30 ? prompt.substring(0, 30) + "..." : prompt;

        LocalDateTime now = LocalDateTime.now();

        ChatEntity conversation = ChatEntity.builder()
                .prompt(prompt)
                .response(response.getResponse())
                .model(chatRequestDto.getModel())
                .title(title)
                .createdAt(now)
                .build();

        ChatEntity savedConversation = chatRepository.save(conversation).block();

        ChatResponseDto chatResponseDto = new ChatResponseDto();
        chatResponseDto.setId(savedConversation.getId());
        chatResponseDto.setResponse(savedConversation.getResponse());
        chatResponseDto.setModel(savedConversation.getModel());
        chatResponseDto.setCreatedAt(savedConversation.getCreatedAt());
        return chatResponseDto;
    }


  /*  private void saveHistory(ChatRequestDto chatRequestDto){
        ChatHistory chatHistory = new ChatHistory();
        chatHistory
        return chatRepository.save(chatRequestDto);
    }*/


    @Override
    public List<ChatHistoryResponseDto> getChatHistory() {
        return chatRepository.findAll()
                .map(chat -> {
                    ChatHistoryResponseDto dto = new ChatHistoryResponseDto();
                    dto.setChatId(chat.getId());
                    dto.setTitle(chat.getTitle());
                    dto.setCreatedAt(chat.getCreatedAt());
                    return dto;
                })
                .collectList()
                .block();
    }


    @Override
    public List<ChatResponseDto> loadChatById(String chatId) {
        return chatRepository.findById(chatId)   // returns Mono<ChatEntity>
                .map(chat -> {
                    ChatResponseDto dto = new ChatResponseDto();
                    dto.setId(chat.getId());
                    dto.setPrompt(chat.getPrompt());
                    dto.setResponse(chat.getResponse());
                    dto.setModel(chat.getModel());
                    dto.setCreatedAt(chat.getCreatedAt());
                    return List.of(dto); // wrap single chat into List
                })
                .defaultIfEmpty(List.of()) // empty if not found
                .block();
    }







}

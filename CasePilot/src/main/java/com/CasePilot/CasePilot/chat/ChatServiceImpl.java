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
    public ChatResponseDto generateSolution (ChatRequestDto chatRequestDto) {
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
        ChatEntity conversation = ChatEntity.builder()
                .prompt(chatRequestDto.getPrompt())
                .response(response.getResponse())
                .model(chatRequestDto.getModel())
                .createdAt(LocalDateTime.now())
                .build();

        ChatEntity savedConversation = chatRepository.save(conversation).block();

        ChatResponseDto chatResponseDto = new ChatResponseDto();
        chatResponseDto.setResponse(savedConversation.getResponse());
        chatResponseDto.setId(savedConversation.getId());
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
    public  List<ChatHistoryResponseDto> getChatHistory(){
        return null;
    }




}

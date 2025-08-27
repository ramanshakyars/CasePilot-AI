package com.CasePilot.CasePilot.chat;

import com.CasePilot.CasePilot.chat.chatHistory.dto.ChatHistoryResponseDto;
import com.CasePilot.CasePilot.chat.dto.ChatRequestDto;
import com.CasePilot.CasePilot.chat.dto.ChatResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatController {
    private final ChatService chatService;

    @PostMapping("generate")
    public ResponseEntity<ChatResponseDto> generateSolution(@RequestBody ChatRequestDto chatRequestDto){
        return ResponseEntity.ok(chatService.generateSolution(chatRequestDto));
    }

    @GetMapping("/history")
    public ResponseEntity<List<ChatHistoryResponseDto>> getChatHistory() {
        List<ChatHistoryResponseDto> history = chatService.getChatHistory();
        return ResponseEntity.ok(history);
    }

}

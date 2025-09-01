package com.CasePilot.CasePilot.chat;

import com.CasePilot.CasePilot.chat.chatHistory.dto.ChatHistoryResponseDto;
import com.CasePilot.CasePilot.chat.dto.ChatRequestDto;
import com.CasePilot.CasePilot.chat.dto.ChatResponseDto;
import com.CasePilot.CasePilot.chat.dto.ConversationResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatController {
    private final ChatService chatService;


    @PostMapping("message")
    public ResponseEntity<ConversationResponseDto> newOrContinueChat(@RequestBody ChatRequestDto chatRequestDto){
        return ResponseEntity.ok(chatService.createOrContinueChat(chatRequestDto));
    }


    @GetMapping("history")
    public ResponseEntity<List<ChatHistoryResponseDto>> getChatHistory() {
        return ResponseEntity.ok(chatService.getChatHistory());
    }


    @GetMapping("/{chatId}")
    public ResponseEntity<ConversationResponseDto> loadConversationById(@PathVariable String chatId) {
        return ResponseEntity.ok(chatService.loadChatById(chatId));
    }

    @PutMapping("/rename/{chatId}")
    public ResponseEntity<Void> renameChat(@PathVariable String chatId, @RequestParam String title) {
        chatService.renameChat(chatId, title);
        return ResponseEntity.ok().build();
    }


    @DeleteMapping("/{chatId}")
    public ResponseEntity<Void> deleteChat(@PathVariable String chatId) {
        chatService.deleteChat(chatId);
        return ResponseEntity.ok().build();
    }


}

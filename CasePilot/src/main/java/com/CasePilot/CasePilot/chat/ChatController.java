package com.CasePilot.CasePilot.chat;

import com.CasePilot.CasePilot.chat.dto.ChatRequestDto;
import com.CasePilot.CasePilot.chat.dto.ChatResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping
@RestController
@RequiredArgsConstructor
public class ChatController {

    @PostMapping("")
    public ResponseEntity<ChatResponseDto> generateSolution(@RequestBody ChatRequestDto chatRequestDto){
        return null;
    }

    @GetMapping("")
    public ResponseEntity<ChatResponseDto>GetChatHistory(){
        return null;
    }
}

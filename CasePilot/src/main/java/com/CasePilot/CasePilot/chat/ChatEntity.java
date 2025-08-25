package com.CasePilot.CasePilot.chat;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("chat")
public class ChatEntity {
    @Id
    private String Id;
    private String query;
}

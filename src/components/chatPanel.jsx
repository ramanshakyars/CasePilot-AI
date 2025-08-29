import React, { useState, useEffect, useRef } from "react";
import { Box, Paper, TextField, IconButton, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import httpService from '../services/httpService';
import pathConfig from "../common/constant/pathConfig";

function ChatPanel() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // {id, text, sender}
  const [chatLoading, setChatLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), text: message, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setMessage("");
    setChatLoading(true);

    const body = {
      "chatId": messages[messages.length - 1]?.chatId,
      "model": "codellama:7b",
      "prompt": message,
      "stream": false
    };

    try {
      const response = await httpService.post(pathConfig.SEND_MESSAGE, body);      
      const respMsg = response?.data?.messages?.[0]?.response;
      const chatId = response?.data?.chatId
      if (respMsg) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, text: respMsg.trim(), sender: "assistant" }
        ]);
      }
    } catch (err) {
      
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 2, text: "Error fetching response.", sender: "assistant" }
      ]);
      console.error(err);
    } finally {
      setChatLoading(false);
    }
  };

  // scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatLoading]);

  // Loader bubble for chat
  const LoaderBubble = () => (
    <Box sx={{
      display: "flex",
      mb: 1,
      justifyContent: "flex-start"
    }}>
      <Box
        sx={{
          display: "inline-block",
          px: 2,
          py: 1,
          borderRadius: 2,
          bgcolor: "grey.200",
          color: "text.secondary",
          fontStyle: "italic",
          maxWidth: "60%",
        }}
      >
        <Typography variant="body2">
          <span className="animate-pulse">Assistant is typing…</span>
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        borderRadius: 2,
        bgcolor: "background.paper",
        position: "relative"
      }}
    >
      {/* Messages area */}
      <Box sx={{ flex: 1, p: 2, overflowY: "auto" }}>
        {messages.length > 0 ? (
          <>
            {messages.map((m) => (
              <Box key={m.id} sx={{ mb: 1, display: "flex", justifyContent: m.sender === "user" ? "flex-end" : "flex-start" }}>
                <Box
                  sx={{
                    display: "inline-block",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    bgcolor: m.sender === "user" ? "primary.main" : "grey.100",
                    color: m.sender === "user" ? "primary.contrastText" : "text.primary",
                    maxWidth: "70%",
                    wordBreak: "break-word",
                  }}
                >
                  <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>{m.text}</Typography>
                </Box>
              </Box>
            ))}
            {/* Typing loader for assistant */}
            {chatLoading && <LoaderBubble />}
          </>
        ) : (
          <Typography variant="body2" color="text.secondary" fontStyle="italic">
            No messages yet
          </Typography>
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Chat input area */}
      <Box
        component="form"
        onSubmit={handleSend}
        sx={{ display: "flex", p: 1, borderTop: 1, borderColor: "divider" }}
      >
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={chatLoading}
        />
        <IconButton type="submit" color="primary" sx={{ ml: 1 }} disabled={chatLoading}>
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default ChatPanel;
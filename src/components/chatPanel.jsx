import React, { useState, useEffect, useRef } from "react";
import { Box, Paper, TextField, IconButton, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import httpService from '../services/httpService';
import pathConfig from "../common/constant/pathConfig";

function ChatPanel({ chatId }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Fetch chat history when chatId changes
  useEffect(() => {
    if (!chatId) {
      setMessages([]);
      return;
    }
    setChatLoading(true);
    httpService.get(`${pathConfig.GET_CHAT_BY_ID}/${chatId}`)
      .then(res => {
        const chatMessages = res?.data?.messages || [];
        // Map API format to local format for rendering: show prompt as user, response as assistant
        setMessages(chatMessages.flatMap(m => {
          const arr = [];
          if (m.prompt) {
            arr.push({
              id: Math.random(),
              text: m.prompt,
              sender: "user"
            });
          }
          if (m.response) {
            arr.push({
              id: Math.random(),
              text: m.response,
              sender: "assistant"
            });
          }
          return arr;
        }));
      })
      .catch(err => {
        setMessages([
          { id: -1, text: "Failed to load chat history.", sender: "assistant" }
        ]);
        console.error('Failed to load history:', err);
      })
      .finally(() => setChatLoading(false));
  }, [chatId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMsg = { id: Date.now(), text: message, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setMessage("");
    setChatLoading(true);

    const body = {
      chatId: chatId,
      model: "codellama:7b",
      prompt: message,
      stream: false,
    };

    try {
      const response = await httpService.post(pathConfig.SEND_MESSAGE, body);
      const respMsg = response?.data?.messages?.[0]?.response;
      if (respMsg) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: respMsg.trim(),
            sender: "assistant",
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          text: "Error fetching response.",
          sender: "assistant",
        },
      ]);
      console.error(err);
    } finally {
      setChatLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatLoading]);

  const LoaderBubble = () => (
    <Box sx={{ display: "flex", mb: 1, justifyContent: "flex-start" }}>
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
        position: "relative",
      }}
    >
      {/* Messages area */}
      <Box sx={{ flex: 1, p: 2, overflowY: "auto" }}>
        {messages.length > 0 ? (
          <>
            {messages.map((m, i) => (
              <Box
                key={m.id || i}
                sx={{
                  mb: 1,
                  display: "flex",
                  justifyContent:
                    m.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                <Box
                  sx={{
                    display: "inline-block",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    bgcolor:
                      m.sender === "user" ? "primary.main" : "grey.100",
                    color:
                      m.sender === "user"
                        ? "primary.contrastText"
                        : "text.primary",
                    maxWidth: "70%",
                    wordBreak: "break-word",
                  }}
                >
                  <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                    {m.text}
                  </Typography>
                </Box>
              </Box>
            ))}
            {chatLoading && <LoaderBubble />}
          </>
        ) : chatLoading ? (
          <LoaderBubble />
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            fontStyle="italic"
          >
            No messages yet
          </Typography>
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input area */}
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
        <IconButton
          type="submit"
          color="primary"
          sx={{ ml: 1 }}
          disabled={chatLoading}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default ChatPanel;
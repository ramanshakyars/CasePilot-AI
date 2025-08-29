import React, { useState, useEffect, useRef } from "react";

function ChatPanel() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    const handleSend = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        setMessages((prev) => [...prev, { id: Date.now(), text: message }]);
        setMessage(""); // clear input after send
    };

    // scroll to bottom whenever messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-col h-full w-full  rounded-lg">
            {/* Messages area */}
            <div className="flex-1 p-4 overflow-y-auto">
                {messages.length > 0 ? (
                    messages.map((m) => (
                        <div key={m.id} className="mb-2">
                            <span className="px-3 py-2 bg-blue-100 rounded-lg block w-fit">
                                {m.text}
                            </span>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 italic">No messages yet</p>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Chat input area */}
            <form onSubmit={handleSend} className="flex p-2 ">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Send
                </button>
            </form>
        </div>
    );
}

export default ChatPanel;

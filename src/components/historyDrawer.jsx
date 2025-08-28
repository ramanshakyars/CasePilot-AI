// src/components/HistoryDrawer.jsx
import React, { useEffect, useState } from 'react';
import httpService from '../services/httpService';
import { ListGroup } from 'react-bootstrap';
import pathConfig from '../common/constant/pathConfig';

export default function HistoryDrawer({ open }) {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (open) {
            httpService.get(pathConfig.CHAT_HISTORY)
                .then(res => setHistory(res.data))
                .catch(err => console.error('Failed to load history:', err));
        }
    }, [open]);

    return (
        <div
            className={`transition-all duration-300 ease-in-out ${open ? 'block' : 'hidden'
                } px-2`}
        >
            <h2 className="text-white text-lg mb-2">History</h2>
            <ListGroup variant="flush">
                {history.map(chat => (
                    <ListGroup.Item
                        key={chat.id}
                        className="bg-black text-white border-gray-700 mb-1 rounded"
                    >
                        {chat.title || chat.id}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}

import React, { useEffect, useState } from 'react';
import httpService from '../services/httpService';
import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListItemSecondaryAction,
    IconButton,
    Menu,
    MenuItem,
    Skeleton,
    Avatar,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from '@mui/material';
import {
    History as HistoryIcon,
    MoreVert as MoreIcon,
    Delete as DeleteIcon,
    Edit as RenameIcon
} from '@mui/icons-material';
import pathConfig from '../common/constant/pathConfig';

export default function HistoryDrawer({ open, setSelectedChatId }) {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedChatId, setMenuSelectedChatId] = useState(null);

    // For rename dialog
    const [renameDialogOpen, setRenameDialogOpen] = useState(false);
    const [renameTitle, setRenameTitle] = useState("");

    useEffect(() => {
        if (open) {
            setLoading(true);
            httpService.get(pathConfig.CHAT_HISTORY)
                .then(res => {
                    setHistory(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Failed to load history:', err);
                    setLoading(false);
                });
        }
    }, [open]);

    const handleMenuOpen = (event, chatId) => {
        setMenuSelectedChatId(chatId);
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = (chatId) => {
        setLoading(true);
        const url = `${pathConfig.CHAT_HISTORY_DELETE}/${chatId}`;
        httpService.delete(url)
            .then(res => {
                setHistory(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to delete chat:', err);
                setLoading(false);
            });
        handleMenuClose();
    };

    // Open rename dialog with pre-filled title
    const handleRename = (chatId) => {
        const chat = history.find(c => c.chatId === chatId);
        if (!chat) return;

        setRenameTitle(chat.title || "");
        setRenameDialogOpen(true);
        handleMenuClose();
    };

    // Call API to rename chat
    const handleRenameSubmit = () => {
        if (!renameTitle.trim()) {
            setRenameDialogOpen(false);
            return;
        }

        setLoading(true);
        const url = `${pathConfig.CHAT_HISTORY_RENAME}/${selectedChatId}?title=${encodeURIComponent(renameTitle)}`;
        httpService.put(url)
            .then(() => {
                // Update frontend list
                setHistory(prevHistory =>
                    prevHistory.map(chat =>
                        chat.chatId === selectedChatId ? { ...chat, title: renameTitle } : chat
                    )
                );
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to rename chat:", err);
                setLoading(false);
            });

        setRenameDialogOpen(false);
    };

    return (
        <div className={`px-2 py-4 ${open ? 'block' : 'hidden'}`}>
            <Typography variant="h6" className="px-2 mb-4">
                Chat History
            </Typography>

            {loading ? (
                Array.from(new Array(5)).map((_, index) => (
                    <ListItem key={index} className="px-2 py-3">
                        <Skeleton variant="circular" width={40} height={40} />
                        <ListItemText
                            primary={<Skeleton variant="text" width="80%" />}
                            secondary={<Skeleton variant="text" width="60%" />}
                            className="ml-2"
                        />
                    </ListItem>
                ))
            ) : history.length > 0 ? (
                <>
                    <List>
                        {history.map(chat => (
                            <ListItem
                                key={chat.id}
                                button
                                className="rounded-lg mb-2 transition-colors duration-200 group"
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'action.hover',
                                    }
                                }}
                                onClick={() => setSelectedChatId(chat.chatId)}
                            >
                                <ListItemIcon>
                                    <Avatar sx={{ width: 30, height: 30, bgcolor: 'primary.main' }}>
                                        <HistoryIcon fontSize="small" />
                                    </Avatar>
                                </ListItemIcon>

                                <ListItemText
                                    primary={chat.title || `Chat ${chat.id}`}
                                    secondary={new Date(chat.timestamp || Date.now()).toLocaleDateString()}
                                    primaryTypographyProps={{ noWrap: true, fontSize: '0.9rem' }}
                                    secondaryTypographyProps={{ noWrap: true, variant: 'caption' }}
                                />

                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        aria-label="more options"
                                        onClick={(e) => handleMenuOpen(e, chat.chatId)}
                                        size="small"
                                    >
                                        <MoreIcon fontSize="small" />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>

                    {/* Options Menu */}
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        PaperProps={{
                            sx: {
                                width: 150,
                                maxWidth: '100%',
                            },
                        }}
                    >
                        <MenuItem onClick={() => handleRename(selectedChatId)} dense>
                            <ListItemIcon>
                                <RenameIcon fontSize="small" />
                            </ListItemIcon>
                            Rename
                        </MenuItem>
                        <MenuItem onClick={() => handleDelete(selectedChatId)} dense sx={{ color: 'error.main' }}>
                            <ListItemIcon>
                                <DeleteIcon fontSize="small" color="error" />
                            </ListItemIcon>
                            Delete
                        </MenuItem>
                    </Menu>

                    {/* Rename Dialog */}
                    <Dialog open={renameDialogOpen} onClose={() => setRenameDialogOpen(false)}>
                        <DialogTitle>Rename Chat</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Chat Title"
                                fullWidth
                                variant="outlined"
                                value={renameTitle}
                                onChange={(e) => setRenameTitle(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setRenameDialogOpen(false)}>Cancel</Button>
                            <Button onClick={handleRenameSubmit} variant="contained" color="primary">Save</Button>
                        </DialogActions>
                    </Dialog>
                </>
            ) : (
                <div className="text-center py-8 text-gray-500">
                    <HistoryIcon fontSize="large" className="opacity-40 mb-2" />
                    <Typography variant="body2">No chat history yet</Typography>
                </div>
            )}
        </div>
    );
}

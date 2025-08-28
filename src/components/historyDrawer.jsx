import React, { useEffect, useState } from 'react';
import httpService from '../services/httpService';
import { 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Skeleton,
  Avatar 
} from '@mui/material';
import { History as HistoryIcon } from '@mui/icons-material';
import pathConfig from '../common/constant/pathConfig';

export default function HistoryDrawer({ open }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className={`px-2 py-4 ${open ? 'block' : 'hidden'}`}>
      <div variant="h6" className="px-2 mb-4">
        Chat History
      </div>
      
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
        <List>
          {history.map(chat => (
            <ListItem 
              key={chat.id} 
              button
              className="rounded-lg mb-2 hover:bg-grey-100"
            >
              <ListItemIcon>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                  <HistoryIcon fontSize="small" />
                </Avatar>
              </ListItemIcon>
              <ListItemText 
                primary={chat.title || `Chat ${chat.id}`}
                secondary={new Date(chat.timestamp || Date.now()).toLocaleDateString()}
                primaryTypographyProps={{ noWrap: true }}
                secondaryTypographyProps={{ noWrap: true, variant: 'caption' }}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <HistoryIcon fontSize="large" className="opacity-40 mb-2" />
          <div variant="body2">No chat history yet</div>
        </div>
      )}
    </div>
  );
}
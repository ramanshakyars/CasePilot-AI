const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const pathConfig = {  
    
    SEND_MESSAGE: `${BASE_URL}/chat/message`,
    CHAT_HISTORY: `${BASE_URL}/chat/history`,
    CHAT_HISTORY_DELETE: `${BASE_URL}/chat`,
    CHAT_HISTORY_RENAME: `${BASE_URL}/chat/rename`,
    GET_CHAT_BY_ID: `${BASE_URL}/chat`,

   
};

export default pathConfig;

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const pathConfig = {  


    CHAT_HISTORY: `${BASE_URL}/chat/history`,
    CHAT_HISTORY_DELETE: `${BASE_URL}/chat`,

   
};

export default pathConfig;

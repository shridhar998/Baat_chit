import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// The purpose of creating this chat provider using context api 
// is to reduce the again and again passing of all the props in different files
// or levels, and instead fetching them using contetx api hook (useContext)
// We will wrap the whole app in index.js inside a ChatProvider component exported from this file

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) history.push("/");
  }, [history]); // Whenever the history changes the useEffect hook will run again and re-render

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
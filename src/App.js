import React, { useState, useEffect } from 'react';
import './App.css';
import Api, { auth } from './Api';

import ChatlistFunc from './components/ChatListItem';
import ChatIntro from './components/ChatIntro';
import ChatWindow from './components/ChatWindow';
import NewChat from './components/NewChat';
import Login from './components/Login'

import ChatIcon from '@material-ui/icons/Chat';

function App() {

  const [chatlist, setChatlist] = useState([]);
  const [activeChat, setActiveChat] = useState({});
  const [user, setUser] = useState(null)
  const [ShowNewChatList, setShowNewChatList] = useState(false);

  useEffect(() => {
    if (user !== null) {
      let unsub = Api.onChatList(user.id, setChatlist)
      return unsub
    }
  }, [user])

  function handleOpenChat() {
    setShowNewChatList(true);
  }

  async function handleLoginData(u) {
    let newUser = {
      id: u.uid,
      name: u.displayName,
      avatar: u.photoURL
    }
    await Api.addUser(newUser)
    setUser(newUser)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])

  if (user === null) {
    return (<Login onReceive={handleLoginData} />)
  }

  return (
    <div className="App-WebChat">

      <div className="App-Sidebar">
        <NewChat
          chatlist={chatlist}
          user={user}
          show={ShowNewChatList}
          setShow={setShowNewChatList}
        />
        <header>
          <img className="Header--img" src={user.avatar} alt="" />
          <div className="Header--Btns">
            <div onClick={handleOpenChat} className="Btns">
              <ChatIcon style={{ color: '#919191' }} />
            </div>
          </div>
        </header>

        <div className="App-ChatList">
          {chatlist.map((item, key) => (
            <ChatlistFunc
              key={key}
              data={item}
              active={activeChat.chatId === chatlist[key].chatId}
              onClick={() => setActiveChat(chatlist[key])} />
          ))}
        </div>
      </div>

      <div className="App-Chat">
        {activeChat.chatId !== undefined &&
          <ChatWindow
            user={user}
            data={activeChat}
          />
        }
        {activeChat.chatId === undefined &&
          <ChatIntro />
        }
      </div>
    </div>
  );
}

export default App;

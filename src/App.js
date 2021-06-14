import React, { useState } from 'react';
import './App.css';

import ChatlistFunc from './components/ChatListItem';
import ChatIntro from './components/ChatIntro';
import ChatWindow from './components/ChatWindow';
import NewChat from './components/NewChat';

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

function App() {

  const [chatlist, setChatlist] = useState
    ([
      { chatId: 1, tittle: 'Gustavo', image: 'https://www.w3schools.com/howto/img_avatar2.png' },
      { chatId: 2, tittle: 'Nata', image: 'https://www.w3schools.com/howto/img_avatar2.png' },
      { chatId: 3, tittle: 'Gremio', image: 'https://www.w3schools.com/howto/img_avatar2.png' },
      { chatId: 4, tittle: 'Giovanni', image: 'https://www.w3schools.com/howto/img_avatar2.png' }
    ]);

  const [activeChat, setActiveChat] = useState({});

  const [user, setUser] = useState({
    id: 1234,
    image: 'https://www.w3schools.com/howto/img_avatar2.png',
    name: 'Gustavo Ré'
  })

  const [ShowNewChatList, setShowNewChatList] = useState(false);

  function handleOpenChat(){
    setShowNewChatList(true);
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
          <img className="Header--img" src={user.image} alt="" />
          <div className="Header--Btns">
            <div className="Btns">
              <DonutLargeIcon style={{ color: '#919191' }} />
            </div>
            <div onClick={handleOpenChat} className="Btns">
              <ChatIcon style={{ color: '#919191' }} />
            </div>
            <div className="Btns">
              <MoreVertIcon style={{ color: '#919191' }} />
            </div>
          </div>
        </header>

        <div className="App-Search">
          <div className="Search--Area">
            <SearchIcon fontSize="small" style={{ color: '#919191' }} />
            <input type="search" placeholder="Iniciar uma nova conversa" />
          </div>
        </div>

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

import './App.css';

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

function App() {
  return (
    <div className="App-WebChat">

      <div className="App-Sidebar">

        <header>
           <img className="Header--img" src="https://www.w3schools.com/howto/img_avatar2.png" alt="" />
           <div className="Header--Btns">
             <div className="Btns">
                <DonutLargeIcon style={{color : '#919191'}} />
             </div>
             <div className="Btns">
                <ChatIcon style={{color : '#919191'}} />
             </div>
             <div className="Btns">
                <MoreVertIcon style={{color : '#919191'}} />
             </div>
           </div>
        </header>

        <div className="App-Search">
           <div className="Search--Area">
              <SearchIcon fontSize="small" style={{color : '#919191'}} />
              <input type="search" placeholder="iniciar uma nova conversa" />
           </div>
        </div>

        <div className="App-ChatList">

        </div>

      </div>

      <div className="App-Chat">

      </div>

    </div>
  );
}

export default App;

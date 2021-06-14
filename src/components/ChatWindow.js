import React, { useEffect, useRef, useState } from 'react';
import EmojiPicker from 'emoji-picker-react'
import './ChatWindow.css'

import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';

import MessageItem from './MessageItem';

export default function ChatWindow({user}) {

    const body = useRef();

    let recognition = null;
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition !== undefined) {
        recognition = new SpeechRecognition();
    }

    const [emojiOpen, setEmojiOpen] = useState(false);

    const [text, setText] = useState();

    const [listenig, setListening] = useState(false);

    const [list, setList] = useState([
        {author: 1234, body: 'Bla bla bla' },
        {author: 1245, body: 'Bla bla bla' },
        {author: 1245, body: 'Bla bla bla' },
        {author: 1234, body: 'Bla bla bla' },
        {author: 1245, body: 'Bla bla bla' },
        {author: 1245, body: 'Bla bla bla' },
        {author: 1234, body: 'Bla bla bla' },
        {author: 1245, body: 'Bla bla bla' },
        {author: 1245, body: 'Bla bla bla' },
        {author: 1234, body: 'Bla bla bla' },
        {author: 1245, body: 'Bla bla bla' },
        {author: 1245, body: 'Bla bla bla' },
        {author: 1234, body: 'Bla bla bla' },
        {author: 1245, body: 'Bla bla bla' },
        {author: 1245, body: 'Bla bla bla' },
        {author: 1234, body: 'Bla bla bla' },
        {author: 1245, body: 'Bla bla bla' },
        {author: 1245, body: 'Bla bla bla' },
    ]);

    useEffect(() => {
       if(body.current.scrollHeight > body.current.offsetHeight){
           body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight
       }
    }, [list]);

    function handleEmojiClick(e, emojiObject) {
        setText(text + emojiObject.emoji)
    }

    function handleEmojiOpen() {
        setEmojiOpen(true)
    }

    function handleEmojiClose() {
        setEmojiOpen(false)
    }

    function handleSendClick() {

    }

    function handleMicClick() {
        if (recognition !== null) {
            recognition.onStart = () => {
                setListening(true);
            }

            recognition.onEnd = () => {
                setListening(false);
            }

            recognition.onResult = (e) => {
                setText(e.results[0][0].transcript);
            }

            recognition.start();

        }
    }

    return (
        <div className="ChatWindow">

            <div className="ChatWindow-Header">

                <div className="ChatWindow-Header--Info">

                    <img className="ChatWindow-Header--Info-Img"
                        src="https://www.w3schools.com/howto/img_avatar2.png"
                        alt="" />
                    <div className="ChatWindow-Header--Info-Nome">
                        Gustavo
                    </div>

                </div>

                <div className="ChatWindow-Header--Btns">
                    <div className="ChatWindow-Header--Btns-Btn">
                        <SearchIcon style={{ color: '#919191' }} />
                    </div>
                    <div className="ChatWindow-Header--Btns-Btn">
                        <AttachFileIcon style={{ color: '#919191' }} />
                    </div>
                    <div className="ChatWindow-Header--Btns-Btn">
                        <MoreVertIcon style={{ color: '#919191' }} />
                    </div>
                </div>

            </div>

            <div ref={body} className="ChatWindow-Body">
                {list.map((item, key) => (
                    <MessageItem
                        key={key}
                        data={item}
                        user={user}
                    />
                ))}
            </div>

            <div className="ChatWindow-EmojiArea" style={{ height: emojiOpen ? '250px' : '0px' }} >
                <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    disableSearchBar
                    disableSkinTonePicker
                />
            </div>

            <div className="ChatWindow-Footer">
                <div className="ChatWindow-Footer--Pre">

                    <div className="ChatWindow-Footer--Btns-Btn"
                        onClick={handleEmojiClose} style={{ width: emojiOpen ? 40 : 0 }}
                    >
                        <CloseIcon style={{ color: '#919191' }} />
                    </div>

                    <div className="ChatWindow-Footer--Btns-Btn" onClick={handleEmojiOpen}>
                        <InsertEmoticonIcon style={{ color: emojiOpen ? '#009688' : '#919191' }} />
                    </div>

                </div>

                <div className="ChatWindow-Footer--InputArea">
                    <input className="ChatWindow-Footer--Input"
                        type="text"
                        placeholder="Digite uma mensagem"
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                </div>

                <div className="ChatWindow-Footer--Pos">

                    {text === '' &&
                        <div className="ChatWindow-Footer--Btns-Btn" onClick={handleMicClick}>
                            <MicIcon style={{ color: listenig ? '#126ECE' : '#919191' }} />
                        </div>
                    }
                    {text !== '' &&
                        <div className="ChatWindow-Footer--Btns-Btn" onClick={handleSendClick}>
                            <SendIcon style={{ color: '#919191' }} />
                        </div>
                    }
                </div>

            </div>

        </div >
    )
}
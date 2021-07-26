import React, { useEffect, useRef, useState } from 'react';
import EmojiPicker from 'emoji-picker-react'
import './ChatWindow.css'

import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';

import MessageItem from './MessageItem';
import Api from '../Api';

export default function ChatWindow({ user, data }) {

    const body = useRef();

    let recognition = null;
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition !== undefined) {
        recognition = new SpeechRecognition();
    }

    const [emojiOpen, setEmojiOpen] = useState(false);
    const [text, setText] = useState();
    const [listenig, setListening] = useState(false);
    const [list, setList] = useState([]);
    const [users, setUsers] = useState([])

    useEffect(() => {
        setList([])
        let unsub = Api.onChatContent(data.chatId, setList, setUsers)

        return unsub
    }, [data.chatId])

    useEffect(() => {
        if (body.current.scrollHeight > body.current.offsetHeight) {
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

    function handleSendClick() {
        if (text !== '') {
            Api.sendMessage(data, user.id, 'text', text, users)
            setText('')
            setEmojiOpen(false)
        }
    }

    function handleInputKeyUp(e) {
        if (e.keyCode === 13) {
            handleSendClick()
        }
    }

    return (
        <div className="ChatWindow">

            <div className="ChatWindow-Header">

                <div className="ChatWindow-Header--Info">

                    <img className="ChatWindow-Header--Info-Img"
                        src={data.avatar}
                        alt="" />
                    <div className="ChatWindow-Header--Info-Nome">
                        {data.tittle}
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
                        onKeyUp={handleInputKeyUp}
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
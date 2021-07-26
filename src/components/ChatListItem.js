import React, { useState, useEffect } from 'react';
import './ChatListItem.css'

export default function ChatListFunc({ onClick, active, data }) {

    const [time, setTime] = useState('')

    useEffect(() => {
        if (data.lastMessageDate > 0) {
            let d = new Date(data.lastMessageDate.seconds * 1000)
            let hours = d.getHours()
            let minutes = d.getMinutes()
            hours = hours < 10 ? '0' + hours : hours
            minutes = minutes < 10 ? '0' + minutes : minutes

            setTime(`${hours}:${minutes}`)
        }
    }, [data])

    return (
        <div className={`ChatList ${active ? 'active' : ''}`}
            onClick={onClick}>
            <img className="ChatList-img" src={data.avatar} alt="" />
            <div className="ChatList-Lines">
                <div className="ChatList--Line">
                    <div className="ChatList--Line-Name">{data.tittle}</div>
                    <div className="ChatList--Line-Hora">{time}</div>
                </div>
                <div className="ChatList--Line">
                    <div className="ChatList--Line-LastMsg">
                        <p>{data.lastMessage}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
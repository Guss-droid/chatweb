import React from 'react';
import './MessageItem.css';

export default function MessageItem({ data, user }) {
    return (
        <div className="MessageLine"
            style={{ justifyContent: user.id === data.author ? 'flex-end' : 'flex-start' }}
        >
            <div className="MessageLine-Item"
                style={{backgroundColor: user.id === data.author ? '#DCF8C6' : '#FFF'}}
            >
                <div className="MessageLine-Item-Text">{data.body}</div>
                <div className="MessageLine-Item-Date">19:00</div>
            </div>
        </div>
    )
}
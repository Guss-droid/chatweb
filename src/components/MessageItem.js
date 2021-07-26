import React, { useState, useEffect } from 'react';
import './MessageItem.css';

export default function MessageItem({ data, user }) {

    const [time, setTime] = useState('')

    useEffect(() => {
        if (data.date > 0) {
            let d = new Date(data.date.seconds * 1000)
            let hours = d.getHours()
            let minutes = d.getMinutes()
            hours = hours < 10 ? '0' + hours : hours
            minutes = minutes < 10 ? '0' + minutes : minutes

            setTime(`${hours}:${minutes}`)
        }
    }, [data])

    return (
        <div className="MessageLine"
            style={{ justifyContent: user.id === data.author ? 'flex-end' : 'flex-start' }}
        >
            <div className="MessageLine-Item"
                style={{ backgroundColor: user.id === data.author ? '#f7ede2' : '#FFF0F5' }}
            >
                <div className="MessageLine-Item-Text">{data.body}</div>
                <div className="MessageLine-Item-Date">{time}</div>
            </div>
        </div>
    )
}
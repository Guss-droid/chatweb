import React from 'react';
import './ChatListItem.css'

export default function ChatListFunc({ onClick, active, data }) {
    return (
        <div className={`ChatList ${active?'active':''}`}
            onClick={onClick}>
            <img className="ChatList-img" src={data.image} alt="" />
            <div className="ChatList-Lines">
                <div className="ChatList--Line">
                    <div className="ChatList--Line-Name">{data.tittle}</div>
                    <div className="ChatList--Line-Hora">15:00</div>
                </div>
                <div className="ChatList--Line">
                    <div className="ChatList--Line-LastMsg">
                        <p>Ola</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
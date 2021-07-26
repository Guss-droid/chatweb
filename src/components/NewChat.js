import React, { useState, useEffect } from 'react';
import Api from '../Api';

import './NewChat.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function NewChat({ user, chatlist, show, setShow }) {

    const [list, setList] = useState([])

    useEffect(() => {
        const getList = async () => {
            if (user !== null) {
                let results = await Api.getContactList(user.id)
                setList(results)
            }
        }
        return getList()
    }, [user])

    function handleClose() {
        setShow(false);
    }

    async function addNewChat(user2) {
        await Api.addNewChat(user, user2)

        handleClose()
    }

    return (
        <div className="NewChat" style={{ left: show ? 0 : -415 }}>
            <div className="NewChat-Header">
                <div onClick={handleClose} className="NewChat-Header--Btn">
                    <ArrowBackIcon style={{ color: '#FFF' }} />
                </div>
                <div className="NewChat-Header--Tittle">
                    Nova conversa
                </div>
            </div>

            <div className="NewChat-List">
                {list.map((item, key) => (
                    <div onClick={() => addNewChat(item)} className="NewChat-List--Item" key={key}>
                        <img className="NewChat-List--Item-Img" src={item.avatar} alt="" />
                        <div className="NewChat-List--Item-Nome">
                            {item.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
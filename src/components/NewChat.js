import React, { useState } from 'react';
import './NewChat.css';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function NewChat({ user, chatlist, show, setShow }) {

    const [list, setList] = useState([
        { chatId: 1, tittle: 'Gustavo', image: 'https://www.w3schools.com/howto/img_avatar2.png' },
        { chatId: 2, tittle: 'Nata', image: 'https://www.w3schools.com/howto/img_avatar2.png' },
        { chatId: 3, tittle: 'Gremio', image: 'https://www.w3schools.com/howto/img_avatar2.png' },
        { chatId: 4, tittle: 'Giovanni', image: 'https://www.w3schools.com/howto/img_avatar2.png' }
    ])

    function handleClose(){
        setShow(false);
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
                    <div className="NewChat-List--Item" key={key}>
                        <img className="NewChat-List--Item-Img" src={item.image} alt="" />
                        <div className="NewChat-List--Item-Nome">
                            {item.tittle}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
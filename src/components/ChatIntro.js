import React from 'react';
import './ChatIntro.css'

export default function ChatIntro(){
    return(
        <div className="App-ChatIntro">
            <img className="App-ChatIntro-img"
             src="https://web.whatsapp.com/img/intro-connection-light_c98cc75f2aa905314d74375a975d2cf2.jpg" alt="" 
             />
            <h1>Mantenha seu celular conectado</h1>
            <h2>O WhatsApp conecta ao seu celular para sincronizar suas mensagens. <br/> Para reduzir o uso de dados, conecte seu celular a uma rede Wi-Fi.</h2>
        </div>
    )
}
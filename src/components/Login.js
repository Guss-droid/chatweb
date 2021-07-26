import React from 'react';
import './Login.css'

import GoogleIconImg from '../assets/google-icon.svg';
import Api from '../Api'

export default function Login({ onReceive }) {

  async function handleGoogleLogin() {
    let result = await Api.googlePopUp();
    if (result) {
      onReceive(result.user)
    } else {
      alert("Erro")
    }
  }

  return (
    <div className="login">
      <button onClick={handleGoogleLogin} className="create-google">
            <img src={GoogleIconImg} alt="Logo do google" />
            Crie sua sala com o google
          </button>
    </div>
  )
}
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PasswordInput } from '../components/PasswordInput'
import { useAuth } from '../contexts/AuthContext'

export function SignUp() {
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [isPrivate, setIsPrivate] = useState(false)

  const { signup } = useAuth()

  const handleOnSubmit = async (event) => {
    event.preventDefault()

    if (password !== passwordConfirmation) {
      alert("As senhas devem ser iguais")
      return
    }

    await signup({ userName, email, password, isPrivate })

  }

  return (
    <div className="container">
      <h1>Sing up</h1>
      <form onSubmit={handleOnSubmit} id="signup-form">
        <div className="field">
          <label htmlFor="">Nome:</label>
          <input type="text" placeholder="example" value={userName} onChange={e => setUserName(e.target.value)} required/>
        </div>

        <div className="field">
          <label htmlFor="">Email:</label>
          <input type="email" id="" placeholder="example@example.com" value={email} onChange={e => setEmail(e.target.value)} required/>
        </div>

        <div className="field">
          <PasswordInput id={"p1"} text={"Senha:"} value={password} onChangePassword={setPassword}/>
        </div>
        <div className="field">
          <PasswordInput id="confirm-password" text="Confirmar senha:"  value={passwordConfirmation} onChangePassword={setPasswordConfirmation}/>
        </div>

        <div className="field">
          <label htmlFor="privateProfile">Perfil privado</label>
          <input type="checkbox" id="privateProfile" value={isPrivate} onClick={() => setIsPrivate(!isPrivate)}/>
        </div>

        <button type="submit">Criar</button>
        <div>
          <p>Já tem conta? <Link to="/login">Faça login.</Link></p>
        </div>
      </form>
    </div>
  )
}


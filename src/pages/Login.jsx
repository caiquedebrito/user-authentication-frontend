import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PasswordInput } from '../components/PasswordInput'
import { useAuth } from '../contexts/AuthContext'

export function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    setIsLoading(true)
    await login({ email, password })
    setIsLoading(false)

  }

  return (
    <section>
      <div className="container">
          <h1>Login</h1>
          <form onSubmit={handleSubmit} id="login-form">
            <div className="field">
              <label htmlFor="email">E-mail:</label>
              <input type="email" id="email" placeholder="example@example.com" value={email} onChange={e => setEmail(e.target.value)}/>
            </div>

            <div className="field">
              <PasswordInput id="p2" text="Senha:" onChangePassword={setPassword}/>
            </div>

            {/* <div>
              <p><a href="">Equeci a senha.</a></p>
            </div> */}

            <div className="field">
              <button type="submit">{isLoading ? "Loading..." : "Entrar"}</button>
            </div>

            <div className="field">
              <p>Ainda não tem conta? <Link to="/signup">Crie aqui.</Link></p>
            </div>
          </form>

      </div>
    </section>
  )
}

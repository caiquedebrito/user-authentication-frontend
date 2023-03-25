import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import "./styles.css"

export function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="header">
      <div>
        <h2>Bem-vindo, {user?.userName}! ;)</h2>
        <nav>
          <ul>
            <li><NavLink to="/">Usuários</NavLink></li>
            <li><NavLink to="/edit">Editar perfil</NavLink></li>
            <li><NavLink to="/login" onClick={logout}>Sair</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { PasswordInput } from '../../components/PasswordInput'
import { useAuth } from '../../contexts/AuthContext'
import useApiPrivate from '../../hooks/useApiPrivate'

export function EditProfileSection() {
  const { user, setUser } = useAuth()
  const [newUserName, setNewUserName] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [isPrivate, setIsPrivate] = useState(true)
  const [password, setPassword] = useState("")
  const [, setCookie] = useCookies(['user-authentication.token', "user-authentication.refreshToken"]);

  const apiPrivate = useApiPrivate()

  useEffect(() => {
    setNewUserName(user?.userName || "")
    setIsPrivate(user?.isPrivate)
  }, [user])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!newUserName && !newPassword) {
      return
    }

    try {
      const response = await apiPrivate.patch("/update", { id: user.id, password, newCredentials: {
        newPassword,
        newUserName,
        isPrivate
      }})

      setUser({
        id: response.data?.id,
        userName: response.data?.userName,
        isPrivate: response.data?.isPrivate
      })

      setCookie("user-authentication.token", token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30 // 30days
      })
      setCookie("user-authentication.refreshToken", refreshToken, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30 // 30days
      })

      // atualizar user e cookies
      alert("Perfil atualizado com sucesso!")
    } catch (error) {
      alert("Error ao atualizar o perfil!")
    }
    

  }

  return (
    <div id="editForm">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="">Novo nome:</label>
            <input type="text" id="new-name" value={newUserName} onChange={e => setNewUserName(e.target.value)}/>
          </div>
          <div className="field">
            <PasswordInput text="Senha:" id="password" value={password} onChangePassword={setPassword} />
          </div>
          <div className="field">
            <PasswordInput text="Nova senha:" id="newPassword" value={newPassword} onChangePassword={setNewPassword} required={false}/>
          </div>
          <div>
            <label htmlFor="privateProfile">Perfil privado:</label>
            <input type="checkbox" name="" id="privateProfile" onClick={e => setIsPrivate(!isPrivate)} defaultChecked={isPrivate}/>
          </div>
          <div className="field">

          <button type="submit">Confirmar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

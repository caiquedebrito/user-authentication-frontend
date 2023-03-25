import jwtDecode from "jwt-decode"
import { createContext, useContext, useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import { api } from "../services/api"

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const [cookies, setCookie, removeCookie] = useCookies(["user-authentication.token", "user-authentication.refreshToken"])

  useEffect(() => {

    const persisteUserData = () => {
      const token = cookies["user-authentication.token"]

      if (token) {
        const decoded = jwtDecode(token)
        setUser({ id: decoded?.id, userName: decoded?.userName, isPrivate: decoded?.isPrivate })
      }
    }

    persisteUserData()

  }, [])

  const login = async ({ email, password }) => {
    try {
      const response = await api.post("/login", {
        email,
        password
      })

      const { token, refreshToken, userData } = response.data

      setCookie("user-authentication.token", token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30 // 30days
      })
      setCookie("user-authentication.refreshToken", refreshToken, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30 // 30days
      })

      setUser(userData)

      navigate("/")
    } catch (error) {
      alert(error.response.data.error.message)
    }
    
  }

  const signup = async ({ userName, email, password, isPrivate }) => {
    try {
      const response = await api.post("/", { userName, email, password, isPrivate })
      navigate("/login")
    } catch(error) {
      alert(error.response.data.error?.message)
      console.log(error)
    }
  }

  const logout = () => {
    try {
      api.post("/logout", { refreshToken: cookies["user-authentication.refreshToken"]})

    } catch (error) {
      console.error(error)
    } finally {
      removeCookie("user-authentication.token")
      removeCookie("user-authentication.refreshToken")
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, signup, logout }}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
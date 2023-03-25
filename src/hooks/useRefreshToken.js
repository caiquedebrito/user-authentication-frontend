
import { useCookies } from 'react-cookie'
import { useAuth } from '../contexts/AuthContext'
import { api } from '../services/api'

export default function useRefreshToken() {
  const { setUser } = useAuth()
  const [cookies, setCookie] = useCookies(["user-authentication.token", "user-authentication.refreshToken"])

  const refresh = async () => {
    const refreshToken = cookies["user-authentication.refreshToken"]
    const response = await api.post("/refresh", { refreshToken })

    setUser(response.data.userData)
    setCookie("user-authentication.token", response.data.token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30
    })
    setCookie("user-authentication.refreshToken", response.data.refreshToken, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30
    })

    return response.data.token
  }

  return refresh
}

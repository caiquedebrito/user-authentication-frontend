
import { useCookies } from 'react-cookie'
import { Navigate, useLocation } from 'react-router-dom'

export function PrivateRoute({ children }) {
  const location = useLocation()
  const [cookies] = useCookies(["user-authentication.token", "user-authentication.refreshToken"])

  if (!cookies['user-authentication.token']) {
    return <Navigate to="/login" state={{ from: location }} replace/>
  }

  return children
}

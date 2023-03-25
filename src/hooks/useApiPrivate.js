import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { apiPrivate } from '../services/api'
import useRefreshToken from './useRefreshToken'

export default function useApiPrivate() {
  const refresh = useRefreshToken()
  const [cookies] = useCookies(["user-authentication.token"])

  useEffect(() => {

    const requestIntercept = apiPrivate.interceptors.request.use(
      config => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${cookies["user-authentication.token"]}`
        }

        return config
      }, (error) => Promise.reject(error)
    )

    const responseIntercept = apiPrivate.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config 
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true
          const token = await refresh()
          prevRequest.headers["Authorization"] = `Bearer ${token}`
          return apiPrivate(prevRequest)
        }

        return Promise.reject(error)
      }
    )

    return () => {
      apiPrivate.interceptors.request.eject(requestIntercept)
      apiPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [refresh])

  return apiPrivate
}

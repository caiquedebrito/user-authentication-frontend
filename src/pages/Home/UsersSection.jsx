import React, { useEffect, useState } from 'react'
import { Card } from '../../components/Card'
import useApiPrivate from '../../hooks/useApiPrivate'

export function UsersSection() {
  const [users, setUsers] = useState([])
  const apiPrivate = useApiPrivate()

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getUsers = async () => {
      try {
        const response = await apiPrivate.get("/", {
          signal: controller.signal,
        })

        isMounted && setUsers(response.data)
      } catch(error) {
        console.log(error)
      }
    }

    getUsers()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])
  return (
    <>
      <div className="form-container">
          <form>
            <input type="search" placeholder="fulano"/>
          </form>
        </div>

        <div className="content">
          {
            users?.length ? (
              users.map((user, index) => <Card key={index} createdAt={index} userName={user.userName}/>)
            ) : ""
          }
        </div>
    </>
  )
}

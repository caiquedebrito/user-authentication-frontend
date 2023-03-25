import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'

export function Home() {
  
  return (
    <section className="home">
      <Header />
      <main>
        <Outlet />
      </main>
    </section>
  )
}

import React from 'react'
import userIcon from "../assets/user-icon.svg"

export function Card({ userName, createdAt }) {
  return (
    <div className="card">
      <div>
        <div>
          <img src={userIcon} alt="Foto" />
        </div>
        <h2>{ userName }</h2>
      </div>
      {/* <span>{ createdAt }</span> */}
    </div>
  )
}

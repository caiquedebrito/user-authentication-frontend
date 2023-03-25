import React, { useState } from 'react'
import eyeOffImg from "../assets/eye-off.svg"
import eyeOnImg from "../assets/eye-on.svg"

export function PasswordInput({id, text, value, onChangePassword, required = true }) {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    const passwordInput = document.getElementById(id)

    setShowPassword(!showPassword)

    if (passwordInput.type === "password") {
      passwordInput.type = "text"
    } else {
      passwordInput.type = "password"
    }
  }

  return (
    <div className="passwordInput">
      <label htmlFor={id}>{text}</label>
      <input 
        type="password" 
        id={id}
        placeholder="*********"
        value={value}
        onChange={e => onChangePassword(e.target.value)}
        required={required}
        minLength={8}
      />
      <img 
        src={showPassword ? eyeOnImg : eyeOffImg} 
        className="togglePassword" 
        onClick={togglePasswordVisibility} 
      />
    </div>
  )
}

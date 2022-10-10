import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

function HomeScreen() {
  const value = useContext(AuthContext)
  return (
    <div>
    <h1>Hola {value.user.username}</h1>
    </div>
  )
}

export default HomeScreen
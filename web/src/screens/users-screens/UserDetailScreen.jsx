import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getUserProfile } from '../../services/offer-service'

function UserDetailScreen() {
  const [user, setuser] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    getUserProfile(id)
      .then((user) => setuser(user))
      .catch(error => console.error(error))
  }, [id])
  return (
    <div>
      <h3>Hola {user?.username}</h3>
    </div>
  )
}

export default UserDetailScreen
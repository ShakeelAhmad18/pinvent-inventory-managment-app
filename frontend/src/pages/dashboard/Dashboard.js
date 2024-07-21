import React from 'react'
import useRedirectLogoutUser from '../../customHook/useRedirectLogoutUser'

const Dashboard = () => {
  useRedirectLogoutUser('/login')
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  )
}

export default Dashboard

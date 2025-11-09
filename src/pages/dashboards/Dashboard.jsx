import React from 'react'

import MainDashboard from './MainDashboard'
import { useSelector } from 'react-redux'

const Dashboard = () => {

  const {user} = useSelector((state) => state.user)
  return (
    <div >
      <MainDashboard  />
    </div>
  )
}

export default Dashboard
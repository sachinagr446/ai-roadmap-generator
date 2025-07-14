import { UserProfile } from '@clerk/nextjs'
import React from 'react'

function Page() {
  return (
    <div>
        <h2>Manage Your Profile</h2>
        <UserProfile/>
    </div>
  )
}

export default Page
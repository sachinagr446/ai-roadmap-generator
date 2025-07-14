import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import WelcomeBanner from './welcomeBanner'

function AppHeader({showBar}) {
  return (
    <div className='p-4 flex justify-between items-center shadow-sm'>
        {showBar && < SidebarTrigger/>}
        <UserButton/>
        
    </div>
  )
}

export default AppHeader
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import AppSidebar from './_components/appSidebar'
import Image from 'next/image'
import AppHeader from './_components/appHeader'

function WorkspaceProvider({children}) {
  return (
    <SidebarProvider>
        <AppSidebar/>
        
        {/* <SidebarTrigger/> */}
        <div className='w-full'>
        <AppHeader showBar={true}/>
        <div className='p-10'>{children}</div>
        </div>
    </SidebarProvider>
  )
}

export default WorkspaceProvider
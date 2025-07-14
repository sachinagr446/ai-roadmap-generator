"use client"
import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AddNewCourseDialog from './addNewCourseDialog'
function AppSidebar() {
    const SideBarOptions=[
        {
            title: 'Dashboard',
            icon: '/icons/dashboard.svg',
            path: '/workspace'
        },
        {
            title: 'My Learning',
            icon: '/icons/projects.svg',
            path: '/workspace/my-learning'
        },
        
       
        {
            title: 'Billing',
            icon: '/icons/tasks.svg',
            path: '/workspace/billing'
        },
        {
            title: 'Profile',
            icon: '/icons/settings.svg',
            path: '/workspace/profile'
        }
    ]
    const path=usePathname();
    
  return (
       <Sidebar>
      <SidebarHeader className={'p-4 m-0'} >
      <Image src={'/logo.svg'} className='mt-0' width={50} height={40} alt='logo' />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <AddNewCourseDialog>

       < Button className={'w-full p-6'} >Create New Workspace</Button>
        </AddNewCourseDialog>
        <SidebarGroup />
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    {SideBarOptions.map((item,index)=>(
                        <SidebarMenuItem key={index} >
                            <SidebarMenuButton asChild className={' w-full p-5'}>
                                <Link href={item.path} className={`text-[17px] ${
                                  (item.path === '/workspace' ? path === '/workspace' : path.startsWith(item.path))
                                    ? 'text-white bg-purple-600'
                                    : ''
                                }`} >
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default AppSidebar
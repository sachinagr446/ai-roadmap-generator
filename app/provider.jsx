"use client"
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { UserDetailContext } from '@/context/UserDetailContext'
import { SelectedChapterContext } from '@/context/selectedChapter'

function Provider({children}) {
    const {user}=useUser();
    const [UserDetail, setUserDetail] = React.useState({});
    const [selectedChapter, setSelectedChapter] = React.useState(0);
    useEffect(()=>{
        user && CreateNewUser();
    },[user])
    const CreateNewUser=async()=>{
        const result=await axios.post('/api/user',{
            name:user?.fullName,
            email:user?.primaryEmailAddress?.emailAddress,
        })
        console.log(result.data);
        setUserDetail(result.data); 
    }
  return (
    <div>
       < UserDetailContext.Provider  value={{UserDetail,setUserDetail}}>
        <SelectedChapterContext.Provider value={{selectedChapter, setSelectedChapter}}>

        {children}
        </SelectedChapterContext.Provider>
       </UserDetailContext.Provider>
    </div>
  )
}

export default Provider
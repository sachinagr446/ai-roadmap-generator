"use client"
import AppHeader from '@/app/workspace/_components/appHeader'
import React from 'react'
import ChapterListSidebar from '../_components/ChapterListSIdebar'
import ChapterContent from '../_components/ChapterContent'
import { useEffect } from 'react'

import { useParams } from 'next/navigation';
import axios from 'axios';
function Course() {
    const {courseId}=useParams();
  const [courseInfo, setCourseInfo] = React.useState(null);
   useEffect(() => {
        getEnrolledCourses();
    }, []);
    const getEnrolledCourses = async () => {
        try{
            const res=await axios.get('/api/enroll-course?courseId='+courseId);
            console.log(res.data);
            setCourseInfo(res.data);
        }
        catch(err){
            console.error('Error fetching enrolled courses:', err);
        }
    }
  return (
    <div>
        <div className='sticky top-0 z-10 bg-white'>

        <AppHeader showBar={false}/>
        </div>
        <div className='flex gap-5'>
          <div className="fixed left-0  h-[calc(100vh-64px)] w-80 z-20">
            <ChapterListSidebar courseInfo={courseInfo}/>
          </div>
          <div className="ml-80 flex-1">
            <ChapterContent courseInfo={courseInfo} refreshData={getEnrolledCourses}/>
          </div>
        </div>
    </div>
  )
}

export default Course
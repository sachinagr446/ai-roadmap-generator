"use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect } from 'react'
import { useState } from 'react';
import AddNewCourseDialog from './addNewCourseDialog';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import CourseCard from './courseCard';
import { Skeleton } from '@/components/ui/skeleton';
function CourseList() {
    const [courseList,setCourseList]= useState([]);
    const {user}=useUser();
    useEffect(()=>{
      user && getCourses();
    },[user]);
    const getCourses=async()=>{
      const res=await axios.get('/api/courses');
      console.log(res.data);
      setCourseList(res.data);
    };
  return (
    <div className='mt-10'>
        <h2 className='font-bold text-3xl'>Course List</h2>
        {courseList?.length ==0 ? <div className='flex flex-col p-7 items-center justify-center border rounded-xm mt-2 bg-secondary'>
            <Image src={'/online-education.png'} alt='edu' width={80} height={100} />
            <h2 className='font-bold my-2 text-xl font-bold'>Look like you haven't created any courses yet</h2>
            <AddNewCourseDialog>

            <Button>Create your first Course</Button>
            </AddNewCourseDialog>
            </div> :
            <div>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-5'>

               {
                courseList.length>0 ? courseList.map((course,index)=>(
                   <CourseCard course={course} key={index} />
                ))
                :
                [0,1,2,3].map((item)=>(
                  <Skeleton key={item} className='w-full h-[300px] rounded-lg' />
                ))
              }
              </div>
            </div>
        }
    </div>
  )
}

export default CourseList
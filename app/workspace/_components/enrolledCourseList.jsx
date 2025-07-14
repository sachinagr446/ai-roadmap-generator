
"use client"
import { useEffect, useState } from 'react'
import axios from 'axios'
import React, { use } from 'react'
import EnrolledCourseCard from './enrolledCourseCard';

function EnrolledCourseList() {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    useEffect(() => {
        getEnrolledCourses();
    }, []);
    const getEnrolledCourses = async () => {
        try{
            const res=await axios.get('/api/enroll-course');
            console.log(res.data);
            setEnrolledCourses(res.data);
        }
        catch(err){
            console.error('Error fetching enrolled courses:', err);
        }
    }
  return enrolledCourses?.length && (
    <div className='mt-3'>
        <h2 className='font-bold text-3xl'>Continue Learning</h2>
        <div  className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-5'>
        {enrolledCourses.length >0 ?enrolledCourses.map((course, index) => (

            <EnrolledCourseCard course={course?.courses} enrollCourse={course.enrollCourse} key={index} />
        )):
        [0,1,2,3].map((item)=>(
                  <Skeleton key={item} className='w-full h-[300px] rounded-lg' />
                ))
        }
    </div>
            </div>
  )
}

export default EnrolledCourseList
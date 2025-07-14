"use client"
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { use,useEffect,useState } from 'react'
import CourseInfo from '../_components/courseInfo';
import ChapterTopicList from '../_components/chapterTopicList';

function EditCourse({viewCourse}) {
    const {courseId}=useParams();
    const [loading,setLoading]=useState(false);
    const [course, setCourse] = useState(null);
    
    console.log(courseId)
    useEffect(()=>{
        getCourseInfo();
    },[])
    const getCourseInfo=async()=>{
        setLoading(true);
        try {
            const res = await axios.get('/api/courses?courseId='+courseId);
            console.log(res.data);
            setCourse(res.data);
        } catch (error) {
            console.error('Error fetching course:', error);
        } finally {
            setLoading(false);
        }
    }
  return (
    <div>
      <CourseInfo courseInfo={course} viewCourse={viewCourse}/>
      <ChapterTopicList course={course}/>
    </div>
  )
}

export default EditCourse
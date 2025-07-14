import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import axios from 'axios';
import { Book, LoaderCircle, PlayCircle, PlayCircleIcon, Settings, Sparkle } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { toast } from 'sonner';

function EnrolledCourseCard({course,enrollCourse}) {
    const courseJson=course?.courseJson?.course;
    const calculateProgress=()=>{
        const completed = Array.isArray(enrollCourse?.completedChapters) ? enrollCourse.completedChapters.length : 0;
        const total = Array.isArray(course?.courseContent) ? course.courseContent.length : 0;
        if (total === 0) return 0;
        return Math.round((completed / total) * 100);
    }   
  return (
    <div className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
        <Image className='w-full h-[250px] rounded-xl object-cover' src={course?.bannerImageUrl} width={400 } height={300 } alt='course'/>
        <div className='p-3 flex flex-col gap-3'>
            <h2 className='font-bold text-lg'>{courseJson?.courseName}</h2>
            <p className='line-clamp-3 '>{courseJson?.description}</p>
                <div>
                    {/* <span>{calculateProgress()}</span> */}
                    <Progress value={calculateProgress()}/>
                    <Link href={'/workspace/view-course/'+course?.cid}>
                    <Button className={'mt-3 w-full'}><PlayCircleIcon/> Continue Learning</Button>
                    </Link>
                </div>
        </div> 
    </div>
  )
}

export default EnrolledCourseCard
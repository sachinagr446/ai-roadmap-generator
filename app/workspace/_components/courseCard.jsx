import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Book, LoaderCircle, PlayCircle, Settings } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

function CourseCard({course}) {
    const courseJson=course?.courseJson?.course;
const [loading, setLoading] = React.useState(false);
const router =useRouter();
    const onEnrollCourse=async()=>{
        try{

            setLoading(true);
            const result=await axios.post('/api/enroll-course',{
                courseId:course?.cid,
                
            });
            if (result?.data?.resp === 'Already Enrolled') {
      toast.info('You are already enrolled in this course!');
      setLoading(false);
        return;
            }
            setLoading(false);
            toast.success('Enrolled in course successfully!')
            router.replace('/workspace')
            console.log(result.data);
        } catch (error) {
            console.error('Error enrolling in course:', error);
            setLoading(false);
            toast.error('Failed to enroll in course. Please try again.', {
                description: error.message,
            });
        }
    }
    
  return (
    <div className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
        <Image className='w-full h-[250px] rounded-xl object-cover' src={course?.bannerImageUrl} width={400 } height={300 } alt='course'/>
        <div className='p-3 flex flex-col gap-3'>
            <h2 className='font-bold text-lg'>{courseJson?.courseName}</h2>
            <p className='line-clamp-3 '>{courseJson?.description}</p>
            <div className='flex items-center justify-between'>
                
                <h2 className='flex items-center gap-2'><Book/> {courseJson?.n_chapters} Chapters</h2>
                {course?.courseContent?.length ?  <Button onClick={onEnrollCourse}>{loading ? <LoaderCircle className='animate-spin'/> : <PlayCircle/>} Enroll </Button>:
                <Link href={'/workspace/edit-course/'+course?.cid}> <Button> <Settings/> Generate Course</Button> </Link>}
               

            </div>
        </div> 
    </div>
  )
}

export default CourseCard
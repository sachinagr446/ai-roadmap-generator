import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Book, Clock, Loader2Icon, PlayCircle, Settings, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

function CourseInfo({courseInfo, viewCourse}) {
    const courseLayout=courseInfo?.courseJson?.course;
    console.log("here is the info",courseInfo);
    const [loading, setLoading] = React.useState(false);
    const router =useRouter();
    const GenerateCourseContent=async()=>{
        setLoading(true);
        try{

            const result=await axios.post('/api/generate-course-content',{
                courseJson:courseLayout,
                courseTitle: courseLayout?.courseName,
                
                courseId: courseInfo?.cid
                
            });
            console.log(result.data);
            setLoading(false);
            
            router.replace('/workspace')
            toast.success('Course content generated successfully!', )
        } catch (error) {
            console.error('Error generating course content:', error);
            setLoading(false);
            toast.error('Failed to generate course content. Please try again.', {
                description: error.message,
            });
        }

    }
  return (
    <div className='md:flex gap-5 justify-between items-start p-5 bg-white rounded-lg shadow-md'>
        <div className='flex flex-col gap-3'>
            <h3 className='font-bold text-2xl'>{courseLayout?.courseName}</h3>
            <p className='line-clamp-2 text-gray-500'>{courseLayout?.description}</p>
            
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            <div className='flex gap-5 items-center rounded-lg bg-gray-100 p-3'>
                <Clock className='text-blue-500'/>
                <section>
                    <h2>Duration</h2>
                    <h2>{courseLayout?.duration}</h2>
                </section>
            </div>
            <div className='flex gap-5 items-center rounded-lg bg-gray-100 p-3'>
                <Book className='text-green-500'/>
                <section>
                    <h2 className='font-bold'>Chapters</h2>
                    <h2>{courseLayout?.n_chapters}</h2>
                </section>
            </div>
            <div className='flex gap-5 items-center rounded-lg bg-gray-100 p-3'>
                <TrendingUp className='text-red-500'/>
                <section>
                    <h2>Difficulty</h2>
                    <h2>{courseLayout?.level}</h2>
                </section>
            </div>

        </div>
        {!viewCourse ? (<Button  className={'max-w-m'} onClick={GenerateCourseContent} disabled={loading} >{loading ? <Loader2Icon className="animate-spin"/> : <Settings/> }Generate Course </Button>) :
        (<Link href={'/course/'+courseInfo?.cid}>
        <Button><PlayCircle/> Continue Learning</Button>
        </Link>
        )

        }
        </div>
        
        {/* Only render Image if bannerImageUrl exists and is not empty */}
        {courseInfo?.bannerImageUrl ? (
          <Image 
            src={courseInfo.bannerImageUrl} 
            alt='course banner' 
            width={300} 
            height={200}
            className=" object-cover w-full h-[240px] rounded-lg mt-5 md:mt-0 md:w-[400px] md:h-[240px]"
          />
        ) : (
          <div className="mt-4 bg-gray-200 h-[200px] w-[400px] flex items-center justify-center rounded-lg">
            <p className="text-gray-500">No banner image available</p>
          </div>
        )}
     </div>
  )
}

export default CourseInfo
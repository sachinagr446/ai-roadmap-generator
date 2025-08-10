import { Button } from '@/components/ui/button';
import { SelectedChapterContext } from '@/context/selectedChapter';
import axios from 'axios';
import { CheckCircle } from 'lucide-react';
import React from 'react'
import YouTube from 'react-youtube';
import { toast } from 'sonner';

function ChapterContent({courseInfo,refreshData}) {
  const enrollCourse = courseInfo?.enrollCourse;
  const courseContent = courseInfo?.courses?.courseContent;
  const { selectedChapter } = React.useContext(SelectedChapterContext);
  const chapter = courseContent?.[selectedChapter];

  if (!chapter) {
    return <div className='p-10'>No chapter selected or no content available.</div>;
  }

  
  if (chapter.error) {
    return (
      <div className='p-10 text-red-600 bg-red-50 rounded-lg shadow-md'>
        <h2 className='font-bold text-2xl mb-4'>Error Generating Content</h2>
        <p>We couldn't generate the content for: <strong>{chapter.chapterName}</strong>.</p>
        <p className='mt-2 text-sm'><strong>Details:</strong> {chapter.error}</p>
        {chapter.rawResponse && (
          <>
            <p className='mt-4 text-xs text-gray-500'>Raw AI Response (for debugging):</p>
            <pre className='bg-gray-100 p-2 rounded mt-1 text-xs text-black'>{chapter.rawResponse}</pre>
          </>
        )}
      </div>
    );
  }

  const videoData = chapter?.youtubeVideo;
  const topics = chapter?.courseData?.topics;
  let completedChapters = Array.isArray(enrollCourse?.completedChapters) ? enrollCourse.completedChapters : [];
  
  const markChapterCompleted = async () => {
      completedChapters.push(selectedChapter);
      const result=await axios.put('/api/enroll-course', {
        courseId: enrollCourse.cid,
        completedChapters: completedChapters,
      });
      console.log(result.data);
      refreshData();
      toast.success('Chapter marked as completed!');
    
  }
  return (
    <div className='p-10 '>
      <div className='flex justify-between items-center mb-5'>

      <h2 className='font-bold text-2xl mb-4'> {chapter.courseData?.chapterName}</h2>
      {!completedChapters.includes(selectedChapter) &&  <Button onClick={markChapterCompleted}><CheckCircle/> Mark as Completed</Button>}
      </div>
      <h2 className='font-bold my-2 text-lg'>Related Videos</h2>
      <div className='grid grid-cols-1 md:grid-cols-3  gap-5'>
        {videoData?.map((video, index) => (
          <div className='' key={index}>
          <YouTube videoId={video.videoId} opts={{
            height:'200',
            width:'300',
          }} />
          </div>
        ))}
      </div>
      
      <div>
        {topics?.map((topic, idx) => (
          <div key={idx} className='mb-2 p-4 bg-secondary rounded-lg mt-12 shadow-md'>
            <h3 className='font-bold text-lg text-primary'>{topic.topic}</h3>
            <div dangerouslySetInnerHTML={{ __html: topic?.content }} style={{
              lineHeight:'2.5'
            }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterContent
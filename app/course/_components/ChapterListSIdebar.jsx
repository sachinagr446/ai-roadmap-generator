"use client"
import React, { useEffect } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useParams } from 'next/navigation';
import axios from 'axios';
import { SelectedChapterContext } from '@/context/selectedChapter';
function ChapterListSidebar({courseInfo}) {
const course =courseInfo?.courses;
const enrollCourse=courseInfo?.enrollCourse;
const courseContent=courseInfo?.courses?.courseContent;
const completedChapters = enrollCourse?.completedChapters ?? [];
const {selectedChapter,setSelectedChapter}=React.useContext(SelectedChapterContext);  
  console.log(courseContent);
  return (
    <div className='bg-secondary h-screen w-80 p-5'>
      <h2 className='my-3 font-bold text-xl'>Chapters</h2>
      <Accordion type="single" collapsible>
        {courseContent?.map((chapter,index)=>(
 <AccordionItem  className={`${completedChapters.includes(index) ? 'bg-green-100' : 'bg-white'  }`}value={chapter?.courseData?.chapterName} key={index}
 onClick={() => setSelectedChapter(index)}>
    <AccordionTrigger className={'font-bold text-md'}> {chapter?.courseData?.chapterName}</AccordionTrigger>
    <AccordionContent>
      <div className='p-4 bg-white rounded-lg shadow-md'>
        {chapter?.courseData?.topics?.map((topic, topicIndex) => (
          <h2 className={`p-3  my-1 rounded-lg ${completedChapters.includes(index) ? 'bg-green-200' : 'bg-white'  }`} key={topicIndex}>{topic?.topic} </h2>
        ))}
      </div>
    </AccordionContent>
  </AccordionItem>  
        ))}
 
</Accordion>
    </div>
  )
}

export default ChapterListSidebar
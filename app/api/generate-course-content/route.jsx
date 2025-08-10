import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import db from '@/config/db';
import axios from 'axios';
import { coursesTable } from '@/config/schema';
import { eq, max } from 'drizzle-orm';
// Create our own AI instance instead of importing from another route
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
const PROMPT = `Based on the chapter name and topics, generate detailed content for each topic in HTML format.
Provide the response as a single, valid JSON object with the following schema:
{
  "chapterName": "string",
  "topics": [
    {
      "topic": "string",
      "content": "string (HTML content)"
    }
  ]
}
Do not include any markdown formatting like \`\`\`json or any text outside of the JSON object.

User Input:
`;
export async function POST(req){
    try {
        const {courseJson,courseTitle,courseId}=await req.json();
        // Make sure courseJson and chapters exist
        if (!courseJson || !courseJson.chapters || !Array.isArray(courseJson.chapters)) {
            throw new Error('Invalid course JSON structure');
        }
        
        const promises = courseJson.chapters.map(async(chapter, index) => {
          console.log(`Generating content for chapter ${index + 1}: ${chapter.chapterName}`);
          
          const config = {
            thinkingConfig: {
              thinkingBudget: -1,
            },
            responseMimeType: 'text/plain',
          };
          
          const model = 'gemini-2.5-pro';
          const contents = [
            {
              role: 'user',
              parts: [
                {
                  text: PROMPT + JSON.stringify(chapter),
                },
              ],
            },
          ];

  try {
            const response = await ai.models.generateContent({
              model,
              config,
              contents,
            });
            
            const responseText = response.candidates[0]?.content?.parts[0]?.text;
            console.log('Raw response for chapter:', chapter.chapterName);
            
            // Clean up the response to extract JSON
            const rawjson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
           
                const youtubeVideos = await getYoutubeVideo(chapter.chapterName);

            
            try {
              const jsonres = JSON.parse(rawjson);
              
              return {
                youtubeVideo:youtubeVideos,
                courseData:jsonres,

              };
            } catch (jsonError) {
              console.error('JSON parsing error:', jsonError);
              return {

                chapterName: chapter.chapterName,
                error: 'Failed to parse AI response',
                rawResponse: rawjson.substring(0, 200) + '...' // Include part of the raw response for debugging
              };
            }
          } catch (aiError) {
            console.error(`Error generating content for chapter ${chapter.chapterName}:`, aiError);
            return {
              chapterName: chapter.chapterName,
              error: 'AI generation failed',
              message: aiError.message
            };
          }
    })
        const CourseContentWithErrors = await Promise.all(promises);
        
        // Filter out any chapters that have an error property
        const CourseContent = CourseContentWithErrors.filter(content => !content.error);

        const dbRes=await db.update(coursesTable).set({
           courseContent: CourseContent
        }).where(eq(coursesTable.cid,courseId));
        return NextResponse.json({
            courseName: courseTitle,
            CourseContent: CourseContent,
        });
    } catch (error) {
        console.error('Error generating course content:', error);
        return NextResponse.json(
            { error: 'Failed to generate course content', details: error.message },
            { status: 500 }
        );
    }
}
const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
const getYoutubeVideo=async(topic)=>{
    const params={
        part:'snippet',
        q:topic,
        type:'video',
        maxResult:4,
        key:process.env.YOUTUBE_API_KEY

    }
    const resp=await axios.get(YOUTUBE_BASE_URL, { params });
    const youtubeVideoListres=resp.data.items;
    const youtubeVideoList=[];
    youtubeVideoListres.forEach((item)=>{
        const data={
            videoId:item.id.videoId,
            title:item?.snippet?.title,

        }
        youtubeVideoList.push(data);
    })
    console.log('Youtube Video List:', youtubeVideoList);
    return youtubeVideoList;
}

import { auth, currentUser } from '@clerk/nextjs/server';
import {
  GoogleGenAI,
} from '@google/genai';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import db from '@/config/db';
import { coursesTable } from '@/config/schema';
import axios from 'axios';

const prompt =`Genrate Learning Course depends on following details. In which Make sure to add Course Name, Description, Course Banner Image Prompt (Create a modern, flat-style 2D digital illustration representing user Topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to user Course, like sticky notes, design components, and visual aids. Use a vibrant color palette (blues, purples, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in user Course) for Course Banner in 3d format Chapter Name,, Topic under each chapters, Duration for each chapters etc, in JSON format only
 Schema:
{
"course": {
"courseName": "string",
"description": "string"
"category": "string",
"level": "string",
"include Video": "boolean",
"n_chapters": "number",
"banner|magePrompt": "string",
"chapters": [
"chapterName": "string",
"duration": "string",
"topics": [
"string"
],
}
]
}
}
User Input:

`
export const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});
export async function POST(request) {
    try {
        const {courseId,...formData} = await request.json();
        const user = await currentUser();
        const { has } = await auth()
const hasPremiumAccess = has({ plan: 'starter' })
      if(!hasPremiumAccess){
        const result=db.select().from(coursesTable).where(eq(coursesTable.userEmail,user.primaryEmailAddress.emailAddress));
        if(result.length>1){
          return NextResponse.json({'resp':'limit reached'}, { status: 403 });
        }
      }
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
          text: prompt + JSON.stringify(formData),
        },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });
        
        console.log(response);
        const responseText = response.candidates[0]?.content?.parts[0]?.text;
        console.log('Raw response:', responseText);

        // Clean up the response to extract JSON
        const rawjson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        const jsonres = JSON.parse(rawjson);
        const ImagePrompt=jsonres?.course?.bannerImagePrompt;
        const courseBannerImage = await GenerateImage(ImagePrompt);
        console.log('Parsed JSON:', jsonres);
        const generatedCourseId = courseId;  
        // Uncomment when you want to save to database
        const res = await db.insert(coursesTable).values({
            courseName: formData.courseName,
            description: formData.description,
            category: formData.category,
            n_chapters: formData.n_chapters,
            includeVideo: formData.includeVideo,
            difficulty: formData.difficulty,
            courseJson: jsonres,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            cid: generatedCourseId,
            bannerImageUrl: courseBannerImage,
        }).returning(coursesTable);

        return NextResponse.json(jsonres);

    } catch (error) {
        console.error('Error generating course:', error);
        return NextResponse.json(
            { error: 'Failed to generate course', details: error.message },
            { status: 500 }
        );
    }
}
const GenerateImage=async (prompt)=>{
    const BASE_URL='https://aigurulab.tech';
const result = await axios.post(BASE_URL+'/api/generate-image',
        {
            width: 1024,
            height: 1024,
            input: prompt,
            model: 'flux',//'flux'
            aspectRatio:"16:9"//Applicable to Flux model only
        },
        {
            headers: {
                'x-api-key': process?.env?.IMAGE_GENERATION_API_KEY, // Your API Key
                'Content-Type': 'application/json', // Content Type
            },
        })
        return result.data.image
console.log(result.data.image) //Output Result: Base 64 Image
}
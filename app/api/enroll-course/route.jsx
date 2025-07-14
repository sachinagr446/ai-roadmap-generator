import db from "@/config/db";
import { coursesTable, enrollCourseTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
    const {courseId}=await req.json();
    const user=await currentUser();
    const enrollCourses=await db.select().from(enrollCourseTable).where(and(eq(enrollCourseTable.userEmail,user?.primaryEmailAddress?.emailAddress),eq(enrollCourseTable.cid,courseId)));
    if(enrollCourses?.length==0){
        const res = await db.insert(enrollCourseTable).values({
            cid: courseId,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            completedChapters: {}
        }).returning(enrollCourseTable);
    }
    return NextResponse.json({'resp':'Already Enrolled'});
}
export async function GET(req) {
    const user=await currentUser();
    const {searchParams}=new URL(req.url);
    const courseId=searchParams?.get('courseId');
    if(courseId?.length>0){

        const result=await db.select().from(coursesTable).innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid)).where(and(eq(enrollCourseTable.userEmail,user?.primaryEmailAddress?.emailAddress),eq(enrollCourseTable.cid,courseId))).orderBy(enrollCourseTable.id);
        return NextResponse.json(result[0]);
    }
    else{

        const result=await db.select().from(coursesTable).innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid)).where(eq(enrollCourseTable.userEmail,user?.primaryEmailAddress?.emailAddress)).orderBy(enrollCourseTable.id);
        return NextResponse.json(result);
    }
    }
    export  async function PUT(req){
const {courseId,completedChapters}=await req.json();
const user=await currentUser();
const res=await db.update(enrollCourseTable).set({ completedChapters }).where(and(eq(enrollCourseTable.userEmail,user?.primaryEmailAddress?.emailAddress), eq(enrollCourseTable.cid, courseId))).returning(enrollCourseTable);
        return NextResponse.json(res);
    }
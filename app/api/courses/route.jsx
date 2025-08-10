import db from "@/config/db";
import { coursesTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req){
    const {searchParams}=new URL(req.url);
    const courseId=searchParams?.get('courseId');
    const user= await currentUser();
    if(courseId){
        const res=await db.select().from(coursesTable).where(eq(coursesTable.cid,courseId)).orderBy(desc(coursesTable.id));
        console.log(res);
        return NextResponse.json(res[0]);
    }
    else{
        const res=await db.select().from(coursesTable).where(eq(coursesTable.userEmail, user?.primaryEmailAddress?.emailAddress)).orderBy(desc(coursesTable.id));
        console.log(res);
        return NextResponse.json(res);
    }
}
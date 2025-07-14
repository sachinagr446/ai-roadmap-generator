import db from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
export async function POST(request){
    const {name,email}=await request.json();
    const users=await db.select().from(usersTable).where(eq(usersTable.email ,email)); 
    if(users?.length==0){
        const res = await db.insert(usersTable).values({
            name:name,
            email:email
        }).returning(usersTable);
        return NextResponse.json(res);
        }
    return NextResponse.json(users[0])
}
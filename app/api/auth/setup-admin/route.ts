import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
export async function POST(req:Request) {
    try{
        const {Name , Email , Password , CollegeID} = await req.json()

    if (!Name || !Email || !Password || !CollegeID) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    const college = await prisma.college.findUnique({
        where:{
            CollegeID:Number(CollegeID)
        }
    })
    if (!college) {
      return NextResponse.json({ error: "Invalid College" }, { status: 404 });
    }

    const existingAdmin = await prisma.users.findFirst({
        where:{
            CollegeID:Number(CollegeID),
            Role:"ADMIN"
        }
    })
    if(existingAdmin){
        return NextResponse.json({ error: "Admin already exists" }, { status: 409 });
    }

    const PasswordHash = await bcrypt.hashSync(Password,10)

    const admin = await prisma.users.create({
        data:{
            Name,
            Email,
            PasswordHash,
            Role:"ADMIN",
            CollegeID:Number(CollegeID)
        }
    })

    return NextResponse.json({
      success: true,
      adminId: admin.UserID
    });
    
    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }

}

export async function GET() {
    return NextResponse.json({
        message:"API is working"
    })
}
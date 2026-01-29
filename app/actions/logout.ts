"use server"
import { cookies } from "next/headers";
import { prisma } from "../lib/prisma";
import { redirect } from "next/navigation";

export async function Logout() {
    const cookiestore = cookies()
    const token = (await cookiestore).get("session")?.value
    if(token){
        await prisma.usersession.deleteMany({
            where:{token}
        })
    }

    (await cookiestore).delete("session")

    redirect('/login/admin')
}
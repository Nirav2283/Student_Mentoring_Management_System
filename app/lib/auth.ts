import { cookies } from "next/headers";
import { prisma } from "@/app/lib/prisma";

export async function getSessionUser() {
  const token = (await cookies()).get("session")?.value;

  if (!token) return null;

  const session = await prisma.usersession.findFirst({
    where: { token },
    include: {
      users: true,
    },
  });

  return session?.users ?? null;
}

//use it in another component

// import { getSessionUser } from "@/app/lib/auth";

// const user = await getSessionUser();

// if (!user) {
//   redirect("/login"); // optional
// }

// const CollegeID = user.CollegeID;

import prisma from "@/lib/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || user === null || !user.id) {
    return NextResponse.json({ error: "No User Found" })
  }

  let dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  })

  if (!dbUser) {
     await prisma.user.create({
      data: {
        id: user.id,
        email: user.email!,
        given_name: user.given_name ?? "",
        family_name: user.family_name ?? "",
        picture: user.picture,
      },
    })
  }

  return NextResponse.redirect("http://localhost:3000")
}

import { NextRequest, NextResponse } from "next/server"
import { verifyOTP } from "@/lib/otp-store"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {
  try {
    const { email, otp, name, password, role } = await req.json()

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 })
    }

    verifyOTP(email, otp) // throws on failure

    let user = await prisma.user.findUnique({ where: { email } })
    
    // Create user in DB if name and password are provided and user doesn't exist (signup flow)
    if (!user && name && password) {
      const hashedPassword = await bcrypt.hash(password, 10)
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: role || "student",
        }
      })
    } else if (user && name && password) {
      return NextResponse.json({ error: "Email is already registered. Please log in." }, { status: 400 })
    }


    return NextResponse.json({ 
      success: true,
      user: user ? {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      } : null
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Verification failed"
    return NextResponse.json({ error: message }, { status: 400 })
  }
}

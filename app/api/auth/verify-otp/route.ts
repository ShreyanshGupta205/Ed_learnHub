import { NextRequest, NextResponse } from "next/server"
import { verifyOTP } from "@/lib/otp-store"

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json()

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 })
    }

    verifyOTP(email, otp) // throws on failure

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Verification failed"
    return NextResponse.json({ error: message }, { status: 400 })
  }
}

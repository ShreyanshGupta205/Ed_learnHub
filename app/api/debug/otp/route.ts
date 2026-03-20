import { NextResponse } from "next/server"

export async function GET() {
  const globalStore = globalThis as any
  const store = globalStore.__otpStore
  
  if (!store) {
    return NextResponse.json({ error: "No OTP store found" })
  }

  const otps = Array.from(store.entries()).map(([email, data]) => ({
    email,
    otp: (data as any).otp,
    expiresAt: new Date((data as any).expiresAt).toISOString()
  }))

  return NextResponse.json({ otps })
}

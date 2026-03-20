import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// POST save/update watch progress
export async function POST(req: NextRequest) {
  try {
    const { userId, lessonId, watchedSec } = await req.json()
    if (!userId || !lessonId) {
      return NextResponse.json({ error: "userId and lessonId required" }, { status: 400 })
    }

    const progress = await prisma.progress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      update: { watchedSec: Math.max(watchedSec, 0) },
      create: { userId, lessonId, watchedSec: Math.max(watchedSec, 0) },
    })

    return NextResponse.json(progress)
  } catch (err) {
    console.error("[POST /api/progress]", err)
    return NextResponse.json({ error: "Failed to save progress" }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// POST save/update watch progress
export async function POST(req: NextRequest) {
  try {
    const { userId, videoId, watchedSec } = await req.json()
    console.log("Progress update request:", { userId, videoId, watchedSec })
    if (!userId || !videoId) {
      return NextResponse.json({ error: "userId and videoId required" }, { status: 400 })
    }

    // Basic UUID validation or at least check if it's not "start"
    if (videoId === "start" || videoId.length < 10) {
      return NextResponse.json({ error: "Invalid videoId" }, { status: 400 })
    }

    const progress = await prisma.progress.upsert({
      where: { userId_lessonId: { userId, lessonId: videoId } },
      update: { watchedSec: Math.max(watchedSec, 0) },
      create: { userId, lessonId: videoId, watchedSec: Math.max(watchedSec, 0) },
    })

    return NextResponse.json(progress)
  } catch (err: any) {
    console.error("[POST /api/progress] Error:", err)
    if (err.code === 'P2003') {
      console.error("Foreign key violation meta:", err.meta)
    }
    return NextResponse.json({ error: "Failed to save progress", details: err.message }, { status: 500 })
  }
}

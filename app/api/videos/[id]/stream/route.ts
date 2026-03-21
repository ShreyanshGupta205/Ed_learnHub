import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const video = await prisma.lesson.findUnique({
      where: { id },
    })

    if (!video) {
      return new NextResponse("Video not found", { status: 404 })
    }

    const { videoUrl, type } = video
    
    if (type !== "VIDEO" || !videoUrl) {
        return new NextResponse("Video not found for this lesson", { status: 404 })
    }

    // Check if videoUrl is absolute or relative
    let targetUrl = videoUrl
    if (!videoUrl.startsWith("http")) {
      // It's a relative URL, make it absolute using the request's origin
      const origin = req.nextUrl.origin
      targetUrl = new URL(videoUrl, origin).toString()
    }

    return NextResponse.redirect(targetUrl)
  } catch (err) {
    console.error(`[GET /api/videos/${id}/stream]`, err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

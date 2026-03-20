import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET all videos (lessons) in a course
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: courseId } = await params
  try {
    const modules = await prisma.module.findMany({
      where: { courseId },
      include: {
        lessons: {
          include: { quiz: { select: { id: true } } },
          orderBy: { order: "asc" },
        },
      },
      orderBy: { order: "asc" },
    })

    // Flatten lessons for the current frontend compatibility
    const videos = modules.flatMap((m: any) => m.lessons)
    return NextResponse.json(videos)
  } catch (err) {
    console.error("[GET /api/courses/[id]/videos]", err)
    return NextResponse.json({ error: "Failed to fetch lessons" }, { status: 500 })
  }
}

// POST add a video (lesson) to a course (teacher)
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: courseId } = await params
  try {
    const { title, videoUrl, order, description } = await req.json()
    if (!title || !videoUrl) {
      return NextResponse.json({ error: "title and videoUrl are required" }, { status: 400 })
    }

    // Since our schema now requires modules, we'll find or create a default module
    let module = await prisma.module.findFirst({
      where: { courseId },
      orderBy: { order: "asc" },
    })

    if (!module) {
      module = await prisma.module.create({
        data: {
          courseId,
          title: "General Content",
          description: "Default module for course materials",
        },
      })
    }

    // Count existing lessons in this module to set default order
    const existingCount = await prisma.lesson.count({ where: { moduleId: module.id } })

    const lesson = await prisma.lesson.create({
      data: {
        moduleId: module.id,
        title,
        description: description ?? "",
        videoUrl,
        type: "VIDEO",
        order: order ?? existingCount,
      },
    })
    return NextResponse.json(lesson, { status: 201 })
  } catch (err) {
    console.error("[POST /api/courses/[id]/videos]", err)
    return NextResponse.json({ error: "Failed to add lesson" }, { status: 500 })
  }
}

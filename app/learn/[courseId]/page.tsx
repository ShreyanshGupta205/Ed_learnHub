import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

export default async function LearnCourseRedirect({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params
  
  // Find the first lesson to redirect to
  const firstLesson = await prisma.lesson.findFirst({
    where: { module: { courseId } },
    orderBy: [
      { module: { order: "asc" } },
      { order: "asc" }
    ]
  })

  if (!firstLesson) {
    // No lessons at all: just go back to the course intro page
    redirect(`/courses/${courseId}`)
  }

  // Redirect to the first lesson
  redirect(`/learn/${courseId}/${firstLesson.id}`)
}

import { Metadata } from "next"
import { LearningLayout } from "@/components/learn/learning-layout"

export const metadata: Metadata = {
  title: "Learning - LearnHub",
  description: "Continue your learning journey",
}

import { redirect } from "next/navigation"

export default async function LearningPage({ params }: { params: Promise<{ courseId: string; lessonId: string }> }) {
  const { courseId, lessonId } = await params
  if (lessonId === "start") {
    redirect(`/learn/${courseId}`)
  }
  
  return <LearningLayout />
}

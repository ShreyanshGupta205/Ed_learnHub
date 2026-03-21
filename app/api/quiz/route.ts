import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET quiz for a lesson
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lessonId = searchParams.get("lessonId");

  if (!lessonId) return NextResponse.json({ error: "lessonId required" }, { status: 400 });

  try {
    const quiz = await prisma.quiz.findUnique({
      where: { lessonId },
      include: {
        questions: {
          orderBy: { order: "asc" }
        }
      }
    });

    if (!quiz) return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    
    const parsedQuiz = {
      ...quiz,
      questions: quiz.questions.map(q => ({
        ...q,
        options: JSON.parse(q.options)
      }))
    };
    return NextResponse.json(parsedQuiz);
  } catch (err) {
    console.error("[GET /api/quiz]", err);
    return NextResponse.json({ error: "Failed to fetch quiz" }, { status: 500 });
  }
}

// POST create or update quiz for a lesson
export async function POST(req: NextRequest) {
  try {
    const { lessonId, questions } = await req.json();

    if (!lessonId || !Array.isArray(questions)) {
      return NextResponse.json({ error: "lessonId and questions array required" }, { status: 400 });
    }

    // Upsert Quiz
    const quiz = await prisma.quiz.upsert({
      where: { lessonId },
      update: {},
      create: { lessonId }
    });

    // Replace questions (simplest way: delete all and re-create)
    await prisma.question.deleteMany({
      where: { quizId: quiz.id }
    });

    // Create new questions
    const createdQuestions = await Promise.all(
      questions.map(async (q: any, index: number) => {
        const question = await prisma.question.create({
          data: {
            quizId: quiz.id,
            text: q.text,
            options: JSON.stringify(q.options),
            correctIndex: q.correctIndex,
            order: index
          }
        });
        return { ...question, options: JSON.parse(question.options) };
      })
    );

    return NextResponse.json({ ...quiz, questions: createdQuestions }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/quiz]", err);
    return NextResponse.json({ error: "Failed to save quiz" }, { status: 500 });
  }
}

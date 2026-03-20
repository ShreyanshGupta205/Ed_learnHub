"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PlayCircle, FileText, Lock, Clock } from "lucide-react"

const curriculum = [
  {
    id: "section-1",
    title: "Getting Started",
    duration: "1h 30m",
    lessons: [
      { title: "Welcome to the Course", duration: "5:00", type: "video", free: true },
      { title: "Course Overview & Resources", duration: "10:00", type: "video", free: true },
      { title: "Setting Up Your Development Environment", duration: "25:00", type: "video", free: false },
      { title: "Introduction Quiz", duration: "10:00", type: "quiz", free: false },
    ],
  },
  {
    id: "section-2",
    title: "HTML Fundamentals",
    duration: "4h 15m",
    lessons: [
      { title: "Introduction to HTML", duration: "15:00", type: "video", free: true },
      { title: "HTML Document Structure", duration: "20:00", type: "video", free: false },
      { title: "Working with Text Elements", duration: "25:00", type: "video", free: false },
      { title: "Links and Navigation", duration: "20:00", type: "video", free: false },
      { title: "Images and Media", duration: "30:00", type: "video", free: false },
      { title: "Forms and Input Elements", duration: "45:00", type: "video", free: false },
      { title: "HTML Project: Portfolio Page", duration: "60:00", type: "project", free: false },
    ],
  },
  {
    id: "section-3",
    title: "CSS Styling",
    duration: "6h 30m",
    lessons: [
      { title: "Introduction to CSS", duration: "15:00", type: "video", free: false },
      { title: "Selectors and Specificity", duration: "25:00", type: "video", free: false },
      { title: "Box Model Deep Dive", duration: "30:00", type: "video", free: false },
      { title: "Flexbox Layout", duration: "45:00", type: "video", free: false },
      { title: "CSS Grid Layout", duration: "45:00", type: "video", free: false },
      { title: "Responsive Design", duration: "40:00", type: "video", free: false },
      { title: "CSS Animations", duration: "35:00", type: "video", free: false },
      { title: "CSS Project: Responsive Landing Page", duration: "90:00", type: "project", free: false },
    ],
  },
  {
    id: "section-4",
    title: "JavaScript Essentials",
    duration: "8h 45m",
    lessons: [
      { title: "Introduction to JavaScript", duration: "20:00", type: "video", free: false },
      { title: "Variables and Data Types", duration: "30:00", type: "video", free: false },
      { title: "Functions and Scope", duration: "40:00", type: "video", free: false },
      { title: "Arrays and Objects", duration: "45:00", type: "video", free: false },
      { title: "DOM Manipulation", duration: "50:00", type: "video", free: false },
      { title: "Events and Event Handling", duration: "35:00", type: "video", free: false },
      { title: "Async JavaScript & Promises", duration: "55:00", type: "video", free: false },
      { title: "Fetch API and AJAX", duration: "40:00", type: "video", free: false },
      { title: "JavaScript Project: Interactive App", duration: "120:00", type: "project", free: false },
    ],
  },
  {
    id: "section-5",
    title: "React.js Framework",
    duration: "10h 20m",
    lessons: [
      { title: "Introduction to React", duration: "25:00", type: "video", free: false },
      { title: "Components and Props", duration: "40:00", type: "video", free: false },
      { title: "State and Lifecycle", duration: "45:00", type: "video", free: false },
      { title: "Hooks Deep Dive", duration: "60:00", type: "video", free: false },
      { title: "Context API", duration: "35:00", type: "video", free: false },
      { title: "React Router", duration: "40:00", type: "video", free: false },
      { title: "React Project: Full Stack App", duration: "180:00", type: "project", free: false },
    ],
  },
]

export function CourseCurriculum() {
  const totalLessons = curriculum.reduce((acc, section) => acc + section.lessons.length, 0)
  const totalDuration = "52h 30m"

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Course Curriculum</CardTitle>
          <span className="text-sm text-muted-foreground">
            {curriculum.length} sections • {totalLessons} lessons • {totalDuration}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {curriculum.map((section) => (
            <AccordionItem key={section.id} value={section.id}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <span className="font-medium text-left">{section.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {section.lessons.length} lessons • {section.duration}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1">
                  {section.lessons.map((lesson, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        {lesson.type === "video" ? (
                          <PlayCircle className="h-4 w-4 text-muted-foreground" />
                        ) : lesson.type === "quiz" ? (
                          <FileText className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <FileText className="h-4 w-4 text-primary" />
                        )}
                        <span className="text-sm">{lesson.title}</span>
                        {lesson.free && (
                          <span className="text-xs text-primary font-medium">Preview</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {lesson.duration}
                        </span>
                        {!lesson.free && (
                          <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}

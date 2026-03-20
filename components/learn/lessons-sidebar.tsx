import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle2, Circle, PlayCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"

export function LessonsSidebar() {
  const params = useParams<{ courseId: string; lessonId: string }>()
  const { courseId, lessonId } = params
  const router = useRouter()
  
  const [modules, setModules] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [openSections, setOpenSections] = useState<string[]>([])

  useEffect(() => {
    if (!courseId) return
    
    fetch(`/api/courses/${courseId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.modules) {
          setModules(d.modules)
          // Open the section that contains the current lesson
          const currentModule = d.modules.find((m: any) => 
            m.lessons.some((l: any) => l.id === lessonId)
          )
          if (currentModule) setOpenSections([currentModule.id])
        }
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [courseId, lessonId])

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner />
      </div>
    )
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-4">
        <h2 className="font-semibold mb-4 text-xs uppercase tracking-wider text-muted-foreground">Course Content</h2>
        
        <Accordion
          type="multiple"
          value={openSections}
          onValueChange={setOpenSections}
          className="space-y-2"
        >
          {modules.map((module: any) => {
            const lessons = module.lessons || []
            const totalCount = lessons.length
            
            return (
              <AccordionItem
                key={module.id}
                value={module.id}
                className="border rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium text-sm">{module.title}</span>
                    <span className="text-xs text-muted-foreground mt-0.5">
                      {totalCount} lessons
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <ul>
                    {lessons.map((lesson: any) => {
                      const isCurrent = lesson.id === lessonId
                      return (
                        <li key={lesson.id}>
                          <button
                            onClick={() => router.push(`/learn/${courseId}/${lesson.id}`)}
                            className={cn(
                              "w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors",
                              isCurrent && "bg-primary/5 border-l-2 border-primary"
                            )}
                          >
                            <div className="shrink-0">
                              {isCurrent ? (
                                <PlayCircle className="h-4 w-4 text-primary" />
                              ) : (
                                <Circle className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className={cn(
                                  "text-sm truncate",
                                  isCurrent && "font-medium"
                                )}
                              >
                                {lesson.title}
                              </p>
                            </div>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </ScrollArea>
  )
}

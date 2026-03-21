"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, GripVertical, FileText, Video, ChevronDown, ChevronRight, PenSquare, UploadCloud, Trash2, Loader2, Brain, ClipboardCheck } from "lucide-react"
import { toast } from "sonner"

interface Lesson {
  id: string
  title: string
  type: string
  order: number
}

interface Module {
  id: string
  title: string
  order: number
  lessons: Lesson[]
}

interface CourseBuilderProps {
  courseId: string
  onUpdate: () => void
}

export function CourseBuilder({ courseId, onUpdate }: CourseBuilderProps) {
  const [modules, setModules] = useState<Module[]>([])
  const [loading, setLoading] = useState(true)

  // Forms states
  const [newModuleTitle, setNewModuleTitle] = useState("")
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null)
  
  // Lesson form
  const [newLessonType, setNewLessonType] = useState("VIDEO")
  const [newLessonTitle, setNewLessonTitle] = useState("")
  const [newLessonContent, setNewLessonContent] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  // Quiz Editor State
  const [editingQuizLessonId, setEditingQuizLessonId] = useState<string | null>(null)
  const [quizQuestions, setQuizQuestions] = useState<any[]>([])
  const [isSavingQuiz, setIsSavingQuiz] = useState(false)

  useEffect(() => {
    fetchCourseData()
  }, [courseId])

  const fetchCourseData = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/courses/${courseId}`)
      if (res.ok) {
        const data = await res.json()
        setModules(data.modules || [])
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const addModule = async () => {
    if (!newModuleTitle) return
    const res = await fetch("/api/modules", {
      method: "POST",
      body: JSON.stringify({ courseId, title: newModuleTitle, description: "" }),
      headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        setNewModuleTitle("")
        fetchCourseData()
        onUpdate()
    }
  }

  const addLesson = async (moduleId: string) => {
    if (!newLessonTitle) return
    
    let finalVideoUrl = null

    if (newLessonType === "VIDEO") {
      const fileInput = document.getElementById(`video-upload-${moduleId}`) as HTMLInputElement
      const file = fileInput?.files?.[0]
      if (!file) {
        toast.error("Please select a video file to upload")
        return
      }
      setIsUploading(true)
      try {
          const formData = new FormData()
          formData.append("file", file)

          const uploadRes = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          })

          if (!uploadRes.ok) {
            const data = await uploadRes.json()
            throw new Error(data.error || "Upload failed")
          }

          const { url } = await uploadRes.json()
          finalVideoUrl = url
          toast.success("Video uploaded locally!")

      } catch (err: any) {
          toast.error("Failed to upload video: " + err.message)
          setIsUploading(false)
          return
      }
      setIsUploading(false)
    }

    const res = await fetch("/api/lessons", {
      method: "POST",
      body: JSON.stringify({ 
        moduleId, 
        title: newLessonTitle, 
        type: newLessonType, 
        content: newLessonType === "POST" ? newLessonContent : null,
        videoUrl: finalVideoUrl
      }),
      headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
      setNewLessonTitle("")
      setNewLessonContent("")
      setNewLessonType("VIDEO")
      const fileInput = document.getElementById(`video-upload-${moduleId}`) as HTMLInputElement
      if (fileInput) fileInput.value = ""
      
      fetchCourseData()
      onUpdate()
      toast.success("Lesson created successfully")
    } else {
        toast.error("Failed to create lesson")
    }
  }

  const deleteModule = async (moduleId: string, e: React.MouseEvent) => {
    e.stopPropagation() 
    if (!confirm("Are you sure you want to delete this module and ALL of its lessons? This action cannot be undone.")) return
    
    const res = await fetch(`/api/modules/${moduleId}`, { method: 'DELETE' })
    if (res.ok) {
        fetchCourseData()
        onUpdate()
        toast.success("Module deleted permanently")
    } else {
        toast.error("Failed to delete module")
    }
  }

  const deleteLesson = async (lessonId: string) => {
    if (!confirm("Are you sure you want to delete this lesson?")) return
    
    const res = await fetch(`/api/lessons/${lessonId}`, { method: 'DELETE' })
    if (res.ok) {
        fetchCourseData()
        onUpdate()
        toast.success("Lesson deleted successfully")
    } else {
        toast.error("Failed to delete lesson")
    }
  }

  // QUIZ LOGIC
  const loadQuiz = async (lessonId: string) => {
    setEditingQuizLessonId(lessonId)
    setQuizQuestions([])
    try {
      const res = await fetch(`/api/quiz?lessonId=${lessonId}`)
      if (res.ok) {
        const data = await res.json()
        setQuizQuestions(data.questions || [])
      } else {
        setQuizQuestions([{ text: "", options: ["", "", "", ""], correctIndex: 0 }])
      }
    } catch (e) {
      console.error(e)
    }
  }

  const saveQuiz = async () => {
    if (!editingQuizLessonId) return
    if (quizQuestions.some((q: any) => !q.text || q.options.some((opt: string) => !opt))) {
      toast.error("Please fill all questions and options")
      return
    }
    setIsSavingQuiz(true)
    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        body: JSON.stringify({ lessonId: editingQuizLessonId, questions: quizQuestions }),
        headers: { "Content-Type": "application/json" }
      })
      if (res.ok) {
        toast.success("Quiz saved successfully!")
        setEditingQuizLessonId(null)
      } else {
        toast.error("Failed to save quiz")
      }
    } catch (e) {
        console.error(e)
        toast.error("Error saving quiz")
    } finally {
        setIsSavingQuiz(false)
    }
  }

  if (loading) return <div className="p-4 text-center text-muted-foreground animate-pulse">Loading course structure...</div>

  return (
    <div className="space-y-6">
      {/* Quiz Editor Modal */}
      {editingQuizLessonId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <Card className="w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border-primary/20 bg-background overflow-hidden font-sans">
            <CardHeader className="flex flex-row items-center justify-between border-b px-6 py-4">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" /> 
                  Quiz Configuration
                </CardTitle>
                <CardDescription>Minimum 3 correct answers required to pass the lesson.</CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted" onClick={() => setEditingQuizLessonId(null)}>
                 <Plus className="h-5 w-5 rotate-45" />
              </Button>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
               {quizQuestions.length === 0 && (
                 <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-xl">
                    <Brain className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>No questions yet. Start building your quiz!</p>
                 </div>
               )}
               {quizQuestions.map((q, qIndex) => (
                 <div key={qIndex} className="p-5 border rounded-xl bg-muted/30 space-y-5 relative group transition-all hover:bg-muted/40">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 h-8 w-8 text-destructive hover:bg-destructive/10 rounded-full transition-opacity" 
                      onClick={() => {
                        const newQ = [...quizQuestions]
                        newQ.splice(qIndex, 1)
                        setQuizQuestions(newQ)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-primary tracking-widest">Question {qIndex + 1}</Label>
                      <Input 
                        placeholder="What is the main topic of this video?" 
                        value={q.text} 
                        className="bg-background border-primary/10 focus:border-primary/40 shadow-sm"
                        onChange={(e) => {
                          const newQ = [...quizQuestions]
                          newQ[qIndex].text = e.target.value
                          setQuizQuestions(newQ)
                        }} 
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {q.options.map((opt: string, optIndex: number) => (
                        <div key={optIndex} className={`flex items-center gap-3 p-2 rounded-lg border transition-all ${q.correctIndex === optIndex ? 'bg-primary/5 border-primary/30 ring-1 ring-primary/20' : 'bg-background border-transparent shadow-sm'}`}>
                          <div className="relative flex items-center justify-center h-5 w-5">
                            <input 
                              type="radio" 
                              name={`q-${qIndex}`} 
                              checked={q.correctIndex === optIndex} 
                              className="w-4 h-4 text-primary focus:ring-primary accent-primary cursor-pointer border-primary/20"
                              onChange={() => {
                                const newQ = [...quizQuestions]
                                newQ[qIndex].correctIndex = optIndex
                                setQuizQuestions(newQ)
                              }} 
                            />
                          </div>
                          <Input 
                            placeholder={`Option ${optIndex + 1}`} 
                            value={opt} 
                            className="h-9 text-sm bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0" 
                            onChange={(e) => {
                              const newQ = [...quizQuestions]
                              newQ[qIndex].options[optIndex] = e.target.value
                              setQuizQuestions(newQ)
                            }} 
                          />
                        </div>
                      ))}
                    </div>
                 </div>
               ))}
               <Button variant="outline" className="w-full border-dashed border-2 py-6 rounded-xl hover:bg-primary/5 hover:border-primary/40 hover:text-primary transition-all gap-2" onClick={() => setQuizQuestions([...quizQuestions, { text: "", options: ["", "", "", ""], correctIndex: 0 }])}>
                 <Plus className="h-4 w-4" /> Add Question
               </Button>
            </CardContent>

            <CardFooter className="border-t p-6 gap-3 flex flex-col md:flex-row bg-muted/5">
              <Button variant="ghost" className="flex-1 order-2 md:order-1" onClick={() => setEditingQuizLessonId(null)}>Discard Changes</Button>
              <Button className="flex-[2] gap-2 py-6 order-1 md:order-2 shadow-lg shadow-primary/20" onClick={saveQuiz} disabled={isSavingQuiz}>
                {isSavingQuiz ? <Loader2 className="h-4 w-4 animate-spin" /> : <ClipboardCheck className="h-5 w-5" />}
                {isSavingQuiz ? "Saving Assessment..." : "Finalize & Save Quiz"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
      <div className="flex gap-2">
        <Input 
          placeholder="New Module Title..." 
          value={newModuleTitle} 
          onChange={e => setNewModuleTitle(e.target.value)} 
          className="flex-1"
        />
        <Button onClick={addModule} className="gap-2">
          <Plus className="h-4 w-4" /> Add Module
        </Button>
      </div>

      <div className="space-y-4">
        {modules.map(module => (
          <Card key={module.id} className="overflow-hidden border-primary/20 bg-background/50 backdrop-blur">
            <CardHeader className="p-4 flex flex-row items-center cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => setActiveModuleId(activeModuleId === module.id ? null : module.id)}
            >
              <div className="flex-1 flex items-center gap-3">
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                {activeModuleId === module.id ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                <span className="font-semibold text-lg">{module.title}</span>
              </div>
              <span className="text-sm text-muted-foreground mr-2">{module.lessons.length} lessons</span>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={(e) => deleteModule(module.id, e)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            
            {activeModuleId === module.id && (
              <CardContent className="p-4 pt-0 bg-muted/10 border-t space-y-4">
                {/* Lessons List */}
                <div className="space-y-2 mt-4">
                  {module.lessons.map(lesson => (
                    <div key={lesson.id} className="flex items-center gap-3 p-3 bg-background border rounded-lg hover:border-primary/50 transition">
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                      {lesson.type === 'VIDEO' ? <Video className="h-4 w-4 text-primary" /> : <FileText className="h-4 w-4 text-primary" />}
                      <span className="flex-1 font-medium">{lesson.title}</span>
                      <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary font-medium mr-2">{lesson.type}</span>
                      <Button variant="outline" size="sm" className="h-8 gap-1" onClick={() => loadQuiz(lesson.id)}>
                        <Brain className="h-3.5 w-3.5" /> Quiz
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10" onClick={() => deleteLesson(lesson.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Add Lesson Form */}
                <div className="p-4 bg-background border rounded-lg space-y-4 mt-4">
                    <h4 className="font-semibold text-sm flex items-center gap-2"><Plus className="h-4 w-4" /> Add new lesson</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label>Lesson Title</Label>
                            <Input placeholder="Type lesson name..." value={newLessonTitle} onChange={e => setNewLessonTitle(e.target.value)} />
                        </div>
                        <div className="space-y-1.5">
                            <Label>Lesson Type</Label>
                            <Select value={newLessonType} onValueChange={setNewLessonType}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="VIDEO">Video Lesson</SelectItem>
                                    <SelectItem value="POST">Post / Article (Markdown)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {newLessonType === "POST" && (
                        <div className="space-y-1.5">
                            <Label>Article Content (Markdown supported)</Label>
                            <Textarea placeholder="# Hello World..." className="min-h-[150px] font-mono text-sm" value={newLessonContent} onChange={e => setNewLessonContent(e.target.value)} />
                        </div>
                    )}
                    {newLessonType === "VIDEO" && (
                        <div className="space-y-1.5">
                            <Label htmlFor={`video-upload-${module.id}`}>Upload Local Video</Label>
                            <Input id={`video-upload-${module.id}`} type="file" accept="video/*" disabled={isUploading} className="cursor-pointer file:cursor-pointer file:text-primary file:bg-primary/10 file:border-0 hover:file:bg-primary/20" />
                            <p className="text-xs text-muted-foreground">MP4, WebM formats supported up to 50MB</p>
                        </div>
                    )}
                    <Button onClick={() => addLesson(module.id)} className="w-full gap-2" disabled={isUploading || !newLessonTitle}>
                        {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : (newLessonType === "VIDEO" ? <UploadCloud className="h-4 w-4" /> : <PenSquare className="h-4 w-4" />)}
                        {isUploading ? "Uploading & Saving..." : `Create ${newLessonType === "VIDEO" ? "Video Lesson" : "Article"}`}
                    </Button>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
        {modules.length === 0 && <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">No modules yet. Create one to begin.</div>}
      </div>
    </div>
  )
}

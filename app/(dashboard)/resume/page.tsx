"use client"

import { useState } from "react"
import { ResumePreview } from "@/components/resume/resume-preview"
import { ResumeEditor } from "@/components/resume/resume-editor"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Eye, Edit, Wand2 } from "lucide-react"

export default function ResumePage() {
  const [activeView, setActiveView] = useState<"edit" | "preview">("edit")

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resume Builder</h1>
          <p className="mt-1 text-muted-foreground">
            Create a professional resume showcasing your skills and achievements
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Wand2 className="h-4 w-4" />
            AI Enhance
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <Tabs value={activeView} onValueChange={(v) => setActiveView(v as "edit" | "preview")}>
          <TabsList>
            <TabsTrigger value="edit" className="gap-2">
              <Edit className="h-4 w-4" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="mt-6">
        {activeView === "edit" ? <ResumeEditor /> : <ResumePreview />}
      </div>
    </div>
  )
}

import { Card } from "@/components/ui/card"
import { Mail, Phone, MapPin, Globe, Linkedin, Award } from "lucide-react"

export function ResumePreview() {
  return (
    <Card className="mx-auto max-w-3xl p-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b pb-6">
          <h1 className="text-3xl font-bold tracking-tight">New Learner</h1>
          <p className="mt-1 text-lg text-muted-foreground italic">Add your professional title</p>
          
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Mail className="h-4 w-4" />
              email@example.com
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="h-4 w-4" />
              +0 (000) 000-0000
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              Location
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="h-4 w-4" />
              portfolio.com
            </span>
          </div>
        </div>

        {/* Summary */}
        <div>
          <h2 className="mb-2 text-lg font-semibold">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-muted-foreground italic">
            Add a brief summary of your professional background and goals.
          </p>
        </div>

        {/* Experience */}
        <div>
          <h2 className="mb-3 text-lg font-semibold">Work Experience</h2>
          <p className="text-sm text-muted-foreground italic">No work experience added yet.</p>
        </div>

        {/* Education */}
        <div>
          <h2 className="mb-3 text-lg font-semibold">Education</h2>
          <p className="text-sm text-muted-foreground italic">No education history added yet.</p>
        </div>

        {/* Skills */}
        <div>
          <h2 className="mb-3 text-lg font-semibold">Skills</h2>
          <p className="text-sm text-muted-foreground italic">No skills added yet.</p>
        </div>

        {/* Certificates */}
        <div>
          <h2 className="mb-3 text-lg font-semibold">Certifications</h2>
          <p className="text-sm text-muted-foreground italic">No certifications earned yet.</p>
        </div>

        {/* Projects */}
        <div>
          <h2 className="mb-3 text-lg font-semibold">Projects</h2>
          <p className="text-sm text-muted-foreground italic">No projects added yet.</p>
        </div>
      </div>
    </Card>
  )
}

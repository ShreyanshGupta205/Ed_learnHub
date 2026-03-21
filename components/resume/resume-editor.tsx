"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Plus, Trash2, GripVertical, Sparkles } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function ResumeEditor() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel>First Name</FieldLabel>
                  <Input defaultValue="John" />
                </Field>
                <Field>
                  <FieldLabel>Last Name</FieldLabel>
                  <Input defaultValue="Doe" />
                </Field>
              </div>
              <Field>
                <FieldLabel>Professional Title</FieldLabel>
                <Input defaultValue="Full Stack Developer" />
              </Field>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input type="email" defaultValue="john.doe@email.com" />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel>Phone</FieldLabel>
                  <Input defaultValue="+1 (555) 123-4567" />
                </Field>
                <Field>
                  <FieldLabel>Location</FieldLabel>
                  <Input defaultValue="San Francisco, CA" />
                </Field>
              </div>
              <Field>
                <FieldLabel>LinkedIn URL</FieldLabel>
                <Input defaultValue="linkedin.com/in/johndoe" />
              </Field>
              <Field>
                <FieldLabel>Portfolio/Website</FieldLabel>
                <Input defaultValue="johndoe.dev" />
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Professional Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              className="min-h-32"
              defaultValue="Passionate Full Stack Developer with 5+ years of experience building scalable web applications. Proficient in React, Node.js, and cloud technologies. Strong problem-solving skills and a commitment to writing clean, maintainable code."
            />
            <Button variant="outline" size="sm" className="mt-3 gap-2">
              <Sparkles className="h-4 w-4" />
              Generate with AI
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Work Experience</CardTitle>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="exp-1" className="border-none">
                <AccordionTrigger className="rounded-lg bg-muted/50 px-4 py-3 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                    <div className="text-left">
                      <div className="font-medium">Senior Developer at TechCorp</div>
                      <div className="text-sm text-muted-foreground">2022 - Present</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-4">
                  <FieldGroup>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field>
                        <FieldLabel>Job Title</FieldLabel>
                        <Input defaultValue="Senior Developer" />
                      </Field>
                      <Field>
                        <FieldLabel>Company</FieldLabel>
                        <Input defaultValue="TechCorp" />
                      </Field>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field>
                        <FieldLabel>Start Date</FieldLabel>
                        <Input defaultValue="Jan 2022" />
                      </Field>
                      <Field>
                        <FieldLabel>End Date</FieldLabel>
                        <Input defaultValue="Present" />
                      </Field>
                    </div>
                    <Field>
                      <FieldLabel>Description</FieldLabel>
                      <Textarea 
                        className="min-h-24"
                        defaultValue="• Led development of customer-facing dashboard serving 100K+ users
• Implemented CI/CD pipelines reducing deployment time by 60%
• Mentored junior developers and conducted code reviews"
                      />
                    </Field>
                    <div className="flex justify-end">
                      <Button variant="destructive" size="sm" className="gap-2">
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  </FieldGroup>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Education</CardTitle>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel>Degree</FieldLabel>
                <Input defaultValue="B.S. Computer Science" />
              </Field>
              <Field>
                <FieldLabel>Institution</FieldLabel>
                <Input defaultValue="Stanford University" />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel>Graduation Year</FieldLabel>
                  <Input defaultValue="2019" />
                </Field>
                <Field>
                  <FieldLabel>GPA (Optional)</FieldLabel>
                  <Input defaultValue="3.8" />
                </Field>
              </div>
            </FieldGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-wrap gap-2">
              {["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker", "Git", "REST APIs"].map((skill) => (
                <Badge key={skill} variant="secondary" className="gap-1.5">
                  {skill}
                  <button className="ml-1 hover:text-destructive">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input placeholder="Add a skill..." />
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="link" size="sm" className="mt-2 gap-2 p-0">
              <Sparkles className="h-4 w-4" />
              Auto-add from courses
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Certificates from LearnHub</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "React Developer Professional", include: true },
                { name: "TypeScript Expert", include: true },
                { name: "Full Stack Web Development", include: false },
                { name: "JavaScript Algorithms", include: false },
              ].map((cert) => (
                <div key={cert.name} className="flex items-center justify-between">
                  <span className="text-sm">{cert.name}</span>
                  <Switch defaultChecked={cert.include} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Projects</CardTitle>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel>Project Name</FieldLabel>
                <Input defaultValue="E-commerce Platform" />
              </Field>
              <Field>
                <FieldLabel>Description</FieldLabel>
                <Textarea 
                  className="min-h-20"
                  defaultValue="Built a full-stack e-commerce platform with React, Node.js, and Stripe integration. Features include real-time inventory, user authentication, and admin dashboard."
                />
              </Field>
              <Field>
                <FieldLabel>Project URL</FieldLabel>
                <Input defaultValue="github.com/johndoe/ecommerce" />
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

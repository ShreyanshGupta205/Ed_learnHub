import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Play, Clock } from "lucide-react"

const recentCourses: any[] = []

export function RecentCourses() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Continue Learning</CardTitle>
        <Link href="/dashboard/courses">
          <Button variant="ghost" size="sm">
            View all
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentCourses.length > 0 ? (
          recentCourses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex-shrink-0 w-full sm:w-32 h-20 rounded-md bg-muted flex items-center justify-center">
                <Play className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold line-clamp-1">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {course.instructor}
                    </p>
                  </div>
                  <Badge variant="secondary" className="hidden sm:inline-flex">
                    {course.category}
                  </Badge>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">
                      Next: {course.nextLesson}
                    </span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {course.timeLeft}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-center py-4">You haven't enrolled in any courses yet.</p>
        )}
      </CardContent>
    </Card>
  )
}

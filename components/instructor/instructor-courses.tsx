import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Eye, BarChart2, Trash2, Star } from "lucide-react"
import Link from "next/link"

const courses = [
  {
    id: 1,
    title: "Complete React Developer Course",
    students: 3456,
    revenue: "$12,340",
    rating: 4.9,
    reviews: 234,
    status: "published",
    completionRate: 78,
  },
  {
    id: 2,
    title: "Advanced TypeScript Patterns",
    students: 2134,
    revenue: "$8,560",
    rating: 4.8,
    reviews: 156,
    status: "published",
    completionRate: 82,
  },
  {
    id: 3,
    title: "Node.js Backend Masterclass",
    students: 1890,
    revenue: "$6,420",
    rating: 4.7,
    reviews: 98,
    status: "published",
    completionRate: 65,
  },
  {
    id: 4,
    title: "System Design for Beginners",
    students: 1234,
    revenue: "$4,120",
    rating: 4.6,
    reviews: 67,
    status: "published",
    completionRate: 71,
  },
  {
    id: 5,
    title: "GraphQL API Development",
    students: 0,
    revenue: "$0",
    rating: 0,
    reviews: 0,
    status: "draft",
    completionRate: 0,
  },
]

export function InstructorCourses() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Your Courses</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link href="/instructor/courses">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Completion</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.title}</TableCell>
                <TableCell>{course.students.toLocaleString()}</TableCell>
                <TableCell>{course.revenue}</TableCell>
                <TableCell>
                  {course.rating > 0 ? (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span>{course.rating}</span>
                      <span className="text-muted-foreground">({course.reviews})</span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  {course.status === "published" ? (
                    <div className="flex items-center gap-2">
                      <Progress value={course.completionRate} className="h-2 w-16" />
                      <span className="text-sm text-muted-foreground">
                        {course.completionRate}%
                      </span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={course.status === "published" ? "secondary" : "outline"}
                    className={course.status === "published" 
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                      : ""
                    }
                  >
                    {course.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BarChart2 className="mr-2 h-4 w-4" />
                        Analytics
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

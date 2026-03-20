"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Star, Clock, Users, BookOpen } from "lucide-react"

const courses: any[] = []

export function CourseGrid() {
  const [sortBy, setSortBy] = useState("popular")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">1-8</span> of{" "}
          <span className="font-medium text-foreground">2,847</span> courses
        </p>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map((course) => (
            <Link key={course.id} href={`/courses/${course.id}`}>
              <Card className="group h-full overflow-hidden border-border/50 hover:border-border hover:shadow-sm transition-all">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5" />
                  {course.bestseller && (
                    <Badge className="absolute top-3 left-3 bg-yellow-500 text-yellow-950 hover:bg-yellow-500">
                      Bestseller
                    </Badge>
                  )}
                  <Badge variant="secondary" className="absolute top-3 right-3">
                    {course.category}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {course.instructor}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span className="text-sm font-bold">{course.rating}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">
                      ({course.reviews.toLocaleString()} reviews)
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" />
                      {course.lessons} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {(course.students / 1000).toFixed(1)}k
                    </span>
                  </div>

                  <Badge variant="outline" className="mt-3 text-xs">
                    {course.level}
                  </Badge>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold">${course.price}</span>
                    <span className="text-sm text-muted-foreground line-through">
                      ${course.originalPrice}
                    </span>
                  </div>
                  <Button size="sm">Enroll</Button>
                </CardFooter>
              </Card>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            No courses found. Check back later!
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <Button variant="outline" size="lg">
          Load more courses
        </Button>
      </div>
    </div>
  )
}

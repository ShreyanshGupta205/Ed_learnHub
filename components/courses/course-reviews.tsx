"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Star, ThumbsUp } from "lucide-react"

interface CourseReviewsProps {
  rating: number
  reviews: number
}

const reviewsData = [
  {
    id: 1,
    author: "Emily R.",
    avatar: "ER",
    rating: 5,
    date: "2 weeks ago",
    content: "This course is absolutely fantastic! Sarah explains everything clearly and the projects are incredibly practical. I landed a junior developer job right after completing this course.",
    helpful: 245,
  },
  {
    id: 2,
    author: "David P.",
    avatar: "DP",
    rating: 5,
    date: "1 month ago",
    content: "Best investment in my career. The curriculum is well-structured and covers everything you need to know. The React section alone is worth the price.",
    helpful: 189,
  },
  {
    id: 3,
    author: "Maria S.",
    avatar: "MS",
    rating: 4,
    date: "1 month ago",
    content: "Great course overall. Some sections could use more advanced examples, but for beginners, this is perfect. The instructor is very responsive in the Q&A.",
    helpful: 156,
  },
]

const ratingBreakdown = [
  { stars: 5, percentage: 78 },
  { stars: 4, percentage: 15 },
  { stars: 3, percentage: 5 },
  { stars: 2, percentage: 1 },
  { stars: 1, percentage: 1 },
]

export function CourseReviews({ rating, reviews }: CourseReviewsProps) {
  const [showAll, setShowAll] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="text-center md:text-left">
            <p className="text-5xl font-bold text-primary">{rating}</p>
            <div className="flex justify-center md:justify-start mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(rating)
                      ? "fill-yellow-500 text-yellow-500"
                      : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Course Rating • {reviews.toLocaleString()} reviews
            </p>
          </div>

          <div className="flex-1 space-y-2">
            {ratingBreakdown.map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <Progress value={item.percentage} className="h-2 flex-1" />
                <span className="text-sm text-muted-foreground w-12">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {reviewsData.map((review) => (
            <div key={review.id} className="border-b pb-6 last:border-0">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarFallback className="bg-muted text-muted-foreground">
                    {review.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{review.author}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < review.rating
                                  ? "fill-yellow-500 text-yellow-500"
                                  : "text-muted-foreground/30"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {review.content}
                  </p>
                  <Button variant="ghost" size="sm" className="mt-2 gap-1.5 text-xs">
                    <ThumbsUp className="h-3 w-3" />
                    Helpful ({review.helpful})
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show less" : "Show all reviews"}
        </Button>
      </CardContent>
    </Card>
  )
}

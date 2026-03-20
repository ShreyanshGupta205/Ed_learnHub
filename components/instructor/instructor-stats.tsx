import { Card, CardContent } from "@/components/ui/card"
import { Users, DollarSign, BookOpen, Star, TrendingUp, TrendingDown } from "lucide-react"

const stats = [
  {
    label: "Total Students",
    value: "12,456",
    change: "+12%",
    trend: "up",
    icon: Users,
  },
  {
    label: "Total Revenue",
    value: "$48,290",
    change: "+8%",
    trend: "up",
    icon: DollarSign,
  },
  {
    label: "Active Courses",
    value: "8",
    change: "+1",
    trend: "up",
    icon: BookOpen,
  },
  {
    label: "Average Rating",
    value: "4.8",
    change: "-0.1",
    trend: "down",
    icon: Star,
  },
]

export function InstructorStats() {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <stat.icon className="h-5 w-5 text-muted-foreground" />
              <div className={`flex items-center gap-1 text-sm ${
                stat.trend === "up" ? "text-emerald-600" : "text-rose-600"
              }`}>
                {stat.trend === "up" ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {stat.change}
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

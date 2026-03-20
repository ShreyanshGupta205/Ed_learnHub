import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const skillCategories: any[] = []

const problemSolvingStats = {
  easy: { solved: 0, total: 0 },
  medium: { solved: 0, total: 0 },
  hard: { solved: 0, total: 0 },
}

export function ProfileSkills() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        {skillCategories.length > 0 ? (
          skillCategories.map((category) => (
            <Card key={category.category}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{category.category}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill: any) => (
                  <div key={skill.name}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        {skill.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-10 text-center text-muted-foreground">
              No skills added yet. Complete modules to showcase your expertise.
            </CardContent>
          </Card>
        )}
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Problem Solving</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-emerald-600">Easy</span>
                <span className="text-muted-foreground">
                  {problemSolvingStats.easy.solved}/{problemSolvingStats.easy.total}
                </span>
              </div>
              <Progress 
                value={(problemSolvingStats.easy.solved / problemSolvingStats.easy.total) * 100} 
                className="h-2"
              />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-amber-600">Medium</span>
                <span className="text-muted-foreground">
                  {problemSolvingStats.medium.solved}/{problemSolvingStats.medium.total}
                </span>
              </div>
              <Progress 
                value={(problemSolvingStats.medium.solved / problemSolvingStats.medium.total) * 100} 
                className="h-2"
              />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-rose-600">Hard</span>
                <span className="text-muted-foreground">
                  {problemSolvingStats.hard.solved}/{problemSolvingStats.hard.total}
                </span>
              </div>
              <Progress 
                value={(problemSolvingStats.hard.solved / problemSolvingStats.hard.total) * 100} 
                className="h-2"
              />
            </div>
            <div className="pt-2 text-center">
              <div className="text-3xl font-bold">
                {problemSolvingStats.easy.solved + problemSolvingStats.medium.solved + problemSolvingStats.hard.solved}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Problems Solved
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Top Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 text-muted-foreground text-sm italic">
              No verified top skills yet.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { ThumbsUp, ThumbsDown, MessageSquare, Bookmark, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProblemDescriptionProps {
  problemId: string
}

const problemsData: Record<string, {
  number: number
  title: string
  difficulty: string
  description: string
  examples: Array<{
    input: string
    output: string
    explanation?: string
  }>
  constraints: string[]
  hints: string[]
  companies: string[]
  topics: string[]
}> = {
  "two-sum": {
    number: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]"
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]"
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    hints: [
      "A really brute force way would be to search for all possible pairs of numbers but that would be too slow.",
      "Try using a hash map to store the numbers you've seen so far."
    ],
    companies: ["Amazon", "Google", "Microsoft", "Apple", "Facebook"],
    topics: ["Array", "Hash Table"]
  },
  "add-two-numbers": {
    number: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.`,
    examples: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "342 + 465 = 807."
      },
      {
        input: "l1 = [0], l2 = [0]",
        output: "[0]"
      }
    ],
    constraints: [
      "The number of nodes in each linked list is in the range [1, 100].",
      "0 <= Node.val <= 9",
      "It is guaranteed that the list represents a number that does not have leading zeros."
    ],
    hints: [
      "Think about how you would add two numbers on paper.",
      "Don't forget to handle the carry!"
    ],
    companies: ["Amazon", "Microsoft", "Bloomberg"],
    topics: ["Linked List", "Math", "Recursion"]
  }
}

export function ProblemDescription({ problemId }: ProblemDescriptionProps) {
  const problem = problemsData[problemId] || problemsData["two-sum"]

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "Easy":
        return "text-emerald-600 bg-emerald-50 border-emerald-200"
      case "Medium":
        return "text-amber-600 bg-amber-50 border-amber-200"
      case "Hard":
        return "text-rose-600 bg-rose-50 border-rose-200"
      default:
        return ""
    }
  }

  return (
    <div className="flex h-full flex-col bg-card">
      <Tabs defaultValue="description" className="flex h-full flex-col">
        <div className="border-b px-4">
          <TabsList className="h-12 w-full justify-start gap-4 rounded-none bg-transparent p-0">
            <TabsTrigger
              value="description"
              className="h-12 rounded-none border-b-2 border-transparent px-0 data-[state=active]:border-foreground data-[state=active]:bg-transparent"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="editorial"
              className="h-12 rounded-none border-b-2 border-transparent px-0 data-[state=active]:border-foreground data-[state=active]:bg-transparent"
            >
              Editorial
            </TabsTrigger>
            <TabsTrigger
              value="solutions"
              className="h-12 rounded-none border-b-2 border-transparent px-0 data-[state=active]:border-foreground data-[state=active]:bg-transparent"
            >
              Solutions
            </TabsTrigger>
            <TabsTrigger
              value="submissions"
              className="h-12 rounded-none border-b-2 border-transparent px-0 data-[state=active]:border-foreground data-[state=active]:bg-transparent"
            >
              Submissions
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="description" className="mt-0 flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <h1 className="text-xl font-semibold">
                  {problem.number}. {problem.title}
                </h1>
                <Badge
                  variant="outline"
                  className={cn("text-xs", getDifficultyColor(problem.difficulty))}
                >
                  {problem.difficulty}
                </Badge>
              </div>

              <div className="mb-6 flex items-center gap-4">
                <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
                  <ThumbsUp className="h-4 w-4" />
                  <span>4.2k</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
                  <ThumbsDown className="h-4 w-4" />
                  <span>142</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
                  <MessageSquare className="h-4 w-4" />
                  <span>Comments</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="prose prose-sm max-w-none dark:prose-invert">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {problem.description}
                </div>

                <div className="mt-6">
                  {problem.examples.map((example, index) => (
                    <div key={index} className="mb-4">
                      <h4 className="mb-2 font-medium">Example {index + 1}:</h4>
                      <div className="rounded-lg bg-muted/50 p-4 font-mono text-sm">
                        <div className="mb-1">
                          <span className="text-muted-foreground">Input: </span>
                          {example.input}
                        </div>
                        <div className="mb-1">
                          <span className="text-muted-foreground">Output: </span>
                          {example.output}
                        </div>
                        {example.explanation && (
                          <div>
                            <span className="text-muted-foreground">Explanation: </span>
                            {example.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h4 className="mb-2 font-medium">Constraints:</h4>
                  <ul className="list-inside list-disc space-y-1 text-sm">
                    {problem.constraints.map((constraint, index) => (
                      <li key={index} className="font-mono text-sm">
                        {constraint}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <h4 className="mb-2 font-medium">Topics:</h4>
                  <div className="flex flex-wrap gap-2">
                    {problem.topics.map((topic) => (
                      <Badge key={topic} variant="secondary">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="mb-2 font-medium">Companies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {problem.companies.map((company) => (
                      <Badge key={company} variant="outline">
                        {company}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="editorial" className="mt-0 flex-1">
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Editorial content coming soon
          </div>
        </TabsContent>

        <TabsContent value="solutions" className="mt-0 flex-1">
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Community solutions coming soon
          </div>
        </TabsContent>

        <TabsContent value="submissions" className="mt-0 flex-1">
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Your submissions will appear here
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

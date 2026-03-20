import { Metadata } from "next"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { CourseHero } from "@/components/courses/course-hero"
import { CourseCurriculum } from "@/components/courses/course-curriculum"
import { CourseInstructor } from "@/components/courses/course-instructor"
import { CourseReviews } from "@/components/courses/course-reviews"
import { CourseRequirements } from "@/components/courses/course-requirements"
import { CourseEnrollCard } from "@/components/courses/course-enroll-card"

export const metadata: Metadata = {
  title: "Course Details - LearnHub",
  description: "Learn from industry experts",
}

const courseData = {
  id: 1,
  title: "Complete Web Development Bootcamp 2026",
  subtitle: "Become a full-stack web developer with one comprehensive course. HTML, CSS, JavaScript, Node, React, PostgreSQL, and more!",
  instructor: {
    name: "Sarah Chen",
    title: "Senior Software Engineer at Google",
    avatar: "SC",
    rating: 4.9,
    students: 185000,
    courses: 12,
    bio: "Sarah is a senior software engineer with 10+ years of experience. She has worked at Google, Meta, and several startups. She's passionate about teaching and has helped over 185,000 students learn web development.",
  },
  rating: 4.9,
  reviews: 12500,
  students: 45200,
  duration: "52 hours",
  lessons: 380,
  level: "Beginner",
  price: 89.99,
  originalPrice: 199.99,
  lastUpdated: "February 2026",
  language: "English",
  features: [
    "52 hours on-demand video",
    "45 coding exercises",
    "12 real-world projects",
    "Certificate of completion",
    "Lifetime access",
    "Mobile and desktop access",
  ],
  requirements: [
    "No programming experience needed",
    "A computer with internet access",
    "Willingness to learn and practice",
  ],
  whatYouWillLearn: [
    "Build 12+ portfolio-ready web applications",
    "Master HTML5, CSS3, and modern JavaScript (ES6+)",
    "Create responsive, mobile-first websites",
    "Work with React.js and Next.js frameworks",
    "Build REST APIs with Node.js and Express",
    "Use PostgreSQL and MongoDB databases",
    "Deploy applications to the cloud",
    "Implement authentication and security best practices",
  ],
}

export default function CourseDetailsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <CourseHero course={courseData} />
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-8">
              <CourseRequirements
                requirements={courseData.requirements}
                whatYouWillLearn={courseData.whatYouWillLearn}
              />
              <CourseCurriculum />
              <CourseInstructor instructor={courseData.instructor} />
              <CourseReviews rating={courseData.rating} reviews={courseData.reviews} />
            </div>
            <div className="w-full lg:w-96 shrink-0">
              <div className="lg:sticky lg:top-20">
                <CourseEnrollCard course={courseData} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

# 🎓 LearnHub - Advanced EdTech Platform

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

A state-of-the-art, full-stack e-learning platform built to provide an interactive, immersive, and highly performant educational experience. LearnHub empowers educators with robust content-creation tools, while ensuring students remain engaged through AI-assisted learning, eye-tracking focus mode, mandatory quizzes, and seamless course progression.

---

## 🎯 Core Features

- **Dynamic Course Builder:** Instructors can assemble elaborate courses structuring content across **Modules**, **Video Lessons**, and interactive **Markdown Articles**.
- **Assessment Gateways (Quizzes):** Lessons feature integrated quizzes parsing multiple-choice logic. Students are required to pass with customizable thresholds to unlock subsequent materials.
- **Offline-First Storage:** Complete elimination of aggressive third-party cloud billing by storing and streaming compiled video binaries (`.mp4`, `.webm`) directly from the localized server environment.
- **AI Tutor (`app/api/chat`):** A persistent, intelligent contextual chat panel residing alongside video playback to answer complex student queries instantly.
- **Focus Guard (Eye-Tracker):** Optional front-facing camera heuristics validating student attention metrics during video consumption to ensure authentic course completion.
- **Real-Time Live Classes:** Leverages `LiveKit` to host zero-latency broadcasting and multi-participant WebRTC classrooms directly within the dashboard.
- **Custom Access Roles:** Completely sandboxed UI scopes for `admin`, `teacher`, and `student` roles.
- **Progress Tracking Analytics:** Automatic client-to-server pings capturing exact video timestamps to log `watchedSec` and determine percentage-based course progression.

---

## 🧬 System Architecture

The architecture relies heavily on raw React Server Components in Next.js 14/15, utilizing Server Actions for mutating database state, pushing the heavy lifting completely to the backend execution context.

```mermaid
graph TD
    A[Client Browser] -->|HTTP / WebRTC| B(Next.js App Router)
    
    subgraph Frontend Client
    C[React Context Providers] 
    D[UI Components / shadcn]
    E[Video Player Streamer]
    end

    subgraph Backend Server
    F[Server Components]
    G[API Routes / Server Actions]
    H[Prisma ORM Node Interface]
    end

    subgraph Local Environment
    I[(SQLite dev.db)]
    J[(Local FS: /public/uploads)]
    end
    
    A --> C
    A --> D
    E -->|Streams Buffer| G
    B --> F
    F --> G
    G --> H
    H --> I
    G -->|Reads Binary Storage| J
    D -->|Eye Tracking / UI Interactivity| E
```

---

## 🔄 Data Flow Architecture (DFA)

The operational pipeline for core user activities is completely isolated. Below represents the Flow Architecture from Video Consumption to Quiz Evaluation:

```mermaid
sequenceDiagram
    participant Student
    participant VideoPlayer
    participant API_Progress
    participant API_Quiz
    participant SQLite_DB

    Student->>VideoPlayer: Navigates to Lesson
    VideoPlayer->>SQLite_DB: Reads /api/videos/stream absolute path
    SQLite_DB-->>VideoPlayer: Buffers Media File
    VideoPlayer->>API_Progress: 10s Interval Ping (watchedSec, lessonId)
    API_Progress->>SQLite_DB: Upserts Progress Record
    Note over VideoPlayer: Video Concludes
    VideoPlayer->>Student: Triggers Quiz Modal
    Student->>API_Quiz: Submits Answer Array [0, 2, 1...]
    API_Quiz->>SQLite_DB: Compares correctly parsed JSON indices
    alt Score >= Threshold
        API_Quiz->>SQLite_DB: Marks Lesson Progress as `completed: true`
        SQLite_DB-->>Student: Unlocks Next Module
    else Score < Threshold
        API_Quiz-->>Student: Prompts Retake
    end
```

---

## 🗄️ Database Schema Design (ERD)

LearnHub abstracts away aggressive PostgreSQL models to utilize a blazing-fast localized SQLite environment mapped via Prisma.

```mermaid
erDiagram
    USER ||--o{ ENROLLMENT : "has many"
    USER ||--o{ PROGRESS : "tracks"
    USER ||--o{ QUIZ_ATTEMPT : "takes"
    
    COURSE ||--o{ MODULE : "contains"
    COURSE ||--o{ ENROLLMENT : "enrolled in by"
    
    MODULE ||--o{ LESSON : "contains"
    
    LESSON ||--o| QUIZ : "optional assessment"
    LESSON ||--o{ PROGRESS : "tracks status"
    
    QUIZ ||--o{ QUESTION : "has multiple"
    QUIZ ||--o{ QUIZ_ATTEMPT : "logged attempts"
    
    USER {
        string id PK
        string email
        string password
        string role "student/teacher/admin"
    }
    COURSE {
        string id PK
        string title
        string description
        string teacherId FK
        boolean isPublished
    }
    MODULE {
        string id PK
        string courseId FK
        int order
    }
    LESSON {
        string id PK
        string moduleId FK
        string type "VIDEO/POST"
        string videoUrl "Local absolute path"
        int order
    }
    PROGRESS {
        string userId FK
        string lessonId FK
        boolean completed
        int watchedSec
    }
    QUIZ {
        string id PK
        string lessonId FK
    }
    QUESTION {
        string id PK
        string quizId FK
        string text
        string options "Stringified JSON Array"
        int correctIndex
    }
```

---

## 💻 Tech Stack Summary

- **Core Engine:** Next.js (App Router), React 18+
- **Styling:** Tailwind CSS, `shadcn/ui` components
- **Database:** Prisma ORM, SQLite (`dev.db`)
- **Crypto & Security:** `bcryptjs` (Password Hashing), Secure HTTP-Only OTP Cookies
- **Communication:** LiveKit WebRTC (Live classes)

---

## 🛠️ Local Setup Guide

Follow these steps to duplicate the production environment securely on your local machine:

### 1. Clone & Install
```bash
git clone <repository_url>
cd LearnHub
npm install
```

### 2. Environment Configuration
Create an `.env` file at the root of the project to initialize the database and LiveKit bindings.
```env
# Local SQLite Connector
DATABASE_URL="file:./dev.db"

# (Optional) LiveKit Credentials for Live Class Capabilities
LIVEKIT_API_KEY="your_api_key"
LIVEKIT_API_SECRET="your_secret"
NEXT_PUBLIC_LIVEKIT_URL="wss://your-livekit-url.cloud"
```

### 3. Initialize Database Ecosystem
This will parse the `schema.prisma` architecture and spin up a freshly mounted `.db` cache.
```bash
npx prisma generate
npx prisma db push
```

*(Optional) To rapidly test course functionalities, execute a localized node seed file if you have created one to attach mock users.*

### 4. Ignite Development Server
```bash
npm run dev
```

Browse to `http://localhost:3000` to log in and observe the live, compiled EdTech dashboard.

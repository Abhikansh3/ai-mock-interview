# AI Mock Interviews

An AI-powered mock interview platform that lets you practice job interviews with a voice AI and get instant, detailed feedback.

## Tech Stack

- **Next.js 16** — App Router, server actions, API routes
- **React 19** — UI
- **Firebase** — Authentication and Firestore database
- **Vapi AI** — Voice AI agent for conducting interviews
- **Google Gemini** — Question generation and feedback analysis
- **Tailwind CSS + shadcn/ui** — Styling
- **Zod** — Schema validation

## Features

- **Voice AI Interviews** — Speak with an AI interviewer in real-time using Vapi's voice agent
- **Custom Interview Generation** — Generate interview questions tailored to a specific role, level, and tech stack
- **Instant AI Feedback** — Receive a detailed score breakdown across communication, technical knowledge, problem solving, cultural fit, and confidence
- **Firebase Auth** — Email/password sign up and sign in
- **Interview History** — View all past interviews and their feedback on your dashboard
- **Responsive UI** — Works on desktop and mobile

## Getting Started

**Prerequisites**

- Node.js
- npm

**Clone the repo**

```bash
git clone https://github.com/Abhikansh3/ai-mock-interview.git
cd ai-mock-interview
```

**Install dependencies**

```bash
npm install
```

**Set up environment variables**

Create a `.env.local` file in the root:

```env
GOOGLE_GENERATIVE_AI_API_KEY=

NEXT_PUBLIC_BASE_URL=

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

**Run the dev server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

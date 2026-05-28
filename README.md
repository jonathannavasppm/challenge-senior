# ShopMetrics — E-commerce Analytics Dashboard

> **Technical Evaluation — Senior Frontend Engineer**

## Context

ShopMetrics is an internal analytics dashboard currently running in production for a mid-size e-commerce company (~50k monthly active users). The engineering team has inherited the codebase after a round of rapid development and is now facing performance complaints from both users and the operations team.

**Reported symptoms from the production monitoring system:**

- "The dashboard takes too long to become interactive after initial load"
- "The product catalog section makes the browser freeze when scrolling"
- "The hero banner causes visible layout shifts on slow connections"
- "Some users report the page feels sluggish every time they type in the search box"

Your mission: **clone this repo, get it running, and conduct a thorough code review**. Identify as many bugs, anti-patterns, performance issues, and code quality problems as you can in the allotted time.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5.x |
| Styling | TailwindCSS v4 |

---

## Setup

### Requirements

- Node.js 20+
- npm 10+

### Installation

```bash
# 1. Clone the repository
git clone <repo-url>
cd challenge-senior

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.local.example .env.local

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you will be redirected to the dashboard automatically.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Redirects to /dashboard
│   ├── globals.css
│   └── dashboard/
│       ├── page.tsx                # Main dashboard page
│       ├── layout.tsx              # Dashboard shell (sidebar + header)
│       ├── components/             # All UI components
│       ├── hooks/                  # Custom React hooks
│       ├── context/                # React context
│       ├── types/                  # TypeScript types
│       ├── utils/                  # Helper and formatter functions
│       └── actions/                # Next.js Server Actions
├── middleware.ts
└── data/
    └── mock-data.ts                # Mock data (5,000 products)
```

---

## Your Task

1. **Run the application** and observe its behavior
2. **Review the codebase** systematically — components, hooks, utilities, configuration
3. **Document every issue** you find:
   - What the problem is
   - Why it is a problem
   - How you would fix it
4. **Create a branch** (`feat/review-<your-name>`) and commit your findings:
   - Code fixes where you have time to implement them
   - Comments in code for issues you identified but couldn't fully fix
   - A written summary in a `FINDINGS.md` file at the root

### Evaluation Criteria

| Area | What we look for |
|------|-----------------|
| **Bug Detection** | Correctness of identified issues |
| **Depth** | Surface-level vs root-cause analysis |
| **Prioritization** | Can you distinguish critical from cosmetic issues? |
| **Solutions** | Are your proposed fixes accurate and idiomatic? |
| **Communication** | Clarity of explanations |

> **Tip:** There are issues at multiple levels of subtlety. Some are immediately visible in the browser. Others only manifest under specific conditions or at scale. Aim to go beyond what is obviously broken.

---

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # Run ESLint
```

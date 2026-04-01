# 🏆 Cyber-Sports Community App

A highly interactive, hyper-modern, and visually stunning web application for local sports communities. Built with **Next.js**, **Framer Motion**, and **MongoDB**, this platform features a strictly-enforced deep dark mode, beautiful neon glassmorphism aesthetics, and physics-based playful interactions.

## 🚀 Key Features

- **The "Cool" Factor**:
  - **Custom Neon Cursor**: A globally trailing glowing neon ring that actively snaps and expands when hovering over interactive elements.
  - **Scroll Progress**: A dynamic, glowing cyan scroll progress bar affixed to the top of the interface.
  - **Apple TV-Style 3D Tilt**: Event and Poll cards possess spatial awareness, using complex math to rotate and magnetic-tilt toward the user's mouse position in real-time.
- **Playful Empty States**: Say goodbye to boring "Loading..." text. Empty states feature animated, bouncing, floating, and pulsating sports emojis (🏀⚽🎾🎯) driven by physics-based springs.
- **Dynamic Hero Section**: Interactive background neon orbs smoothly track your mouse movements on the landing page, with floating sports elements that pop upon hover.
- **Vibrant Glassmorphism**: Cards and inputs utilize heavy background blurring with custom bright sports-themed neon gradients (electric green, basketball orange) and significantly rounded borders (`24px`).

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Standard CSS Modules with dynamic CSS Variables
- **Animation Engine**: Framer Motion (Heavy usage of `useMotionValue`, `useSpring`, `useScroll`)
- **Database**: MongoDB (Mongoose ODN)

## 💻 Getting Started

### 1. Clone the repository and install dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory and add your MongoDB Atlas connection string:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/sports?retryWrites=true&w=majority
```
*(If testing locally without a DB, the app will gracefully display the playful interactive empty states).*

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or whichever port Next.js assigns) with your browser to experience the hyper-modern UI.

## 📁 Project Structure highlights

- `src/components/ClientInteractions.jsx`: Houses the logic for the global custom cursor and scroll progress mechanics.
- `src/components/EventCard.jsx` & `src/components/PollCard.jsx`: Contains the localized `useMotionValue` 3D tilt physics logic.
- `src/components/Hero.jsx`: Implements the parallax mouse-tracking layout and floating background icons.
- `src/app/globals.css`: Contains all of the strictly enforced dark-mode variables, neon accents, and core structural rules.

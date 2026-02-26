# Philo Guide — 42 Philosophers Project Companion

An interactive web application that teaches the concepts behind the **42 Dining Philosophers project** and helps you plan, track, and execute it within your blackhole deadline.

## Features

- 🕐 **Live Countdown** to blackhole (2026-04-09)
- 📚 **Interactive Course** covering deadlock, starvation, race conditions, mutex vs semaphore, timing
- 🍝 **Fork Simulation** — click philosophers to acquire forks and observe deadlock
- 🗺️ **42-Day Roadmap** with weekly milestones, tasks, pitfalls, and definitions of done
- ✅ **Self-Check Quiz** with 12 questions and category scoring
- 🐛 **Debug Journal** with scientific debugging template
- 📋 **Pre-Correction Checklist**
- 💾 **Everything persists** in `localStorage`

## Quick Start

```bash
cd philo-guide
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Stack

- React 18 + Vite 5
- Tailwind CSS 3
- React Router 6
- Lucide React (icons)
- No backend — all data in localStorage

## Important Note

This guide teaches **concepts only** — no complete C implementations are provided. Your code must be your own work for the 42 evaluation.

# 📻 Nostalgia FM — The Classic SRK Era

A single-page, aesthetic nostalgia music Web App dedicated to Shah Rukh Khan's iconic 90s and 2000s Bollywood era. Built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and the **YouTube iFrame API**.

---

## ✨ Features

- **61 Verified SRK Tracks:** Curated across two legendary eras:
  - 🎤 **90s SRK:** _Baazigar, Darr, DDLJ, Kuch Kuch Hota Hai, Yes Boss, Duplicate, Papa Kehte Hain_
  - 🎬 **2000s SRK:** _Mohabbatein, K3G, Devdas, Swades, Veer-Zaara, Main Hoon Na, Kal Ho Naa Ho, Rab Ne Bana Di Jodi, Asoka, Josh_
- **100% Embed Verified:** All 61 YouTube video streams are validated live via YouTube's oEmbed API for zero broken playback.
- **Spinning Vinyl Record Art:** Real-time album thumbnail embedded into a spinning vinyl record with dynamic grooves.
- **Automated Random Shuffle:** Songs play in a non-repeating random order with smart history stack for the previous button.
- **Seamless Continuous Playback:** Instant auto-play transition on track skip or completion.
- **Ultra-Sleek Glassmorphism Player:** Compact, glassmorphic floating UI with responsive orientation background support.

---

## 🛠️ Tech Stack

| Category         | Technology                                         |
| ---------------- | -------------------------------------------------- |
| **Framework**    | Next.js 16 (App Router, Turbopack, `app/` root)    |
| **Language**     | TypeScript                                         |
| **Styling**      | Tailwind CSS v4 (`@theme` tokens in `globals.css`) |
| **Media Player** | YouTube iFrame API (`YT.Player`)                   |
| **Analytics**    | `@vercel/analytics` & `@vercel/speed-insights`     |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have **Node.js 18+** installed on your system.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/nostalgia-fm.git
   cd nostalgia-fm
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open local preview:**
   Visit `http://localhost:3000` in your web browser.

### Production Build

To build and run the production bundle locally:

```bash
npm run build
npm start
```

---

## 🏗️ Architecture & How It Was Built

1. **Layered Background System:**
   - Fixed background container switching between landscape (`scene-wide.jpg`) and portrait (`scene-tall.jpg`) based on screen orientation.
   - SVG `feTurbulence` noise overlay for authentic analog texture.
2. **Hidden Audio Engine:**
   - An off-screen, fully isolated YouTube iframe engine managed via React `useRef` and `loadVideoById`.
   - Automatic handling of playback states (`PLAYING`, `PAUSED`, `ENDED`) and debounced error recovery.
3. **Smart History Stack:**
   - Next track selection uses random non-repeating index calculation while pushing past track indices into a `historyStack` ref, allowing natural backward navigation.

---

## ⚖️ Copyright & Disclaimer

> [!IMPORTANT]
> **Educational & Non-Commercial Fun Project Only**
>
> All music, audio streams, song titles, artwork, and character representations in this project belong strictly to their respective rightful owners and copyright holders, including **Yash Raj Films (YRF)**, **T-Series**, **Saregama India**, **Tips Music**, **Venus Records & Tapes**, and **Dharma Productions**.
>
> - Audio tracks are streamed via official YouTube channels through the public YouTube iFrame Embed API.
> - This application does **not** host, re-upload, store, or monetize any copyrighted audio or media files.
> - No copyright infringement is intended. This project was built purely as a non-commercial tribute fan app for educational and personal appreciation purposes.

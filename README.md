# LEONIDA // GTA 6 (Vice City & State of Leonida) 100% Completion & Secrets Companion Web App

> **Blazing-fast, mobile-first, SEO-optimized PWA designed as a "second-screen" companion for PlayStation 5 and Xbox Series X|S players.**

Built with **Next.js 14+ (App Router)**, **TypeScript**, **Tailwind CSS**, and zero-friction client-side `localStorage` state management.

---

## 🌴 Visual Design & Aesthetic: "Vice Neon Dark"

- **OLED Dark Mode (`#09090B`):** Low-light gaming room optimized with `#121216` elevated cards and `#27272A` borders.
- **Vice Accents:** Electric Pink (`#EC4899`), Sunset Cyan (`#06B6D4`), and Gold Amber (`#F59E0B`).
- **Mobile Ergonomics:** Minimum **`48px`** touch targets across all checkboxes and filter chips for easy one-thumb tapping while holding a DualSense or Xbox controller.
- **Micro-Animations & Celebration:** Integrated haptic vibration and confetti fireworks upon reaching 100% state completion.

---

## ⚡ Core Features

1. **Sticky Global Command Header:**
   - Live completion percentage calculated dynamically across all 7 disciplines (`XX.X% • Completed/Total`).
   - **Spoiler-Shield Toggle (CRITICAL):** Masks plot-heavy mission titles, coordinates, and twist hints with `blur-sm` and a "Tap to Reveal" button.
   - **Instant Search (`Cmd+K` / `Ctrl+K`):** Global modal searching missions, collectibles, stunt jumps, and cheat codes.
   - **Pro Cloud Sync Modal:** Early access email capture to validate cross-device cloud sync demand.

2. **Master Dashboard (`/`):**
   - Hero Progress summary with category progress bars and state breakdown.
   - Pinned Queue: High-priority targets pinned for immediate tracking.
   - Quick-Access Jump Grid: One-tap cards into Cheats, Collectibles, Story, and Trophies.
   - Region breakdown (Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia, Mount Kalaga).

3. **Checklist Engine (`/tracker/[category]`):**
   - Static pre-rendering for all categories via `generateStaticParams`.
   - Filters: `All`, `Remaining`, `Completed`, plus Region selector.
   - Accordion for GPS coordinates, step-by-step intel, and player notes.
   - In-feed ad slots (`<AdSlot position="in-feed" />`) every 8 items with fixed `min-height` to guarantee zero Cumulative Layout Shift (CLS).

4. **Dedicated Cheats Directory (`/cheats`):**
   - High-speed target for search queries ("GTA 6 PS5 cheats", "GTA 6 Xbox cheats").
   - Instant Platform Switcher (`PlayStation 5` vs `Xbox Series X|S`).
   - Color-coded visual controller keycaps (`△`, `○`, `✕`, `□`, `R1`, `L1`, `Y`, `B`, `A`, `X`, D-pad).
   - In-game phone dial codes with one-tap copy.
   - Session trophy warning banner.

5. **Data Architecture & Save File Portability:**
   - Zero login friction on Day 1.
   - Full `.json` export and import backup functionality.

---

## 🚀 How to Add New Collectibles & Missions in Seconds

All data is modular, strictly typed, and stored inside [`/src/data/trackerData.ts`](file:///Users/gaurav/Second%20Screen/src/data/trackerData.ts).

### Adding a new checklist item:
Simply append an object to `TRACKER_ITEMS`:
```typescript
{
  id: 'col-09',
  title: 'Smuggler Caches (03/25): Venetian Causeway Pylon',
  category: 'collectibles',
  region: 'Vice City',
  description: 'Waterproof lockbox attached to submerged pylon near Venetian islands.',
  locationHint: 'Under the western bascule bridge span, 8 meters deep.',
  coordinates: '25.7910, -80.1650',
  isSpoiler: false,
  rewards: ['$5,000 Cash', 'Armor Vest'],
  difficulty: 'Easy',
  tags: ['Underwater', 'Cache'],
}
```

### Adding a new cheat code:
Append an object to `CHEAT_CODES`:
```typescript
{
  id: 'cheat-14',
  title: 'Fast Run (Sprint Boost)',
  category: 'Player & Health',
  description: 'Increases player sprint velocity by 50%.',
  ps5Code: ['△', '←', '→', '→', 'L2', 'L1', '□'],
  xboxCode: ['Y', '←', '→', '→', 'LT', 'LB', 'X'],
  phoneDialCode: '1-999-228-2463',
  disablesAchievements: true,
}
```

---

## 📦 Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser (or your smartphone on the same local network).

3. Build for production:
   ```bash
   npm run build
   ```

---

## 🌐 Deploy to Vercel in 2 Minutes

### Option 1: Via Vercel Web Dashboard (Easiest)
1. Push your repository to GitHub or GitLab:
   ```bash
   git init
   git add .
   git commit -m "Initial GTA 6 100% Companion App"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your repository.
4. Next.js will be detected automatically. Click **Deploy**.

### Option 2: Via Vercel CLI
```bash
npx vercel
```
Follow the CLI prompts to deploy directly from your terminal.

---

## 📱 Installing on iPhone / Android (PWA Second-Screen Mode)

- **iOS (Safari):** Open the site, tap the **Share** button, and select **Add to Home Screen**.
- **Android (Chrome):** Open the site, tap the menu (three dots), and select **Install App** / **Add to Home Screen**.
- **Result:** Fullscreen, notch-aware OLED black presentation with zero browser navigation bar clutter while playing.

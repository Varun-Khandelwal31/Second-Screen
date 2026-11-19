import type { Metadata, Viewport } from 'next';
import './globals.css';
import { TrackerProvider } from '@/context/TrackerContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://leonida-tracker.vercel.app'),
  title: 'LEONIDA // GTA 6 100% Completion Tracker, Secrets & Cheats (PS5 & Xbox)',
  description:
    'Blazing-fast mobile-first GTA 6 (Leonida & Vice City) 100% Completion Companion App. Track story missions, smuggler caches, stunt jumps, collectibles, and instant PS5 & Xbox controller cheat codes.',
  keywords: [
    'GTA 6 100% completion checklist',
    'GTA 6 secrets tracker',
    'GTA 6 cheats PS5',
    'GTA 6 cheats Xbox',
    'Vice City collectibles map',
    'Leonida Keys stunt jumps',
    'GTA 6 gold medal requirements',
    'GTA 6 second screen companion',
  ],
  authors: [{ name: 'Leonida Community Team' }],
  manifest: '/manifest.json',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'LEONIDA // GTA 6 100% Completion & Secrets Companion',
    description:
      'The ultimate second-screen companion web app for GTA 6 on PS5 & Xbox Series X|S. Live tracking, spoiler shield, collectibles coordinates, and interactive cheat buttons.',
    url: 'https://leonida-tracker.vercel.app',
    siteName: 'LEONIDA 100% Companion',
    images: [
      {
        url: '/icon.svg',
        width: 512,
        height: 512,
        alt: 'GTA 6 Leonida 100% Completion Companion',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LEONIDA // GTA 6 100% Completion Companion',
    description: 'Second-screen tracker for GTA 6 players on PS5 & Xbox. Cheats, collectibles & spoiler shield.',
    images: ['/icon.svg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#09090B',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'LEONIDA // GTA 6 100% Completion Companion',
        applicationCategory: 'GameApplication',
        operatingSystem: 'Any (Web, iOS, Android, PS5, Xbox)',
        browserRequirements: 'Requires modern JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
        },
        description:
          'Second-screen web companion and 100% checklist tracker for Grand Theft Auto VI (Leonida & Vice City) on PlayStation 5 and Xbox Series X|S.',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Does this GTA 6 companion app work offline and save my progress?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! The app runs completely client-side using localStorage. You require zero account login on Day 1, and you can export or import your save file anytime as a backup JSON file.',
            },
          },
          {
            '@type': 'Question',
            name: 'What does the Spoiler Shield feature do?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'When Spoiler Shield is ON, storyline mission titles, secret locations, and plot hints are blurred with a blur filter to prevent spoilers while browsing collectibles. You can tap to reveal any item individually.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do cheat codes disable Trophies and Achievements in GTA 6?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Entering controller button cheats on PS5 or Xbox disables PlayStation Trophies and Xbox Achievements for the current game session. Always keep a separate clean save before activating cheats.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I use this app on my smartphone while playing on PS5 / Xbox?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Open the website in Safari (iOS) or Chrome (Android) and tap "Add to Home Screen" to install it as an OLED-optimized fullscreen PWA. Large 48px tap targets allow easy thumb check-offs while holding your controller.',
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#09090B] text-zinc-100 min-h-screen flex flex-col font-sans selection:bg-pink-500/30 selection:text-white antialiased">
        <TrackerProvider>
          <Header />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
            {children}
          </main>
          <Footer />
        </TrackerProvider>
      </body>
    </html>
  );
}

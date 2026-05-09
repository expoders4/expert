import type { Metadata } from 'next';
import HomeClient from './homeClient';   // ← import the client wrapper

export const metadata: Metadata = {
  title: 'TOUGH Architects — Architecture & Interior Design',
  description: 'Award-winning architectural firm...',
  // ... rest of your metadata
};

export default function HomePage() {
  return <HomeClient />;
}
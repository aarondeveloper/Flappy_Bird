'use client';

import Game from '@/components/Game';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">
        Flappy Bird
      </h1>
      <div className="relative bg-white/5 backdrop-blur-sm p-8 rounded-lg shadow-2xl">
        <Game />
        <p className="text-center mt-4 text-sm text-gray-300">
          Press SPACE or click to jump | Press D to toggle debug mode
        </p>
      </div>
      <footer className="mt-8 text-center text-sm text-gray-400">
        <p>Built with Next.js and TypeScript</p>
      </footer>
    </main>
  );
} 
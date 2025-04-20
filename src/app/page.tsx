'use client';

import Game from '@/components/Game';
import HighScores from '@/components/HighScores';
import { useState } from 'react';
import { Difficulty } from '@/components/GameDifficulty';

export default function Home() {
  // Move high scores state to the page level
  const [highScores, setHighScores] = useState<Record<Difficulty, number>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('highScores');
      return saved ? JSON.parse(saved) : {
        easy: 0,
        medium: 0,
        hard: 0
      };
    }
    return {
      easy: 0,
      medium: 0,
      hard: 0
    };
  });

  return (
    <div className="relative w-full min-h-screen">
      <HighScores scores={highScores} />
      
      <main className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          Flappy Bird
        </h1>
        <div className="relative bg-white/5 backdrop-blur-sm p-8 rounded-lg shadow-2xl">
          <Game onHighScoreUpdate={setHighScores} />
          <p className="text-center mt-4 text-sm text-gray-300">
            Press SPACE or click to jump
          </p>
        </div>
        <footer className="mt-8 text-center text-sm text-gray-400">
          <p>Built with Next.js and TypeScript</p>
        </footer>
      </main>
    </div>
  );
} 
import React from 'react';
import { Difficulty } from './GameDifficulty';

interface GameOverProps {
  score: number;
  onRestart: () => void;
  currentDifficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

const GameOver: React.FC<GameOverProps> = ({ 
  score, 
  onRestart, 
  currentDifficulty,
  onDifficultyChange 
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: '20px',
        borderRadius: '10px',
        color: 'white',
      }}
    >
      <h2>Game Over!</h2>
      <p>Score: {score}</p>
      <div style={{ marginBottom: '20px' }}>
        <p>Change Difficulty:</p>
        <select
          value={currentDifficulty}
          onChange={(e) => onDifficultyChange(e.target.value as Difficulty)}
          style={{
            padding: '5px',
            marginBottom: '10px',
            borderRadius: '4px',
          }}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <button
        onClick={onRestart}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Play Again
      </button>
    </div>
  );
};

export default GameOver; 
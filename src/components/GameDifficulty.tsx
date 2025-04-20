import React from 'react';

export type Difficulty = 'easy' | 'medium' | 'hard';

export const DIFFICULTY_SETTINGS = {
  easy: {
    PIPE_GAP: 170,
    PIPE_SPEED: 4,
    GRAVITY: 0.2,
  },
  medium: {
    PIPE_GAP: 150,
    PIPE_SPEED: 5,
    GRAVITY: 0.25,
  },
  hard: {
    PIPE_GAP: 130,
    PIPE_SPEED: 6,
    GRAVITY: 0.3,
  },
} as const;

interface GameDifficultyProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  isGameOver: boolean;
}

const GameDifficulty: React.FC<GameDifficultyProps> = ({
  difficulty,
  onDifficultyChange,
  isGameOver
}) => {
  return (
    <select 
      value={difficulty} 
      onChange={(e) => onDifficultyChange(e.target.value as Difficulty)}
      disabled={!isGameOver}
      style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        padding: '5px',
        borderRadius: '4px',
        backgroundColor: isGameOver ? 'white' : 'rgba(255, 255, 255, 0.5)',
        cursor: isGameOver ? 'pointer' : 'not-allowed',
      }}
    >
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
  );
};

export default GameDifficulty; 
import React from 'react';
import { Difficulty } from './GameDifficulty';

interface StartScreenProps {
  onStart: (difficulty: Difficulty) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: '30px',
        borderRadius: '10px',
        color: 'white',
        width: '300px',
      }}
    >
      <h2>Select Difficulty</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
        {(['easy', 'medium', 'hard'] as const).map((diff) => (
          <button
            key={diff}
            onClick={() => onStart(diff)}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              textTransform: 'capitalize',
            }}
          >
            {diff}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StartScreen; 
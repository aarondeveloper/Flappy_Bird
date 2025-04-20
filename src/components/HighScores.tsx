import React from 'react';
import { Difficulty } from './GameDifficulty';

interface HighScoresProps {
  scores: Record<Difficulty, number>;
}

const HighScores: React.FC<HighScoresProps> = ({ scores }) => {
  return (
    <div style={{
      position: 'absolute',
      top: '20%',
      left: '5%',
      backgroundColor: 'rgba(249, 115, 22, 0.9)', // Strong orange with high opacity
      backdropFilter: 'blur(8px)',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      zIndex: 50,
    }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        textAlign: 'center',
        color: 'white',
        borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
        paddingBottom: '0.5rem',
      }}>
        High Scores
      </h2>
      <div style={{ minWidth: '180px' }}>
        {(Object.entries(scores) as [Difficulty, number][]).map(([mode, score]) => (
          <div key={mode} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.75rem',
          }}>
            <span style={{
              color: 'white',
              fontWeight: '500',
              textTransform: 'capitalize',
            }}>
              {mode}:
            </span>
            <span style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1.125rem',
            }}>
              {score}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighScores; 
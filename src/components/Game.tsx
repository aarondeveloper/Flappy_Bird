import React, { useState, useEffect, useCallback } from 'react';
import Bird from './Bird';
import Pipe from './Pipe';
import GameOver from './GameOver';
import GameDifficulty, { 
  Difficulty, 
  DIFFICULTY_SETTINGS 
} from './GameDifficulty';
import StartScreen from './StartScreen';

// Game constants
const GAME_CONFIG = {
  GRAVITY: 0.25,
  JUMP_FORCE: -6,
  PIPE_WIDTH: 10,
  PIPE_GAP: 150,
  GAME_HEIGHT: 500,
  GAME_WIDTH: 800,
  PIPE_SPEED: 5,
  BIRD_WIDTH: 30,
  BIRD_HEIGHT: 24,
  BIRD_X: 50,
  PIPE_SPACING: 500
,
} as const;

const SOUNDS = {
  jump: new Audio('/sounds/jump.mp3'),
  score: new Audio('/sounds/score.mp3'),
  hit: new Audio('/sounds/hit.mp3'),
};

interface PipeData {
  x: number;
  height: number;
  id: number;
  scored: boolean;
}

const Game: React.FC = () => {
  // Game state
  const [birdPosition, setBirdPosition] = useState(GAME_CONFIG.GAME_HEIGHT / 2);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [pipes, setPipes] = useState<PipeData[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [showDebug, setShowDebug] = useState(false);
  const [pipeIdCounter, setPipeIdCounter] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('highScore') || '0');
    }
    return 0;
  });
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [particles, setParticles] = useState<Array<{x: number, y: number, velocity: number}>>([]);
  const [gameStarted, setGameStarted] = useState(false);

  // Game logic
  const generatePipe = useCallback(() => {
    const minHeight = 120;
    const maxHeight = 350;
    const height = Math.random() * (maxHeight - minHeight) + minHeight;
    setPipeIdCounter(prev => prev + 1);
    return { 
      x: GAME_CONFIG.GAME_WIDTH, 
      height, 
      id: pipeIdCounter,
      scored: false
    };
  }, [pipeIdCounter]);

  const handleJump = useCallback(() => {
    if (!isGameOver) {
      setBirdVelocity(GAME_CONFIG.JUMP_FORCE);
      setRotation(-20);
      SOUNDS.jump.play().catch(() => {});
      setParticles(prev => [...prev, 
        ...Array(5).fill(0).map(() => ({
          x: GAME_CONFIG.BIRD_X,
          y: birdPosition,
          velocity: Math.random() * 2 - 1
        }))
      ]);
    }
  }, [isGameOver, birdPosition]);

  const checkCollision = useCallback((
    birdPos: number, 
    pipe: PipeData
  ): boolean => {
    const birdLeft = GAME_CONFIG.BIRD_X + 5;
    const birdRight = birdLeft + GAME_CONFIG.BIRD_WIDTH;
    const birdTop = birdPos + 3;
    const birdBottom = birdTop + GAME_CONFIG.BIRD_HEIGHT;

    return (
      birdRight > pipe.x && 
      birdLeft < pipe.x + GAME_CONFIG.PIPE_WIDTH && 
      (birdTop < pipe.height || birdBottom > pipe.height + GAME_CONFIG.PIPE_GAP)
    );
  }, []);

  const updatePipes = useCallback((currentPipes: PipeData[]): PipeData[] => {
    return currentPipes
      .map(pipe => ({ ...pipe, x: pipe.x - GAME_CONFIG.PIPE_SPEED }))
      .filter(pipe => pipe.x > -GAME_CONFIG.PIPE_WIDTH);
  }, []);

  const resetGame = () => {
    setBirdPosition(GAME_CONFIG.GAME_HEIGHT / 2);
    setBirdVelocity(0);
    setPipes([]);
    setScore(0);
    setIsGameOver(false);
    setRotation(0);
  };

  const handleDifficultyChange = useCallback((newDifficulty: Difficulty) => {
    if (isGameOver) {
      setDifficulty(newDifficulty);
    }
  }, [isGameOver]);

  const handleGameStart = useCallback((selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setGameStarted(true);
  }, []);

  // Game loop
  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (!isGameOver) {
        // Update bird position with screen boundary check
        setBirdPosition(prev => {
          const newPosition = prev + birdVelocity;
          if (newPosition > GAME_CONFIG.GAME_HEIGHT || newPosition < 0) {
            setIsGameOver(true);
            return prev;
          }
          return newPosition;
        });
        
        // Use difficulty settings for gravity
        setBirdVelocity(prev => 
          Math.min(prev + DIFFICULTY_SETTINGS[difficulty].GRAVITY, 6)
        );
        setRotation(prev => birdVelocity > 0 ? Math.min(prev + 2, 90) : prev);

        // Update pipes and check collisions
        setPipes(prevPipes => {
          const newPipes = prevPipes
            .map(pipe => ({ 
              ...pipe, 
              x: pipe.x - DIFFICULTY_SETTINGS[difficulty].PIPE_SPEED 
            }))
            .filter(pipe => pipe.x > -GAME_CONFIG.PIPE_WIDTH);
          
          // Check collisions
          for (const pipe of prevPipes) {
            if (pipe.x > GAME_CONFIG.BIRD_X - GAME_CONFIG.PIPE_WIDTH && 
                pipe.x < GAME_CONFIG.BIRD_X + GAME_CONFIG.BIRD_WIDTH) {
              if (checkCollision(birdPosition, pipe)) {
                setIsGameOver(true);
                SOUNDS.hit.play().catch(() => {});
                break;
              }
            }
            
            // Update score when bird passes pipe
            if (!pipe.scored && pipe.x < GAME_CONFIG.BIRD_X) {
              setScore(prev => prev + 1);
              pipe.scored = true;
              SOUNDS.score.play().catch(() => {});
            }
          }

          // Add new pipe with increased spacing
          if (prevPipes.length === 0 || prevPipes[prevPipes.length - 1].x < GAME_CONFIG.PIPE_SPACING) {
            return [...newPipes, generatePipe()];
          }

          return newPipes;
        });
      }
    }, 16);

    return () => clearInterval(gameLoop);
  }, [birdVelocity, isGameOver, generatePipe, birdPosition, checkCollision, difficulty]);

  // Input handlers
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') handleJump();
      if (e.code === 'KeyD') setShowDebug(prev => !prev);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleJump]);

  // Update high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('highScore', score.toString());
    }
  }, [score, highScore]);

  // Update and render particles
  useEffect(() => {
    const particleInterval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(p => ({...p, y: p.y + p.velocity, x: p.x - 1}))
          .filter(p => p.x > 0)
      );
    }, 16);
    
    return () => clearInterval(particleInterval);
  }, []);

  return (
    <div
      onClick={gameStarted ? handleJump : undefined}
      style={{
        width: `${GAME_CONFIG.GAME_WIDTH}px`,
        height: `${GAME_CONFIG.GAME_HEIGHT}px`,
        backgroundColor: '#87CEEB',
        position: 'relative',
        overflow: 'hidden',
        cursor: gameStarted ? 'pointer' : 'default',
      }}
    >
      {!gameStarted ? (
        <StartScreen onStart={handleGameStart} />
      ) : (
        <>
          <GameDifficulty 
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            isGameOver={isGameOver}
          />
          <Bird birdPosition={birdPosition} rotation={rotation} />
          
          {/* Debug bird hitbox */}
          {showDebug && (
            <div
              style={{
                position: 'absolute',
                left: `${GAME_CONFIG.BIRD_X + 5}px`,
                top: `${birdPosition + 3}px`,
                width: `${GAME_CONFIG.BIRD_WIDTH}px`,
                height: `${GAME_CONFIG.BIRD_HEIGHT}px`,
                border: '1px solid red',
                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                zIndex: 100,
              }}
            />
          )}
          
          {pipes.map(pipe => (
            <Pipe
              key={pipe.id}
              x={pipe.x}
              height={pipe.height}
              gap={DIFFICULTY_SETTINGS[difficulty].PIPE_GAP}
              gameHeight={GAME_CONFIG.GAME_HEIGHT}
              debug={showDebug}
            />
          ))}

          <div
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              fontSize: '24px',
              color: 'white',
            }}
          >
            Score: {score}
          </div>

          <div style={{
            position: 'absolute',
            top: '50px',
            right: '20px',
            fontSize: '20px',
            color: 'white',
          }}>
            High Score: {highScore}
          </div>

          {isGameOver && (
            <GameOver 
              score={score} 
              onRestart={resetGame}
              currentDifficulty={difficulty}
              onDifficultyChange={handleDifficultyChange}
            />
          )}

          {particles.map((p, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: p.x,
                top: p.y,
                width: '4px',
                height: '4px',
                backgroundColor: 'white',
                borderRadius: '50%',
                opacity: 0.6,
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Game; 
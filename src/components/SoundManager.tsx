import React, { useEffect, useRef } from 'react';

export type SoundType = 'flap' | 'score' | 'hit';

interface SoundManagerProps {
  onLoad: (playSound: (type: SoundType) => void) => void;
}

const SOUND_FILES: Record<SoundType, string> = {
  flap: '/sounds/flap.mp3',
  score: '/sounds/score.mp3',
  hit: '/sounds/hit.mp3',
};

const SoundManager: React.FC<SoundManagerProps> = ({ onLoad }) => {
  const soundsRef = useRef<Record<SoundType, HTMLAudioElement | null>>({
    flap: null,
    score: null,
    hit: null,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Pre-load all sounds
      const loadedSounds: Record<SoundType, HTMLAudioElement> = {
        flap: new Audio(SOUND_FILES.flap),
        score: new Audio(SOUND_FILES.score),
        hit: new Audio(SOUND_FILES.hit),
      };

      // Store in ref
      soundsRef.current = loadedSounds;

      // Create play function with sound check
      const playSound = (type: SoundType) => {
        try {
          const sound = soundsRef.current[type];
          if (sound) {
            // Reset and play
            sound.currentTime = 0;
            const playPromise = sound.play();
            if (playPromise) {
              playPromise.catch((error) => {
                console.log(`Error playing ${type} sound:`, error);
              });
            }
          } else {
            console.log(`Sound ${type} not found`);
          }
        } catch (error) {
          console.log(`Error handling ${type} sound:`, error);
        }
      };

      // Pass play function to parent
      onLoad(playSound);

      // Optional: Test sound loading
      console.log('Sounds initialized:', Object.keys(loadedSounds));
    }
  }, [onLoad]);

  return null;
};

export default SoundManager; 
import React from 'react';
import { motion } from 'framer-motion';

interface BirdProps {
  birdPosition: number;
  rotation: number;
}

const Bird: React.FC<BirdProps> = ({ birdPosition, rotation }) => {
  return (
    <motion.div
      style={{
        width: '40px',
        height: '30px',
        position: 'absolute',
        left: '50px',
        top: `${birdPosition}px`,
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.1s',
      }}
    >
      {/* Bird body */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: '#E31B23', // Red body
          borderRadius: '50% 50% 40% 40%',
        }}
      />
      {/* Wing */}
      <div
        style={{
          position: 'absolute',
          width: '60%',
          height: '60%',
          backgroundColor: '#F7567C', // Lighter red
          borderRadius: '50%',
          top: '5px',
          left: '5px',
        }}
      />
      {/* Eye */}
      <div
        style={{
          position: 'absolute',
          width: '12px',
          height: '12px',
          backgroundColor: 'white',
          borderRadius: '50%',
          top: '8px',
          right: '8px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '6px',
            height: '6px',
            backgroundColor: 'black',
            borderRadius: '50%',
            top: '3px',
            right: '3px',
          }}
        />
      </div>
      {/* Beak */}
      <div
        style={{
          position: 'absolute',
          width: '15px',
          height: '10px',
          backgroundColor: '#FDB813', // Yellow
          borderRadius: '40% 60% 40% 40%',
          transform: 'rotate(-10deg)',
          right: '-5px',
          top: '12px',
        }}
      />
    </motion.div>
  );
};

export default Bird; 
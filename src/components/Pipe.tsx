import React from 'react';

interface PipeProps {
  x: number;
  height: number;
  gap: number;
  gameHeight: number;
  debug?: boolean;
}

const Pipe: React.FC<PipeProps> = ({ x, height, gap, gameHeight, debug }) => {
  return (
    <React.Fragment>
      {/* Top Pipe */}
      <div
        style={{
          position: 'absolute',
          left: `${x}px`,
          top: 0,
          width: '60px',
          height: `${height}px`,
          backgroundColor: '#3CB043',
        }}
      />
      {/* Bottom Pipe */}
      <div
        style={{
          position: 'absolute',
          left: `${x}px`,
          top: `${height + gap}px`,
          width: '60px',
          height: `${gameHeight - height - gap}px`,
          backgroundColor: '#3CB043',
        }}
      />
      
      {/* Debug Hitboxes */}
      {debug && (
        <>
          <div
            style={{
              position: 'absolute',
              left: `${x}px`,
              top: 0,
              width: '60px',
              height: `${height}px`,
              border: '1px solid blue',
              backgroundColor: 'rgba(0, 0, 255, 0.2)',
              zIndex: 100,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: `${x}px`,
              top: `${height + gap}px`,
              width: '60px',
              height: `${gameHeight - height - gap}px`,
              border: '1px solid blue',
              backgroundColor: 'rgba(0, 0, 255, 0.2)',
              zIndex: 100,
            }}
          />
        </>
      )}
    </React.Fragment>
  );
};

export default Pipe; 
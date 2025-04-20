interface BackgroundProps {
  offset: number;
}

const Background: React.FC<BackgroundProps> = ({ offset }) => {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          width: '200%',
          height: '100%',
          backgroundImage: 'url(/images/clouds.png)',
          backgroundRepeat: 'repeat-x',
          transform: `translateX(${offset * 0.2}px)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          width: '200%',
          height: '20%',
          backgroundImage: 'url(/images/ground.png)',
          backgroundRepeat: 'repeat-x',
          transform: `translateX(${offset}px)`,
        }}
      />
    </>
  );
}; 
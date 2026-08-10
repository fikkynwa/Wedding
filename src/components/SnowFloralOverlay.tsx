import React from 'react';

interface Particle {
  id: number;
  left: number; // percentage
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  opacity: number;
  type: 'snow' | 'petal';
}

export const SnowFloralOverlay: React.FC = () => {
  // Generate 24 random particles
  const particles: Particle[] = Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: Math.random() * 8 + 6, // 6px to 14px
    duration: Math.random() * 8 + 7, // 7s to 15s
    delay: Math.random() * 6, // 0s to 6s
    opacity: Math.random() * 0.6 + 0.3,
    type: i % 3 === 0 ? 'petal' : 'snow',
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute top-[-20px] animate-falling-particle"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
          }}
        >
          {p.type === 'petal' ? (
            <div
              className="w-full h-full bg-[#E8A598] rounded-full opacity-80"
              style={{
                borderRadius: '80% 0 80% 0',
                transform: 'rotate(45deg)',
                filter: 'drop-shadow(0 1px 2px rgba(217, 130, 130, 0.4))',
              }}
            />
          ) : (
            <div className="w-full h-full bg-white rounded-full shadow-sm opacity-90 border border-[#E8A598]/30 blur-[0.3px]" />
          )}
        </div>
      ))}
    </div>
  );
};

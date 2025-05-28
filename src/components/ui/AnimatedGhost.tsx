
import { Ghost } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AnimatedGhostProps {
  className?: string;
  color?: string;
  size?: number;
  style?: React.CSSProperties;
}

const AnimatedGhost = ({ 
  className = '', 
  color = '#8b5cf6', 
  size = 24,
  style = {}
}: AnimatedGhostProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const calculateTransform = () => {
    if (!isHovered) return 'translate(0, 0)';
    
    // Calcular distância do mouse em relação ao centro da tela
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const deltaX = (mousePos.x - centerX) * 0.02;
    const deltaY = (mousePos.y - centerY) * 0.02;
    
    return `translate(${-deltaX}px, ${-deltaY}px)`;
  };

  return (
    <div
      className={`inline-block transition-all duration-500 ease-out ${className}`}
      style={{
        ...style,
        transform: calculateTransform(),
        filter: isHovered ? 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))' : 'none'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Ghost 
        size={size} 
        color={color}
        className={`animate-pulse ${isHovered ? 'animate-bounce' : ''}`}
      />
    </div>
  );
};

export default AnimatedGhost;

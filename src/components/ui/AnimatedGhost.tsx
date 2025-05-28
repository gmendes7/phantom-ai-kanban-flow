
import { Ghost } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface AnimatedGhostProps {
  className?: string;
  color?: string;
  size?: number;
  style?: React.CSSProperties;
  variant?: 'default' | 'pac-man' | 'floating';
}

const AnimatedGhost = ({ 
  className = '', 
  color = '#8b5cf6', 
  size = 24,
  style = {},
  variant = 'default'
}: AnimatedGhostProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ghostRef = useRef<HTMLDivElement>(null);
  const [ghostPos, setGhostPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Atualizar posição do fantasma baseado na posição do elemento
  useEffect(() => {
    if (ghostRef.current) {
      const rect = ghostRef.current.getBoundingClientRect();
      setGhostPos({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    }
  }, []);

  const calculateTransform = () => {
    if (variant === 'floating') {
      return 'translateY(0)';
    }

    if (!isHovered || variant === 'default') {
      return 'translate(0, 0)';
    }
    
    // Calcular distância do mouse em relação ao fantasma
    const deltaX = mousePos.x - ghostPos.x;
    const deltaY = mousePos.y - ghostPos.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // Se o mouse estiver muito perto, o fantasma se afasta
    if (distance < 100) {
      const repelForce = (100 - distance) * 0.3;
      const normalizedX = deltaX / distance;
      const normalizedY = deltaY / distance;
      
      return `translate(${-normalizedX * repelForce}px, ${-normalizedY * repelForce}px)`;
    }
    
    return 'translate(0, 0)';
  };

  const getAnimationClasses = () => {
    switch (variant) {
      case 'pac-man':
        return `animate-pulse ${isHovered ? 'animate-bounce' : ''}`;
      case 'floating':
        return 'animate-bounce';
      default:
        return `animate-pulse ${isHovered ? 'animate-bounce' : ''}`;
    }
  };

  const getFilterEffect = () => {
    if (!isHovered) return 'none';
    
    switch (variant) {
      case 'pac-man':
        return 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.8)) brightness(1.2)';
      case 'floating':
        return 'drop-shadow(0 0 15px rgba(139, 92, 246, 0.6))';
      default:
        return 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))';
    }
  };

  return (
    <div
      ref={ghostRef}
      className={`inline-block transition-all duration-500 ease-out cursor-pointer ${className}`}
      style={{
        ...style,
        transform: calculateTransform(),
        filter: getFilterEffect()
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Ghost 
        size={size} 
        color={color}
        className={getAnimationClasses()}
      />
      
      {/* Olhos que seguem o mouse (apenas para variant pac-man) */}
      {variant === 'pac-man' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative">
            <div 
              className="absolute w-1 h-1 bg-black rounded-full transition-all duration-200"
              style={{
                left: `${Math.max(-2, Math.min(2, (mousePos.x - ghostPos.x) * 0.02))}px`,
                top: `${Math.max(-2, Math.min(2, (mousePos.y - ghostPos.y) * 0.02)) - size/4}px`
              }}
            />
            <div 
              className="absolute w-1 h-1 bg-black rounded-full transition-all duration-200"
              style={{
                left: `${Math.max(-2, Math.min(2, (mousePos.x - ghostPos.x) * 0.02)) + size/6}px`,
                top: `${Math.max(-2, Math.min(2, (mousePos.y - ghostPos.y) * 0.02)) - size/4}px`
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimatedGhost;

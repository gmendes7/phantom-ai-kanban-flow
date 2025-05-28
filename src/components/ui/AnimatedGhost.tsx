
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
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  // Atualizar posição do mouse globalmente
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Atualizar posição do fantasma
  useEffect(() => {
    if (ghostRef.current) {
      const rect = ghostRef.current.getBoundingClientRect();
      setGhostPos({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    }
  }, [mousePos]);

  // Calcular movimento dos olhos baseado na posição do mouse
  useEffect(() => {
    if (variant === 'pac-man' && ghostPos.x !== 0 && ghostPos.y !== 0) {
      const deltaX = mousePos.x - ghostPos.x;
      const deltaY = mousePos.y - ghostPos.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (distance > 0) {
        const maxOffset = size * 0.08; // Limite do movimento dos olhos
        const normalizedX = (deltaX / distance) * Math.min(distance / 100, 1);
        const normalizedY = (deltaY / distance) * Math.min(distance / 100, 1);
        
        setEyeOffset({
          x: normalizedX * maxOffset,
          y: normalizedY * maxOffset
        });
      }
    }
  }, [mousePos, ghostPos, variant, size]);

  const calculateTransform = () => {
    if (variant === 'floating') {
      return `translateY(${Math.sin(Date.now() * 0.002) * 5}px)`;
    }

    if (!isHovered || variant === 'default') {
      return 'translate(0, 0) scale(1)';
    }
    
    // Calcular distância do mouse em relação ao fantasma
    const deltaX = mousePos.x - ghostPos.x;
    const deltaY = mousePos.y - ghostPos.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // Se o mouse estiver próximo, o fantasma reage
    if (distance < 150) {
      const reactForce = Math.max(0, (150 - distance) / 150);
      const normalizedX = deltaX / distance || 0;
      const normalizedY = deltaY / distance || 0;
      
      // Movimento suave de reação + escala
      const moveX = -normalizedX * reactForce * 15;
      const moveY = -normalizedY * reactForce * 15;
      const scale = 1 + reactForce * 0.3;
      
      return `translate(${moveX}px, ${moveY}px) scale(${scale})`;
    }
    
    return 'translate(0, 0) scale(1)';
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
        return `drop-shadow(0 0 20px ${color}80) brightness(1.3) saturate(1.2)`;
      case 'floating':
        return `drop-shadow(0 0 15px ${color}60) brightness(1.2)`;
      default:
        return `drop-shadow(0 0 10px ${color}50) brightness(1.1)`;
    }
  };

  return (
    <div
      ref={ghostRef}
      className={`inline-block transition-all duration-300 ease-out cursor-pointer select-none ${className}`}
      style={{
        ...style,
        transform: calculateTransform(),
        filter: getFilterEffect(),
        zIndex: isHovered ? 10 : 1
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Ghost 
          size={size} 
          color={color}
          className={getAnimationClasses()}
        />
        
        {/* Olhos que seguem o mouse (apenas para variant pac-man) */}
        {variant === 'pac-man' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative" style={{ top: `-${size * 0.15}px` }}>
              {/* Olho esquerdo */}
              <div 
                className="absolute w-1.5 h-1.5 bg-black rounded-full transition-all duration-100 ease-out"
                style={{
                  left: `${-size * 0.12 + eyeOffset.x}px`,
                  top: `${eyeOffset.y}px`,
                  width: `${Math.max(1, size * 0.06)}px`,
                  height: `${Math.max(1, size * 0.06)}px`
                }}
              />
              {/* Olho direito */}
              <div 
                className="absolute w-1.5 h-1.5 bg-black rounded-full transition-all duration-100 ease-out"
                style={{
                  left: `${size * 0.12 + eyeOffset.x}px`,
                  top: `${eyeOffset.y}px`,
                  width: `${Math.max(1, size * 0.06)}px`,
                  height: `${Math.max(1, size * 0.06)}px`
                }}
              />
            </div>
          </div>
        )}
        
        {/* Partículas de energia para efeito extra no hover */}
        {isHovered && variant === 'pac-man' && (
          <div className="absolute inset-0 pointer-events-none">
            <div 
              className="absolute w-1 h-1 rounded-full animate-ping"
              style={{ 
                backgroundColor: color,
                top: '20%',
                left: '10%',
                animationDelay: '0ms'
              }}
            />
            <div 
              className="absolute w-1 h-1 rounded-full animate-ping"
              style={{ 
                backgroundColor: color,
                top: '30%',
                right: '15%',
                animationDelay: '200ms'
              }}
            />
            <div 
              className="absolute w-1 h-1 rounded-full animate-ping"
              style={{ 
                backgroundColor: color,
                bottom: '25%',
                left: '20%',
                animationDelay: '400ms'
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimatedGhost;

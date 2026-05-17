import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { animate } from 'animejs';

const HEART_COLORS = ['#fa7a7a', '#a8a6ff', '#ff4b4b', '#eab308', '#84cc16'];

// Helper sub-component to render the Heart SVG with optional extrusion styling
function HeartSVG({ 
  color, 
  grads, 
  gradId, 
  isBack = false 
}: { 
  color: string; 
  grads?: { light: string; dark: string }; 
  gradId?: string; 
  isBack?: boolean; 
}) {
  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 24 24" 
      style={{ 
        filter: isBack ? 'none' : 'drop-shadow(3px 3px 0px var(--heart-shadow-color, #1b1b22))', // Dynamic shadow color!
        transform: 'translate3d(0, 0, 0)', // Force GPU 3D hardware context
        backfaceVisibility: 'visible',
        transformStyle: 'preserve-3d',
        display: 'block'
      }}
    >
      {isBack ? (
        // High-fidelity dark silhouette for the 3D extrusion sides
        <path 
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
          fill={color} 
          stroke="var(--heart-stroke-color, #1b1b22)" // Dynamic outline!
          strokeWidth="1.5" 
        />
      ) : (
        <>
          <defs>
            <radialGradient id={gradId} cx="35%" cy="30%" r="55%" fx="35%" fy="30%">
              <stop offset="0%" stopColor={grads?.light} />
              <stop offset="75%" stopColor={color} />
              <stop offset="100%" stopColor={grads?.dark} />
            </radialGradient>
          </defs>
          <path 
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
            fill={`url(#${gradId})`} 
            stroke="var(--heart-stroke-color, #1b1b22)" // Dynamic outline!
            strokeWidth="1.5" 
          />
          <ellipse cx="7.5" cy="6.5" rx="2.2" ry="1.1" transform="rotate(-30 7.5 6.5)" fill="white" opacity="0.65" />
          <circle cx="16.5" cy="6.5" r="0.8" fill="white" opacity="0.5" />
        </>
      )}
    </svg>
  );
}

function FloatingHeart({ color, left, onComplete }: { color: string; left: number; onComplete: () => void }) {
  const gradId = useRef(`grad-${Math.random().toString(36).substr(2, 9)}`);
  
  // Custom random properties generated on mount
  const config = useRef({
    driftX: Math.random() * 2 - 1, // Tiny gentle sway (-1vw to 1vw) to strictly prevent crossover collisions!
    climbY: -(window.innerHeight / 2 + Math.random() * 80),
    rotX: Math.random() * 360 - 180,
    rotY: Math.random() * 540 - 270,
    rotZ: Math.random() * 180 - 90,
    scale: 0.9 + Math.random() * 0.5, // Refined scale (max ~180px!)
    duration: 5500 + Math.random() * 1500
  });

  // Lighter & darker shades for a high-end 3D radial balloon gradient
  const getGradientColors = (col: string) => {
    switch (col) {
      case '#fa7a7a': return { light: '#ffb3b3', dark: '#d94d4d' }; // Pink/Red
      case '#a8a6ff': return { light: '#d1cfff', dark: '#6b67ff' }; // Violet
      case '#ff4b4b': return { light: '#ff9494', dark: '#b01010' }; // Bright Red
      case '#eab308': return { light: '#fef08a', dark: '#9a3412' }; // Yellow/Orange
      case '#84cc16': return { light: '#bef264', dark: '#3f6212' }; // Lime/Forest
      default: return { light: '#ffffff', dark: col };
    }
  };

  const grads = getGradientColors(color);

  useEffect(() => {
    const timer = setTimeout(onComplete, config.current.duration);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Generate 30 dense layers for the 3D extrusion stack
  const layers = Array.from({ length: 30 });

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${left}%`,
        bottom: '0px',
        width: 'var(--heart-size, 128px)', // Dynamically controlled by CSS responsive media queries!
        height: 'var(--heart-size, 128px)', // Dynamically controlled by CSS responsive media queries!
        marginLeft: 'var(--heart-margin-neg, -64px)', // Dynamically centered!
        marginBottom: 'var(--heart-margin-neg, -64px)', // Dynamically centered!
        animation: `float3D ${config.current.duration}ms ease-in-out forwards`,
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'visible',
        perspective: '600px', // Local perspective camera for children
        // CSS Custom Properties for dynamic values
        ['--drift-x' as any]: `${config.current.driftX}vw`,
        ['--climb-y' as any]: `${config.current.climbY}px`,
        ['--rot-x' as any]: `${config.current.rotX}deg`,
        ['--rot-y' as any]: `${config.current.rotY}deg`,
        ['--rot-z' as any]: `${config.current.rotZ}deg`,
        ['--scale-max' as any]: config.current.scale,
        ['--scale-beat' as any]: config.current.scale * 0.85,
        ['--scale-beat2' as any]: config.current.scale * 1.05
      }}
    >
      {/* 3D Volumetric Extrusion Stack */}
      <div 
        className="relative" 
        style={{ 
          width: 'var(--heart-size, 128px)',
          height: 'var(--heart-size, 128px)',
          transformStyle: 'preserve-3d', 
          backfaceVisibility: 'visible',
          perspective: '600px' // Local perspective projection for layers
        }}
      >
        {layers.map((_, idx) => {
          const isFront = idx === layers.length - 1;
          const isBackFace = idx === 0;
          return (
            <div 
              key={idx} 
              className="absolute inset-0" 
              style={{ 
                transform: `translate3d(0, 0, calc(${idx} * var(--heart-z-spacing, 1.0px)))`, // Natively responsive sub-pixel Z-extrusion!
                backfaceVisibility: 'visible',
                transformStyle: 'preserve-3d' 
              }}
            >
              {(isFront || isBackFace) ? (
                <HeartSVG color={color} grads={grads} gradId={gradId.current} />
              ) : (
                <HeartSVG color={grads.dark} isBack={true} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface AssistantFaceProps {
  open: boolean;
  onToggle: () => void;
  unread: boolean;
}

export function AssistantFace({ open, onToggle, unread }: AssistantFaceProps) {
  const floatRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<SVGEllipseElement>(null);
  const rightEyeRef = useRef<SVGEllipseElement>(null);
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);
  const leftBlushRef = useRef<SVGCircleElement>(null);
  const rightBlushRef = useRef<SVGCircleElement>(null);
  const mouthRef = useRef<SVGPathElement>(null);
  const leftHandRef = useRef<SVGCircleElement>(null);
  const rightHandRef = useRef<SVGCircleElement>(null);

  const [strokeCount, setStrokeCount] = useState(0);
  const [isShy, setIsShy] = useState(false);
  const [hasBeenStroked, setHasBeenStroked] = useState(false);

  const [hearts, setHearts] = useState<{ id: number; color: string; left: number }[]>([]);
  const heartIdRef = useRef(0);

  const spawnHeart = useCallback((forcedLeft?: number) => {
    const color = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)];
    const id = heartIdRef.current++;
    const left = forcedLeft !== undefined ? forcedLeft : (Math.random() * 80 + 10);
    setHearts(prev => [...prev, { id, color, left }]);
  }, []);

  const handleHeartComplete = useCallback((id: number) => {
    setHearts(prev => prev.filter(item => item.id !== id));
  }, []);

  const timerRef = useRef<number | null>(null);
  const lastStrokeTimeRef = useRef(0);

  useEffect(() => {
    if (!floatRef.current) return;

    const floatAnim = animate(floatRef.current, {
      translateY: [-6, 6],
      duration: 3000,
      easing: 'easeInOutSine',
      loop: true,
      alternate: true,
    });

    const rotateAnim = animate(floatRef.current, {
      rotateY: [-12, 12],
      duration: 3000,
      easing: 'easeInOutSine',
      loop: true,
      alternate: true,
    });

    const winkId = window.setInterval(() => {
      if (!leftPupilRef.current || !rightPupilRef.current) return;

      const origL = leftPupilRef.current.getAttribute('r');
      const origR = rightPupilRef.current.getAttribute('r');

      animate(leftPupilRef.current, { r: 0.3, duration: 80, easing: 'easeOutQuad' });
      animate(rightPupilRef.current, { r: 0.3, duration: 80, easing: 'easeOutQuad' });

      setTimeout(() => {
        if (leftPupilRef.current && rightPupilRef.current) {
          animate(leftPupilRef.current, { r: 2, duration: 80, easing: 'easeInQuad' });
          animate(rightPupilRef.current, { r: 2, duration: 80, easing: 'easeInQuad' });
        }
      }, 120);
    }, 4000);

    return () => {
      floatAnim.pause();
      rotateAnim.pause();
      window.clearInterval(winkId);
    };
  }, []);

  // Make eyes follow cursor after being stroked
  useEffect(() => {
    if (!hasBeenStroked) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current || isShy) return; // Don't track while shy animation is playing

      const rect = buttonRef.current.getBoundingClientRect();
      const faceCenterX = rect.left + rect.width / 2;
      const faceCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - faceCenterX;
      const dy = e.clientY - faceCenterY;

      const angle = Math.atan2(dy, dx);
      // Max offset for pupil inside the eye
      const dist = Math.min(2.5, Math.sqrt(dx * dx + dy * dy) / 30);

      const offsetX = Math.cos(angle) * dist;
      const offsetY = Math.sin(angle) * dist;

      if (leftPupilRef.current) {
        leftPupilRef.current.setAttribute('cx', String(14 + offsetX));
        leftPupilRef.current.setAttribute('cy', String(17 + offsetY));
      }
      if (rightPupilRef.current) {
        rightPupilRef.current.setAttribute('cx', String(28 + offsetX));
        rightPupilRef.current.setAttribute('cy', String(17 + offsetY));
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [hasBeenStroked, isShy]);

  useEffect(() => {
    if (strokeCount >= 3 && !isShy) {
      setIsShy(true);

      // Non-overlapping column distribution for the 10 hearts (8% to 89% with perfect safety spacing)
      const columns = [8, 17, 26, 35, 44, 53, 62, 71, 80, 89];
      const shuffledColumns = [...columns].sort(() => Math.random() - 0.5);

      for (let i = 0; i < 10; i++) {
        setTimeout(() => spawnHeart(shuffledColumns[i]), i * 200);
      }

      // Trigger shy animations
      if (leftBlushRef.current) animate(leftBlushRef.current, { r: 6, fill: 'rgba(255,80,80,0.9)', duration: 400 });
      if (rightBlushRef.current) animate(rightBlushRef.current, { r: 6, fill: 'rgba(255,80,80,0.9)', duration: 400 });
      if (leftEyeRef.current) animate(leftEyeRef.current, { ry: 0.5, duration: 200 });
      if (rightEyeRef.current) animate(rightEyeRef.current, { ry: 0.5, duration: 200 });
      if (mouthRef.current) animate(mouthRef.current, { d: 'M 16 26 Q 21 28 26 26', duration: 200 });

      if (featuresRef.current) {
        animate(featuresRef.current, {
          rotateY: [-15, 15],
          rotateX: [-10, 10],
          duration: 300,
          loop: 6,
          alternate: true,
          easing: 'easeInOutSine'
        });
      }

      setTimeout(() => {
        setIsShy(false);
        setStrokeCount(0);
        setHasBeenStroked(true);

        // Revert shy animations
        if (leftBlushRef.current) animate(leftBlushRef.current, { r: 3, fill: 'rgba(255,150,150,0.4)', duration: 600 });
        if (rightBlushRef.current) animate(rightBlushRef.current, { r: 3, fill: 'rgba(255,150,150,0.4)', duration: 600 });
        if (leftEyeRef.current) animate(leftEyeRef.current, { ry: 4.5, duration: 300 });
        if (rightEyeRef.current) animate(rightEyeRef.current, { ry: 4.5, duration: 300 });
        if (mouthRef.current) animate(mouthRef.current, { d: 'M 14 24 Q 21 30 28 24', duration: 300 });
        if (featuresRef.current) animate(featuresRef.current, { rotateY: 0, rotateX: 0, duration: 300 });
      }, 2500);
    }
  }, [strokeCount, isShy]);

  // Doraemon Hands Animation when opening/closing chat (parting hands)
  useEffect(() => {
    if (open) {
      if (leftHandRef.current && rightHandRef.current) {
        animate(leftHandRef.current, {
          cx: [18, 10],
          cy: [36, 33],
          opacity: [0, 1],
          duration: 650,
          easing: 'easeOutElastic(1, .8)'
        });
        animate(rightHandRef.current, {
          cx: [24, 32],
          cy: [36, 33],
          opacity: [0, 1],
          duration: 650,
          easing: 'easeOutElastic(1, .8)'
        });
      }
    } else {
      if (leftHandRef.current && rightHandRef.current) {
        animate(leftHandRef.current, {
          cx: [10, 18],
          cy: [33, 36],
          opacity: [1, 0],
          duration: 300,
          easing: 'easeInQuad'
        });
        animate(rightHandRef.current, {
          cx: [32, 24],
          cy: [33, 36],
          opacity: [1, 0],
          duration: 300,
          easing: 'easeInQuad'
        });
      }
    }
  }, [open]);

  function handleMouseMove() {
    if (isShy) return;

    const now = Date.now();
    // Use a 450ms cooldown so each petting stroke is distinct and deliberate (takes ~1 second for 3 strokes)
    if (now - lastStrokeTimeRef.current < 450) return;
    lastStrokeTimeRef.current = now;

    // Spawn a heart for every pet stroke!
    spawnHeart();

    setStrokeCount(c => c + 1);

    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setStrokeCount(0), 1200); // 1.2s window allows natural pauses between strokes
  }

  function handleMouseEnter() {
    if (!featuresRef.current || isShy) return;

    animate(featuresRef.current, {
      scale: 1.05,
      rotateY: [0, 360],
      duration: 2500,
      easing: 'easeOutElastic(1, .8)',
    });

    if (mouthRef.current) {
      animate(mouthRef.current, {
        d: 'M 14 24 Q 21 32 28 24',
        duration: 300,
        easing: 'easeOutQuad',
        alternate: true,
      });
    }
  }

  function handleMouseLeave() {
    if (featuresRef.current && !isShy) {
      animate(featuresRef.current, {
        scale: 1,
        rotateY: 0,
        duration: 400,
        easing: 'easeOutQuad'
      });
    }
  }

  function handleClick() {
    onToggle();
  }

  return (
    <div className="relative pointer-events-auto" style={{ perspective: 1000 }}>
      {/* 3D Floating Hearts Portal rendering directly in document.body to bypass transformed container clipping */}
      {typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 pointer-events-none z-[9999999]" style={{ perspective: 1200, transformStyle: 'preserve-3d' }}>
          <style>{`
            :root {
              --heart-size: 128px;
              --heart-margin-neg: -64px;
              --heart-z-spacing: 1.0px;
              --heart-stroke-color: #ffffff;
              --heart-shadow-color: #ffffff;
            }
            /* Responsive Mobile Scale Down! */
            @media (max-width: 768px) {
              :root {
                --heart-size: 64px;
                --heart-margin-neg: -32px;
                --heart-z-spacing: 0.5px;
              }
            }
            .dark, .dark * {
              --heart-stroke-color: #1b1b22;
              --heart-shadow-color: #1b1b22;
            }
            @keyframes float3D {
              0% {
                transform: perspective(600px) translateY(150px) translateX(0px) scale3d(0.05, 0.05, 0.05) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
                opacity: 0;
              }
              15% {
                transform: perspective(600px) translateY(calc(var(--climb-y) * 0.3)) translateX(calc(var(--drift-x) * 0.3)) scale3d(var(--scale-max), var(--scale-max), var(--scale-max)) rotateX(calc(var(--rot-x) * 0.2)) rotateY(calc(var(--rot-y) * 0.2)) rotateZ(calc(var(--rot-z) * 0.2));
                opacity: 0.95;
              }
              50% {
                transform: perspective(600px) translateY(calc(var(--climb-y) * 0.6)) translateX(calc(var(--drift-x) * 0.6)) scale3d(var(--scale-beat), var(--scale-beat), var(--scale-beat)) rotateX(calc(var(--rot-x) * 0.5)) rotateY(calc(var(--rot-y) * 0.5)) rotateZ(calc(var(--rot-z) * 0.5));
                opacity: 0.95;
              }
              80% {
                transform: perspective(600px) translateY(calc(var(--climb-y) * 0.85)) translateX(calc(var(--drift-x) * 0.85)) scale3d(var(--scale-beat2), var(--scale-beat2), var(--scale-beat2)) rotateX(calc(var(--rot-x) * 0.8)) rotateY(calc(var(--rot-y) * 0.8)) rotateZ(calc(var(--rot-z) * 0.8));
                opacity: 0.95;
              }
              100% {
                transform: perspective(600px) translateY(var(--climb-y)) translateX(var(--drift-x)) scale3d(0, 0, 0) rotateX(var(--rot-x)) rotateY(var(--rot-y)) rotateZ(var(--rot-z));
                opacity: 0;
              }
            }
          `}</style>
          {hearts.map(h => (
            <FloatingHeart
              key={h.id}
              color={h.color}
              left={h.left}
              onComplete={() => handleHeartComplete(h.id)}
            />
          ))}
        </div>,
        document.body
      )}

      {unread && !open && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-error border-2 border-on-surface dark:border-[#464552] rounded-full z-10 animate-pulse" style={{ transform: 'translateZ(40px)' }} />
      )}

      <div ref={floatRef} className="relative w-[56px] h-[56px]" style={{ transformStyle: 'preserve-3d' }}>
        {/* Shadow stays outside the face rotation */}
        <div className="absolute inset-0" style={{ transform: 'translateZ(-10px)' }}>
          <svg width="56" height="56" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="21" cy="38" rx="14" ry="3" fill="rgba(0,0,0,0.12)" />
          </svg>
        </div>

        <button
          ref={buttonRef}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          aria-label={open ? 'Close chat' : 'Open chat'}
          className="absolute inset-0 cursor-pointer bg-transparent border-none p-0 outline-none"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Base Face (STATIC - never rotates, so it never flattens) */}
          <div className="absolute inset-0" style={{ transform: 'translateZ(0px)' }}>
            <svg width="56" height="56" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
              <circle cx="21" cy="20" r="18" fill="var(--color-primary-light, #2f3eff)" stroke="var(--color-on-surface, #1b1b22)" strokeWidth="2" />
            </svg>
          </div>

          {/* Features Container (SPINS 360 - features orbit around the static base) */}
          <div ref={featuresRef} className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
            {/* Blush Layer */}
            <div className="absolute inset-0 pointer-events-none" style={{ transform: 'translateZ(24px)' }}>
              <svg width="56" height="56" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
                <circle ref={leftBlushRef} cx="9" cy="22" r="3" fill="rgba(255,150,150,0.4)" />
                <circle ref={rightBlushRef} cx="33" cy="22" r="3" fill="rgba(255,150,150,0.4)" />
              </svg>
            </div>

            {/* Eyes Layer */}
            <div className="absolute inset-0 pointer-events-none" style={{ transform: 'translateZ(25px)' }}>
              <svg width="56" height="56" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
                <ellipse ref={leftEyeRef} cx="14" cy="17" rx="4" ry="4.5" fill="white" stroke="var(--color-on-surface, #1b1b22)" strokeWidth="1" />
                <circle ref={leftPupilRef} cx="15" cy="17" r="2" fill="var(--color-on-surface, #1b1b22)" />

                <ellipse ref={rightEyeRef} cx="28" cy="17" rx="4" ry="4.5" fill="white" stroke="var(--color-on-surface, #1b1b22)" strokeWidth="1" />
                <circle ref={rightPupilRef} cx="29" cy="17" r="2" fill="var(--color-on-surface, #1b1b22)" />
              </svg>
            </div>

            {/* Mouth Layer */}
            <div className="absolute inset-0 pointer-events-none" style={{ transform: 'translateZ(26px)' }}>
              <svg width="56" height="56" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
                <path
                  ref={mouthRef}
                  d="M 14 24 Q 21 30 28 24"
                  fill="none"
                  stroke="var(--color-on-surface, #1b1b22)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Hands Layer (Doraemon pocket parting animation) */}
            <div className="absolute inset-0 pointer-events-none" style={{ transform: 'translateZ(30px)' }}>
              <svg width="56" height="56" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
                <circle ref={leftHandRef} cx="18" cy="36" r="4.5" fill="white" stroke="var(--color-on-surface, #1b1b22)" strokeWidth="1.5" style={{ opacity: 0 }} />
                <circle ref={rightHandRef} cx="24" cy="36" r="4.5" fill="white" stroke="var(--color-on-surface, #1b1b22)" strokeWidth="1.5" style={{ opacity: 0 }} />
              </svg>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';

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
  const timerRef = useRef<number | null>(null);

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
      const dist = Math.min(2.5, Math.sqrt(dx*dx + dy*dy) / 30);
      
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
    if (strokeCount > 15 && !isShy) {
      setIsShy(true);

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

  // Doraemon Hands Animation when opening/closing chat
  useEffect(() => {
    if (open) {
      if (leftHandRef.current && rightHandRef.current) {
        animate([leftHandRef.current, rightHandRef.current], {
          opacity: [0, 1],
          translateY: [15, -4],
          scale: [0.5, 1],
          duration: 600,
          easing: 'easeOutElastic(1, .8)'
        });
      }
    } else {
      if (leftHandRef.current && rightHandRef.current) {
        animate([leftHandRef.current, rightHandRef.current], {
          opacity: [1, 0],
          translateY: [-4, 15],
          scale: [1, 0.5],
          duration: 300,
          easing: 'easeInQuad'
        });
      }
    }
  }, [open]);

  function handleMouseMove() {
    if (isShy) return;
    setStrokeCount(c => c + 1);

    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setStrokeCount(0), 400);
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
    <div className="relative" style={{ perspective: 1000 }}>
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

            {/* Hands Layer (Doraemon pocket animation) */}
            <div className="absolute inset-0 pointer-events-none" style={{ transform: 'translateZ(30px)' }}>
              <svg width="56" height="56" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
                <circle ref={leftHandRef} cx="12" cy="34" r="5" fill="white" stroke="var(--color-on-surface, #1b1b22)" strokeWidth="1.5" style={{ opacity: 0 }} />
                <circle ref={rightHandRef} cx="30" cy="34" r="5" fill="white" stroke="var(--color-on-surface, #1b1b22)" strokeWidth="1.5" style={{ opacity: 0 }} />
              </svg>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

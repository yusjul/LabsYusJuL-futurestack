import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

interface AssistantFaceProps {
  open: boolean;
  onToggle: () => void;
  unread: boolean;
}

export function AssistantFace({ open, onToggle, unread }: AssistantFaceProps) {
  const faceRef = useRef<HTMLButtonElement>(null);
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);
  const mouthRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!faceRef.current) return;

    const floatAnim = animate(faceRef.current, {
      translateY: { from: -6, to: 6 },
      duration: 3000,
      easing: 'easeInOutSine',
      loop: true,
      alternate: true,
    });

    const rotateAnim = animate(faceRef.current, {
      rotateY: { from: -12, to: 12 },
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

  function handleMouseEnter() {
    if (!faceRef.current) return;

    animate(faceRef.current, {
      scale: 1.3,
      rotateY: 360,
      duration: 800,
      easing: 'easeOutElastic(1, .5)',
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

  function handleClick() {
    onToggle();
  }

  return (
    <div className="relative">
      {unread && !open && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-error border-2 border-on-surface dark:border-[#464552] rounded-full z-10 animate-pulse" />
      )}

      <button
        ref={faceRef}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="cursor-pointer bg-transparent border-none p-0 outline-none"
        style={{ perspective: 400 }}
      >
        <svg width="56" height="56" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="21" cy="38" rx="14" ry="3" fill="rgba(0,0,0,0.12)" />

          <circle cx="21" cy="20" r="18" fill="var(--color-primary-light, #2f3eff)" stroke="var(--color-on-surface, #1b1b22)" strokeWidth="2" />

          <ellipse cx="14" cy="17" rx="4" ry="4.5" fill="white" stroke="var(--color-on-surface, #1b1b22)" strokeWidth="1" />
          <circle ref={leftPupilRef} cx="15" cy="17" r="2" fill="var(--color-on-surface, #1b1b22)" />

          <ellipse cx="28" cy="17" rx="4" ry="4.5" fill="white" stroke="var(--color-on-surface, #1b1b22)" strokeWidth="1" />
          <circle ref={rightPupilRef} cx="29" cy="17" r="2" fill="var(--color-on-surface, #1b1b22)" />

          <path
            ref={mouthRef}
            d="M 14 24 Q 21 30 28 24"
            fill="none"
            stroke="var(--color-on-surface, #1b1b22)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <circle cx="9" cy="22" r="3" fill="rgba(255,150,150,0.4)" />
          <circle cx="33" cy="22" r="3" fill="rgba(255,150,150,0.4)" />
        </svg>
      </button>
    </div>
  );
}

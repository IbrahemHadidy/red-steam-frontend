import { ReactNode, useEffect, useRef } from 'react';

interface FadingContainerProps {
  isVisible: boolean;
  children: ReactNode;
  transitionDuration?: number;
  className?: string;
  zIndex?: number;
}

export default function FadingContainer({
  isVisible,
  children,
  transitionDuration = 500,
  className,
  zIndex,
}: FadingContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (element) {
      if (isVisible) {
        element.style.display = 'block';
      } else {
        setTimeout(() => {
          element.style.display = 'none';
        }, transitionDuration);
      }
    }
  }, [isVisible, transitionDuration]);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transition: `opacity ${transitionDuration}ms ease-in-out`,
        zIndex: zIndex ?? 1000,
      }}
    >
      <div ref={containerRef} className={className}>
        {children}
      </div>
    </div>
  );
}

import { useEffect } from 'react';

export function useRipple(): void {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const button = (event.target as HTMLElement | null)?.closest<HTMLElement>('.btn');
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const diameter = Math.max(rect.width, rect.height);
      const ripple = document.createElement('span');
      ripple.className = 'rip';
      ripple.style.cssText = `width:${diameter}px;height:${diameter}px;left:${event.clientX - rect.left - diameter / 2}px;top:${event.clientY - rect.top - diameter / 2}px`;

      button.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 600);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
}

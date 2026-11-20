let observer: IntersectionObserver | null = null;

export function disconnectReveal(): void {
  observer?.disconnect();
  observer = null;
}

export function observeReveal(): void {
  const elements = document.querySelectorAll<HTMLElement>('.rv:not(.in)');

  if (!('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('in'));
    return;
  }

  observer ??= new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        observer?.unobserve(entry.target);
      });
    },
    { threshold: 0.1 },
  );

  elements.forEach((element) => observer?.observe(element));
}

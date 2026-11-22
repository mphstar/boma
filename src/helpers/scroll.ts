/** Scroll ke atas tanpa animasi, walau CSS memakai scroll-behavior smooth. */
export function resetScrollToTop(): void {
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';
  // Paksa style dihitung dulu supaya Chrome tidak memakai animasi smooth.
  void root.offsetHeight;
  root.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  root.style.scrollBehavior = previous;
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';

// Navigasi hash pada SPA ini selalu mulai dari atas; jangan biarkan browser
// memulihkan posisi scroll halaman admin saat kembali ke situs.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

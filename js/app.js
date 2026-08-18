/**
 * QR Studio App Entry Point
 * Ecosystem: phongdang.io.vn (qr.phongdang.io.vn)
 */

import { QREngine } from './qr-engine.js';
import { UIHandlers } from './ui-handlers.js';

document.addEventListener('DOMContentLoaded', () => {
  // Check theme preference
  const savedTheme = localStorage.getItem('phongdang_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  // Initialize QR Engine
  const qrContainer = document.getElementById('qrCanvasContainer');
  const qrEngine = new QREngine(qrContainer);

  // Initialize UI Handlers
  const ui = new UIHandlers(qrEngine);
  ui.init();

  // Register Service Worker for offline capability on Cloudflare Pages
  if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('QR Studio ServiceWorker registered:', reg.scope))
      .catch(err => console.log('ServiceWorker registration error:', err));
  }
});

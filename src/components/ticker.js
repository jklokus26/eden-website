/**
 * createTicker — infinite horizontal scroll ticker
 *
 * @param {HTMLElement} containerEl  - The wrapper element (should have overflow:hidden)
 * @param {Array<{html: string}>} items  - Items to display; each has an `html` property
 * @param {Object} options
 * @param {'left'|'right'} options.direction  - Scroll direction (default: 'left')
 * @param {number} options.speed  - Base speed factor — higher = slower (default: 30)
 * @param {string} options.gap   - Gap between items (default: '2rem')
 */
export function createTicker(containerEl, items, options = {}) {
  if (!containerEl || !items || items.length === 0) return;

  const {
    direction = 'left',
    speed = 30,
    gap = '2rem',
  } = options;

  // Build the ticker track with items duplicated for seamless loop
  const track = document.createElement('div');
  track.className = 'ticker-track';

  // Duplicate 3x for seamless looping (items must fill viewport before repeating)
  const repeated = [...items, ...items, ...items];

  repeated.forEach(item => {
    const el = document.createElement('div');
    el.className = 'ticker-item';
    el.innerHTML = item.html;
    track.appendChild(el);
  });

  containerEl.classList.add('ticker-container');
  containerEl.appendChild(track);

  // Calculate duration: items.length * speed gives consistent feel regardless of count
  const duration = items.length * speed;

  // Inject keyframe + apply animation
  const animName = `ticker-scroll-${Math.random().toString(36).slice(2, 7)}`;
  // For left-scroll: 0 → -33.33% (items flow left, loop seamlessly with 3x duplication)
  // For right-scroll: -33.33% → 0 (items flow right, start offset so left side is filled)
  const fromX = direction === 'right' ? '-33.33%' : '0';
  const toX = direction === 'right' ? '0' : '-33.33%';

  const style = document.createElement('style');
  style.textContent = `
    @keyframes ${animName} {
      from { transform: translateX(${fromX}); }
      to   { transform: translateX(${toX}); }
    }
    .${containerEl.className.split(' ').join('.')} .ticker-track {
      animation: ${animName} ${duration}s linear infinite;
    }
  `;
  document.head.appendChild(style);

  // Apply shared track styles via inline (gap can't be in generic class)
  track.style.gap = gap;

  // Pause on hover
  containerEl.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });
  containerEl.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });

  return track;
}

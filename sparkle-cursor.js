(function () {
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed;
    width: 12px;
    height: 12px;
    background: rgba(255,255,255,0.8);
    border-radius: 50%;
    pointer-events: none;
    left: 0;
    top: 0;
    z-index: 9999;
    mix-blend-mode: screen;
    opacity: 0;
    transition: opacity 0.2s ease;
  `;
  document.body.appendChild(cursor);

  let hideTimer = null;

  function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    const size = Math.random() * 8 + 3;
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 50 + 10;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    sparkle.style.cssText = `
      position: fixed;
      width: ${size}px;
      height: ${size}px;
      background: white;
      border-radius: 50%;
      pointer-events: none;
      left: ${x - size / 2}px;
      top: ${y - size / 2}px;
      z-index: 9998;
      box-shadow: 0 0 ${size * 2}px ${size}px rgba(255,255,255,0.6);
    `;
    document.body.appendChild(sparkle);

    sparkle.animate(
      [
        { opacity: 1, transform: `translate(0, 0) scale(1)` },
        { opacity: 0, transform: `translate(${dx}px, ${dy}px) scale(0)` }
      ],
      { duration: 800 + Math.random() * 400, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' }
    ).onfinish = () => sparkle.remove();
  }

  let lastSparkleTime = 0;

  function onMove(x, y) {
    cursor.style.left = (x - 6) + 'px';
    cursor.style.top = (y - 6) + 'px';
    cursor.style.opacity = '1';

    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => { cursor.style.opacity = '0'; }, 300);

    const now = Date.now();
    if (now - lastSparkleTime > 30) {
      createSparkle(x, y);
      lastSparkleTime = now;
    }
  }

  document.addEventListener('mousemove', e => onMove(e.clientX, e.clientY));
  document.addEventListener('touchmove', e => {
    e.preventDefault();
    onMove(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: false });
})();

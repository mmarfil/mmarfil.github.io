(() => {
  'use strict';
  const eye = document.querySelector('#avatar');
  const pupil = eye.querySelector('.cursor-pupil');
  const trigger = eye.querySelector('.eye-link');
  const lids = eye.querySelector('.eye-lids');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  let pointer = null;
  let lastTime = 0;
  let x = 0;
  let y = 0;
  let reaction = [];
  const paused = () => reduced.matches;

  function update(time) {
    frame = 0;
    if (paused()) return;
    let targetX = 0;
    let targetY = 0;
    if (pointer) {
      const rect = eye.getBoundingClientRect();
      const dx = pointer.x - rect.left - rect.width / 2;
      const dy = pointer.y - rect.top - rect.height / 2;
      const length = Math.hypot(dx, dy);
      // Track around the eye's center, compensating for the down-right resting position.
      const reach = Math.min(12, length / 25);
      const restingOffset = 6.5;
      targetX = dx / Math.max(1, length) * reach - restingOffset;
      targetY = dy / Math.max(1, length) * reach - restingOffset;
    }
    // Reach about 95% of the target in 135ms, regardless of refresh rate.
    const blend = 1 - Math.exp(-Math.max(0, time - lastTime) / 45);
    lastTime = time;
    x += (targetX - x) * blend;
    y += (targetY - y) * blend;
    const settled = Math.hypot(targetX - x, targetY - y) < .01;
    if (settled) {
      x = targetX;
      y = targetY;
    }
    pupil.style.setProperty('--cursor-x', `${x}px`);
    pupil.style.setProperty('--cursor-y', `${y}px`);
    // Finish the glide after pointer events stop, then leave the browser idle.
    if (!settled) frame = requestAnimationFrame(update);
  }

  function startTracking() {
    if (paused() || frame) return;
    lastTime = performance.now();
    frame = requestAnimationFrame(update);
  }

  function follow(event) {
    if (paused() || event.isPrimary === false) return;
    pointer = { x: event.clientX, y: event.clientY };
    startTracking();
  }

  function reset() {
    cancelAnimationFrame(frame);
    frame = 0;
    pointer = null;
    lastTime = 0;
    x = 0;
    y = 0;
    pupil.style.removeProperty('--cursor-x');
    pupil.style.removeProperty('--cursor-y');
  }

  function stopReaction() {
    reaction.forEach(animation => animation.cancel());
    reaction = [];
    eye.classList.remove('is-reacting');
  }

  function poke() {
    stopReaction();
    if (paused()) return;
    eye.classList.add('is-reacting');
    const resting = getComputedStyle(eye);
    const restingShadow = resting.boxShadow;
    const restingBackground = resting.backgroundColor;
    const annoyedShadow = '0 8px 64px rgba(255, 69, 69, .65), 0 2px 10px rgba(255, 69, 69, .75)';
    const blinkDuration = 100;
    const settleTime = 180;
    const holdTime = 3000;
    const reopenTime = 100;
    const glareDuration = settleTime + holdTime + reopenTime;
    const glareStart = settleTime / glareDuration;
    const glareEnd = (settleTime + holdTime) / glareDuration;
    const glareTiming = { delay: blinkDuration * 2, duration: glareDuration };

    reaction = [
      eye.animate([
        { transform: 'translateX(0) rotate(0deg)', offset: 0 },
        { transform: 'translateX(-4px) rotate(-5deg)', offset: .16 },
        { transform: 'translateX(4px) rotate(5deg)', offset: .32 },
        { transform: 'translateX(-3px) rotate(-3deg)', offset: .48 },
        { transform: 'translateX(2px) rotate(2deg)', offset: .64 },
        { transform: 'translateX(0) rotate(0deg)', offset: 1 }
      ], { duration: 300, easing: 'ease-in-out' }),
      lids.animate([
        { transform: 'scale(1, 1)', offset: 0 },
        { transform: 'scale(1.06, .04)', offset: .3 },
        { transform: 'scale(1, 1)', offset: 1 }
      ], { duration: blinkDuration, iterations: 2, easing: 'ease-in-out' }),
      // Drop, settle into a curved glare, hold, then reopen quickly.
      lids.animate([
        { clipPath: "path('M 0 0 Q 40 0 80 0 L 80 80 L 0 80 Z')", offset: 0, easing: 'ease-in-out' },
        { clipPath: "path('M 0 28 Q 40 57 80 44 L 80 80 L 0 80 Z')", offset: 80 / glareDuration, easing: 'ease-in-out' },
        { clipPath: "path('M 0 25 Q 40 53 80 40 L 80 80 L 0 80 Z')", offset: glareStart },
        { clipPath: "path('M 0 25 Q 40 53 80 40 L 80 80 L 0 80 Z')", offset: glareEnd, easing: 'ease-in-out' },
        { clipPath: "path('M 0 0 Q 40 0 80 0 L 80 80 L 0 80 Z')", offset: 1 }
      ], glareTiming),
      eye.animate([
        { boxShadow: restingShadow, backgroundColor: restingBackground, offset: 0, easing: 'ease-in-out' },
        { boxShadow: annoyedShadow, backgroundColor: '#ff4545', offset: glareStart },
        { boxShadow: annoyedShadow, backgroundColor: '#ff4545', offset: glareEnd, easing: 'ease-in-out' },
        { boxShadow: restingShadow, backgroundColor: restingBackground, offset: 1 }
      ], glareTiming)
    ];
    const currentReaction = reaction;
    Promise.all(currentReaction.map(animation => animation.finished)).then(() => {
      if (reaction !== currentReaction) return;
      eye.classList.remove('is-reacting');
      reaction = [];
    }).catch(() => { /* A new poke or motion setting cancelled this reaction. */ });
  }

  function sync() {
    stopReaction();
    reset();
    const off = paused();
    document.documentElement.classList.toggle('motion-paused', off);
  }

  document.addEventListener('pointermove', follow, { passive: true });
  document.addEventListener('pointerdown', follow, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => {
    pointer = null;
    startTracking();
  });
  window.addEventListener('blur', () => { reset(); stopReaction(); });
  reduced.addEventListener('change', sync);
  trigger.addEventListener('click', poke);
  sync();
})();

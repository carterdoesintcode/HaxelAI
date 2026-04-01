document.addEventListener('DOMContentLoaded', () => {
  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => obs.observe(r));

  // Button ripple
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (ev) => {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = (ev.clientX - rect.left) + 'px';
      ripple.style.top = (ev.clientY - rect.top) + 'px';
      ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  // Card tilt
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (py - 0.5) * 6; // rotateX
      const ry = (px - 0.5) * -8; // rotateY
      card.style.transform = `translateY(-8px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });

  // Signup modal
  const modal = document.getElementById('signup-modal');
  const openBtn = document.getElementById('open-signup');
  const closeBtn = document.getElementById('close-signup');
  const copyBtn = document.getElementById('copy-demo');
  openBtn?.addEventListener('click', () => modal.classList.add('open'));
  closeBtn?.addEventListener('click', () => modal.classList.remove('open'));
  modal?.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });

  // Copy demo text
  copyBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('Demo code snippet from HaxelAI');
      copyBtn.innerText = 'Copied';
      setTimeout(() => copyBtn.innerText = 'Copy demo', 1500);
    } catch {
      copyBtn.innerText = 'Copy failed';
      setTimeout(() => copyBtn.innerText = 'Copy demo', 1500);
    }
  });

  // Keyboard accessibility for modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal?.classList.remove('open');
  });
});

(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motionTargets = [
    '.pain',
    '.feature',
    '.role',
    '.area-card',
    '.area-feature',
    '.truth-card',
    '.workflow-row:not(.workflow-head)',
    '.button-explanation',
    '.identity-preview-card',
    '.real-system-frame',
    '.real-hero-frame',
    '.price',
    '.employee-job-demo'
  ];

  document.querySelectorAll(motionTargets.join(',')).forEach((element) => {
    element.classList.add('motion-target');
  });

  const previewViewports = document.querySelectorAll('.identity-preview-viewport');
  const resizePreview = (viewport) => {
    const scale = viewport.clientWidth / 1100;
    viewport.style.setProperty('--preview-scale', Math.max(scale, 0.01).toFixed(4));
  };

  previewViewports.forEach((viewport) => {
    resizePreview(viewport);
    if ('ResizeObserver' in window) {
      const observer = new ResizeObserver(() => resizePreview(viewport));
      observer.observe(viewport);
    }
  });

  const dorSection = document.querySelector('#dor');
  if (dorSection && !reduceMotion.matches) {
    let orbFrame = 0;
    const updateDorOrb = () => {
      if (orbFrame) return;
      orbFrame = requestAnimationFrame(() => {
        const bounds = dorSection.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height)));
        const orbWidth = Math.max(1, bounds.width * 0.23);
        const shift = (0.2 - (progress * 0.42)) * orbWidth;
        dorSection.style.setProperty('--dor-orb-shift', `${shift.toFixed(1)}px`);
        dorSection.style.setProperty('--dor-orb-scale', (0.88 + (progress * 0.16)).toFixed(3));
        orbFrame = 0;
      });
    };

    window.addEventListener('scroll', updateDorOrb, { passive: true });
    window.addEventListener('resize', updateDorOrb, { passive: true });
    updateDorOrb();
  }

  const staggerGroups = [
    '.feature-stack',
    '.employee-capabilities',
    '.employee-jobs',
    '.area-flow'
  ];

  document.querySelectorAll(staggerGroups.join(',')).forEach((group) => {
    const children = Array.from(group.children);
    if (!children.length) return;

    group.classList.add('motion-stagger');
    children.forEach((child, index) => {
      child.classList.add('motion-item');
      child.style.setProperty('--motion-index', index);
    });
  });

  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    document.querySelectorAll('.motion-stagger').forEach((group) => group.classList.add('is-motion-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-motion-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('.motion-stagger').forEach((group) => observer.observe(group));
})();

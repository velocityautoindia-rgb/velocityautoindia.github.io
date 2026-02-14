const AnimationConfig = {
  enabled: true,
  marketSelector: { showOnFirstVisit: true, delayMs: 500, defaultMarket: 'india' },
  magneticButtons: { strength: 0.15 },
  counters: { duration: 2000 },
  priceCalculator: { barAnimationDuration: 1200 }
};
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) AnimationConfig.enabled = false;
window.AnimationConfig = AnimationConfig;

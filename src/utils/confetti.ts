import confetti from "canvas-confetti";

export const fireHeartExplosion = (x = 0.5, y = 0.5) => {
  if (typeof window === "undefined") return;

  const count = 40;
  const defaults = {
    origin: { x, y },
    spread: 360,
    ticks: 80,
    gravity: 0.8,
    decay: 0.94,
    startVelocity: 25,
    colors: ["#FF69B4", "#FFB6C1", "#FF1493", "#E6E6FA", "#FFD700", "#FF69B4"],
  };

  // Multiple bursts for a rich, magical look
  confetti({
    ...defaults,
    particleCount: Math.floor(count * 0.7),
    scalar: 1.2,
    shapes: ["circle"],
  });

  confetti({
    ...defaults,
    particleCount: Math.floor(count * 0.5),
    scalar: 1.8,
    shapes: ["circle"],
  });
};

export const fireSparkles = (x = 0.5, y = 0.5) => {
  if (typeof window === "undefined") return;

  confetti({
    particleCount: 30,
    angle: 60,
    spread: 55,
    origin: { x, y },
    colors: ["#FFD700", "#FFF", "#FFE4E1", "#FF69B4"],
    ticks: 120,
    gravity: 0.6,
    scalar: 0.9,
  });

  confetti({
    particleCount: 30,
    angle: 120,
    spread: 55,
    origin: { x, y },
    colors: ["#FFD700", "#FFF", "#FFE4E1", "#FF69B4"],
    ticks: 120,
    gravity: 0.6,
    scalar: 0.9,
  });
};

export const fireCelebrationConfetti = () => {
  if (typeof window === "undefined") return;

  const end = Date.now() + 2.5 * 1000;
  const colors = ["#FF69B4", "#9370DB", "#FFD700", "#FFB6C1", "#87CEEB"];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: colors,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};

export const fireGrandFireworks = () => {
  if (typeof window === "undefined") return;

  const duration = 4.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 70, zIndex: 100 };

  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

  const interval: any = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 },
      colors: ["#FF69B4", "#FF1493", "#FFD700", "#E6E6FA"],
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 },
      colors: ["#9370DB", "#FFB6C1", "#FFF", "#FFD700"],
    });
  }, 250);
};


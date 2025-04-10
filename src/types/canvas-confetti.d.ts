declare module 'canvas-confetti' {
  interface ConfettiOptions {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    origin?: {
      x?: number;
      y?: number;
    };
    colors?: string[];
    shapes?: ('square' | 'circle')[];
    scalar?: number;
    zIndex?: number;
    disableForReducedMotion?: boolean;
  }

  interface ConfettiCannon {
    fire(options?: ConfettiOptions): Promise<null>;
    reset(): void;
  }

  function confetti(options?: ConfettiOptions): Promise<null>;
  
  namespace confetti {
    function reset(): void;
    function create(
      canvas: HTMLCanvasElement,
      options?: { resize?: boolean; useWorker?: boolean }
    ): ConfettiCannon;
  }

  export = confetti;
}

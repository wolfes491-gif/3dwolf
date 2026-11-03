"use client";

import React, { useEffect, useRef } from "react";

const TOTAL_FRAMES = 152;
const FRAME_PREFIX = "/frames/ezgif-frame-";
const FRAME_EXT = ".png";

const getFrameUrl = (index: number) => {
  const padded = String(index).padStart(3, "0");
  return `${FRAME_PREFIX}${padded}${FRAME_EXT}`;
};

interface WolfScrollCanvasProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

export function WolfScrollCanvas({ containerRef }: WolfScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const loadedFramesRef = useRef<Set<number>>(new Set());
  const currentFrameRef = useRef<number>(1);
  const targetFrameRef = useRef<number>(1);
  const lastRenderedIndexRef = useRef<number>(-1);
  const isReducedMotionRef = useRef<boolean>(false);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Detect prefers-reduced-motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    isReducedMotionRef.current = mediaQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotionRef.current = e.matches;
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    let isDisposed = false;

    // Core draw routine
    const drawFrame = (frameIndex: number) => {
      if (!canvas || !ctx) return;

      // Select target frame or fallback to nearest loaded frame
      let imgToDraw: HTMLImageElement | undefined = imagesRef.current.get(frameIndex);
      if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
        let closestIndex = -1;
        let minDiff = Infinity;
        for (const loadedIdx of loadedFramesRef.current) {
          const diff = Math.abs(loadedIdx - frameIndex);
          if (diff < minDiff) {
            minDiff = diff;
            closestIndex = loadedIdx;
          }
        }
        if (closestIndex !== -1) {
          imgToDraw = imagesRef.current.get(closestIndex);
        }
      }

      if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
        return;
      }

      // Handle Retina / DPR scaling
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = Math.round(rect.width * dpr);
      const displayHeight = Math.round(rect.height * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
      }

      const imgWidth = imgToDraw.naturalWidth;
      const imgHeight = imgToDraw.naturalHeight;
      const canvasAspect = canvas.width / canvas.height;

      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let drawX = 0;
      let drawY = 0;

      if (canvasAspect < 1.0) {
        // Mobile / Portrait view: showcase wolf head prominently behind hero text
        const scale = Math.max(canvas.width / imgWidth, (canvas.height * 0.72) / imgHeight);
        drawWidth = imgWidth * scale;
        drawHeight = imgHeight * scale;
        drawX = (canvas.width - drawWidth) / 2;
        drawY = (canvas.height - drawHeight) / 2;
      } else {
        // Desktop / Landscape view: cinematic full bleed cover
        const scale = Math.max(canvas.width / imgWidth, canvas.height / imgHeight);
        drawWidth = imgWidth * scale;
        drawHeight = imgHeight * scale;
        drawX = (canvas.width - drawWidth) / 2;
        drawY = (canvas.height - drawHeight) / 2;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(imgToDraw, drawX, drawY, drawWidth, drawHeight);

      lastRenderedIndexRef.current = frameIndex;
    };

    // Calculate scroll progress relative to tall hero container
    const updateScrollProgress = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      const currentScroll = -rect.top;

      let progress = 0;
      if (totalScrollable > 0) {
        progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
      }

      targetFrameRef.current = 1 + progress * (TOTAL_FRAMES - 1);
    };

    // Smooth persistent animation loop with lerping
    const LERP_FACTOR = 0.09;
    const renderLoop = () => {
      if (isDisposed) return;

      updateScrollProgress();

      if (isReducedMotionRef.current) {
        currentFrameRef.current = targetFrameRef.current;
      } else {
        const diff = targetFrameRef.current - currentFrameRef.current;
        if (Math.abs(diff) < 0.002) {
          currentFrameRef.current = targetFrameRef.current;
        } else {
          currentFrameRef.current += diff * LERP_FACTOR;
        }
      }

      const targetIntFrame = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.round(currentFrameRef.current))
      );

      // Redraw if target frame index changed or if newly loaded frame is now available
      if (
        targetIntFrame !== lastRenderedIndexRef.current ||
        (loadedFramesRef.current.has(targetIntFrame) &&
          lastRenderedIndexRef.current !== targetIntFrame)
      ) {
        drawFrame(targetIntFrame);
      }

      animationFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    // Single image loader
    const loadImage = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        if (imagesRef.current.has(index)) {
          resolve(imagesRef.current.get(index)!);
          return;
        }
        const img = new Image();
        img.src = getFrameUrl(index);
        img.onload = () => {
          if (isDisposed) return;
          imagesRef.current.set(index, img);
          loadedFramesRef.current.add(index);

          const currentTarget = Math.min(
            TOTAL_FRAMES,
            Math.max(1, Math.round(currentFrameRef.current))
          );
          if (currentTarget === index || lastRenderedIndexRef.current === -1) {
            drawFrame(currentTarget);
          }
          resolve(img);
        };
        img.onerror = reject;
      });
    };

    // Progressive loading pipeline
    const preloadAllFrames = async () => {
      // 1. Critical path: Load frame 1 immediately
      try {
        await loadImage(1);
      } catch (err) {
        console.error("Failed to load frame 1:", err);
      }

      // 2. Load keyframes across the 152 frames for rapid scrubbing response
      const keyframes: number[] = [];
      for (let i = 10; i <= TOTAL_FRAMES; i += 10) {
        keyframes.push(i);
      }
      if (!keyframes.includes(TOTAL_FRAMES)) {
        keyframes.push(TOTAL_FRAMES);
      }

      for (const kf of keyframes) {
        if (isDisposed) return;
        try {
          await loadImage(kf);
        } catch {
          // ignore error and continue
        }
      }

      // 3. Concurrently load all remaining frames in controlled batches of 5
      const remaining: number[] = [];
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        if (!loadedFramesRef.current.has(i)) {
          remaining.push(i);
        }
      }

      const BATCH_SIZE = 5;
      for (let i = 0; i < remaining.length; i += BATCH_SIZE) {
        if (isDisposed) return;
        const batch = remaining.slice(i, i + BATCH_SIZE);
        await Promise.allSettled(batch.map((idx) => loadImage(idx)));
      }
    };

    // Initialize state & start render loop
    updateScrollProgress();
    currentFrameRef.current = targetFrameRef.current;
    preloadAllFrames();
    animationFrameIdRef.current = requestAnimationFrame(renderLoop);

    // Window event listeners
    const onResize = () => {
      updateScrollProgress();
      const currentTarget = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.round(currentFrameRef.current))
      );
      drawFrame(currentTarget);
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("scroll", updateScrollProgress, { passive: true });

    return () => {
      isDisposed = true;
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", updateScrollProgress);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, [containerRef]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {/* Deep gold / dark luxury tone atmospheric ambient radiance */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,rgba(190,140,40,0.11)_0%,rgba(90,60,15,0.04)_45%,transparent_75%)] pointer-events-none" />

      {/* Full-screen high-performance sticky HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none"
      />

      {/* Seamless luxury edge blending & radial vignette: dissolves all frame edges into #000000 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_32%,rgba(0,0,0,0.45)_62%,rgba(0,0,0,0.92)_88%,#000000_100%)] pointer-events-none" />

      {/* Subtle top & bottom bleed dissolvers for pure darkness transition */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black via-black/60 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
    </div>
  );
}


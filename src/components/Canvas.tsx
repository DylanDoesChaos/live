"use client";
import classNames from "@/utils/classNames";
import { useEffect, useRef } from "react";

export interface CanvasProps {
  className?: string;
  onDraw?: (context: CanvasRenderingContext2D, frame: number) => void;
}

export default function Canvas({ className, onDraw }: CanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    let frame: number;
    const context = canvas?.getContext("2d");

    // setup variables
    let fpsInterval: number,
      startTime: number,
      now: number,
      then: number,
      elapsed: number;

    function render(newtime?: number) {
      if (!canvas || !context || typeof window === "undefined") return;

      // Resize canvas if necessary
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      frame = requestAnimationFrame(render);

      if (newtime) now = newtime;
      else now = window.performance.now();
      elapsed = now - then;

      // Throttle the frame rate
      if (elapsed >= fpsInterval) {
        then = now - (elapsed % fpsInterval);
        if (onDraw) onDraw(context, frame);
      }
    }

    function startAnimating(fps: number) {
      fpsInterval = 1000 / fps;
      then = window.performance.now();
      startTime = then;
      console.log(startTime);
      render();
    }

    startAnimating(60);

    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, [onDraw]);

  return (
    <canvas className={classNames(`w-full h-full`, className)} ref={ref} />
  );
}

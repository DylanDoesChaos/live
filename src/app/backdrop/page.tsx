"use client";
import Canvas from "@/components/Canvas";
import { useMemo } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  duration: number;
  opacity: number;
}

export default function BackdropPage() {
  const stars = useMemo<Star[]>(() => {
    if (typeof window !== "undefined") {
      const stars: Star[] = [];

      // Calculate the number of stars based on the window size
      const density = 0.0015;
      const numOfStars = Math.floor(
        window.outerWidth * window.outerHeight * density
      );

      // Generate the stars
      for (let i = 0; i < numOfStars; i++) {
        // random x,y coords
        const x = Math.random() * window.outerWidth;
        const y = Math.random() * window.outerHeight;
        // random number between [0.5, 1)
        const radius = Math.random() * 0.5 + 0.5;
        const duration = Math.random() * 0.5 + 0.5;
        // random number between [0.2, 0.7)
        const opacity = Math.random() * 0.5 + 0.2;
        stars.push({ x, y, r: radius, duration, opacity });
      }

      return stars;
    } else return [];
  }, []);

  return (
    <Canvas
      className="grow"
      onDraw={(ctx, frame) => {
        // Clear
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Draw stars
        stars.forEach(star => {
          ctx.fillStyle = "#FFFFFF";
          ctx.globalAlpha = star.opacity;
          ctx.beginPath();
          ctx.arc(
            star.x,
            star.y,
            // on each animation frame, adjust the star's radius to ease in and out
            0.5 + star.r * Math.sin(star.duration * frame * 0.005) ** 2,
            0,
            Math.PI * 2
          );
          ctx.fill();
        });
      }}
    />
  );
}

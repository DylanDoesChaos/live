"use client";
import Canvas from "@/components/Canvas";
import { useMemo } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  offset: number;
}

export default function BackdropPage() {
  const stars = useMemo<Star[]>(() => {
    if (typeof window !== "undefined") {
      const stars: Star[] = [];

      // Calculate the number of stars based on the window size
      const density = 0.001;
      const numOfStars = window.outerWidth * window.outerHeight * density;

      // Generate the stars
      for (let i = 0; i < numOfStars; i++) {
        const x = Math.random() * window.outerWidth;
        const y = Math.random() * window.outerHeight;
        const radius = Math.random();
        const offset = Math.random() + 1;
        stars.push({ x, y, radius, offset });
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
        ctx.fillStyle = "#FFFFFF";
        stars.forEach(star => {
          ctx.beginPath();
          ctx.arc(
            star.x,
            star.y,
            // on each animation frame, adjust the star's radius to ease in and out
            star.radius * Math.sin(frame * star.offset * 0.005) ** 2,
            0,
            Math.PI * 2
          );
          ctx.fill();
        });
      }}
    />
  );
}

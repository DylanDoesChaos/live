"use client";
import Canvas from "@/components/Canvas";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

interface Star {
  x: number;
  y: number;
  r: number;
  duration: number;
  opacity: number;
}

enum Variant {
  StartScreen = "start",
  FaceCam = "camera",
}

export default function BackdropPage() {
  const params = useSearchParams();
  const variant = useMemo(() => {
    return params.get("variant") as Variant;
  }, [params]);

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
        // random number between [1, 1.5)
        const radius = Math.random() * 0.5 + 1;
        const duration = Math.random() * 0.5 + 0.5;
        // random number between [0.2, 0.7)
        const opacity = Math.random() * 0.5 + 0.2;
        stars.push({ x, y, r: radius, duration, opacity });
      }

      return stars;
    } else return [];
  }, []);
  const cameraBox = useMemo(() => {
    if (typeof window !== "undefined") {
      let width, height;
      switch (variant) {
        case Variant.StartScreen:
          width = window.innerWidth * 0.6;
          height = window.innerHeight * 0.6;
          return {
            x: 100,
            y: (window.innerHeight - height) / 2,
            width,
            height,
            radius: 64,
          };

        case Variant.FaceCam:
          width = window.innerWidth * 0.95;
          height = window.innerHeight * 0.95;
          return {
            x: (window.innerWidth - width) / 2,
            y: (window.innerHeight - height) / 2,
            width,
            height,
            radius: 64,
          };
      }
    }
  }, [variant]);
  const chatBox = useMemo(() => {
    if (typeof window !== "undefined" && variant === Variant.StartScreen) {
      const width = window.innerWidth * 0.25;
      const height = window.innerHeight * 0.6;
      return {
        x: window.innerWidth - width - 100,
        y: (window.innerHeight - height) / 2,
        width,
        height,
        radius: 64,
      };
    }
  }, [variant]);

  return (
    <Canvas
      className="grow"
      onDraw={(ctx, frame) => {
        // Clear
        ctx.reset();
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        // Draw stars
        stars.forEach(star => {
          ctx.fillStyle = "#FFFFFF";
          ctx.globalAlpha = star.opacity;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(
            star.x,
            star.y,
            // on each animation frame, adjust the star's radius to ease in and out
            star.r * Math.sin(star.duration * frame * 0.005) ** 2,
            0,
            Math.PI * 2
          );
          ctx.fill();
        });

        ctx.globalAlpha = 1;

        // Draw rounded box with chroma key fill
        if (cameraBox) {
          ctx.fillStyle = "#00FF00";
          ctx.roundRect(
            cameraBox.x,
            cameraBox.y,
            cameraBox.width,
            cameraBox.height,
            cameraBox.radius
          );
          ctx.fill();
          ctx.strokeStyle = "#FFFFFF";
          ctx.lineWidth = 4;
          ctx.stroke();
        }

        // Draw rounded box with chroma key fill
        if (chatBox) {
          ctx.fillStyle = "#00FF00";
          ctx.roundRect(
            chatBox.x,
            chatBox.y,
            chatBox.width,
            chatBox.height,
            chatBox.radius
          );
          ctx.fill();
          ctx.strokeStyle = "#FFFFFF";
          ctx.lineWidth = 4;
          ctx.stroke();
        }
      }}
    />
  );
}

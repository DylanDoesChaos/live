"use client";
import Canvas from "@/components/Canvas";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

enum Variant {
  StartScreen = "start",
  Center = "center",
}

function getTimeRemaining(endtime: number) {
  const total = endtime - new Date().getTime();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
}

export default function TimerPage() {
  const params = useSearchParams();
  const { variant, target } = useMemo(() => {
    return {
      variant: params.get("variant")
        ? (params.get("variant") as Variant)
        : undefined,
      // target must be a UTC time in ISO format
      target: params.get("target")
        ? new Date(params.get("target") as string)
        : undefined,
    };
  }, [params]);

  const timerLocation = useMemo(() => {
    if (typeof window !== "undefined") {
      let width, height;
      switch (variant) {
        case Variant.StartScreen:
          // calculating camera box size
          width = window.innerWidth * 0.6;
          height = 72;
          return {
            x: 100,
            y: (window.innerHeight - height) / 2,
            width,
            height,
          };

        case Variant.Center:
        default:
          width = window.innerWidth * 0.95;
          height = 72;
          return {
            x: (window.innerWidth - width) / 2,
            y: (window.innerHeight - height) / 2,
            width,
            height,
          };
      }
    }
  }, [variant]);

  return (
    <Canvas
      className="grow"
      onDraw={ctx => {
        // Clear
        ctx.reset();
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Draw rounded box with chroma key fill
        if (timerLocation && target) {
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#FFFFFF";
          ctx.font = `500 ${timerLocation.height}px sans-serif`;

          const { hours, minutes, seconds } = getTimeRemaining(
            target.getTime()
          );
          const timer = `T-${String(hours).padStart(2, "0")}:${String(
            minutes
          ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

          ctx.fillText(
            timer,
            timerLocation.x + timerLocation.width / 2,
            timerLocation.y + timerLocation.height / 2
          );
        }
      }}
    />
  );
}

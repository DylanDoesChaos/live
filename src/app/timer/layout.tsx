import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DylanDoesChaos | Backdrop",
};

export default function TimerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

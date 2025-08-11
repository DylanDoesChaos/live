import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  headers: async () => {
    return [
      {
        source: "/(.*)", // Apply to all paths
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors self https://www.twitch.tv/embed/dylandoeschaos/chat https://www.youtube.com/live_chat;", // Replace with your allowed domains
          },
        ],
      },
    ];
  },
};

export default nextConfig;

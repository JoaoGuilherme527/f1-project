import type { NextConfig } from "next";

// https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/1col/image.png)

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.formula1.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.formula1.com",
        port: "",
        pathname: "/**",
      },
      
      
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
        'z-cdn-media.chatglm.cn'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  }
  /* config options here */
};

export default nextConfig;

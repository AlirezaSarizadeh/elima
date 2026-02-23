/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
        'z-cdn-media.chatglm.cn'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.elimagasht.net'
      },
    ],
  }
  /* config options here */
};

export default nextConfig;

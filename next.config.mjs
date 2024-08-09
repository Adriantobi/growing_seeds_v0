/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "v1.adriantd.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
        port: "",
        pathname: "/api/portraits/**",
      },
      {
        protocol: "https",
        hostname: "rwawspravqaduxgijfvb.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value:
              "http://growing-seed-v0.vercel.app, https://growing-seed-v0.vercel.app, http://localhost:3000, https://localhost:3000",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

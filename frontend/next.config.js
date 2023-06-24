/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return process.env.NODE_ENV === "development"
      ? [
          {
            source: "/api/:path*",
            destination: `http://0.0.0.0:1337/api/:path*`
          }
        ]
      : [];
  }
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SOPORTE_BASE_URL: "http://localhost:8081",
    PROYECTO_BASE_URL: "http://localhost:8080",
  },
}

module.exports = nextConfig

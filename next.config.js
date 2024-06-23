/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SOPORTE_BASE_URL: "https://psa-backend-soporte-h6xh.onrender.com/soporte",
    PROYECTO_BASE_URL: "https://psa-backend-proyecto.onrender.com/",
  },
}

module.exports = nextConfig

// Configuration utility for environment variables

export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  environment: process.env.NEXT_PUBLIC_ENV || "development",
  isDevelopment: process.env.NEXT_PUBLIC_ENV === "development",
  isProduction: process.env.NEXT_PUBLIC_ENV === "production",
};

export default config;

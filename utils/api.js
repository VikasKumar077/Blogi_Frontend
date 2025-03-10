// utils/api.js
const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  console.warn("API_URL is not defined. Check your .env file.");
}

export { API_URL };

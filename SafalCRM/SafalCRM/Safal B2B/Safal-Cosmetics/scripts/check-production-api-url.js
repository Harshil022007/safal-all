import process from "node:process";
import { loadEnv } from "vite";

const env = loadEnv("production", process.cwd(), "VITE_");
for (const [name, description] of [
  ["VITE_API_URL", "deployed HTTPS API URL"],
  ["VITE_CRM_URL", "deployed HTTPS CRM website URL"],
]) {
  const value = process.env[name] || env[name];
  if (!value) throw new Error(`Set ${name} to the ${description} before building for production.`);
  let url;
  try { url = new URL(value); } catch { throw new Error(`${name} must be a valid absolute URL.`); }
  if (url.protocol !== "https:" || /^(localhost|127\.0\.0\.1)$/i.test(url.hostname)) {
    throw new Error(`${name} must use a deployed HTTPS URL in production.`);
  }
}

import { getAnalytics, isSupported, logEvent } from "firebase/analytics";
import { app } from "./firebase";

// Runs only in the browser, and only if analytics is supported
export async function track(name: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined" || !(await isSupported())) return;
  logEvent(getAnalytics(app), name, params);
}
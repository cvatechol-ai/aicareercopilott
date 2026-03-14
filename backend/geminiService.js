/**
 * geminiService.js
 * ────────────────
 * Handles communication with the Google Gemini API.
 */

const { GoogleGenerativeAI } = require("@google/generative-ai");

let genAI = null;
let model = null;

/**
 * Initialise the Gemini client (called once at startup).
 */
function init() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment variables.");
  }
  genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  console.log("✅ Gemini AI client initialised (gemini-2.0-flash)");
}

/**
 * Send a prompt to Gemini and return the raw text response.
 * @param {string} promptText
 * @returns {Promise<string>} — raw text from Gemini
 */
async function generateRoadmap(promptText) {
  if (!model) {
    throw new Error("Gemini client not initialised. Call init() first.");
  }

  const result = await model.generateContent(promptText);
  const response = result.response;
  let text = response.text();

  // Strip markdown code fences if Gemini wraps the JSON
  text = text.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/i, "");

  return text.trim();
}

module.exports = { init, generateRoadmap };

/**
 * retryHandler.js
 * ───────────────
 * Wraps the generate → validate cycle with retry logic.
 * If the AI returns malformed JSON, we retry up to MAX_RETRIES times.
 */

const { generateRoadmap } = require("./geminiService");
const { parseAndValidate } = require("./responseValidator");

const MAX_RETRIES = 3;

/**
 * Generate a roadmap and validate the response, retrying on failure.
 *
 * @param {string} promptText — the fully-built prompt
 * @returns {Promise<Object>} — validated roadmap object
 */
async function generateWithRetry(promptText) {
  let lastError = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`🤖 Gemini attempt ${attempt}/${MAX_RETRIES}...`);
      const rawText = await generateRoadmap(promptText);
      const validated = parseAndValidate(rawText);
      console.log(`✅ Attempt ${attempt} succeeded — response validated.`);
      return validated;
    } catch (err) {
      lastError = err;
      console.warn(
        `⚠️  Attempt ${attempt} failed: ${err.message}`
      );
      if (attempt < MAX_RETRIES) {
        // Brief pause before retrying
        await new Promise((r) => setTimeout(r, 1000));
      }
    }
  }

  throw new Error(
    `AI pipeline failed after ${MAX_RETRIES} attempts. Last error: ${lastError.message}`
  );
}

module.exports = { generateWithRetry };

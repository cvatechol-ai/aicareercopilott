/**
 * responseValidator.js
 * ────────────────────
 * Validates and sanitises AI-generated JSON responses to ensure they
 * match the output contract before being sent to the frontend.
 */

const REQUIRED_KEYS = [
  "user_profile_summary",
  "skill_gap_analysis",
  "learning_roadmap",
  "recommended_projects",
  "recommended_courses",
  "resume_building_tips",
  "interview_preparation",
];

const PROFILE_KEYS = [
  "target_role",
  "current_level",
  "timeline_goal",
  "weekly_hours_available",
];

const SKILL_GAP_KEYS = ["missing_skills", "recommended_learning_order"];

const INTERVIEW_KEYS = [
  "common_questions",
  "preparation_strategy",
  "recommended_practice_platforms",
];

/**
 * Parse raw text and validate against the expected schema.
 * Throws if the response is not valid JSON or is missing required fields.
 *
 * @param {string} rawText — raw text from Gemini
 * @returns {Object} — parsed and sanitised response object
 */
function parseAndValidate(rawText) {
  let parsed;
  try {
    parsed = JSON.parse(rawText);
  } catch (err) {
    throw new Error(`AI response is not valid JSON: ${err.message}`);
  }

  // Check top-level keys
  for (const key of REQUIRED_KEYS) {
    if (!(key in parsed)) {
      throw new Error(`AI response is missing required key: "${key}"`);
    }
  }

  // Validate nested structures
  for (const key of PROFILE_KEYS) {
    if (!(key in parsed.user_profile_summary)) {
      throw new Error(
        `user_profile_summary is missing required key: "${key}"`
      );
    }
  }

  for (const key of SKILL_GAP_KEYS) {
    if (!Array.isArray(parsed.skill_gap_analysis[key])) {
      throw new Error(`skill_gap_analysis.${key} must be an array`);
    }
  }

  if (!Array.isArray(parsed.learning_roadmap)) {
    throw new Error("learning_roadmap must be an array");
  }

  if (!Array.isArray(parsed.recommended_projects)) {
    throw new Error("recommended_projects must be an array");
  }

  if (!Array.isArray(parsed.recommended_courses)) {
    throw new Error("recommended_courses must be an array");
  }

  if (!Array.isArray(parsed.resume_building_tips)) {
    throw new Error("resume_building_tips must be an array");
  }

  for (const key of INTERVIEW_KEYS) {
    if (
      key !== "preparation_strategy" &&
      !Array.isArray(parsed.interview_preparation[key])
    ) {
      throw new Error(`interview_preparation.${key} must be an array`);
    }
  }

  return sanitizeResponse(parsed);
}

/**
 * Ensure all fields have sensible values, fill in defaults if needed.
 */
function sanitizeResponse(obj) {
  // Ensure arrays are arrays and have items
  const ensureArray = (val) => (Array.isArray(val) ? val : []);

  obj.skill_gap_analysis.missing_skills = ensureArray(
    obj.skill_gap_analysis.missing_skills
  );
  obj.skill_gap_analysis.recommended_learning_order = ensureArray(
    obj.skill_gap_analysis.recommended_learning_order
  );
  obj.learning_roadmap = ensureArray(obj.learning_roadmap);
  obj.recommended_projects = ensureArray(obj.recommended_projects);
  obj.recommended_courses = ensureArray(obj.recommended_courses);
  obj.resume_building_tips = ensureArray(obj.resume_building_tips);
  obj.interview_preparation.common_questions = ensureArray(
    obj.interview_preparation.common_questions
  );
  obj.interview_preparation.recommended_practice_platforms = ensureArray(
    obj.interview_preparation.recommended_practice_platforms
  );

  // Ensure preparation_strategy is a string
  if (typeof obj.interview_preparation.preparation_strategy !== "string") {
    obj.interview_preparation.preparation_strategy = "";
  }

  return obj;
}

module.exports = { parseAndValidate };

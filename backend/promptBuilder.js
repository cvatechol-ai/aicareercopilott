/**
 * promptBuilder.js
 * ─────────────────
 * Converts the frontend form payload into a detailed Gemini prompt
 * that enforces structured JSON output.
 */

const OUTPUT_SCHEMA = `{
  "user_profile_summary": {
    "target_role": "string",
    "current_level": "string",
    "timeline_goal": "string",
    "weekly_hours_available": "string"
  },
  "skill_gap_analysis": {
    "missing_skills": ["string"],
    "recommended_learning_order": ["string"]
  },
  "learning_roadmap": [
    {
      "phase": "number",
      "title": "string",
      "duration": "string",
      "skills": ["string"],
      "milestones": ["string"],
      "resources": ["string"]
    }
  ],
  "recommended_projects": [
    {
      "title": "string",
      "description": "string",
      "skills_practiced": ["string"],
      "difficulty": "string",
      "estimated_time": "string"
    }
  ],
  "recommended_courses": [
    {
      "title": "string",
      "provider": "string",
      "url": "string",
      "cost": "string",
      "duration": "string",
      "rating": "string"
    }
  ],
  "resume_building_tips": ["string"],
  "interview_preparation": {
    "common_questions": ["string"],
    "preparation_strategy": "string",
    "recommended_practice_platforms": ["string"]
  }
}`;

/**
 * Build a Gemini prompt from the user's form data.
 * @param {Object} formData — validated form payload
 * @returns {string} — the full prompt text
 */
function buildPrompt(formData) {
  const {
    age,
    current_skill_level,
    current_skills,
    target_role,
    weekly_hours_available,
    timeline_goal,
    learning_preference,
    course_preference,
    paid_course_ok,
  } = formData;

  return `You are an expert career counselor specializing in technology careers. Your task is to create a comprehensive, personalized career development roadmap.

## USER PROFILE
- Age: ${age}
- Current Skill Level: ${current_skill_level}
- Existing Skills: ${current_skills}
- Target Role: ${target_role}
- Weekly Hours Available for Learning: ${weekly_hours_available}
- Timeline Goal: ${timeline_goal}
- Learning Preference: ${learning_preference}
- Course Preference: ${course_preference}
- Willing to Pay for Courses: ${paid_course_ok}

## INSTRUCTIONS
1. Analyze the skill gap between the user's current skills and the target role requirements.
2. Create a phased learning roadmap that fits within the user's available weekly hours and timeline.
3. Recommend real, specific projects that build portfolio-worthy experience.
4. Suggest real courses from platforms like Coursera, Udemy, freeCodeCamp, MIT OCW, etc. Match the cost preference.
5. Provide actionable resume tips tailored to the target role.
6. Include interview preparation guidance with common questions for the target role.

## OUTPUT FORMAT
You MUST respond with ONLY a valid JSON object. No markdown, no code fences, no explanation — just raw JSON.
The JSON must exactly follow this schema:

${OUTPUT_SCHEMA}

Important rules:
- Every field must be present and non-null.
- "learning_roadmap" should contain ${timeline_goal ? 'enough phases to cover ' + timeline_goal : 'at least 3 phases'}.
- "recommended_courses" must contain real courses with real URLs. If paid courses are not acceptable, only suggest free ones.
- All arrays must have at least 2 items.
- Respond with ONLY the JSON object. No other text.`;
}

module.exports = { buildPrompt };

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    User,
    Target,
    BookOpen,
    ArrowRight,
    Loader2,
    Flame,
} from "lucide-react";

const INITIAL_STATE = {
    age: "",
    current_skill_level: "",
    current_skills: "",
    target_role: "",
    weekly_hours_available: "",
    timeline_goal: "",
    learning_preference: "",
    course_preference: "",
    paid_course_ok: "",
};

const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];
const LEARNING_PREFS = [
    "Video Tutorials",
    "Reading / Documentation",
    "Hands-on Projects",
    "Interactive Coding",
    "Mixed",
];
const COURSE_PREFS = [
    "Short courses (< 5 hours)",
    "Medium courses (5-20 hours)",
    "Long courses / Bootcamps (20+ hours)",
    "No preference",
];
const PAID_OPTIONS = [
    "Free only",
    "Mostly free, some paid",
    "Open to paid courses",
    "No preference",
];

export default function FormPage() {
    const router = useRouter();
    const [form, setForm] = useState(INITIAL_STATE);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const update = (key, value) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const required = ["age", "current_skill_level", "target_role"];
        for (const field of required) {
            if (!form[field]) {
                setError("Please fill in all required fields.");
                return;
            }
        }

        setLoading(true);

        try {
            const res = await fetch("http://localhost:3001/api/generate-roadmap", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const errBody = await res.json().catch(() => ({}));
                throw new Error(
                    errBody.error || `Server responded with status ${res.status}`
                );
            }

            const json = await res.json();
            localStorage.setItem("roadmapData", JSON.stringify(json.data));
            router.push("/dashboard");
        } catch (err) {
            setError(err.message || "Failed to generate roadmap. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-24 pb-16 px-6 min-h-screen bg-[var(--color-bg)]">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in-up">
                    <div className="gold-bar mx-auto mb-6" />
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text)]">
                        Build Your <span className="gradient-text">Career Roadmap</span>
                    </h1>
                    <p className="mt-3 text-[var(--color-text-secondary)] max-w-lg mx-auto">
                        Fill in your details and our AI will create a personalized learning
                        path just for you.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* ── Section 1: About You ── */}
                    <fieldset className="card p-8 animate-fade-in-up-delay-1">
                        <legend className="flex items-center gap-2 text-lg font-bold mb-6 px-2 text-[var(--color-text)]">
                            <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-dark)] flex items-center justify-center">
                                <User size={16} className="text-[var(--color-gold)]" />
                            </div>
                            About You
                        </legend>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <InputField
                                label="Age"
                                required
                                type="number"
                                placeholder="e.g. 22"
                                value={form.age}
                                onChange={(v) => update("age", v)}
                            />
                            <SelectField
                                label="Current Skill Level"
                                required
                                placeholder="Select your level"
                                options={SKILL_LEVELS}
                                value={form.current_skill_level}
                                onChange={(v) => update("current_skill_level", v)}
                            />
                            <div className="sm:col-span-2">
                                <InputField
                                    label="Current Skills"
                                    placeholder="e.g. HTML, CSS, JavaScript, Python basics"
                                    value={form.current_skills}
                                    onChange={(v) => update("current_skills", v)}
                                />
                            </div>
                        </div>
                    </fieldset>

                    {/* ── Section 2: Career Goals ── */}
                    <fieldset className="card p-8 animate-fade-in-up-delay-2">
                        <legend className="flex items-center gap-2 text-lg font-bold mb-6 px-2 text-[var(--color-text)]">
                            <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-dark)] flex items-center justify-center">
                                <Target size={16} className="text-[var(--color-gold)]" />
                            </div>
                            Career Goals
                        </legend>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <InputField
                                label="Target Role"
                                required
                                placeholder="e.g. Full Stack Developer"
                                value={form.target_role}
                                onChange={(v) => update("target_role", v)}
                            />
                            <InputField
                                label="Goal Timeline"
                                placeholder="e.g. 6 months"
                                value={form.timeline_goal}
                                onChange={(v) => update("timeline_goal", v)}
                            />
                            <InputField
                                label="Weekly Learning Hours"
                                type="number"
                                placeholder="e.g. 15"
                                value={form.weekly_hours_available}
                                onChange={(v) => update("weekly_hours_available", v)}
                            />
                        </div>
                    </fieldset>

                    {/* ── Section 3: Learning Preferences ── */}
                    <fieldset className="card p-8 animate-fade-in-up-delay-3">
                        <legend className="flex items-center gap-2 text-lg font-bold mb-6 px-2 text-[var(--color-text)]">
                            <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-dark)] flex items-center justify-center">
                                <BookOpen size={16} className="text-[var(--color-gold)]" />
                            </div>
                            Learning Preferences
                        </legend>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <SelectField
                                label="Learning Preference"
                                placeholder="How do you prefer to learn?"
                                options={LEARNING_PREFS}
                                value={form.learning_preference}
                                onChange={(v) => update("learning_preference", v)}
                            />
                            <SelectField
                                label="Course Preference"
                                placeholder="Course length preference"
                                options={COURSE_PREFS}
                                value={form.course_preference}
                                onChange={(v) => update("course_preference", v)}
                            />
                            <SelectField
                                label="Paid Courses"
                                placeholder="Budget preference"
                                options={PAID_OPTIONS}
                                value={form.paid_course_ok}
                                onChange={(v) => update("paid_course_ok", v)}
                            />
                        </div>
                    </fieldset>

                    {/* Error */}
                    {error && (
                        <div className="text-red-600 text-sm text-center bg-red-50 border border-red-200 rounded-lg p-3 font-medium">
                            {error}
                        </div>
                    )}

                    {/* Submit */}
                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-glass-dark text-lg px-10 py-4 inline-flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Generating Roadmap…
                                </>
                            ) : (
                                <>
                                    Generate My Roadmap
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

/* ── Reusable Field Components ── */

function InputField({ label, required, type = "text", placeholder, value, onChange }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-[var(--color-text-secondary)] mb-2">
                {label}
                {required && <span className="text-[var(--color-gold)] ml-1">*</span>}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-text-dim)] focus:outline-none focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold-glow)] transition-all"
            />
        </div>
    );
}

function SelectField({ label, required, placeholder, options, value, onChange }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-[var(--color-text-secondary)] mb-2">
                {label}
                {required && <span className="text-[var(--color-gold)] ml-1">*</span>}
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold-glow)] transition-all appearance-none cursor-pointer"
            >
                <option value="" disabled className="text-[var(--color-text-dim)]">
                    {placeholder}
                </option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
}

/* ── Mock Data ── */
function getMockData(form) {
    return {
        user_profile_summary: {
            target_role: form.target_role || "Full Stack Developer",
            current_level: form.current_skill_level || "Beginner",
            timeline_goal: form.timeline_goal || "6 months",
            weekly_hours_available: form.weekly_hours_available || "15",
        },
        skill_gap_analysis: {
            missing_skills: [
                "React.js",
                "Node.js",
                "REST APIs",
                "SQL Databases",
                "Git & GitHub",
                "System Design Basics",
                "Docker",
                "CI/CD",
            ],
            recommended_learning_order: [
                "HTML/CSS Deep Dive",
                "JavaScript Advanced",
                "React.js",
                "Node.js & Express",
                "SQL & PostgreSQL",
                "REST API Design",
                "Git Workflows",
                "Docker Basics",
            ],
        },
        learning_roadmap: [
            {
                phase: "Phase 1 — Foundation",
                duration: "Weeks 1-4",
                topics: [
                    "Advanced HTML5 & CSS3",
                    "JavaScript ES6+ Mastery",
                    "Responsive Design Patterns",
                ],
                milestone: "Build a responsive portfolio website",
            },
            {
                phase: "Phase 2 — Frontend Mastery",
                duration: "Weeks 5-10",
                topics: [
                    "React.js Fundamentals",
                    "State Management (Context API)",
                    "React Router & Hooks",
                ],
                milestone: "Build a full React CRUD application",
            },
            {
                phase: "Phase 3 — Backend Development",
                duration: "Weeks 11-16",
                topics: [
                    "Node.js & Express.js",
                    "REST API Design",
                    "SQL & PostgreSQL",
                    "Authentication (JWT)",
                ],
                milestone: "Build a complete REST API with database",
            },
            {
                phase: "Phase 4 — Full Stack & DevOps",
                duration: "Weeks 17-22",
                topics: [
                    "Full Stack Project",
                    "Docker Basics",
                    "CI/CD with GitHub Actions",
                    "Deployment on Vercel / Railway",
                ],
                milestone: "Deploy a production-ready full stack app",
            },
            {
                phase: "Phase 5 — Interview Prep",
                duration: "Weeks 23-26",
                topics: [
                    "Data Structures & Algorithms",
                    "System Design Basics",
                    "Behavioral Interview Prep",
                    "Portfolio & Resume Polish",
                ],
                milestone: "Complete 50 LeetCode problems & mock interviews",
            },
        ],
        recommended_projects: [
            {
                title: "Personal Portfolio Website",
                difficulty: "Beginner",
                skills: ["HTML", "CSS", "JavaScript"],
                description:
                    "Build a responsive portfolio to showcase your work and skills.",
            },
            {
                title: "Task Management App",
                difficulty: "Intermediate",
                skills: ["React", "Node.js", "MongoDB"],
                description:
                    "A full-stack CRUD app with authentication and real-time updates.",
            },
            {
                title: "E-Commerce Platform",
                difficulty: "Advanced",
                skills: ["Next.js", "Stripe", "PostgreSQL"],
                description:
                    "Build a complete e-commerce site with payments and admin dashboard.",
            },
            {
                title: "Real-time Chat Application",
                difficulty: "Intermediate",
                skills: ["React", "Socket.io", "Node.js"],
                description:
                    "Create a real-time messaging app with chat rooms and user presence.",
            },
        ],
        recommended_courses: [
            {
                title: "The Complete JavaScript Course",
                platform: "Udemy",
                duration: "40 hours",
                cost: "Paid",
                url: "#",
            },
            {
                title: "React — The Complete Guide",
                platform: "Udemy",
                duration: "48 hours",
                cost: "Paid",
                url: "#",
            },
            {
                title: "freeCodeCamp Full Stack Curriculum",
                platform: "freeCodeCamp",
                duration: "300 hours",
                cost: "Free",
                url: "#",
            },
            {
                title: "CS50 — Introduction to Computer Science",
                platform: "Harvard / edX",
                duration: "12 weeks",
                cost: "Free",
                url: "#",
            },
            {
                title: "Node.js, Express & MongoDB Bootcamp",
                platform: "Udemy",
                duration: "42 hours",
                cost: "Paid",
                url: "#",
            },
        ],
        resume_building_tips: [
            "Lead with a strong summary highlighting your target role and top skills.",
            "Include 2-3 portfolio projects with links to live demos and GitHub repos.",
            "Quantify achievements: 'Reduced load time by 40%' instead of 'Improved performance'.",
            "Tailor your resume keywords to match the job description for ATS optimization.",
            "Keep it to one page; use clean formatting with consistent fonts and spacing.",
            "Add a 'Technical Skills' section organized by category (Languages, Frameworks, Tools).",
        ],
        interview_preparation: {
            technical_topics: [
                "JavaScript closures, promises, async/await",
                "React component lifecycle and hooks",
                "REST API design principles",
                "SQL queries and database normalization",
                "Git branching strategies",
            ],
            common_questions: [
                "Explain the difference between let, const, and var.",
                "How does React's virtual DOM work?",
                "What is the difference between SQL and NoSQL databases?",
                "Describe a challenging project and how you overcame obstacles.",
                "How would you optimize a slow-loading web page?",
            ],
            resources: [
                "LeetCode (Easy → Medium problems)",
                "NeetCode 150 curated list",
                "System Design Primer on GitHub",
                "Pramp — free mock interviews",
                "Glassdoor interview experiences",
            ],
        },
    };
}

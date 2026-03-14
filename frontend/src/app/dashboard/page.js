"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    User,
    BarChart3,
    Map,
    FolderGit2,
    BookOpen,
    FileText,
    MessageSquare,
    Clock,
    Target,
    Zap,
    ArrowRight,
    CheckCircle2,
    ChevronRight,
    Flame,
    Lightbulb,
    Code2,
    GraduationCap,
    BriefcaseBusiness,
} from "lucide-react";

export default function DashboardPage() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("roadmapData");
        if (stored) {
            try {
                setData(JSON.parse(stored));
            } catch {
                setData(null);
            }
        }
    }, []);

    if (!data) {
        return (
            <div className="pt-24 pb-16 px-6 min-h-screen flex items-center justify-center">
                <div className="card p-12 text-center max-w-md">
                    <div className="w-16 h-16 rounded-xl bg-[var(--color-surface-dark)] flex items-center justify-center mx-auto mb-6">
                        <Flame size={28} className="text-[var(--color-gold)]" />
                    </div>
                    <h2 className="text-2xl font-extrabold text-[var(--color-text)] mb-3">No Roadmap Yet</h2>
                    <p className="text-[var(--color-text-secondary)] mb-6">
                        Generate your personalized career roadmap to see it here.
                    </p>
                    <Link
                        href="/form"
                        className="btn-glass-dark inline-flex items-center gap-2 px-6 py-3"
                    >
                        Generate Roadmap
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-16 px-6 min-h-screen bg-[var(--color-bg)]">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="animate-fade-in-up">
                    <div className="gold-bar mb-4" />
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text)]">
                        Your Career <span className="gradient-text">Roadmap</span>
                    </h1>
                    <p className="mt-2 text-[var(--color-text-secondary)]">AI-generated personalized plan</p>
                </div>

                {/* 1. User Profile Summary */}
                <ProfileSummary profile={data.user_profile_summary} />

                {/* 2. Skill Gap Analysis */}
                <SkillGapAnalysis analysis={data.skill_gap_analysis} />

                {/* 3. Learning Roadmap Timeline */}
                <LearningRoadmap roadmap={data.learning_roadmap} />

                {/* Two-column layout */}
                <div className="grid lg:grid-cols-2 gap-8">
                    <RecommendedProjects projects={data.recommended_projects} />
                    <RecommendedCourses courses={data.recommended_courses} />
                </div>

                {/* 6. Resume Tips */}
                <ResumeTips tips={data.resume_building_tips} />

                {/* 7. Interview Preparation */}
                <InterviewPrep prep={data.interview_preparation} />
            </div>
        </div>
    );
}

/* ════════════════════════════════════════════
   Section Components
   ════════════════════════════════════════════ */

function SectionHeader({ icon: Icon, title }) {
    return (
        <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-surface-dark)] flex items-center justify-center">
                <Icon size={20} className="text-[var(--color-gold)]" />
            </div>
            <h2 className="text-xl font-extrabold text-[var(--color-text)]">{title}</h2>
        </div>
    );
}

/* ── 1. Profile Summary ── */
function ProfileSummary({ profile }) {
    if (!profile) return null;
    const items = [
        { icon: Target, label: "Target Role", value: profile.target_role },
        { icon: BarChart3, label: "Current Level", value: profile.current_level },
        { icon: Clock, label: "Timeline", value: profile.timeline_goal },
        {
            icon: Zap,
            label: "Weekly Hours",
            value: `${profile.weekly_hours_available} hrs/week`,
        },
    ];

    return (
        <div className="card p-8 animate-fade-in-up-delay-1">
            <SectionHeader icon={User} title="Your Profile" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {items.map((item) => (
                    <div
                        key={item.label}
                        className="bg-[var(--color-bg-warm)] rounded-xl p-4 border border-[var(--color-border-light)]"
                    >
                        <div className="flex items-center gap-2 text-[var(--color-text-muted)] text-sm mb-1">
                            <item.icon size={14} className="text-[var(--color-gold)]" />
                            {item.label}
                        </div>
                        <div className="font-bold text-lg text-[var(--color-text)]">{item.value || "—"}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ── 2. Skill Gap Analysis ── */
function SkillGapAnalysis({ analysis }) {
    if (!analysis) return null;

    return (
        <div className="card p-8 animate-fade-in-up-delay-2">
            <SectionHeader icon={BarChart3} title="Skill Gap Analysis" />
            <div className="grid md:grid-cols-2 gap-8">
                {/* Missing Skills */}
                <div>
                    <h3 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">
                        Skills to Learn
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {(analysis.missing_skills || []).map((skill) => (
                            <span
                                key={skill}
                                className="px-3 py-1.5 rounded-lg border-2 border-[var(--color-text)] text-[var(--color-text)] text-sm font-semibold"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
                {/* Recommended Order */}
                <div>
                    <h3 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">
                        Recommended Learning Order
                    </h3>
                    <ol className="space-y-2">
                        {(analysis.recommended_learning_order || []).map((item, i) => (
                            <li key={item} className="flex items-center gap-3">
                                <span className="w-7 h-7 rounded-lg bg-[var(--color-surface-dark)] flex items-center justify-center text-xs font-bold text-[var(--color-gold)] shrink-0">
                                    {i + 1}
                                </span>
                                <span className="text-sm text-[var(--color-text-secondary)]">{item}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
}

/* ── 3. Learning Roadmap Timeline ── */
function LearningRoadmap({ roadmap }) {
    if (!roadmap || roadmap.length === 0) return null;

    return (
        <div className="card p-8">
            <SectionHeader icon={Map} title="Learning Roadmap" />
            <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-[var(--color-border)]" />

                <div className="space-y-6">
                    {roadmap.map((phase, i) => (
                        <div key={i} className="relative flex gap-5">
                            {/* Node */}
                            <div className="relative z-10 mt-1 shrink-0">
                                <div className="w-10 h-10 rounded-full bg-[var(--color-surface-dark)] flex items-center justify-center text-[var(--color-gold)] text-sm font-extrabold shadow-lg">
                                    {i + 1}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 bg-[var(--color-bg-warm)] rounded-xl p-5 border border-[var(--color-border-light)] hover:border-[var(--color-gold)] transition-colors">
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                    <h3 className="font-bold text-lg text-[var(--color-text)]">{phase.phase}</h3>
                                    <span className="text-xs px-3 py-1 rounded-full bg-[var(--color-surface-dark)] text-[var(--color-gold)] font-bold">
                                        {phase.duration}
                                    </span>
                                </div>
                                <div className="space-y-1.5 mb-3">
                                    {(phase.topics || []).map((topic) => (
                                        <div
                                            key={topic}
                                            className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]"
                                        >
                                            <ChevronRight size={14} className="text-[var(--color-gold)] shrink-0" />
                                            {topic}
                                        </div>
                                    ))}
                                </div>
                                {phase.milestone && (
                                    <div className="flex items-start gap-2 mt-3 pt-3 border-t border-[var(--color-border-light)]">
                                        <CheckCircle2
                                            size={16}
                                            className="text-[var(--color-gold)] shrink-0 mt-0.5"
                                        />
                                        <span className="text-sm text-[var(--color-text-secondary)]">
                                            <strong className="text-[var(--color-text)]">Milestone:</strong> {phase.milestone}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ── 4. Recommended Projects ── */
function RecommendedProjects({ projects }) {
    if (!projects || projects.length === 0) return null;

    const difficultyColor = {
        Beginner: "bg-green-50 text-green-700 border-green-200",
        Intermediate: "bg-amber-50 text-amber-700 border-amber-200",
        Advanced: "bg-red-50 text-red-700 border-red-200",
    };

    return (
        <div className="card p-8">
            <SectionHeader icon={FolderGit2} title="Projects" />
            <div className="space-y-4">
                {projects.map((project) => (
                    <div
                        key={project.title}
                        className="bg-[var(--color-bg-warm)] rounded-xl p-5 border border-[var(--color-border-light)] hover:border-[var(--color-gold)] transition-colors"
                    >
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                            <h3 className="font-bold text-[var(--color-text)]">{project.title}</h3>
                            <span
                                className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${difficultyColor[project.difficulty] || difficultyColor.Beginner
                                    }`}
                            >
                                {project.difficulty}
                            </span>
                        </div>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                            {(project.skills || []).map((skill) => (
                                <span
                                    key={skill}
                                    className="px-2 py-0.5 rounded-md bg-[var(--color-bg)] border border-[var(--color-border)] text-xs text-[var(--color-text-muted)] font-medium"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ── 5. Recommended Courses ── */
function RecommendedCourses({ courses }) {
    if (!courses || courses.length === 0) return null;

    return (
        <div className="card p-8">
            <SectionHeader icon={BookOpen} title="Courses" />
            <div className="space-y-4">
                {courses.map((course) => (
                    <div
                        key={course.title}
                        className="bg-[var(--color-bg-warm)] rounded-xl p-5 border border-[var(--color-border-light)] hover:border-[var(--color-gold)] transition-colors"
                    >
                        <h3 className="font-bold text-[var(--color-text)] mb-2">{course.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-muted)]">
                            <span className="flex items-center gap-1">
                                <GraduationCap size={14} className="text-[var(--color-gold)]" />
                                {course.platform}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock size={14} className="text-[var(--color-gold)]" />
                                {course.duration}
                            </span>
                            <span
                                className={`px-2 py-0.5 rounded-md text-xs font-semibold ${course.cost === "Free"
                                    ? "bg-green-50 text-green-700"
                                    : "bg-amber-50 text-amber-700"
                                    }`}
                            >
                                {course.cost}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ── 6. Resume Tips ── */
function ResumeTips({ tips }) {
    if (!tips || tips.length === 0) return null;

    return (
        <div className="card p-8">
            <SectionHeader icon={FileText} title="Resume Building Tips" />
            <div className="grid sm:grid-cols-2 gap-4">
                {tips.map((tip, i) => (
                    <div
                        key={i}
                        className="flex gap-3 bg-[var(--color-bg-warm)] rounded-xl p-4 border border-[var(--color-border-light)]"
                    >
                        <Lightbulb
                            size={18}
                            className="text-[var(--color-gold)] shrink-0 mt-0.5"
                        />
                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                            {tip}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ── 7. Interview Preparation ── */
function InterviewPrep({ prep }) {
    if (!prep) return null;

    const sections = [
        {
            title: "Technical Topics",
            icon: Code2,
            items: prep.technical_topics,
        },
        {
            title: "Common Questions",
            icon: MessageSquare,
            items: prep.common_questions,
        },
        {
            title: "Resources",
            icon: BookOpen,
            items: prep.resources,
        },
    ];

    return (
        <div className="card p-8">
            <SectionHeader icon={BriefcaseBusiness} title="Interview Preparation" />
            <div className="grid md:grid-cols-3 gap-6">
                {sections.map((section) => (
                    <div key={section.title}>
                        <div className="flex items-center gap-2 mb-4">
                            <section.icon size={16} className="text-[var(--color-gold)]" />
                            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                                {section.title}
                            </h3>
                        </div>
                        <ul className="space-y-2">
                            {(section.items || []).map((item, i) => (
                                <li
                                    key={i}
                                    className="text-sm px-3 py-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] bg-[var(--color-bg-warm)]"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

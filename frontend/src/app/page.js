import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Brain,
  Target,
  ArrowRight,
  Rocket,
  Users,
  BookOpen,
  Flame,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="pt-16">
      {/* ── Hero ── */}
      <section
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/hero-banner.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Semi-transparent overlay so text stays readable */}
        <div className="absolute inset-0 bg-[var(--color-bg)]/80" />

        {/* Subtle gold accent blurs */}
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[var(--color-gold)]/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-[var(--color-gold)]/8 rounded-full blur-[120px]" />

        {/* Center white glare/blur to improve text readability */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-white/90 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">


          {/* Headline — Anton font with hollow "CAREER ROADMAP" */}
          <h1 className="animate-fade-in-up-delay-1 font-[family-name:var(--font-anton)] text-6xl sm:text-7xl lg:text-8xl xl:text-9xl uppercase leading-[0.92] tracking-tight text-[var(--color-text)]">
            Your AI-Powered
            <br />
            <span className="hollow-text">Career Roadmap</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-in-up-delay-2 mt-8 text-lg sm:text-xl font-medium text-[var(--color-text)] max-w-2xl mx-auto leading-relaxed">
            Not sure what to learn next? Tell us your goals and we&apos;ll
            generate a personalized learning roadmap with skills, projects,
            courses, and interview prep — in seconds.
          </p>

          {/* CTA — Liquid Glass Buttons */}
          <div className="animate-fade-in-up-delay-3 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/form"
              className="btn-glass-dark text-lg px-8 py-4 whitespace-nowrap rounded-full inline-flex items-center gap-2"
            >
              Generate My Roadmap
              <ArrowRight size={20} />
            </Link>
            <Link
              href="#how-it-works"
              className="btn-glass text-lg px-8 py-4 whitespace-nowrap rounded-full"
            >
              See How It Works
            </Link>
          </div>

        </div>
      </section>

      {/* ── How It Works ── */}
      <section
        id="how-it-works"
        className="py-32 px-6 relative overflow-hidden bg-white"
      >
        {/* Subtle background ambient lighting */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--color-gold)]/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--color-gold)]/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <div className="inline-block mb-4">
              <div className="w-12 h-1 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent mx-auto rounded-full" />
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-[family-name:var(--font-anton)] uppercase tracking-tight text-[var(--color-text)] relative inline-block">
              How It{" "}
              <span className="text-[var(--color-gold)] drop-shadow-[0_0_15px_rgba(200,169,81,0.2)]">
                Works
              </span>
            </h2>
            <p className="mt-6 text-xl text-[var(--color-text-secondary)] font-medium max-w-xl mx-auto">
              Three simple steps to your personalized career roadmap
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "01",
                icon: Target,
                title: "Enter Your Info",
                desc: "Tell us about your current skills, target role, and how much time you can dedicate.",
              },
              {
                step: "02",
                icon: Brain,
                title: "AI Analyzes",
                desc: "Gemini AI processes your profile, identifies skill gaps, and crafts a custom path.",
              },
              {
                step: "03",
                icon: Sparkles,
                title: "Get Roadmap",
                desc: "Receive a detailed roadmap with skills, projects, courses, and interview prep.",
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className="relative group h-full"
              >
                {/* Animated glowing border stroke effect behind the card */}
                <div className="absolute -inset-[1px] bg-gradient-to-br from-[var(--color-gold)]/40 via-[var(--color-gold)]/0 to-[var(--color-gold)]/40 rounded-[2rem] opacity-0 group-hover:opacity-100 blur-[4px] transition-all duration-700" />

                {/* Main Card Container */}
                <div className="relative h-full bg-[#fcfcfc] border border-black/[0.04] rounded-[2rem] p-10 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] group-hover:shadow-[0_20px_50px_rgba(200,169,81,0.08)] group-hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center">

                  {/* Giant Faded Background Number */}
                  <div className="absolute -right-6 top-4 font-[family-name:var(--font-anton)] text-[150px] leading-none text-black/[0.02] group-hover:text-[var(--color-gold)]/[0.04] transition-colors duration-500 pointer-events-none select-none">
                    {item.step}
                  </div>

                  {/* Icon Block */}
                  <div className="relative w-24 h-24 mb-10 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[var(--color-surface-dark)] rounded-3xl rotate-3 group-hover:rotate-6 transition-transform duration-500 shadow-xl" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#000000] rounded-3xl -rotate-3 group-hover:rotate-0 transition-transform duration-500 border border-white/5" />
                    <item.icon
                      size={36}
                      className="relative z-10 text-[var(--color-gold)] group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="relative z-10 flex-1 flex flex-col">
                    <div className="text-sm font-black text-[var(--color-gold)] tracking-[0.2em] mb-3">
                      STEP {item.step}
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--color-text)] mb-4">
                      {item.title}
                    </h3>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-32 px-6 relative overflow-hidden">
        {/* Ambient background glow for the whole section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-[var(--color-gold)]/5 blur-[150px] pointer-events-none rounded-[100%]" />

        <div className="max-w-4xl mx-auto relative group">
          {/* Animated glowing border stroke effect behind the card */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-[var(--color-gold)]/0 via-[var(--color-gold)]/40 to-[var(--color-gold)]/0 rounded-[2.5rem] opacity-30 group-hover:opacity-100 blur-[2px] transition-opacity duration-700" />

          {/* Card background */}
          <div className="relative bg-[#0d0d0d]/80 backdrop-blur-2xl rounded-[2.5rem] p-12 sm:p-20 text-center overflow-hidden border border-white/5 shadow-2xl">

            {/* Inner dynamic glows */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-[var(--color-gold)]/20 rounded-full blur-[100px] group-hover:bg-[var(--color-gold)]/30 transition-colors duration-700" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-white/5 rounded-full blur-[80px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--color-gold)]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-gold)]/20 to-[var(--color-gold)]/5 border border-[var(--color-gold)]/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(200,169,81,0.15)]">
                <Rocket className="text-[var(--color-gold)]" size={32} />
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-5xl font-[family-name:var(--font-anton)] uppercase tracking-wide text-white mb-6 leading-tight">
                Ready to Start Your{" "}
                <br className="sm:hidden" />
                <span className="text-[var(--color-gold)] drop-shadow-[0_0_15px_rgba(200,169,81,0.3)]">Journey?</span>
              </h2>

              <p className="text-gray-400/90 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Join thousands of learners who have accelerated their careers with
                AI-powered guidance. Stop guessing and start progressing.
              </p>

              <Link
                href="/form"
                className="group/btn relative inline-flex items-center justify-center gap-3 bg-[var(--color-gold)] text-black font-bold text-lg px-10 py-5 rounded-full overflow-hidden shadow-[0_4px_20px_rgba(200,169,81,0.3)] hover:shadow-[0_8px_30px_rgba(200,169,81,0.5)] transition-all duration-300 hover:-translate-y-1"
              >
                {/* Button shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1s_ease-in-out_forwards]" />

                <span className="relative inline-flex items-center gap-2 whitespace-nowrap">
                  Get Started Now
                  <ArrowRight size={22} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 px-6 border-t border-[var(--color-border)] text-center text-sm text-[var(--color-text-muted)]">
        © 2026 AI Career Copilot · Built with ❤️ for the Hackathon
      </footer>
    </div>
  );
}

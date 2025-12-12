import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none">
              <defs>
                <linearGradient id="navGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#6366F1" }} />
                  <stop offset="100%" style={{ stopColor: "#F97316" }} />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="45" stroke="url(#navGrad)" strokeWidth="4" fill="none" />
              <path d="M30 42 C30 36, 36 30, 44 30 L56 30 C64 30, 70 36, 70 42 L70 44 C70 50, 64 54, 56 54 L50 54" stroke="url(#navGrad)" strokeWidth="5" strokeLinecap="round" fill="none" />
              <path d="M70 58 C70 64, 64 70, 56 70 L44 70 C36 70, 30 64, 30 58 L30 56 C30 50, 36 46, 44 46 L50 46" stroke="url(#navGrad)" strokeWidth="5" strokeLinecap="round" fill="none" />
            </svg>
            <span className="text-xl font-bold gradient-text">LinkForge</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
            <a href="#examples" className="text-slate-300 hover:text-white transition-colors">Examples</a>
            <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
            <Link href="/dashboard" className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/30">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }}></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="relative mx-auto w-48 h-48 mb-12">
            <div className="forge-ring w-48 h-48 border-primary-500/30" style={{ animationDelay: "0s" }}></div>
            <div className="forge-ring w-56 h-56 border-accent-500/20" style={{ animationDelay: "0.5s", left: "-1rem", top: "-1rem" }}></div>
            <div className="forge-ring w-64 h-64 border-primary-500/10" style={{ animationDelay: "1s", left: "-2rem", top: "-2rem" }}></div>
            <div className="absolute inset-0 flex items-center justify-center animate-glow rounded-full">
              <svg className="w-32 h-32 animate-forge" viewBox="0 0 100 100" fill="none">
                <defs>
                  <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#6366F1" }} />
                    <stop offset="100%" style={{ stopColor: "#F97316" }} />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="45" stroke="url(#heroGrad)" strokeWidth="3" fill="none" />
                <path d="M30 42 C30 36, 36 30, 44 30 L56 30 C64 30, 70 36, 70 42 L70 44 C70 50, 64 54, 56 54 L50 54" stroke="url(#heroGrad)" strokeWidth="4" strokeLinecap="round" fill="none" />
                <path d="M70 58 C70 64, 64 70, 56 70 L44 70 C36 70, 30 64, 30 58 L30 56 C30 50, 36 46, 44 46 L50 46" stroke="url(#heroGrad)" strokeWidth="4" strokeLinecap="round" fill="none" />
                <circle cx="50" cy="50" r="4" fill="url(#heroGrad)" />
              </svg>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 opacity-0 animate-fade-up">
            One Link.<br /><span className="gradient-text">Infinite Possibilities.</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-10 opacity-0 animate-fade-up stagger-1">
            A self-hosted link-in-bio tool that <strong className="text-white">you</strong> control. Custom domain, analytics, themes — no monthly fees.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up stagger-2">
            <Link href="/dashboard" className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold text-lg rounded-2xl transition-all duration-200 hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-1">
              Create Your Page — Free
            </Link>
            <a href="#examples" className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 text-white font-semibold text-lg rounded-2xl border border-slate-700 transition-all duration-200 hover:-translate-y-1">
              View Examples
            </a>
          </div>
        </div>
      </section>

      {/* Additional sections (CTA, Footer, etc.) would be implemented here following the mockup */}
    </main>
  );
}


import React, { useState } from 'react';
import { UserPreferences, MovieAnalysis } from './types';
import { PreferencePanel } from './components/PreferencePanel';
import { AnalysisCard } from './components/AnalysisCard';
import { analyzeMovie } from './services/geminiService';

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<MovieAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [prefs, setPrefs] = useState<UserPreferences>({
    industry: '', 
    location: '', 
    platform: 'Any',
    genre: 'Any',
    mood: 'Any',
    time: 'Normal'
  });

  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    
    if (!prefs.location) {
      setError("Please select a location in the sidebar first.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await analyzeMovie(query, prefs);
      const data = JSON.parse(response) as MovieAnalysis;
      setAnalysis(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred. Please check your API key in Vercel settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen hero-gradient text-slate-200 flex flex-col md:flex-row">
      <aside className="w-full md:w-72 md:h-screen md:sticky md:top-0 z-20 md:border-r border-white/10 shrink-0 bg-slate-900/50">
        <PreferencePanel prefs={prefs} setPrefs={setPrefs} />
      </aside>

      <main className="flex-1 flex flex-col p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </div>
            <h1 className="text-2xl font-black tracking-tighter uppercase text-white">CineLens AI</h1>
          </div>
          <p className="text-slate-400 font-medium">Your AI-powered Movie Insights Engine.</p>
        </header>

        <section className="mb-12 relative z-10">
          <form onSubmit={handleAnalyze} className="relative group">
            <input
              type="text"
              placeholder="e.g. 'Review Animal movie' or 'Suggest thriller movies'"
              className="w-full bg-slate-800/50 glass border border-white/10 rounded-2xl px-6 py-5 pr-32 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-500 shadow-2xl"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg active:scale-95 flex items-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Analyze</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </>
              )}
            </button>
          </form>
          {error && (
            <div className="mt-4 animate-in slide-in-from-top-2 duration-300">
              <p className="text-rose-400 text-sm font-medium bg-rose-500/10 p-4 rounded-xl border border-rose-500/20 flex items-center gap-3">
                <span className="text-lg">⚠️</span> {error}
              </p>
            </div>
          )}
        </section>

        <section className="flex-1">
          {loading ? (
            <div className="h-64 flex flex-col items-center justify-center gap-4 text-slate-500">
              <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
              <p className="animate-pulse font-medium">Aggregating critic scores & audience sentiment...</p>
            </div>
          ) : analysis ? (
            <AnalysisCard data={analysis} />
          ) : (
            <div className="h-96 flex flex-col items-center justify-center text-center opacity-40">
              <svg className="w-20 h-20 mb-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <h3 className="text-xl font-bold text-slate-400">Ready to lens your movie</h3>
              <p className="text-slate-500 max-w-sm mx-auto mt-2">Select your location and industry in the sidebar, then enter a movie title to get started.</p>
            </div>
          )}
        </section>

        <footer className="mt-24 py-8 border-t border-white/5 text-center text-[11px] text-slate-600 tracking-widest uppercase font-bold">
          Powered by Gemini 3.0 Pro & Dynamic Sentiment Analysis
        </footer>
      </main>
    </div>
  );
};

export default App;

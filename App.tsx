
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
      setError(err.message || "An unexpected error occurred. Verify your API_KEY is correctly set.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen hero-gradient text-slate-200 flex flex-col md:flex-row w-full">
      <aside className="w-full md:w-80 md:h-screen md:sticky md:top-0 z-20 md:border-r border-white/10 shrink-0 bg-slate-900/80 backdrop-blur-md">
        <PreferencePanel prefs={prefs} setPrefs={setPrefs} />
      </aside>

      <main className="flex-1 flex flex-col p-6 md:p-10 lg:p-16 max-w-full overflow-x-hidden">
        <header className="mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter uppercase text-white leading-none">CineLens AI</h1>
              <p className="text-blue-400/80 text-xs font-bold tracking-widest uppercase mt-1">Advanced Movie Insights</p>
            </div>
          </div>
        </header>

        <section className="mb-10 relative z-10">
          <form onSubmit={handleAnalyze} className="relative group max-w-4xl">
            <input
              type="text"
              placeholder="Enter movie title (e.g. 'Inception' or 'RRR')"
              className="w-full bg-slate-800/40 glass border border-white/10 rounded-2xl px-6 py-5 pr-32 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-500 shadow-2xl"
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
                  <span className="hidden sm:inline">Analyze</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </>
              )}
            </button>
          </form>
          
          {error && (
            <div className="mt-6 animate-in zoom-in-95 duration-300 max-w-4xl">
              <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl flex items-start gap-4">
                <span className="text-2xl mt-0.5">⚠️</span>
                <div>
                  <h4 className="text-rose-400 font-bold text-sm">Operation Failed</h4>
                  <p className="text-rose-400/70 text-xs mt-1 leading-relaxed">{error}</p>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="flex-1 max-w-6xl">
          {loading ? (
            <div className="h-80 flex flex-col items-center justify-center gap-6 text-slate-500">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-blue-500/10 rounded-full animate-pulse" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-white font-bold tracking-tight">Lens is focusing...</p>
                <p className="text-slate-500 text-sm mt-1">Scanning Global Movie Signals</p>
              </div>
            </div>
          ) : analysis ? (
            <AnalysisCard data={analysis} />
          ) : (
            <div className="h-96 flex flex-col items-center justify-center text-center opacity-40 animate-in fade-in duration-1000">
              <div className="w-24 h-24 mb-6 rounded-full bg-slate-800 flex items-center justify-center">
                <svg className="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-400">Ready to Analyze</h3>
              <p className="text-slate-500 max-w-sm mx-auto mt-2 text-sm">Select your industry and streaming preferences, then enter a title to get insights.</p>
            </div>
          )}
        </section>

        <footer className="mt-20 py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[10px] text-slate-600 tracking-widest uppercase font-bold">
            CineLens Engine • Powered by Gemini AI
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;

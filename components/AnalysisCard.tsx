
import React from 'react';
import { MovieAnalysis } from '../types';

interface Props {
  data: MovieAnalysis;
}

export const AnalysisCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-6">
      {/* Header Overview */}
      <div className="glass rounded-3xl p-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
          <svg className="w-24 h-24 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/></svg>
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">
              {data.overview.industry}
            </span>
            <span className="bg-purple-500/20 text-purple-300 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">
              {data.overview.genre}
            </span>
            <span className="bg-slate-500/20 text-slate-300 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">
              {data.overview.runtime}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-2 text-white">{data.overview.title}</h1>
          <p className="text-slate-400 text-sm">Available on: <span className="text-slate-200 font-medium">{data.overview.availableOn}</span></p>
        </div>

        {/* Ratings Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/5 text-center">
            <div className="text-3xl font-black text-blue-400">{data.ratings.overall}</div>
            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">Overall AI Score</div>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/5 text-center">
            <div className="text-3xl font-black text-amber-400">{data.ratings.audience}</div>
            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">Audience Pulse</div>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/5 text-center">
            <div className="text-3xl font-black text-rose-400">{data.ratings.critic}</div>
            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">Critic Consensus</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Review & Verdict */}
        <div className="flex flex-col gap-6">
          <section className="glass rounded-3xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="p-1 bg-blue-500 rounded">🧠</span> AI Review
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">"{data.review.summary}"</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs font-bold text-emerald-400 uppercase mb-2">Strengths</h4>
                <ul className="text-xs text-slate-400 space-y-1">
                  {data.review.strengths.map((s, i) => <li key={i}>• {s}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold text-rose-400 uppercase mb-2">Weaknesses</h4>
                <ul className="text-xs text-slate-400 space-y-1">
                  {data.review.weaknesses.map((s, i) => <li key={i}>• {s}</li>)}
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-slate-900/40 rounded-xl space-y-2 border border-white/5">
              <div className="text-xs">
                <span className="text-emerald-400 font-bold">Watch if:</span> <span className="text-slate-400">{data.review.whoWatch}</span>
              </div>
              <div className="text-xs">
                <span className="text-rose-400 font-bold">Skip if:</span> <span className="text-slate-400">{data.review.whoSkip}</span>
              </div>
            </div>
          </section>

          <section className="glass rounded-3xl p-6 bg-gradient-to-br from-blue-600/10 to-purple-600/10">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="p-1 bg-indigo-500 rounded">🎯</span> AI Verdict
            </h3>
            <div className="flex items-center gap-4">
              <div className={`px-4 py-2 rounded-full font-black uppercase text-sm ${
                data.verdict.worth.toLowerCase().includes('yes') ? 'bg-emerald-500 text-white' :
                data.verdict.worth.toLowerCase().includes('maybe') ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white'
              }`}>
                {data.verdict.worth}
              </div>
              <div className="text-sm text-slate-400">
                <span className="text-white font-bold">Best for:</span> {data.verdict.bestFor}
              </div>
            </div>
          </section>
        </div>

        {/* Sentiment & Recommendations */}
        <div className="flex flex-col gap-6">
          <section className="glass rounded-3xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="p-1 bg-pink-500 rounded">💬</span> Audience Sentiment
            </h3>
            <div className="mb-4">
              <div className="flex justify-between items-end mb-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Overall Mood</span>
                <span className="text-sm font-bold text-pink-400 uppercase tracking-tighter">{data.sentiment.mood}</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-1000 ${
                  data.sentiment.mood.toLowerCase().includes('positive') ? 'bg-emerald-500 w-[90%]' :
                  data.sentiment.mood.toLowerCase().includes('mixed') ? 'bg-amber-500 w-[50%]' : 
                  data.sentiment.mood.toLowerCase().includes('divisive') ? 'bg-indigo-500 w-[65%]' : 'bg-rose-500 w-[30%]'
                }`} />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Positive Themes</h4>
                <div className="flex flex-wrap gap-2">
                  {data.sentiment.positiveThemes.map((t, i) => (
                    <span key={i} className="bg-emerald-500/10 text-emerald-300 text-[10px] px-2 py-1 rounded-md border border-emerald-500/20">{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Common Grievances</h4>
                <div className="flex flex-wrap gap-2">
                  {data.sentiment.complaints.map((t, i) => (
                    <span key={i} className="bg-rose-500/10 text-rose-300 text-[10px] px-2 py-1 rounded-md border border-rose-500/20">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {data.recommendations && data.recommendations.length > 0 && (
            <section className="glass rounded-3xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="p-1 bg-amber-500 rounded">🚀</span> Recommendations
              </h3>
              <div className="space-y-3">
                {data.recommendations.map((rec, i) => (
                  <div key={i} className="p-3 bg-slate-900/40 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                    <div className="text-sm font-bold text-slate-200">{rec.title}</div>
                    <div className="text-[11px] text-slate-500 italic mt-0.5">{rec.reason}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

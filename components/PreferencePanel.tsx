
import React from 'react';
import { UserPreferences } from '../types';

interface Props {
  prefs: UserPreferences;
  setPrefs: React.Dispatch<React.SetStateAction<UserPreferences>>;
}

const countries = [
  "India", "USA", "UK", "South Korea", "Japan", "France", "China", "Nigeria", 
  "Spain", "Germany", "Italy", "Canada", "Australia", "Brazil", "Mexico", 
  "Turkey", "Russia", "Global"
].sort();

export const PreferencePanel: React.FC<Props> = ({ prefs, setPrefs }) => {
  const handleChange = (field: keyof UserPreferences, value: string) => {
    setPrefs(prev => {
      const newState = { ...prev, [field]: value };
      if (field === 'location') {
        newState.industry = '';
      }
      return newState;
    });
  };

  const getIndustryOptions = () => {
    if (!prefs.location) return [];
    
    switch (prefs.location) {
      case 'India':
        return [
          'Bollywood (Hindi)', 
          'Tollywood (Telugu)', 
          'Kollywood (Tamil)', 
          'Mollywood (Malayalam)', 
          'Sandalwood (Kannada)', 
          'Marathi Cinema', 
          'Bhojpuri Cinema',
          'Pollywood (Punjabi)',
          'Bengali Cinema'
        ];
      case 'USA':
        return ['Hollywood (California)', 'Independent Cinema'];
      case 'South Korea':
        return ['Hallyu (K-Cinema)', 'Independent'];
      case 'Nigeria':
        return ['Nollywood (English/Local)'];
      case 'Japan':
        return ['Anime', 'J-Cinema (Japanese)'];
      case 'UK':
        return ['British Cinema', 'BBC Films'];
      case 'France':
        return ['French New Wave Style', 'Modern French Cinema'];
      default:
        return [`${prefs.location} National Cinema`, 'Hollywood (International)', 'Regional Indie'];
    }
  };

  const industries = getIndustryOptions();

  return (
    <div className="flex flex-col gap-6 p-6 glass rounded-2xl h-full overflow-y-auto custom-scrollbar">
      <h2 className="text-xl font-bold text-blue-400 border-b border-white/10 pb-2">Preferences</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">User Location</label>
          <select 
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={prefs.location || ""}
            onChange={(e) => handleChange('location', e.target.value)}
          >
            <option value="" disabled>Select Country</option>
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className={`block text-xs font-medium mb-1 uppercase tracking-wider ${!prefs.location ? 'text-slate-600' : 'text-slate-400'}`}>Industry</label>
          <select 
            disabled={!prefs.location}
            className={`w-full bg-slate-800 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all ${!prefs.location ? 'border-slate-800 text-slate-600 cursor-not-allowed' : 'border-slate-700 text-white'}`}
            value={prefs.industry || ""}
            onChange={(e) => handleChange('industry', e.target.value)}
          >
            <option value="" disabled>Select Industry</option>
            {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
          </select>
          {!prefs.location && (
            <p className="text-[10px] text-blue-500/60 mt-1">Please select a location first.</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Streaming Platform</label>
          <select 
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={prefs.platform}
            onChange={(e) => handleChange('platform', e.target.value)}
          >
            <option>Any</option>
            <option>Netflix</option>
            <option>Prime Video</option>
            <option>Disney+</option>
            {prefs.location === 'India' && <option>Hotstar</option>}
            {prefs.location === 'India' && <option>JioCinema</option>}
            <option>Apple TV+</option>
            <option>Theatre</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Preferred Mood</label>
          <select 
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={prefs.mood}
            onChange={(e) => handleChange('mood', e.target.value)}
          >
            <option>Any</option>
            <option>Light / Comedy</option>
            <option>Emotional / Drama</option>
            <option>Thriller / Mystery</option>
            <option>Family / Kids</option>
            <option>Action / High Energy</option>
            <option>Horror / Dark</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Time Available</label>
          <select 
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={prefs.time}
            onChange={(e) => handleChange('time', e.target.value)}
          >
            <option>Normal (2-3 hrs)</option>
            <option>Short (&lt; 90 mins)</option>
            <option>Long (&gt; 3 hrs)</option>
          </select>
        </div>
      </div>
      
      <div className="mt-auto pt-6 text-[10px] text-slate-500 leading-relaxed italic border-t border-white/5">
        CineLens AI updates availability based on your selected location. Results are aggregated from IMDb, RT, and Metacritic.
      </div>
    </div>
  );
};

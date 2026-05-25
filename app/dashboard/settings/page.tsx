'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const { state, updateProfile, disconnect, resetData, isLoading } = useStore();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Suggested preset developer avatars
  const avatarPresets = [
    { name: 'Techno Orange', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=60' },
    { name: 'Neon Cyberpunk', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60' },
    { name: 'Retro Hacker', url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=60' },
    { name: 'AI Explorer', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=60' }
  ];

  useEffect(() => {
    if (!isLoading && !state.token) {
      router.push('/');
    } else if (state.token) {
      setUsername(state.username || '');
      setAvatarUrl(state.avatarUrl || '');
    }
  }, [state.token, isLoading, state.username, state.avatarUrl, router]);

  if (isLoading || !state.token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-base text-white">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-sm font-semibold tracking-wider">Syncing settings...</span>
        </div>
      </div>
    );
  }

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    updateProfile(username.trim(), avatarUrl.trim());
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all custom Sprints, XP records, and level calibrations to defaults?')) {
      resetData();
      alert('Data reset successfully.');
    }
  };

  return (
    <main className="md:ml-64 pt-24 pb-32 px-4 md:px-8 min-h-screen relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-secondary/5 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">
        {/* Header Section */}
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 uppercase font-sans tracking-tight">
            Settings &amp; Profile
          </h1>
          <p className="text-on-surface-variant text-base md:text-lg font-sans">
            Customize your developer profile, manage tokens, and calibrate API connection logs.
          </p>
        </div>

        {/* Profile Card & Customization */}
        <div className="glassmorphic-card p-6 md:p-8 rounded-[2rem] border-white/15 relative overflow-hidden">
          <h3 className="text-lg font-bold flex items-center gap-2 uppercase tracking-wider mb-6">
            <span className="material-symbols-outlined text-primary">person</span>
            Developer Profile
          </h3>

          <form onSubmit={handleProfileSave} className="space-y-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar Preview */}
              <div className="relative w-24 h-24 rounded-full border-2 border-primary/50 overflow-hidden flex-shrink-0">
                <img 
                  src={avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"} 
                  alt="Avatar Preview" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Avatar Select list */}
              <div className="w-full">
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-2">Preset Avatars</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {avatarPresets.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setAvatarUrl(preset.url)}
                      className={`px-3 py-2 bg-white/5 border text-xs rounded-xl font-bold transition-all text-center leading-tight hover:bg-white/10 ${
                        avatarUrl === preset.url ? 'border-primary text-primary shadow-[0_0_8px_rgba(255,90,54,0.3)]' : 'border-white/10 text-on-surface-variant'
                      }`}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Input boxes */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-2" htmlFor="username">
                  Developer Name
                </label>
                <input 
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-surface-container border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                  placeholder="e.g. Code Champion"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-2" htmlFor="avatar-url">
                  Custom Avatar Image URL
                </label>
                <input 
                  id="avatar-url"
                  type="text"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="w-full bg-surface-container border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm"
                  placeholder="Paste image address..."
                />
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                type="submit"
                className="bg-gradient-primary text-on-primary font-bold py-3.5 px-6 rounded-xl hover:scale-[1.02] active:scale-95 transition-all text-sm cursor-pointer shadow-glass"
              >
                Save Profile Changes
              </button>

              {saveSuccess && (
                <span className="text-xs text-secondary font-bold flex items-center gap-1.5 animate-pulse">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  Changes saved successfully!
                </span>
              )}
            </div>
          </form>
        </div>

        {/* daily.dev connection logs */}
        <div className="glassmorphic-card p-6 md:p-8 rounded-[2rem] border-white/15">
          <h3 className="text-lg font-bold flex items-center gap-2 uppercase tracking-wider mb-4">
            <span className="material-symbols-outlined text-secondary">token</span>
            daily.dev API Status
          </h3>

          <div className="space-y-4">
            {/* Status light */}
            <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full animate-pulse shadow-md ${state.isDemo ? 'bg-secondary shadow-secondary/50' : 'bg-primary shadow-primary/50'}`} />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {state.isDemo ? 'Connected via Demo Sandbox' : 'Connected via daily.dev PAT'}
                  </h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {state.isDemo ? 'Using high-fidelity mock bookmarks and profiles.' : 'Syncing live bookmarks from your daily.dev account.'}
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-on-surface-variant uppercase bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                ONLINE
              </span>
            </div>

            {/* Debug logger terminal */}
            <div>
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-2">Sync Log Output</label>
              <div className="bg-surface-container-lowest border border-white/5 rounded-xl p-4 font-mono text-[10px] text-primary/70 h-32 overflow-y-auto space-y-1.5 custom-scrollbar">
                <p>[{new Date().toISOString()}] Initializing daily.dev connector node...</p>
                <p>[{new Date().toISOString()}] Authentication verified. Mode: {state.isDemo ? 'DEMO_SANDBOX' : 'LIVE_PAT'}</p>
                <p>[{new Date().toISOString()}] Found {state.sprints.length} active learning tracks in memory.</p>
                <p>[{new Date().toISOString()}] Level calibrated at Level {state.level || 42} ({state.xp || 20750} total XP points accumulated).</p>
                <p>[{new Date().toISOString()}] Heartbeat active. Waiting for bookmark toggles...</p>
              </div>
            </div>
          </div>
        </div>

        {/* Danger zone / Data cache reset */}
        <div className="glassmorphic-card p-6 md:p-8 rounded-[2rem] border-red-500/10 bg-red-500/5">
          <h3 className="text-lg font-bold flex items-center gap-2 uppercase tracking-wider mb-2 text-red-400">
            <span className="material-symbols-outlined">danger</span>
            Danger Zone
          </h3>
          <p className="text-sm text-on-surface-variant mb-6">
            Actions that will destroy records or disconnect sync modules.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleReset}
              className="bg-red-500/10 hover:bg-red-500/25 border border-red-500/30 text-red-300 font-bold py-3 px-5 rounded-xl text-xs flex items-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-sm">restart_alt</span>
              Reset App Data Cache
            </button>

            <button
              onClick={disconnect}
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3 px-5 rounded-xl text-xs flex items-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              Disconnect Connection
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

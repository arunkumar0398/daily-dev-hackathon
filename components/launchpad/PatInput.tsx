'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

export const PatInput: React.FC = () => {
  const { connectToken, connectDemo, updateProfile, isLoading, error } = useStore();
  const [usernameInput, setUsernameInput] = useState('');
  const [token, setToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAdvancedPat, setShowAdvancedPat] = useState(false);
  const router = useRouter();

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUsername = usernameInput.trim() || 'Guest Developer';
    
    // Connect sandbox instantly with customized username
    connectDemo(cleanUsername);
    router.push('/dashboard');
  };

  const handlePatImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) return;

    const success = await connectToken(token.trim());
    if (success) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="w-full max-w-xl glassmorphic-card p-8 md:p-12 rounded-[2rem] shadow-glass-heavy relative overflow-hidden group">
      {/* Background visual flair */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[80px] rounded-full group-hover:bg-primary/20 transition-all duration-700"></div>
      
      <div className="relative z-10 space-y-6 text-left">
        {/* Primary flow: Username */}
        {!showAdvancedPat ? (
          <form onSubmit={handleUsernameSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-bold text-on-surface block mb-3 opacity-80" htmlFor="username-input">
                Enter your daily.dev username
              </label>
              <input 
                id="username-input" 
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="e.g. arunkumar"
                className="w-full bg-surface-container-low border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-white/20 font-medium"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-primary text-on-primary font-bold text-sm py-4 px-8 rounded-xl shadow-glass transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
            >
              <span className="material-symbols-outlined">rocket_launch</span>
              Enter Sprint Sandbox
            </button>
          </form>
        ) : (
          /* Advanced Flow: PAT Token */
          <form onSubmit={handlePatImport} className="space-y-6">
            <div>
              <label className="text-sm font-bold text-on-surface block mb-3 opacity-80" htmlFor="pat-input">
                daily.dev Personal Access Token (PAT)
              </label>
              <div className="relative">
                <input 
                  id="pat-input" 
                  type={showPassword ? "text" : "password"}
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  disabled={isLoading}
                  placeholder="dd_pat_xxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full bg-surface-container-low border border-white/10 rounded-xl px-4 py-4 text-primary focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-white/20"
                />
                <span 
                  onClick={() => setShowPassword(!showPassword)}
                  className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-white/30 cursor-pointer hover:text-white"
                >
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </div>
              
              {error && (
                <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">error</span>
                  {error}
                </p>
              )}
            </div>

            <button 
              type="submit"
              disabled={isLoading || !token.trim()}
              className="w-full bg-gradient-primary text-on-primary font-bold text-sm py-4 px-8 rounded-xl shadow-glass transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Importing Bookmarks...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">sync_alt</span>
                  Import & Sync Bookmarks
                </>
              )}
            </button>
          </form>
        )}

        {/* Toggle link */}
        <div className="flex flex-col items-center gap-4 pt-2">
          <button 
            type="button"
            onClick={() => {
              setShowAdvancedPat(!showAdvancedPat);
            }}
            className="text-xs font-bold text-on-surface-variant hover:text-white transition-colors cursor-pointer flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">
              {showAdvancedPat ? 'arrow_back' : 'settings'}
            </span>
            {showAdvancedPat ? 'Back to username entry' : 'Advanced: Use daily.dev API PAT token'}
          </button>
          
          <p className="flex items-center gap-2 text-[10px] text-on-surface-variant/50">
            <span className="material-symbols-outlined text-[12px]">lock</span>
            Private local configuration. No data is stored externally.
          </p>
        </div>
      </div>
    </div>
  );
};

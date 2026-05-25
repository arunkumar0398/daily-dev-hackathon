'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store';

export const TopNav: React.FC = () => {
  const pathname = usePathname();
  const { state, disconnect } = useStore();

  const isConnected = !!state.token;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/60 backdrop-blur-xl border-b border-white/10">
      <div className="flex justify-between items-center w-full px-4 md:px-8 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-6">
          <Link href={isConnected ? "/dashboard" : "/"}>
            <span className="text-xl md:text-2xl font-bold text-gradient-primary cursor-pointer font-sans">
              Learning Sprints
            </span>
          </Link>
          {isConnected && (
            <nav className="hidden md:flex gap-8 items-center">
              <Link href="/dashboard">
                <span className={`transition-colors font-semibold text-sm cursor-pointer ${pathname === '/dashboard' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-on-surface'}`}>
                  Dashboard
                </span>
              </Link>
              {pathname.startsWith('/sprint') && (
                <span className="font-semibold text-sm text-primary border-b-2 border-primary pb-1">
                  Action Center
                </span>
              )}
              {pathname === '/dashboard/stats' && (
                <span className="font-semibold text-sm text-primary border-b-2 border-primary pb-1">
                  Stats
                </span>
              )}
              {pathname === '/dashboard/settings' && (
                <span className="font-semibold text-sm text-primary border-b-2 border-primary pb-1">
                  Settings
                </span>
              )}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          {isConnected && (
            <>
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <span className="material-symbols-outlined text-primary scale-90" style={{ fontVariationSettings: '"FILL" 1' }}>local_fire_department</span>
                <span className="font-bold text-sm">{state.streak || 4} 🔥</span>
              </div>
              <Link href="/dashboard/settings" className="h-8 w-8 rounded-full overflow-hidden border border-primary/50 hover:scale-105 active:scale-95 transition-transform cursor-pointer block">
                <img 
                  alt="Developer Profile Avatar" 
                  className="object-cover h-full w-full"
                  src={state.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                />
              </Link>
              <button 
                onClick={disconnect}
                className="hidden md:block text-xs font-bold text-on-surface-variant hover:text-primary transition-colors border border-white/10 px-3 py-1.5 rounded-lg bg-white/5"
              >
                Disconnect
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

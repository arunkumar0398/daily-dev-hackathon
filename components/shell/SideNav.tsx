'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store';

export const SideNav: React.FC = () => {
  const pathname = usePathname();
  const { state, disconnect } = useStore();

  if (!state.token || pathname === '/') return null;

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-surface-container-lowest/80 backdrop-blur-2xl border-r border-white/10 flex-col py-8 gap-6 z-40 pt-24">
      <div className="px-6 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/50 flex-shrink-0">
            <img 
              src={state.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"} 
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-bold text-white truncate max-w-[120px]">{state.username}</p>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold">Level {state.level || 42} Dev</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar px-2">
        {/* Dashboard link */}
        <Link 
          href="/dashboard" 
          className={`flex items-center gap-4 px-4 py-3 mx-2 rounded-xl transition-all duration-300 group border ${
            pathname === '/dashboard' 
              ? 'bg-primary-container/10 border-primary text-primary shadow-[0_0_15px_rgba(255,90,54,0.15)] font-bold' 
              : 'border-transparent text-on-surface-variant hover:bg-white/5 hover:text-on-surface hover:border-white/10'
          }`}
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-sm font-medium">Dashboard</span>
        </Link>

        {/* Stats link */}
        <Link 
          href="/dashboard/stats" 
          className={`flex items-center gap-4 px-4 py-3 mx-2 rounded-xl transition-all duration-300 group border ${
            pathname === '/dashboard/stats' 
              ? 'bg-primary-container/10 border-primary text-primary shadow-[0_0_15px_rgba(255,90,54,0.15)] font-bold' 
              : 'border-transparent text-on-surface-variant hover:bg-white/5 hover:text-on-surface hover:border-white/10'
          }`}
        >
          <span className="material-symbols-outlined">insights</span>
          <span className="text-sm font-medium">Stats</span>
        </Link>

        {/* Settings link */}
        <Link 
          href="/dashboard/settings" 
          className={`flex items-center gap-4 px-4 py-3 mx-2 rounded-xl transition-all duration-300 group border ${
            pathname === '/dashboard/settings' 
              ? 'bg-primary-container/10 border-primary text-primary shadow-[0_0_15px_rgba(255,90,54,0.15)] font-bold' 
              : 'border-transparent text-on-surface-variant hover:bg-white/5 hover:text-on-surface hover:border-white/10'
          }`}
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="text-sm font-medium">Settings</span>
        </Link>

        {/* Sprints listing header */}
        {state.sprints.length > 0 && (
          <div className="pt-4 pb-2 px-4">
            <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest block">Active Sprints</span>
            <div className="mt-2 space-y-1">
              {state.sprints.map((sprint) => {
                const isActiveSprintPage = pathname === `/sprint/${sprint.id}`;
                return (
                  <Link 
                    key={sprint.id}
                    href={`/sprint/${sprint.id}`} 
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all hover:bg-white/5 ${
                      isActiveSprintPage 
                        ? 'text-primary bg-primary/5 border-l-2 border-primary' 
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <span className="truncate max-w-[125px]">{sprint.title}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${sprint.progress === 100 ? 'bg-secondary' : 'bg-primary'}`} />
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      <div className="px-6 mt-auto pb-4 flex flex-col gap-3">
        <Link 
          href="/dashboard?newSprint=true"
          className="w-full bg-gradient-primary text-on-primary py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(255,90,54,0.4)] hover:scale-[1.02] active:scale-95 transition-all text-sm text-center shadow-glass cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          New Sprint
        </Link>

        <button 
          onClick={disconnect}
          className="w-full bg-white/5 hover:bg-white/10 text-on-surface border border-white/10 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-sm cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">logout</span>
          Disconnect
        </button>
      </div>
    </aside>
  );
};

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const { state, disconnect } = useStore();

  if (!state.token || pathname === '/') return null;

  const isOnSprint = pathname.startsWith('/sprint');
  const isOnDashboard = pathname.startsWith('/dashboard');

  const activeSprint = state.sprints.find(s => s.status === 'active' || s.progress < 100) || state.sprints[0];
  const actionLink = activeSprint ? `/sprint/${activeSprint.id}` : '/dashboard';

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface-container-high/90 backdrop-blur-xl border-t border-white/10 flex justify-around items-center py-3 px-4 shadow-glass-heavy">
      {/* Home / Dashboard */}
      <Link
        href="/dashboard"
        className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all active:bg-white/10 ${isOnDashboard ? 'text-primary' : 'text-on-surface-variant'}`}
      >
        <span className="material-symbols-outlined">home</span>
        <span className="text-[10px] font-bold">Home</span>
      </Link>

      {/* Stats */}
      <Link
        href="/dashboard/stats"
        className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all active:bg-white/10 ${pathname === '/dashboard/stats' ? 'text-primary' : 'text-on-surface-variant'}`}
      >
        <span className="material-symbols-outlined">insights</span>
        <span className="text-[10px] font-bold">Stats</span>
      </Link>

      {/* Action Center — active when on sprint pages */}
      <Link
        href={actionLink}
        className={`flex flex-col items-center gap-0.5 p-2 rounded-lg ${isOnSprint ? 'text-primary scale-110' : 'text-on-surface-variant'}`}
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>bolt</span>
        <span className="text-[10px] font-bold">Action</span>
        {isOnSprint && (
          <div className="h-1 w-1 bg-primary rounded-full shadow-[0_0_8px_rgba(255,90,54,0.8)]" />
        )}
      </Link>

      {/* Profile / Settings */}
      <Link
        href="/dashboard/settings"
        className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all active:scale-95 ${pathname === '/dashboard/settings' ? 'text-primary' : 'text-on-surface-variant'}`}
      >
        <span className="material-symbols-outlined">person</span>
        <span className="text-[10px] font-bold">Profile</span>
      </Link>
    </nav>
  );
};


'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useStore } from '@/lib/store';
import { useRouter, useSearchParams } from 'next/navigation';
import { StatsStrip } from '@/components/dashboard/StatsStrip';
import { SprintCard } from '@/components/dashboard/SprintCard';
import { CreateSprintModal } from '@/components/dashboard/CreateSprintModal';
import Link from 'next/link';


function DashboardContent() {
  const { state, isLoading } = useStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    if (!isLoading && !state.token) {
      router.push('/');
    }
  }, [state.token, isLoading, router]);

  // Check query parameter to trigger modal
  useEffect(() => {
    if (searchParams.get('newSprint') === 'true') {
      setShowCreateModal(true);
      // Clean up search parameters without page refresh
      router.replace('/dashboard');
    }
  }, [searchParams, router]);

  if (isLoading || !state.token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-base text-white">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-sm font-semibold tracking-wider">Syncing dashboard data...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="md:ml-64 pt-24 pb-32 px-4 md:px-8 min-h-screen relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-secondary/5 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 uppercase font-sans tracking-tight">
              Sprint Overview
            </h1>
            <p className="text-on-surface-variant text-base md:text-lg font-sans">
              Accelerate your mastery through focused daily.dev learning cycles.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="bg-surface-container px-4 py-2 rounded-lg border border-white/10 text-sm font-bold flex items-center gap-2 hover:bg-surface-variant transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-sm">filter_list</span>
              Filter
            </button>
            <Link 
              href="/dashboard/stats"
              className="bg-surface-container px-4 py-2 rounded-lg border border-white/10 text-sm font-bold flex items-center gap-2 hover:bg-surface-variant transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">history</span>
              Archive
            </Link>
          </div>
        </div>

        {/* Top Stats Strip */}
        <StatsStrip sprints={state.sprints} />

        {/* Active Sprints Grid */}
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>bolt</span>
          Current Sprints
        </h2>
        
        {state.sprints.length === 0 ? (
          <div className="glassmorphic-card p-12 rounded-[2rem] text-center max-w-xl mx-auto space-y-4">
            <span className="material-symbols-outlined text-primary text-5xl">folder_off</span>
            <h3 className="text-xl font-bold">No active learning sprints</h3>
            <p className="text-sm text-on-surface-variant">
              Import some bookmarks from your daily.dev Launchpad or explore our high-fidelity sandbox.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {state.sprints.map((sprint) => (
              <SprintCard key={sprint.id} sprint={sprint} />
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => setShowCreateModal(true)}
        className="fixed bottom-24 right-6 md:bottom-12 md:right-12 w-14 h-14 bg-gradient-primary rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(255,90,54,0.4)] hover:scale-110 active:scale-95 transition-all z-40 group cursor-pointer"
      >
        <span className="material-symbols-outlined text-on-primary text-3xl transition-transform group-hover:rotate-90">add</span>
      </button>

      {/* Create Sprint Dialog */}
      {showCreateModal && (
        <CreateSprintModal onClose={() => setShowCreateModal(false)} />
      )}
    </main>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-bg-base text-white">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-sm font-semibold tracking-wider">Syncing dashboard data...</span>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}


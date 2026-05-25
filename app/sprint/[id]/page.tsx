'use client';

import React, { use, useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArticleCard } from '@/components/sprint/ArticleCard';
import { TaskChecklist } from '@/components/sprint/TaskChecklist';
import { CompletionModal } from '@/components/champion/CompletionModal';

interface SprintActionCenterPageProps {
  params: Promise<{ id: string }>;
}

export default function SprintActionCenterPage({ params }: SprintActionCenterPageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  
  const { state, toggleTask, regenerateTasks, isLoading } = useStore();
  const router = useRouter();
  const [showChampionModal, setShowChampionModal] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  // Redirect to Launchpad if not authenticated
  useEffect(() => {
    if (!isLoading && !state.token) {
      router.push('/');
    }
  }, [state.token, isLoading, router]);

  const sprint = state.sprints.find((s) => s.id === id);

  // Trigger Champion Modal automatically when 100% completed
  useEffect(() => {
    if (sprint && sprint.progress === 100) {
      setShowChampionModal(true);
    }
  }, [sprint?.progress]);

  if (isLoading || !state.token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-base text-white">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-sm font-semibold tracking-wider">Syncing action center...</span>
        </div>
      </div>
    );
  }

  if (!sprint) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg-base text-white p-6">
        <div className="glassmorphic-card p-8 rounded-[2rem] text-center max-w-md space-y-6">
          <span className="material-symbols-outlined text-primary text-5xl">warning</span>
          <h3 className="text-xl font-bold">Sprint Not Found</h3>
          <p className="text-sm text-on-surface-variant">
            We could not find the active learning sprint you are looking for.
          </p>
          <Link href="/dashboard" className="inline-block bg-gradient-primary text-on-primary font-bold py-3 px-6 rounded-xl hover:scale-105 transition-all">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    await regenerateTasks(sprint.id);
    setIsRegenerating(false);
  };

  const isReact = sprint.category.toLowerCase().includes('react');
  const isDesign = sprint.category.toLowerCase().includes('design') || sprint.category.toLowerCase().includes('backend');

  const progressGradient = isReact 
    ? 'bg-gradient-success shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
    : isDesign 
      ? 'bg-gradient-indigo shadow-[0_0_15px_rgba(99,102,241,0.4)]' 
      : 'bg-white/10';

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 pb-32 md:ml-64 pt-24 min-h-screen relative">
      {/* Back Button */}
      <div className="mb-8">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors group">
          <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <span className="text-sm font-bold">&lt; Back to Dashboard</span>
        </Link>
      </div>

      {/* Action Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-[0.25em] block mb-1">active learning track</span>
          <h1 className="text-2xl md:text-4xl font-extrabold uppercase tracking-wide text-white leading-tight font-sans">
            Sprint: {sprint.title}
          </h1>
          <p className="text-on-surface-variant text-sm md:text-base mt-2 max-w-xl leading-relaxed">
            {sprint.description}
          </p>
        </div>

        {/* Dynamic header progress tracker */}
        <div className="flex flex-col items-end min-w-[240px]">
          <div className="flex justify-between w-full mb-2 font-bold text-xs uppercase tracking-wider text-on-surface-variant">
            <span className="text-secondary">
              {sprint.tasks.filter(t => t.completed).length}/{sprint.tasks.length} Tasks Done
            </span>
            <span className="text-secondary">{sprint.progress}%</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              style={{ width: `${sprint.progress}%` }}
              className={`h-full transition-all duration-1000 ${progressGradient}`}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Resource Articles */}
        <section className="lg:col-span-7 flex flex-col gap-6">
          <h3 className="text-lg font-bold flex items-center gap-2 uppercase tracking-wider">
            <span className="material-symbols-outlined text-primary">auto_stories</span>
            Essential Resources
          </h3>
          <div className="flex flex-col gap-4">
            {sprint.articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* Right Column: Interactive Checklist */}
        <aside className="lg:col-span-5">
          <TaskChecklist
            tasks={sprint.tasks}
            category={sprint.category}
            onToggleTask={(taskId) => toggleTask(sprint.id, taskId)}
          />
        </aside>
      </div>

      {/* Floating Action Button (Regenerate Tasks) */}
      <button 
        onClick={handleRegenerate}
        disabled={isRegenerating}
        className="fixed bottom-24 right-6 md:bottom-12 md:right-12 z-40 flex items-center gap-2 bg-gradient-indigo px-6 py-4 rounded-full shadow-glass-heavy hover:scale-105 active:scale-95 transition-all group overflow-hidden cursor-pointer"
      >
        {/* Shimmer overlay on hover */}
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <span className="material-symbols-outlined relative z-10" style={{ fontVariationSettings: '"FILL" 1' }}>bolt</span>
        <span className="text-sm font-bold tracking-wide relative z-10">
          {isRegenerating ? 'Syncing...' : 'Regenerate Tasks'}
        </span>
      </button>

      {/* Sprint Champion Overlay Modal */}
      {showChampionModal && (
        <CompletionModal
          sprint={sprint}
          username={state.username}
          avatarUrl={state.avatarUrl}
          onClose={() => setShowChampionModal(false)}
        />
      )}
    </main>
  );
}

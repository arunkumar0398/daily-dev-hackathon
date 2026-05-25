'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { CompletionModal } from '@/components/champion/CompletionModal';
import { Sprint } from '@/types';
import Link from 'next/link';

export default function StatsDashboard() {
  const { state, isLoading } = useStore();
  const router = useRouter();
  const [selectedSprint, setSelectedSprint] = useState<Sprint | null>(null);

  useEffect(() => {
    if (!isLoading && !state.token) {
      router.push('/');
    }
  }, [state.token, isLoading, router]);

  if (isLoading || !state.token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-base text-white">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-sm font-semibold tracking-wider">Syncing statistics...</span>
        </div>
      </div>
    );
  }

  // XP, Level calculations
  const xp = state.xp || 20750;
  const level = state.level || 42;
  const streak = state.streak || 4;
  const currentLevelXp = xp % 500;
  const xpProgressPercent = Math.round((currentLevelXp / 500) * 100);

  // Sprints counts
  const totalSprints = state.sprints.length;
  const completedSprintsList = state.sprints.filter(s => s.status === 'completed' || s.progress === 100);
  const completedSprintsCount = completedSprintsList.length;
  const activeSprintsCount = totalSprints - completedSprintsCount;

  // Tasks counts
  const allTasks = state.sprints.flatMap(s => s.tasks);
  const completedTasksCount = allTasks.filter(t => t.completed).length;
  const totalTasksCount = allTasks.length;

  // Hours saved computation
  const completedArticlesCount = state.sprints.flatMap(s => s.articles).length;
  const hoursSaved = parseFloat((completedTasksCount * 1.2 + completedArticlesCount * 0.2).toFixed(1));

  // Category Hour breakdown
  const categoryHours: Record<string, number> = {};
  state.sprints.forEach(sprint => {
    const hours = sprint.durationHours * (sprint.progress / 100);
    categoryHours[sprint.category] = (categoryHours[sprint.category] || 0) + hours;
  });

  const categoryBreakdown = Object.entries(categoryHours).map(([name, hours]) => ({
    name,
    hours: parseFloat(hours.toFixed(1))
  })).sort((a, b) => b.hours - a.hours);

  // Generate simulated calendar streak for last 7 days
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const last7Days = Array.from({ length: 7 }).map((_, idx) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - idx));
    const dayName = daysOfWeek[date.getDay()];
    // Simulate active days: active if today, or if within streak index range
    const isActive = idx >= (7 - streak);
    return {
      dayName,
      dateNum: date.getDate(),
      isActive
    };
  });

  return (
    <main className="md:ml-64 pt-24 pb-32 px-4 md:px-8 min-h-screen relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-secondary/5 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 uppercase font-sans tracking-tight">
            Learning Analytics
          </h1>
          <p className="text-on-surface-variant text-base md:text-lg font-sans">
            Visualize your leveling progress, category expertise, and completed sprint records.
          </p>
        </div>

        {/* Level Up Banner & XP Card */}
        <div className="glassmorphic-card p-6 md:p-8 rounded-[2rem] mb-8 relative overflow-hidden group">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-primary opacity-10 rounded-full blur-[80px]" />
          
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            {/* XP Level Wheel */}
            <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="72" cy="72" r="60" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="transparent" />
                <circle 
                  cx="72" 
                  cy="72" 
                  r="60" 
                  stroke="url(#gradient-accent)" 
                  strokeWidth="8" 
                  fill="transparent" 
                  strokeDasharray={2 * Math.PI * 60} 
                  strokeDashoffset={2 * Math.PI * 60 * (1 - xpProgressPercent / 100)}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient-accent" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF5A36" />
                    <stop offset="100%" stopColor="#FF8A65" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">level</span>
                <span className="text-4xl font-black text-white">{level}</span>
              </div>
            </div>

            {/* Level Info & Progress Bar */}
            <div className="flex-grow w-full text-center md:text-left space-y-4">
              <div>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-primary/20">
                  {level >= 40 ? 'Legendary Dev' : level >= 20 ? 'Senior Engineer' : 'Rising Dev'}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white mt-2">
                  Progress to Level {level + 1}
                </h3>
                <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
                  Earn +50 XP for every checklist task completed, and +250 XP for full sprint completions.
                </p>
              </div>

              {/* Progress Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  <span>{currentLevelXp} / 500 XP</span>
                  <span>{xpProgressPercent}% Complete</span>
                </div>
                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-gradient-primary transition-all duration-1000 shadow-[0_0_15px_rgba(255,90,54,0.4)]"
                    style={{ width: `${xpProgressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Card 1: Sprints Managed */}
          <div className="glassmorphic-card p-6 rounded-2xl flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
              <span className="material-symbols-outlined">rocket_launch</span>
            </div>
            <div>
              <p className="text-on-surface-variant text-xs uppercase tracking-wider font-bold">Total Sprints</p>
              <h3 className="text-2xl font-bold text-white mt-0.5">
                {totalSprints}
                <span className="text-sm text-on-surface-variant/40 font-medium ml-2">({activeSprintsCount} active)</span>
              </h3>
            </div>
          </div>

          {/* Card 2: Tasks Checked */}
          <div className="glassmorphic-card p-6 rounded-2xl flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0">
              <span className="material-symbols-outlined">task_alt</span>
            </div>
            <div>
              <p className="text-on-surface-variant text-xs uppercase tracking-wider font-bold">Tasks Finished</p>
              <h3 className="text-2xl font-bold text-white mt-0.5">
                {completedTasksCount}
                <span className="text-sm text-on-surface-variant/40 font-medium ml-1">/{totalTasksCount}</span>
              </h3>
            </div>
          </div>

          {/* Card 3: Est Practice Hours */}
          <div className="glassmorphic-card p-6 rounded-2xl flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary flex-shrink-0">
              <span className="material-symbols-outlined">timer</span>
            </div>
            <div>
              <p className="text-on-surface-variant text-xs uppercase tracking-wider font-bold">Practice Hours</p>
              <h3 className="text-2xl font-bold text-white mt-0.5">{hoursSaved}h</h3>
            </div>
          </div>

          {/* Card 4: Current Streak */}
          <div className="glassmorphic-card p-6 rounded-2xl flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary/20 flex items-center justify-center text-primary flex-shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>local_fire_department</span>
            </div>
            <div>
              <p className="text-on-surface-variant text-xs uppercase tracking-wider font-bold">Daily Streak</p>
              <h3 className="text-2xl font-bold text-white mt-0.5">{streak} Days 🔥</h3>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Category breakdown (7 cols) */}
          <section className="lg:col-span-7 flex flex-col gap-6">
            <div className="glassmorphic-card p-6 md:p-8 rounded-[2rem] h-full flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2 uppercase tracking-wider mb-6">
                  <span className="material-symbols-outlined text-primary">analytics</span>
                  Category Breakdown
                </h3>
                
                {categoryBreakdown.length === 0 ? (
                  <p className="text-sm text-on-surface-variant">Complete some tasks to build category weight logs.</p>
                ) : (
                  <div className="space-y-6">
                    {categoryBreakdown.map((cat, idx) => {
                      const colors = [
                        'bg-gradient-primary shadow-[0_0_10px_rgba(255,90,54,0.3)]',
                        'bg-gradient-success shadow-[0_0_10px_rgba(16,185,129,0.3)]',
                        'bg-gradient-indigo shadow-[0_0_10px_rgba(99,102,241,0.3)]'
                      ];
                      const color = colors[idx % colors.length];
                      
                      const maxHours = Math.max(...categoryBreakdown.map(c => c.hours)) || 1;
                      const percentage = Math.round((cat.hours / maxHours) * 100);

                      return (
                        <div key={cat.name} className="space-y-2">
                          <div className="flex justify-between items-center text-sm font-semibold">
                            <span className="text-white">{cat.name}</span>
                            <span className="text-on-surface-variant">{cat.hours} hours active</span>
                          </div>
                          <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ${color}`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 text-xs text-on-surface-variant flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">info</span>
                Active practice hours are computed based on bookmarks read time + task checklist completion weight.
              </div>
            </div>
          </section>

          {/* Learning Streak Tracker Calendar (5 cols) */}
          <aside className="lg:col-span-5">
            <div className="glassmorphic-card p-6 md:p-8 rounded-[2rem] h-full flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2 uppercase tracking-wider mb-6">
                  <span className="material-symbols-outlined text-secondary">date_range</span>
                  Weekly Commitment
                </h3>

                <div className="grid grid-cols-7 gap-3 text-center">
                  {last7Days.map((day, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2">
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase">{day.dayName}</span>
                      <div 
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm border transition-all ${
                          day.isActive 
                            ? 'bg-secondary/15 border-secondary text-secondary shadow-[0_0_12px_rgba(78,222,163,0.3)]' 
                            : 'bg-white/5 border-white/10 text-on-surface-variant/45'
                        }`}
                      >
                        {day.dateNum}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary scale-110" style={{ fontVariationSettings: '"FILL" 1' }}>local_fire_department</span>
                  <div>
                    <h4 className="text-sm font-bold text-white">Streak Active: {streak} Days</h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">Maintain your learning cycle by completing at least 1 task daily.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 text-xs text-center text-on-surface-variant">
                Last checked learning event: Today
              </div>
            </div>
          </aside>
        </div>

        {/* Completed Sprints Archive */}
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="material-symbols-outlined text-secondary">workspace_premium</span>
          Sprint Champion Archive
        </h2>

        {completedSprintsList.length === 0 ? (
          <div className="glassmorphic-card p-12 rounded-[2rem] text-center max-w-xl mx-auto space-y-4">
            <span className="material-symbols-outlined text-secondary text-5xl">reward</span>
            <h3 className="text-xl font-bold">No completed sprints yet</h3>
            <p className="text-sm text-on-surface-variant">
              Finish 100% of the action tasks on any active sprint card to lock in your Champion Badge!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedSprintsList.map((sprint) => (
              <div 
                key={sprint.id} 
                className="glassmorphic-card p-6 rounded-2xl flex flex-col justify-between h-full border-secondary/20 hover:border-secondary/50 group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-secondary/10 text-secondary border border-secondary/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {sprint.category}
                    </span>
                    <span className="material-symbols-outlined text-secondary text-lg" style={{ fontVariationSettings: '"FILL" 1' }}>verified</span>
                  </div>
                  <h3 className="text-lg font-bold text-white truncate">{sprint.title}</h3>
                  <p className="text-xs text-on-surface-variant mt-2 line-clamp-2 leading-relaxed">
                    {sprint.description}
                  </p>
                  <div className="flex gap-4 text-[10px] font-bold text-on-surface-variant mt-4 uppercase tracking-wider">
                    <span>{sprint.articles.length} Articles</span>
                    <span>{sprint.tasks.length} Tasks</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex gap-2">
                  <button 
                    onClick={() => setSelectedSprint(sprint)}
                    className="w-full bg-secondary/15 hover:bg-secondary/25 text-secondary border border-secondary/30 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95"
                  >
                    <span className="material-symbols-outlined text-sm">workspace_premium</span>
                    View Share Card
                  </button>
                  <Link 
                    href={`/sprint/${sprint.id}`}
                    className="px-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center text-on-surface transition-all active:scale-95"
                  >
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Render selected completed sprint modal */}
      {selectedSprint && (
        <CompletionModal
          sprint={selectedSprint}
          username={state.username}
          avatarUrl={state.avatarUrl}
          onClose={() => setSelectedSprint(null)}
        />
      )}
    </main>
  );
}

'use client';

import React from 'react';
import { Sprint } from '@/types';

interface StatsStripProps {
  sprints: Sprint[];
}

export const StatsStrip: React.FC<StatsStripProps> = ({ sprints }) => {
  const activeSprints = sprints.filter(s => s.status === 'active').length;
  
  // Calculate completed tasks
  const allTasks = sprints.flatMap(s => s.tasks);
  const completedTasks = allTasks.filter(t => t.completed).length;
  
  // Calculate estimated saved hours (1.5h per completed task + read times of completed articles)
  const completedArticlesCount = sprints.flatMap(s => s.articles).length;
  const estimatedHoursSaved = parseFloat((completedTasks * 1.2 + completedArticlesCount * 0.2).toFixed(1));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {/* Stat Card 1 */}
      <div className="glassmorphic-card p-6 rounded-2xl flex items-center gap-5">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">timer</span>
        </div>
        <div>
          <p className="text-on-surface-variant text-xs uppercase tracking-wider font-bold">Active Sprints</p>
          <h3 className="text-2xl font-bold text-white">{activeSprints}</h3>
        </div>
      </div>
      {/* Stat Card 2 */}
      <div className="glassmorphic-card p-6 rounded-2xl flex items-center gap-5">
        <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
          <span className="material-symbols-outlined">task_alt</span>
        </div>
        <div>
          <p className="text-on-surface-variant text-xs uppercase tracking-wider font-bold">Completed Tasks</p>
          <h3 className="text-2xl font-bold text-white">
            {completedTasks}
            <span className="text-on-surface-variant/50 text-xl font-medium">/{allTasks.length}</span>
          </h3>
        </div>
      </div>
      {/* Stat Card 3 */}
      <div className="glassmorphic-card p-6 rounded-2xl flex items-center gap-5">
        <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary">
          <span className="material-symbols-outlined">auto_fix_high</span>
        </div>
        <div>
          <p className="text-on-surface-variant text-xs uppercase tracking-wider font-bold">Hours Saved</p>
          <h3 className="text-2xl font-bold text-white">{estimatedHoursSaved}h</h3>
        </div>
      </div>
    </div>
  );
};

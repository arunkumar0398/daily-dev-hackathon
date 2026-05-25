'use client';

import React from 'react';
import { Task } from '@/types';

interface TaskItemProps {
  task: Task;
  isActive: boolean;
  onToggle: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, isActive, onToggle }) => {
  if (task.completed) {
    return (
      <li 
        onClick={onToggle}
        className="flex items-center gap-4 group cursor-pointer"
      >
        <div className="w-6 h-6 rounded-md bg-gradient-success flex items-center justify-center neon-glow-success flex-shrink-0">
          <span className="material-symbols-outlined text-white text-[18px]">check</span>
        </div>
        <span className="text-base strikethrough text-on-surface-variant group-hover:text-on-surface transition-colors select-none">
          {task.text}
        </span>
      </li>
    );
  }

  if (isActive) {
    return (
      <li 
        onClick={onToggle}
        className="flex items-start gap-4 glassmorphic-card p-4 -mx-4 rounded-xl border border-primary/50 cursor-pointer shadow-[0_0_20px_rgba(255,90,54,0.3)] animate-pulse-glow"
      >
        <div className="w-6 h-6 rounded-md border-2 border-primary bg-transparent flex items-center justify-center flex-shrink-0 mt-0.5">
          {/* Empty check */}
        </div>
        <div className="flex-grow select-none">
          <span className="text-base text-primary font-semibold block leading-tight">
            {task.text}
          </span>
          <div className="text-xs text-on-surface-variant mt-1.5 flex items-center gap-1.5 font-medium">
            <span className="material-symbols-outlined text-sm text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>bolt</span>
            AI Insight: {task.rationale || 'Focus on active implementation to solidify bookmarks.'}
          </div>
        </div>
      </li>
    );
  }

  // Pending item
  return (
    <li 
      onClick={onToggle}
      className="flex items-center gap-4 group cursor-pointer select-none"
    >
      <div className="w-6 h-6 rounded-md border-2 border-outline bg-transparent flex items-center justify-center flex-shrink-0 group-hover:border-primary transition-colors">
        {/* Empty check */}
      </div>
      <span className="text-base text-on-surface group-hover:text-primary transition-colors">
        {task.text}
      </span>
    </li>
  );
};

'use client';

import React from 'react';
import { Task } from '@/types';
import { TaskItem } from './TaskItem';

interface TaskChecklistProps {
  tasks: Task[];
  category: string;
  onToggleTask: (taskId: string) => void;
}

export const TaskChecklist: React.FC<TaskChecklistProps> = ({ tasks, category, onToggleTask }) => {
  // Find the first uncompleted task to mark as active
  const firstUncompletedIndex = tasks.findIndex(t => !t.completed);

  // Category specific tips
  const getProTip = () => {
    const cat = category.toLowerCase();
    if (cat.includes('react') || cat.includes('front')) {
      return '💡 Pro Tip: Use the React DevTools "Profiler" tab and look for the "Flamegraph" to identify expensive commits and component re-renders.';
    }
    if (cat.includes('design') || cat.includes('back') || cat.includes('infra')) {
      return '💡 Pro Tip: When designing APIs, implement caching strategies at the Gateway layer to shield microservices from database bottlenecks.';
    }
    return '💡 Pro Tip: Set daily.dev streaks to keep up learning consistency. Small daily steps yield massive accumulated technical outcomes.';
  };

  return (
    <div className="glassmorphic-card rounded-2xl p-6 md:p-8 h-full border-primary/20 bg-surface-container/30">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold flex items-center gap-2 uppercase tracking-wide">
          <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: '"FILL" 1' }}>checklist</span>
          TASK CHECKLIST
        </h3>
        <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-on-surface">more_vert</span>
      </div>

      <ul className="flex flex-col gap-4">
        {tasks.map((task, idx) => (
          <TaskItem
            key={task.id}
            task={task}
            isActive={idx === firstUncompletedIndex}
            onToggle={() => onToggleTask(task.id)}
          />
        ))}
      </ul>

      <div className="mt-8 pt-6 border-t border-white/5">
        <div className="bg-indigo-500/10 rounded-lg p-4 border border-indigo-500/20">
          <p className="text-xs text-indigo-300 leading-relaxed">
            {getProTip()}
          </p>
        </div>
      </div>
    </div>
  );
};

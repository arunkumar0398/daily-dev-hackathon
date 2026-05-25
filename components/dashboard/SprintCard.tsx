'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { Sprint } from '@/types';

interface SprintCardProps {
  sprint: Sprint;
}

export const SprintCard: React.FC<SprintCardProps> = ({ sprint }) => {
  const { deleteSprint, renameSprint } = useStore();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const isReact = sprint.category.toLowerCase().includes('react');
  const isDesign = sprint.category.toLowerCase().includes('design') || sprint.category.toLowerCase().includes('backend');

  const badgeColor = isReact 
    ? 'bg-secondary/10 text-secondary border-secondary/20' 
    : isDesign 
      ? 'bg-tertiary/10 text-tertiary border-tertiary/20' 
      : 'bg-white/5 text-on-surface-variant border-white/10';

  const progressColor = isReact 
    ? 'bg-gradient-success shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
    : isDesign 
      ? 'bg-gradient-indigo shadow-[0_0_10px_rgba(99,102,241,0.3)]' 
      : 'bg-white/10';

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.card-menu-trigger') || target.closest('.card-menu-dropdown')) {
      return;
    }
    router.push(`/sprint/${sprint.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete the "${sprint.title}" learning sprint? All tasks and completion progress will be lost.`)) {
      deleteSprint(sprint.id);
    }
    setShowMenu(false);
  };

  const handleRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newTitle = prompt('Enter a new title for this learning sprint:', sprint.title);
    if (newTitle && newTitle.trim()) {
      renameSprint(sprint.id, newTitle.trim());
    }
    setShowMenu(false);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="glassmorphic-card p-8 rounded-[2rem] hover-glow-indigo flex flex-col h-full cursor-pointer relative overflow-visible transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-6 relative">
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${badgeColor}`}>
          {sprint.category}
        </span>
        
        {/* Card Options Menu */}
        <div className="relative">
          <button 
            onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
            className="card-menu-trigger text-on-surface-variant hover:text-white transition-colors p-1 rounded-full hover:bg-white/5 cursor-pointer flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[20px]">
              more_vert
            </span>
          </button>
          
          {showMenu && (
            <>
              {/* Overlay background to close menu */}
              <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setShowMenu(false); }} />
              
              {/* Dropdown Card Options */}
              <div className="card-menu-dropdown absolute right-0 mt-2 w-40 bg-surface-container-high/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-glass-heavy z-20 overflow-hidden py-1.5 animate-in fade-in slide-in-from-top-1 duration-150 text-left">
                <button
                  onClick={handleRename}
                  className="w-full text-left px-4 py-2.5 text-xs font-bold text-on-surface hover:text-primary hover:bg-white/5 flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">edit</span>
                  Rename Track
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full text-left px-4 py-2.5 text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <span className="material-symbols-outlined text-sm text-red-400">delete</span>
                  Delete Track
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2">{sprint.title}</h3>
      <p className="text-sm text-on-surface-variant mb-6 line-clamp-2 leading-relaxed">
        {sprint.description}
      </p>
      <p className="text-on-surface-variant text-sm mb-8 flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-sm">article</span> 
          {sprint.articles.length} Articles
        </span>
        <span className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-sm">checklist</span> 
          {sprint.tasks.length} Tasks
        </span>
      </p>
      <div className="mt-auto">
        <div className="flex justify-between items-end mb-3">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Progress</span>
          <span className={`text-xl font-bold ${isReact ? 'text-secondary' : isDesign ? 'text-tertiary' : 'text-white'}`}>
            {sprint.progress}%
          </span>
        </div>
        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <div 
            style={{ width: `${sprint.progress}%` }}
            className={`h-full transition-all duration-1000 ${progressColor}`}
          />
        </div>
      </div>
    </div>
  );
};

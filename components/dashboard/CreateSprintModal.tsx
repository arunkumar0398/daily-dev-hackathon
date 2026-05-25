'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';

interface CreateSprintModalProps {
  onClose: () => void;
}

export const CreateSprintModal: React.FC<CreateSprintModalProps> = ({ onClose }) => {
  const { createCustomSprint } = useStore();
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('React');
  const [resources, setResources] = useState([
    { title: '', url: '' },
    { title: '', url: '' },
    { title: '', url: '' }
  ]);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categoriesPreset = [
    'React', 'System Design', 'UI/UX', 'DevOps', 'Databases', 'Node.js', 'Python', 'Security', 'General'
  ];

  const handleResourceChange = (index: number, field: 'title' | 'url', value: string) => {
    const updated = [...resources];
    updated[index][field] = value;
    setResources(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Please provide a sprint title.');
      return;
    }

    // Filter out resources that don't have at least a URL
    const validResources = resources.filter(res => res.url.trim() !== '');
    if (validResources.length === 0) {
      setError('Please provide at least one resource article URL.');
      return;
    }

    // Validate URLs
    for (const res of validResources) {
      try {
        new URL(res.url);
      } catch (_) {
        setError(`"${res.url}" is not a valid URL. Please check formatting.`);
        return;
      }
    }

    setIsGenerating(true);
    const success = await createCustomSprint(
      title.trim(),
      category,
      validResources.map(res => ({
        title: res.title.trim() || `${category} Resource`,
        url: res.url.trim()
      }))
    );

    setIsGenerating(false);
    if (success) {
      onClose();
    } else {
      setError('Failed to generate tasks for the sprint. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      {/* Modal Card container */}
      <div className="relative w-full max-w-2xl bg-surface-container/90 border border-white/10 rounded-3xl overflow-hidden shadow-glass-heavy animate-in fade-in zoom-in-95 duration-200 p-6 md:p-8">
        
        {/* Glow background accent */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-white uppercase tracking-wide flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">add_circle</span>
            Launch Custom Sprint
          </h2>
          <p className="text-on-surface-variant text-sm mt-1">
            Cluster custom article bookmarks and generate AI action challenges.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-xs text-red-300 flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-sm">error</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-2">Sprint Track Title</label>
              <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-surface-container-low border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm"
                placeholder="e.g. Next.js App Router Masterclass"
                required
                disabled={isGenerating}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-2">Skill Path Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-surface-container-low border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-sm cursor-pointer"
                disabled={isGenerating}
              >
                {categoriesPreset.map(cat => (
                  <option key={cat} value={cat} className="bg-surface text-white">{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Resources checklist */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">Bookmarks Resources (Up to 3)</label>
              <span className="text-[10px] text-on-surface-variant/50 uppercase font-semibold">Enter Titles &amp; URLs</span>
            </div>

            <div className="space-y-3">
              {resources.map((res, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-white/5 border border-white/5 p-3 rounded-xl">
                  <input 
                    type="text"
                    value={res.title}
                    onChange={(e) => handleResourceChange(idx, 'title', e.target.value)}
                    className="w-full bg-surface-container-lowest border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-xs"
                    placeholder={`Resource #${idx + 1} Title (Optional)`}
                    disabled={isGenerating}
                  />
                  <input 
                    type="text"
                    value={res.url}
                    onChange={(e) => handleResourceChange(idx, 'url', e.target.value)}
                    className="w-full bg-surface-container-lowest border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-xs font-mono"
                    placeholder="https://..."
                    disabled={isGenerating}
                    required={idx === 0} // First one is mandatory
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Generate Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={isGenerating}
              className="flex-1 bg-gradient-primary text-on-primary font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 disabled:opacity-50 transition-all text-sm cursor-pointer shadow-glass font-sans"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating AI Tasks...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">auto_awesome</span>
                  Compile &amp; Generate Sprints
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isGenerating}
              className="px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold text-on-surface transition-all active:scale-95 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

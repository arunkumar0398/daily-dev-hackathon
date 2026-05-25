'use client';

import React, { useRef } from 'react';
import { Sprint } from '@/types';

interface CompletionModalProps {
  sprint: Sprint;
  username: string;
  avatarUrl: string;
  onClose: () => void;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({ sprint, username, avatarUrl, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    try {
      const html2canvas = (await import('html2canvas')).default;
      if (cardRef.current) {
        const canvas = await html2canvas(cardRef.current, {
          backgroundColor: '#0B0F19',
          scale: 2, // higher quality
          useCORS: true, // handle avatar image CORS
          logging: false
        });
        
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `${sprint.title.toLowerCase().replace(/\s+/g, '-')}-completion-card.png`;
        link.href = dataUrl;
        link.click();
      }
    } catch (e) {
      console.error('Failed to export share card image', e);
    }
  };

  const handleTweet = () => {
    const tweetText = `I just completed the "${sprint.title}" on daily.dev Learning Sprints! Mastered ${sprint.articles.length} articles and finished ${sprint.tasks.length} practical implementation challenges. 🔥🚀 #dailydev #LearningSprints`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, '_blank');
  };

  const isReact = sprint.category.toLowerCase().includes('react');
  const isDesign = sprint.category.toLowerCase().includes('design') || sprint.category.toLowerCase().includes('backend');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      {/* Completion Card Dialog */}
      <div className="relative w-full max-w-4xl bg-surface-container/90 border border-white/10 rounded-3xl overflow-hidden shadow-glass-heavy animate-in fade-in zoom-in-95 duration-300">
        
        {/* Decorative ambient background spots */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="p-6 md:p-10 flex flex-col md:grid md:grid-cols-12 gap-8 md:gap-10">
          
          {/* Left Column: Shareable Card Reference */}
          <div className="md:col-span-5 flex flex-col items-center text-center space-y-6">
            {/* The Visual Card to capture */}
            <div 
              ref={cardRef}
              className="relative p-6 rounded-[2rem] w-full max-w-[280px] flex flex-col items-center justify-between aspect-[3/4] overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(21,28,44,0.95) 0%, rgba(11,15,25,1) 100%)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
              }}
            >
              {/* Card visual elements */}
              <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at top, rgba(255,90,54,0.15) 0%, rgba(0,0,0,0) 60%)' }} />
              <div className="relative z-10 w-full flex flex-col items-center">
                <span className="text-[10px] font-bold tracking-widest text-primary uppercase mb-2">daily.dev learning sprints</span>
                
                {/* User avatar with gold halo */}
                <div className="relative w-28 h-28 rounded-full p-1.5 overflow-hidden my-4" style={{ border: '4px solid #4edea3', background: '#1c1f2a', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
                  <img 
                    alt="Developer Avatar" 
                    className="w-full h-full object-cover rounded-full"
                    src={avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                  />
                  <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full text-[8px] font-extrabold flex items-center gap-0.5" style={{ background: '#4edea3', color: '#003824' }}>
                    CHAMP
                  </div>
                </div>

                <h4 className="text-lg font-extrabold text-white leading-tight uppercase font-sans mt-2">{username}</h4>
                <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest block mt-0.5">Level 42 Developer</span>

                <div className="mt-4 w-full rounded-xl py-3 px-4 flex flex-col gap-1 items-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">completed track</span>
                  <span className="text-xs font-black text-secondary uppercase tracking-wide text-center leading-tight truncate w-full">
                    {sprint.title}
                  </span>
                </div>
              </div>

              {/* Verified QR bottom stamp */}
              <div className="relative z-10 w-full flex justify-between items-center mt-4 pt-3 border-t border-white/5">
                <div className="text-left">
                  <span className="text-[8px] font-bold text-on-surface-variant uppercase block">Verification</span>
                  <span className="text-[9px] font-black text-primary">sprints.daily.dev</span>
                </div>
                <img 
                  alt="Verification QR" 
                  className="w-8 h-8 opacity-75 rounded"
                  src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=50&auto=format&fit=crop&q=60"
                />
              </div>
            </div>

            <button 
              onClick={handleDownload}
              className="w-full bg-surface-container-high hover:bg-surface-variant border border-white/10 text-on-surface font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
            >
              <span className="material-symbols-outlined text-base">download</span>
              Download Share Card
            </button>
          </div>

          {/* Right Column: Copy & Gamified Bento stats */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="text-secondary font-bold text-xs uppercase tracking-[0.2em] block">Congratulations!</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight uppercase font-sans tracking-tight">
                Sprint Completed Successfully!
              </h2>
              <p className="text-on-surface-variant text-base">
                Amazing work, <span className="text-primary font-bold">{username}</span>. You have fully mastered the <span className="text-primary font-bold uppercase">{sprint.title}</span> track by completing all implementation goals.
              </p>
            </div>

            {/* Bento statistics panel */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <span className="material-symbols-outlined text-primary text-xl">auto_stories</span>
                <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider block mt-1">mastered</span>
                <h4 className="text-lg font-black text-white mt-1">{sprint.articles.length} Articles</h4>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <span className="material-symbols-outlined text-secondary text-xl">task_alt</span>
                <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider block mt-1">completed</span>
                <h4 className="text-lg font-black text-white mt-1">{sprint.tasks.length} Tasks</h4>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <span className="material-symbols-outlined text-tertiary text-xl">timer</span>
                <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider block mt-1">duration</span>
                <h4 className="text-lg font-black text-white mt-1">{sprint.durationHours}h Saved</h4>
              </div>
            </div>

            {/* Badges Earned Container */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">Badges Earned</span>
              <div className="flex gap-3">
                <span className="px-3.5 py-1.5 bg-gradient-primary/25 border border-primary/40 rounded-full text-xs font-bold text-primary flex items-center gap-1.5 shadow-md">
                  <span className="material-symbols-outlined text-sm">workspace_premium</span>
                  {isReact ? 'React Guru' : isDesign ? 'SysArch Guru' : 'Topic Champ'}
                </span>
                <span className="px-3.5 py-1.5 bg-gradient-success/25 border border-secondary/40 rounded-full text-xs font-bold text-secondary flex items-center gap-1.5 shadow-md">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  Implementation Hero
                </span>
              </div>
            </div>

            {/* Close / Share actions */}
            <div className="flex gap-4 pt-4">
              <button 
                onClick={handleTweet}
                className="flex-1 bg-gradient-primary text-on-primary font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(255,90,54,0.4)] transition-all cursor-pointer hover:scale-[1.02]"
              >
                <span className="material-symbols-outlined text-sm">share</span>
                Share to Twitter
              </button>
              <button 
                onClick={onClose}
                className="px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold transition-all cursor-pointer text-on-surface"
              >
                Close
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

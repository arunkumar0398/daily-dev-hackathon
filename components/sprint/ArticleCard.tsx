'use client';

import React from 'react';
import { Article } from '@/types';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="glassmorphic-card p-6 rounded-xl flex gap-4 overflow-hidden transition-all duration-300">
      <div className="hidden sm:block w-24 h-24 rounded-lg bg-surface-variant flex-shrink-0 overflow-hidden border border-white/5">
        <img 
          alt={article.title} 
          className="w-full h-full object-cover" 
          src={article.imageUrl || "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&auto=format&fit=crop&q=60"}
        />
      </div>
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            {article.tags.slice(0, 2).map((tag, i) => (
              <span 
                key={tag} 
                className={`px-2 py-0.5 rounded-full font-bold text-[9px] uppercase tracking-wider ${i === 0 ? 'bg-primary/10 text-primary' : 'bg-surface-variant text-on-surface-variant'}`}
              >
                {tag}
              </span>
            ))}
            <span className="bg-surface-variant/55 text-on-surface-variant px-2 py-0.5 rounded-full font-bold text-[9px] uppercase tracking-wider">
              {article.source}
            </span>
          </div>
          <h4 className="text-base font-bold text-white mb-2 hover:text-primary transition-colors leading-tight">
            {article.title}
          </h4>
        </div>
        <div className="flex items-center justify-between text-on-surface-variant text-xs mt-2">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">schedule</span> 
            {article.readTime} min read
          </span>
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-primary hover:underline flex items-center gap-1 font-bold text-xs"
          >
            Read Article 
            <span className="material-symbols-outlined text-xs">open_in_new</span>
          </a>
        </div>
      </div>
    </div>
  );
};

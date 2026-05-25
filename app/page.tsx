'use client';

import React, { useEffect, useRef } from 'react';
import { PatInput } from '@/components/launchpad/PatInput';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function Launchpad() {
  const glowRef = useRef<HTMLDivElement>(null);
  const { state } = useStore();
  const router = useRouter();

  // Redirect to Dashboard if already authenticated
  useEffect(() => {
    if (state.token) {
      router.push('/dashboard');
    }
  }, [state.token, router]);

  // Parallax ambient effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        const x = (e.clientX / window.innerWidth) * 20;
        const y = (e.clientY / window.innerHeight) * 20;
        glowRef.current.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="flex-1 flex flex-col items-center justify-center min-h-screen pt-24 pb-20 px-4 relative overflow-hidden">
      {/* Parallax Atmospheric Background Glow */}
      <div 
        ref={glowRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-[radial-gradient(circle,rgba(99,102,241,0.08)_0%,rgba(11,15,25,0)_70%)] pointer-events-none z-0 transition-transform duration-300 ease-out"
      />

      <section className="max-w-4xl w-full flex flex-col items-center text-center px-4 relative z-10">
        {/* Hero Section */}
        <div className="mb-12 space-y-4">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight uppercase font-sans">
            Turn Passive Saved Articles Into <span className="text-gradient-primary">Active Skill Sprints</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto font-sans font-medium">
            daily.dev helps you discover content; we help you use it. Transform your bookmarks into actionable development roadmaps.
          </p>
        </div>

        {/* Input Card Container */}
        <PatInput />

        {/* Features Preview Container */}
        <div className="mt-20 w-full grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60 hover:opacity-100 transition-opacity duration-500">
          <div className="glassmorphic-card p-6 rounded-2xl text-left space-y-4">
            <span className="material-symbols-outlined text-primary text-3xl">auto_awesome</span>
            <h3 className="text-lg font-bold">AI Clustering</h3>
            <p className="text-sm text-on-surface-variant">We group your bookmarks by semantic skill paths automatically.</p>
          </div>
          <div className="glassmorphic-card p-6 rounded-2xl text-left space-y-4">
            <span className="material-symbols-outlined text-secondary text-3xl">trending_up</span>
            <h3 className="text-lg font-bold">Sprint Tracks</h3>
            <p className="text-sm text-on-surface-variant">Set learning goals and track progress across multiple content sources.</p>
          </div>
          <div className="glassmorphic-card p-6 rounded-2xl text-left space-y-4">
            <span className="material-symbols-outlined text-tertiary text-3xl">inventory_2</span>
            <h3 className="text-lg font-bold">Skill Archive</h3>
            <p className="text-sm text-on-surface-variant">Turn completed articles into a permanent knowledge repository.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

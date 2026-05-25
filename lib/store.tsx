'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Sprint, Task, Article, AppState } from '@/types';

interface StoreContextType {
  state: AppState;
  connectToken: (token: string) => Promise<boolean>;
  connectDemo: (customUsername?: string) => void;
  disconnect: () => void;
  toggleTask: (sprintId: string, taskId: string) => void;
  regenerateTasks: (sprintId: string) => Promise<void>;
  deleteSprint: (sprintId: string) => void;
  renameSprint: (sprintId: string, newTitle: string) => void;
  createCustomSprint: (title: string, category: string, articlesData: Array<{ title: string; url: string }>) => Promise<boolean>;
  updateProfile: (username: string, avatarUrl: string) => void;
  resetData: () => void;
  isLoading: boolean;
  error: string | null;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const DEMO_SPRINTS: Sprint[] = [
  {
    id: 'sprint-react-perf',
    title: 'React Performance Sprint',
    description: 'Master memoization, profiling, and the new React 19 Compiler to eliminate unnecessary re-renders.',
    category: 'React',
    difficulty: 'Intermediate',
    progress: 66,
    durationHours: 4.2,
    status: 'active',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    articles: [
      {
        id: 'art-react-1',
        title: 'Optimizing React Re-renders with Profiler',
        url: 'https://daily.dev/blog/react-profiler-guide',
        readTime: 8,
        tags: ['React', 'Performance', 'WebDev'],
        source: 'daily.dev blog',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60'
      },
      {
        id: 'art-react-2',
        title: 'How useMemo Works Under the Hood',
        url: 'https://dev.to/react-usememo-deep-dive',
        readTime: 12,
        tags: ['React', 'JavaScript', 'UnderTheHood'],
        source: 'dev.to',
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60'
      },
      {
        id: 'art-react-3',
        title: 'React 19 Compiler: Deep Dive & Migration',
        url: 'https://medium.com/react-compiler-19',
        readTime: 15,
        tags: ['React', 'React 19', 'Compiler'],
        source: 'Medium',
        imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&auto=format&fit=crop&q=60'
      }
    ],
    tasks: [
      {
        id: 'task-react-1',
        articleId: 'art-react-1',
        text: 'Record a flame graph of an input form using Chrome React DevTools and isolate render sources.',
        completed: true,
        difficulty: 'easy',
        rationale: 'Isolating form fields using the Profiler shows precisely which components are rendering unnecessarily.',
        isAiGenerated: true
      },
      {
        id: 'task-react-2',
        articleId: 'art-react-1',
        text: 'Refactor a slow map component using unique object IDs instead of index keys.',
        completed: true,
        difficulty: 'medium',
        rationale: 'Using index keys causes React to mismatch elements during reconciliation, triggering extra node paints.',
        isAiGenerated: true
      },
      {
        id: 'task-react-3',
        articleId: 'art-react-2',
        text: 'Implement custom strict-equality prop comparison inside React.memo.',
        completed: false,
        difficulty: 'medium',
        rationale: 'A customized comparison function is necessary when working with complex nested object reference props.',
        isAiGenerated: true
      },
      {
        id: 'task-react-4',
        articleId: 'art-react-3',
        text: 'Run the React Compiler ESLint rules on a legacy repository to check compile readiness.',
        completed: false,
        difficulty: 'hard',
        rationale: 'React 19 compiler requires strict adherence to Rules of React. Linting first will pinpoint mutability violations.',
        isAiGenerated: true
      }
    ]
  },
  {
    id: 'sprint-sys-design',
    title: 'System Design Essentials',
    description: 'Learn robust strategies for scaling database read/write throughput and distributing load using hash rings.',
    category: 'System Design',
    difficulty: 'Advanced',
    progress: 33,
    durationHours: 6.5,
    status: 'active',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    articles: [
      {
        id: 'art-sys-1',
        title: 'Scaling Databases from 0 to 1M Users',
        url: 'https://highscalability.com/database-scaling-roadmap',
        readTime: 18,
        tags: ['System Design', 'Databases', 'Scaling'],
        source: 'High Scalability',
        imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&auto=format&fit=crop&q=60'
      },
      {
        id: 'art-sys-2',
        title: 'Consistent Hashing Explained',
        url: 'https://systemdesign.one/consistent-hashing',
        readTime: 10,
        tags: ['System Design', 'Hashing', 'DistributedSystems'],
        source: 'SystemDesign.one',
        imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60'
      }
    ],
    tasks: [
      {
        id: 'task-sys-1',
        articleId: 'art-sys-1',
        text: 'Sketch a multi-region read-replica database architecture handling cache invalidation.',
        completed: true,
        difficulty: 'medium',
        rationale: 'Drawing this highlights the classic tradeoff of replication lag and consistency guarantees.',
        isAiGenerated: true
      },
      {
        id: 'task-sys-2',
        articleId: 'art-sys-2',
        text: 'Write a basic Consistent Hashing Ring implementation in Typescript with virtual nodes.',
        completed: false,
        difficulty: 'hard',
        rationale: 'Virtual nodes are vital to ensure even hash distribution across servers, eliminating key hot-spotting.',
        isAiGenerated: true
      },
      {
        id: 'task-sys-3',
        articleId: 'art-sys-2',
        text: 'Simulate server additions and removals to measure key reallocation percentage.',
        completed: false,
        difficulty: 'hard',
        rationale: 'Measuring reallocated keys proves that consistent hashing only moves K/N keys compared to K % N hash re-mappings.',
        isAiGenerated: true
      }
    ]
  },
  {
    id: 'sprint-ui-aesthetics',
    title: 'Modern CSS & UI Aesthetics',
    description: 'Explore the capabilities of Tailwind CSS v4 and the mechanics of smooth, hardware-accelerated animations.',
    category: 'UI/UX',
    difficulty: 'Beginner',
    progress: 0,
    durationHours: 2.5,
    status: 'not_started',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    articles: [
      {
        id: 'art-css-1',
        title: 'Next-Gen Styling: A Guide to Tailwind CSS v4',
        url: 'https://tailwindcss.com/blog/v4-beta',
        readTime: 9,
        tags: ['CSS', 'Tailwind', 'WebDesign'],
        source: 'Tailwind Blog',
        imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&auto=format&fit=crop&q=60'
      },
      {
        id: 'art-css-2',
        title: 'Creating Fluid & Hardware-Accelerated Micro-interactions',
        url: 'https://css-tricks.com/hardware-accelerated-animations',
        readTime: 14,
        tags: ['CSS', 'Animations', 'UX'],
        source: 'CSS Tricks',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60'
      }
    ],
    tasks: [
      {
        id: 'task-css-1',
        articleId: 'art-css-1',
        text: 'Migrate a standard Tailwind config.js file to the new CSS-based @theme configuration format.',
        completed: false,
        difficulty: 'medium',
        rationale: 'Tailwind v4 removes the JS config file, relying completely on custom CSS variables within the CSS file.',
        isAiGenerated: true
      },
      {
        id: 'task-css-2',
        articleId: 'art-css-2',
        text: 'Build a hover card interaction using hardware-accelerated transform, opacity, and will-change.',
        completed: false,
        difficulty: 'easy',
        rationale: 'Animating only transform and opacity offloads work to the GPU, avoiding CPU reflow and paint cycles.',
        isAiGenerated: true
      }
    ]
  }
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    token: null,
    username: '',
    avatarUrl: '',
    sprints: [],
    isDemo: false,
    xp: 20750,
    level: 42,
    streak: 4
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem('daily_dev_sprints_state');
      if (savedState) {
        const parsed = JSON.parse(savedState);
        setState({
          xp: 20750,
          level: 42,
          streak: 4,
          ...parsed
        });
      }
    } catch (e) {
      console.error('Failed to load state from localStorage', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save state to localStorage whenever it changes
  const saveState = (newState: AppState) => {
    setState(newState);
    try {
      localStorage.setItem('daily_dev_sprints_state', JSON.stringify(newState));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  };

  const connectToken = async (token: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      // Validate PAT against our local proxy endpoint
      const response = await fetch('/api/bookmarks', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Invalid daily.dev Personal Access Token (PAT).');
      }

      const data = await response.json();
      
      // Group the bookmarks into Sprints
      const sprintsResponse = await fetch('/api/bookmarks/group', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ bookmarks: data.bookmarks })
      });

      const sprintsData = sprintsResponse.ok ? await sprintsResponse.json() : { sprints: [] };

      const newState: AppState = {
        token,
        username: data.user?.name || 'daily.dev Developer',
        avatarUrl: data.user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        sprints: sprintsData.sprints && sprintsData.sprints.length > 0 ? sprintsData.sprints : DEMO_SPRINTS,
        isDemo: false,
        xp: state.xp || 20750,
        level: state.level || 42,
        streak: state.streak || 4
      };

      saveState(newState);
      setIsLoading(false);
      return true;
    } catch (e: any) {
      setError(e.message || 'Authentication failed. Please verify your token.');
      setIsLoading(false);
      return false;
    }
  };

  const connectDemo = (customUsername?: string) => {
    setIsLoading(true);
    const newState: AppState = {
      token: 'demo_token_xxxxxxxx',
      username: customUsername || 'Code Champion',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      sprints: DEMO_SPRINTS,
      isDemo: true,
      xp: 20750,
      level: 42,
      streak: 4
    };
    saveState(newState);
    setIsLoading(false);
  };

  const disconnect = () => {
    localStorage.removeItem('daily_dev_sprints_state');
    setState({
      token: null,
      username: '',
      avatarUrl: '',
      sprints: [],
      isDemo: false,
      xp: 20750,
      level: 42,
      streak: 4
    });
    setError(null);
  };

  const toggleTask = (sprintId: string, taskId: string) => {
    let xpDiff = 0;
    
    const sprintToUpdate = state.sprints.find(s => s.id === sprintId);
    if (sprintToUpdate) {
      const taskToToggle = sprintToUpdate.tasks.find(t => t.id === taskId);
      if (taskToToggle) {
        // Toggle task: complete = add 50 XP, incomplete = remove 50 XP
        xpDiff = taskToToggle.completed ? -50 : 50;

        const oldCompletedCount = sprintToUpdate.tasks.filter(t => t.completed).length;
        const newCompletedCount = oldCompletedCount + (taskToToggle.completed ? -1 : 1);
        const totalTasks = sprintToUpdate.tasks.length;
        
        const oldIsCompleted = oldCompletedCount === totalTasks;
        const newIsCompleted = newCompletedCount === totalTasks;
        
        if (!oldIsCompleted && newIsCompleted) {
          // Sprint newly completed! Bonus 250 XP
          xpDiff += 250;
        } else if (oldIsCompleted && !newIsCompleted) {
          // Sprint no longer completed. Revert bonus
          xpDiff -= 250;
        }
      }
    }

    const nextXp = Math.max(0, (state.xp || 20750) + xpDiff);
    const nextLevel = Math.floor(nextXp / 500) + 1;

    const updatedSprints = state.sprints.map((sprint) => {
      if (sprint.id !== sprintId) return sprint;

      const updatedTasks = sprint.tasks.map((task) => {
        if (task.id !== taskId) return task;
        return { ...task, completed: !task.completed };
      });

      const completedCount = updatedTasks.filter((t) => t.completed).length;
      const progress = Math.round((completedCount / updatedTasks.length) * 100);
      const status = progress === 100 ? 'completed' : progress > 0 ? 'active' : 'not_started';

      return {
        ...sprint,
        tasks: updatedTasks,
        progress,
        status: status as any
      };
    });

    saveState({
      ...state,
      sprints: updatedSprints,
      xp: nextXp,
      level: nextLevel
    });
  };

  const regenerateTasks = async (sprintId: string): Promise<void> => {
    setIsLoading(true);
    try {
      const sprint = state.sprints.find((s) => s.id === sprintId);
      if (!sprint) throw new Error('Sprint not found');

      // Call API route to generate new tasks for the sprint articles
      const response = await fetch('/api/generate-tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ articles: sprint.articles })
      });

      if (!response.ok) {
        throw new Error('Failed to regenerate tasks');
      }

      const data = await response.json();
      
      const updatedSprints = state.sprints.map((s) => {
        if (s.id !== sprintId) return s;
        return {
          ...s,
          tasks: data.tasks,
          progress: 0,
          status: 'active' as const
        };
      });

      saveState({
        ...state,
        sprints: updatedSprints
      });
    } catch (e) {
      console.error('Failed to regenerate tasks, toggling to not completed as backup', e);
      const updatedSprints = state.sprints.map((s) => {
        if (s.id !== sprintId) return s;
        return {
          ...s,
          tasks: s.tasks.map((t) => ({ ...t, completed: false })),
          progress: 0,
          status: 'active' as const
        };
      });
      saveState({
        ...state,
        sprints: updatedSprints
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSprint = (sprintId: string) => {
    const updatedSprints = state.sprints.filter(s => s.id !== sprintId);
    saveState({
      ...state,
      sprints: updatedSprints
    });
  };

  const renameSprint = (sprintId: string, newTitle: string) => {
    const updatedSprints = state.sprints.map((s) => {
      if (s.id !== sprintId) return s;
      return { ...s, title: newTitle };
    });
    saveState({
      ...state,
      sprints: updatedSprints
    });
  };

  const updateProfile = (username: string, avatarUrl: string) => {
    saveState({
      ...state,
      username,
      avatarUrl
    });
  };


  const resetData = () => {
    saveState({
      ...state,
      sprints: DEMO_SPRINTS,
      xp: 20750,
      level: 42,
      streak: 4
    });
  };

  const createCustomSprint = async (
    title: string,
    category: string,
    articlesData: Array<{ title: string; url: string }>
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const articles: Article[] = articlesData.map((art, idx) => {
        let source = 'Web Resource';
        try {
          const parsedUrl = new URL(art.url);
          source = parsedUrl.hostname.replace('www.', '');
        } catch (_) {}

        return {
          id: `art-custom-${Date.now()}-${idx}`,
          title: art.title || `${category} Topic Resource ${idx + 1}`,
          url: art.url,
          readTime: Math.floor(Math.random() * 8) + 5, // 5-12 mins
          tags: [category, 'Custom'],
          source: source,
          imageUrl: idx % 2 === 0
            ? 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60'
            : 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&auto=format&fit=crop&q=60'
        };
      });

      const response = await fetch('/api/generate-tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ articles })
      });

      if (!response.ok) {
        throw new Error('Failed to generate tasks for custom sprint');
      }

      const data = await response.json();
      
      const newSprint: Sprint = {
        id: `sprint-custom-${Date.now()}`,
        title,
        description: `Custom sprint focused on ${category}. Created to action bookmarks in this technology path.`,
        category,
        difficulty: 'Intermediate',
        progress: 0,
        durationHours: parseFloat((articles.length * 1.5).toFixed(1)),
        status: 'active',
        createdAt: new Date().toISOString(),
        articles,
        tasks: data.tasks || []
      };

      const newState: AppState = {
        ...state,
        sprints: [newSprint, ...state.sprints]
      };

      saveState(newState);
      setIsLoading(false);
      return true;
    } catch (e) {
      console.error('Failed to create custom sprint', e);
      setIsLoading(false);
      return false;
    }
  };

  return (
    <StoreContext.Provider
      value={{
        state,
        connectToken,
        connectDemo,
        disconnect,
        toggleTask,
        regenerateTasks,
        deleteSprint,
        renameSprint,
        createCustomSprint,
        updateProfile,
        resetData,
        isLoading,
        error
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

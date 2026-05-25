export interface Article {
  id: string;
  title: string;
  url: string;
  description?: string;
  readTime: number; // in minutes
  tags: string[];
  source: string;
  imageUrl?: string;
}

export interface Task {
  id: string;
  articleId: string;
  text: string;
  completed: boolean;
  difficulty?: 'easy' | 'medium' | 'hard';
  rationale?: string; // AI insight
  isAiGenerated: boolean;
}

export interface Sprint {
  id: string;
  title: string;
  description: string;
  category: string; // e.g., "React", "System Design", "General"
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number; // percentage (0 to 100)
  durationHours: number; // estimated hours to complete
  articles: Article[];
  tasks: Task[];
  status: 'not_started' | 'active' | 'completed';
  createdAt: string;
}

export interface Streak {
  count: number;
  lastActiveDate: string; // ISO string
}

export interface UserStats {
  streak: number;
  totalTasksCompleted: number;
  totalHoursSaved: number;
}

export interface AppState {
  token: string | null;
  username: string;
  avatarUrl: string;
  sprints: Sprint[];
  isDemo: boolean;
  xp?: number;
  level?: number;
  streak?: number;
}


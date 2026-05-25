import { Article, Sprint, Task } from '@/types';

// Standard action tasks map by tag keywords
const FALLBACK_TASK_TEMPLATES: Record<string, string[]> = {
  react: [
    'Profile component re-renders using Chrome React DevTools and optimize slow states.',
    'Refactor a class component or prop-drilling setup to use React Context or local reducer.',
    'Test state updates using React Testing Library to ensure expected side-effects.'
  ],
  javascript: [
    'Write a vanilla JS script implementing the core asynchronous behavior described in the article.',
    'Analyze scope closures and memory usage in devtools for the described functions.',
    'Create an offline-first service worker to cache resources for this code pattern.'
  ],
  node: [
    'Setup a local Express/NestJS server implementing the API routes described.',
    'Integrate error handling middleware to gracefully catch uncaught exceptions.',
    'Benchmark API response throughput using autocannon or siege.'
  ],
  design: [
    'Sketch a database schema and entity relations for this architectural pattern.',
    'Implement a consistent hashing ring or message queue retry policy locally.',
    'Write a load balancer test script simulating network failure and node failover.'
  ],
  css: [
    'Build a responsive CSS layout implementing the layout principles outlined.',
    'Create a fluid, high-performance animation utilizing will-change and transform properties.',
    'Verify accessibility standards (WCAG AA) on color contrast and keyboard navigation.'
  ],
  general: [
    'Write a detailed technical summary of the core concepts and design decisions.',
    'Create a simple test suite validating the edge cases mentioned in the text.',
    'Discuss the architectural tradeoffs of this approach with a peer or in a github issue.'
  ]
};

function getTasksForArticle(article: Article, index: number): Task[] {
  let matchedKey = 'general';
  
  const titleAndTags = `${article.title} ${article.tags.join(' ')}`.toLowerCase();
  
  if (titleAndTags.includes('react') || titleAndTags.includes('next.js') || titleAndTags.includes('vue')) {
    matchedKey = 'react';
  } else if (titleAndTags.includes('system design') || titleAndTags.includes('database') || titleAndTags.includes('scaling') || titleAndTags.includes('architecture')) {
    matchedKey = 'design';
  } else if (titleAndTags.includes('node') || titleAndTags.includes('backend') || titleAndTags.includes('express') || titleAndTags.includes('api')) {
    matchedKey = 'node';
  } else if (titleAndTags.includes('css') || titleAndTags.includes('tailwind') || titleAndTags.includes('animation') || titleAndTags.includes('design') || titleAndTags.includes('ux')) {
    matchedKey = 'css';
  } else if (titleAndTags.includes('javascript') || titleAndTags.includes('typescript') || titleAndTags.includes('js') || titleAndTags.includes('ts')) {
    matchedKey = 'javascript';
  }

  const templates = FALLBACK_TASK_TEMPLATES[matchedKey];
  
  return templates.map((text, i) => ({
    id: `task-${article.id}-${index}-${i}`,
    articleId: article.id,
    text: text,
    completed: false,
    difficulty: i === 0 ? 'easy' : i === 1 ? 'medium' : 'hard',
    rationale: `AI insight based on "${article.title}": Focus on active implementation rather than passive reading.`,
    isAiGenerated: false
  }));
}

export function groupArticlesIntoSprints(articles: Article[]): Sprint[] {
  if (!articles || articles.length === 0) return [];

  // Group by category based on keywords
  const groups: Record<string, Article[]> = {
    'React & Frontend': [],
    'Backend & Infrastructure': [],
    'General Tech Sprints': []
  };

  articles.forEach((art) => {
    const textToMatch = `${art.title} ${art.tags.join(' ')}`.toLowerCase();
    if (textToMatch.includes('react') || textToMatch.includes('next.js') || textToMatch.includes('css') || textToMatch.includes('frontend') || textToMatch.includes('js') || textToMatch.includes('tailwind')) {
      groups['React & Frontend'].push(art);
    } else if (textToMatch.includes('node') || textToMatch.includes('database') || textToMatch.includes('api') || textToMatch.includes('system design') || textToMatch.includes('scaling') || textToMatch.includes('aws')) {
      groups['Backend & Infrastructure'].push(art);
    } else {
      groups['General Tech Sprints'].push(art);
    }
  });

  const sprints: Sprint[] = [];

  Object.entries(groups).forEach(([name, sprintArticles], index) => {
    if (sprintArticles.length === 0) return;

    // Limit to 4 articles per sprint to keep them highly actionable and focused
    const slicedArticles = sprintArticles.slice(0, 4);
    
    // Generate tasks for all articles
    const tasks: Task[] = [];
    slicedArticles.forEach((art, artIdx) => {
      tasks.push(...getTasksForArticle(art, artIdx));
    });

    // Calculate duration (1.5 hours per article + 1 hour per task)
    const durationHours = parseFloat((slicedArticles.length * 1.5 + tasks.length * 0.8).toFixed(1));
    
    // Determine difficulty
    const averageReadTime = slicedArticles.reduce((acc, a) => acc + a.readTime, 0) / slicedArticles.length;
    const difficulty = averageReadTime > 15 ? 'Advanced' : averageReadTime > 8 ? 'Intermediate' : 'Beginner';

    sprints.push({
      id: `sprint-generated-${index}`,
      title: name,
      description: `Structured learning sprint focused on mastering key concepts through ${slicedArticles.length} detailed articles and ${tasks.length} practical tasks.`,
      category: name.split(' ')[0], // React, Backend, General
      difficulty,
      progress: 0,
      durationHours,
      articles: slicedArticles,
      tasks,
      status: 'not_started',
      createdAt: new Date().toISOString()
    });
  });

  return sprints;
}

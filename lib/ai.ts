import { Article, Task } from '@/types';

// Concrete developer action verbs
const VERBS = ['Implement', 'Analyze', 'Configure', 'Refactor', 'Profile', 'Benchmark', 'Optimize', 'Inspect'];

export async function generateAITasks(articles: Article[]): Promise<Task[]> {
  try {
    // If Gemini/OpenAI API keys are available in environment, we could fetch them here:
    // const apiKey = process.env.GEMINI_API_KEY;
    // For a hackathon deployment, we want a highly reliable parser that extracts keywords
    // and returns customized, professional actionable steps immediately with zero rate-limit risks.
    
    return articles.flatMap((art, artIdx) => {
      const titleLower = art.title.toLowerCase();
      const tasksForArticle: Task[] = [];
      
      // Customize task 1 (Implementation task)
      if (titleLower.includes('how') || titleLower.includes('guide') || titleLower.includes('tutorial')) {
        tasksForArticle.push({
          id: `task-ai-${art.id}-${artIdx}-1`,
          articleId: art.id,
          text: `Build a minimal working sandbox application implementing the step-by-step layout defined in "${art.title}".`,
          completed: false,
          difficulty: 'medium',
          rationale: 'Hands-on coding is the most effective way to lock in conceptual architectural guides.',
          isAiGenerated: true
        });
      } else if (titleLower.includes('performance') || titleLower.includes('slow') || titleLower.includes('fast')) {
        tasksForArticle.push({
          id: `task-ai-${art.id}-${artIdx}-1`,
          articleId: art.id,
          text: `Run a performance audit using Chrome Lighthouse or React DevTools on a component inspired by "${art.title}".`,
          completed: false,
          difficulty: 'medium',
          rationale: 'Profiling establishes a quantifiable baseline for rendering and paint speeds.',
          isAiGenerated: true
        });
      } else {
        tasksForArticle.push({
          id: `task-ai-${art.id}-${artIdx}-1`,
          articleId: art.id,
          text: `Refactor an existing file to implement the coding pattern recommended in "${art.title}".`,
          completed: false,
          difficulty: 'medium',
          rationale: 'Applying the design pattern to actual codebase files bridges theory and production practice.',
          isAiGenerated: true
        });
      }

      // Customize task 2 (Analysis task)
      tasksForArticle.push({
        id: `task-ai-${art.id}-${artIdx}-2`,
        articleId: art.id,
        text: `Analyze and document the tradeoffs, memory implications, and alternative approaches of this pattern.`,
        completed: false,
        difficulty: 'easy',
        rationale: 'Every optimization has a cost; listing tradeoffs prevents premature or harmful patterns.',
        isAiGenerated: true
      });

      // Customize task 3 (Advanced/Stress task)
      tasksForArticle.push({
        id: `task-ai-${art.id}-${artIdx}-3`,
        articleId: art.id,
        text: `Simulate extreme edge cases or high-load conditions for this implementation (e.g. invalid arguments, 10k requests).`,
        completed: false,
        difficulty: 'hard',
        rationale: 'Stress-testing code reveals design flaws that are silent under normal conditions.',
        isAiGenerated: true
      });

      return tasksForArticle;
    });
  } catch (e) {
    console.error('Failed to generate AI tasks, using basic fallback', e);
    return [];
  }
}

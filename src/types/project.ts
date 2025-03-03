// types/project.ts
export interface Project {
    id: string;
    name: string;
    description: string;
    icon: React.ComponentType<any>; // For MUI Icon component
    // Add other project properties you need
    teamSize: number;
    timeline: string;
    technologies: string[];
    technologyIcons: string[];
    role: string;
    clientName: string;
    challenges: string;
    metrics: any[]; // Update with proper metric type
    approach: any[]; // Update with proper approach type
    achievements: string[];
    lessonsLearned: string;
  }

  // In types/index.ts
export type CategoryFilter = 
'all' | 
'cloud' | 
'devops' | 
'fintech' | 
'ecommerce' | 
'media';

  // types/project.ts
export interface ApproachStep {
  title: string;
  description: string;
}

// types/project.ts
export interface Metric {
  label: string;
  value: string;  // Stored as string but converted when needed
  description: string;
  progressValue?: number;  // Ensure it's always a number
}
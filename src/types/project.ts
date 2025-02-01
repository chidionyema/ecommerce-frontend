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

  // types/project.ts
export interface ApproachStep {
  title: string;
  description: string;
}
export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'current' | 'completed';
  category: 'Fundamentals' | 'Tools' | 'Statistics' | 'Visualization' | 'Portfolio';
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  postedAt: string;
  description: string;
}

export interface ChallengeTask {
  id: string;
  day: number;
  title: string;
  description: string;
  isCompleted: boolean;
  category: 'Technical' | 'Personal' | 'Project';
  content?: {
    theory: string;
    videoUrl: string;
    practical: {
      type: 'simulator' | 'game' | 'quiz';
      title: string;
      description: string;
    };
  };
}

export interface Challenge {
  id: '30-day' | '60-day' | '90-day';
  title: string;
  tasks: ChallengeTask[];
}

export interface SoftSkill {
  id: string;
  title: string;
  description: string;
  tips: string[];
  resources: { label: string; url: string }[];
}

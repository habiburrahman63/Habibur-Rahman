export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Full-Stack MERN' | 'Frontend & UI' | 'APIs & Backend';
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  metrics?: { label: string; value: string }[];
  caseStudy: CaseStudy;
}

export interface CaseStudy {
  overview: string;
  problem: string;
  solution: string;
  architecture: string[];
  technologies: {
    frontend: string[];
    backend: string[];
    database: string[];
    devops: string[];
  };
  features: string[];
  challenges: {
    challenge: string;
    resolution: string;
  }[];
  outcomes: string[];
}

export interface SkillItem {
  name: string;
  level: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools & DevOps';
  description: string;
  codeSnippet?: {
    filename: string;
    language: string;
    code: string;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  timeline: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  summary: string;
  details: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  relation: string;
  content: string;
  avatarInitials: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  username: string;
  githubUrl: string;
  avatar: string;
  avatarFallback: string;
  bio: string;
  tags: string[];
}

export interface DeveloperStat {
  value: string;
  label: string;
  context: string;
}

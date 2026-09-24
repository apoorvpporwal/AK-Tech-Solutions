export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  iconName: string;
  features: string[];
  deliverables: string[];
  techStack: string[];
  timeline: string;
  idealFor: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'web' | 'ai' | 'crm' | 'leadgen' | 'analytics';
  categoryLabel: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  impactMetrics: { label: string; value: string }[];
  tags: string[];
  imageSrc?: string;
  images?: string[];
  mockupType: 'laptop' | 'mobile' | 'dashboard' | 'workflow';
  clientIndustry: string;
  featured: boolean;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  verified: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Process' | 'AI & Tech' | 'Pricing';
}

export interface IndustryItem {
  id: string;
  name: string;
  iconName: string;
  description: string;
}

export interface LeadSubmission {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  services: string[];
  budget: string;
  message: string;
  status: 'new' | 'contacted' | 'qualified';
}

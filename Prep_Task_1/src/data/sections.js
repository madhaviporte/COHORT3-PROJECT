import { Code2, GitBranch, BookOpen, Terminal, Layers } from 'lucide-react';

export const WEEK_SECTIONS = [
  { id: 'dsa', label: 'DSA Practice', shortLabel: 'DSA', icon: Code2, accent: 'violet' },
  { id: 'git', label: 'Git & GitHub Interview', shortLabel: 'Git & GitHub', icon: GitBranch, accent: 'amber' },
  { id: 'technical', label: 'Full Stack Technical', shortLabel: 'Full Stack', icon: BookOpen, accent: 'sky' },
  { id: 'tracker', label: 'Frontend Machine Coding', shortLabel: 'Machine Coding', icon: Terminal, accent: 'green' },
  { id: 'custom', label: 'Custom Sections', shortLabel: 'Custom', icon: Layers, accent: 'violet' },
];


import { Search, PenTool, Edit, Sparkles, Mail, Linkedin, Lightbulb, FileText } from 'lucide-react';
import { WorkflowStep } from './WorkflowProgress';

const workflowSteps: WorkflowStep[] = [
  {
    id: 'research',
    name: 'Keyword Research',
    description: 'Analyzing keywords and search intent',
    icon: Search,
    duration: 5000,
  },
  {
    id: 'ideation',
    name: 'Content Ideation',
    description: 'Generating content structure and outline',
    icon: Lightbulb,
    duration: 6000,
  },
  {
    id: 'titles',
    name: 'Title Generation',
    description: 'Creating SEO-optimized title options',
    icon: FileText,
    duration: 4000,
  },
  {
    id: 'content',
    name: 'Content Creation',
    description: 'Writing comprehensive blog content',
    icon: PenTool,
    duration: 10000,
  },
  {
    id: 'editing',
    name: 'Editing & Formatting',
    description: 'Refining and formatting for readability',
    icon: Edit,
    duration: 7000,
  },
  {
    id: 'humanizing',
    name: 'Humanizing Content',
    description: 'Adjusting tone for natural reading',
    icon: Sparkles,
    duration: 5000,
  },
  {
    id: 'approval',
    name: 'Email Approval',
    description: 'Sending for user review via Gmail',
    icon: Mail,
    duration: 3000,
  },
  {
    id: 'publishing',
    name: 'LinkedIn Publishing',
    description: 'Posting approved content to LinkedIn',
    icon: Linkedin,
    duration: 4000,
  },
];

export default workflowSteps;

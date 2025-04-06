
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, PenTool, Edit, Sparkles, Mail, Linkedin, Clock, Check, Brain, MousePointerClick, Rocket, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Features = () => {
  // Agent workflow steps
  const agentWorkflow = [
    {
      icon: Search,
      title: 'Keyword Research',
      description: 'The agent identifies high-value keywords and search intent to target the right audience.',
      color: 'from-blue-500/20 to-blue-600/20',
      iconColor: 'text-blue-500',
    },
    {
      icon: Brain,
      title: 'Content Ideation',
      description: 'Analyzes successful content in your niche to develop a strategic content structure.',
      color: 'from-purple-500/20 to-purple-600/20',
      iconColor: 'text-purple-500',
    },
    {
      icon: PenTool,
      title: 'Title Generation',
      description: 'Creates compelling titles that balance SEO optimization with click-through potential.',
      color: 'from-pink-500/20 to-pink-600/20',
      iconColor: 'text-pink-500',
    },
    {
      icon: Edit,
      title: 'Content Creation',
      description: 'Writes comprehensive, well-structured content that meets search intent and provides value.',
      color: 'from-orange-500/20 to-orange-600/20',
      iconColor: 'text-orange-500',
    },
    {
      icon: Sparkles,
      title: 'Editing & Formatting',
      description: 'Refines content for tone, grammar, readability and applies proper formatting with headers and sections.',
      color: 'from-green-500/20 to-green-600/20',
      iconColor: 'text-green-500',
    },
    {
      icon: Zap,
      title: 'Humanizing Content',
      description: 'Adjusts the tone to sound natural and engaging, removing any artificial patterns.',
      color: 'from-yellow-500/20 to-yellow-600/20',
      iconColor: 'text-yellow-500',
    },
    {
      icon: Mail,
      title: 'User Approval',
      description: 'Sends the completed blog for your review via email, with option to request changes.',
      color: 'from-red-500/20 to-red-600/20',
      iconColor: 'text-red-500',
    },
    {
      icon: Linkedin,
      title: 'Auto-post to LinkedIn',
      description: 'Upon approval, automatically publishes your content to LinkedIn with proper formatting.',
      color: 'from-blue-600/20 to-blue-700/20',
      iconColor: 'text-blue-600',
    },
  ];

  // Benefits
  const benefits = [
    {
      title: 'Save Time',
      description: 'Create content in minutes, not hours. Focus on strategy while our AI handles the writing.',
      icon: Clock,
    },
    {
      title: 'SEO Optimized',
      description: 'Every post is structured for maximum search visibility and engagement.',
      icon: Rocket,
    },
    {
      title: 'One-Click Approval',
      description: 'Simple approval process via email. No complicated dashboards to navigate.',
      icon: MousePointerClick,
    },
    {
      title: 'Consistent Publishing',
      description: 'Maintain a regular content schedule without the production bottlenecks.',
      icon: Check,
    },
  ];

  // Tech stack
  const techStack = [
    { name: 'OpenAI', description: 'Powers our intelligent content generation', logo: '/openai-logo.svg' },
    { name: 'Gmail API', description: 'Enables seamless approval workflows', logo: '/gmail-logo.svg' },
    { name: 'LinkedIn API', description: 'For automated content publishing', logo: '/linkedin-logo.svg' },
    { name: 'Next.js', description: 'Provides the responsive, fast application framework', logo: '/nextjs-logo.svg' },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-background/95 border-b border-border/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10"></div>
        
        <div className="container py-16 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight animate-fade-in">
              The Complete <span className="text-gradient">SEO Blog Writer</span> For Your Business
            </h1>
            
            <p className="mt-6 text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: '100ms' }}>
              Our AI-powered platform transforms your topics into fully-optimized SEO blog posts through a comprehensive multi-step process, handling everything from research to publishing.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <Button asChild size="lg" className="btn-gradient text-lg">
                <Link to="/demo">Try it yourself</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Workflow */}
      <section className="py-16 sm:py-20">
        <div className="container">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold animate-fade-in">Step-by-Step Agent Workflow</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl animate-fade-in" style={{ animationDelay: '100ms' }}>
              Our intelligent agent executes a complete, multi-step process to create perfect blog posts every time.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {agentWorkflow.map((step, i) => (
              <div 
                key={step.title}
                className="p-6 rounded-xl glass-card card-hover animate-fade-in"
                style={{ animationDelay: `${i * 100 + 200}ms` }}
              >
                <div className={cn(
                  "h-12 w-12 rounded-full flex items-center justify-center bg-gradient-to-br mb-4",
                  step.color
                )}>
                  <step.icon className={cn("h-6 w-6", step.iconColor)} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Demo Preview */}
      <section className="py-16 sm:py-20 bg-muted/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent -z-10"></div>
        
        <div className="container">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold animate-fade-in">See the Blog Writer in Action</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl animate-fade-in" style={{ animationDelay: '100ms' }}>
              Watch our AI transform a simple topic into a fully-optimized blog post in real-time.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-xl overflow-hidden glass-card p-2 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="w-full h-full rounded-lg bg-muted/30 flex items-center justify-center">
                <p className="text-muted-foreground">Interactive Demo Animation</p>
                {/* In a real implementation, this would be a GIF, video, or interactive component */}
              </div>
            </div>
            
            <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: '300ms' }}>
              <Button asChild size="lg" className="btn-gradient text-lg">
                <Link to="/demo">Try it yourself</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits */}
      <section className="py-16 sm:py-20">
        <div className="container">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold animate-fade-in">The Benefits of Automation</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl animate-fade-in" style={{ animationDelay: '100ms' }}>
              Our AI blog writer saves you time, ensures SEO best practices, and maintains your publishing schedule.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, i) => (
              <div 
                key={benefit.title}
                className="p-6 rounded-xl glass-card card-hover animate-fade-in"
                style={{ animationDelay: `${i * 100 + 200}ms` }}
              >
                <div className="h-12 w-12 rounded-full flex items-center justify-center bg-primary/10 mb-4">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Tech Stack */}
      <section className="py-16 sm:py-20 bg-muted/10">
        <div className="container">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold animate-fade-in">Powered by Advanced Technology</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl animate-fade-in" style={{ animationDelay: '100ms' }}>
              Our platform leverages industry-leading technology to deliver exceptional results.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {techStack.map((tech, i) => (
              <div 
                key={tech.name}
                className="p-6 rounded-xl glass-card card-hover flex flex-col items-center text-center animate-fade-in"
                style={{ animationDelay: `${i * 100 + 200}ms` }}
              >
                <div className="h-16 w-16 mb-4 rounded-full bg-white/5 flex items-center justify-center">
                  {/* In a real implementation, these would be actual SVG logos */}
                  <div className="text-lg font-bold text-gradient">{tech.name[0]}</div>
                </div>
                <h3 className="text-lg font-semibold mb-1">{tech.name}</h3>
                <p className="text-sm text-muted-foreground">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 sm:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto glass-card neon-glow p-8 sm:p-12 rounded-2xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to revolutionize your content strategy?</h2>
            <p className="text-muted-foreground mb-8">
              Start creating SEO-optimized blog posts with minimal effort. Your content pipeline just got smarter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-gradient text-lg">
                <Link to="/demo">Get started for free</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/pricing">View pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;

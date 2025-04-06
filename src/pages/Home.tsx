
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Search, PenTool, Edit, Sparkles, Mail, Linkedin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Home = () => {
  // Animation delay utility for staggered animations
  const getAnimationDelay = (index: number) => ({
    animationDelay: `${index * 100}ms`,
    opacity: 0,
  });

  // Features list
  const features = [
    {
      icon: Search,
      title: 'Keyword Research',
      description: 'Our AI identifies relevant keywords to maximize your SEO potential.',
    },
    {
      icon: PenTool,
      title: 'Content Creation',
      description: 'Generate comprehensive blog posts tailored to your target audience.',
    },
    {
      icon: Edit,
      title: 'Editing & Formatting',
      description: 'Polished content with proper formatting for better readability.',
    },
    {
      icon: Sparkles,
      title: 'SEO Optimization',
      description: 'Content structured to rank higher in search results.',
    },
    {
      icon: Mail,
      title: 'Gmail Approval',
      description: 'Review and approve your content with a simple email response.',
    },
    {
      icon: Linkedin,
      title: 'LinkedIn Publishing',
      description: 'Automatically post your approved content directly to LinkedIn.',
    },
  ];

  // Workflow steps 
  const workflowSteps = [
    { step: 1, title: 'Enter your topic', description: 'Just type in a topic or keyword to start the process.' },
    { step: 2, title: 'AI Research', description: 'Our AI researches keywords and creates an outline.' },
    { step: 3, title: 'Content Creation', description: 'A complete blog post is generated and optimized.' },
    { step: 4, title: 'Final Review', description: 'You review and approve via a simple email response.' },
    { step: 5, title: 'Publish', description: 'Approved content is automatically published to LinkedIn.' },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-background/95 border-b border-border/40">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,var(--tw-gradient-stops))] from-primary/20 via-secondary/5 to-transparent -z-10"></div>
        
        <div className="container flex flex-col items-center text-center py-20 sm:py-28 lg:py-32">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl animate-fade-in" style={getAnimationDelay(0)}>
            AI-Powered SEO Blog Creation <span className="text-gradient">Simplified</span>
          </h1>
          
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl animate-fade-in" style={getAnimationDelay(1)}>
            Transform keywords into fully optimized, ready-to-publish blog posts with our automated SEO content pipeline.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in" style={getAnimationDelay(2)}>
            <Button asChild size="lg" className="btn-gradient text-lg">
              <Link to="/demo">Try for free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="group">
              <Link to="/features" className="text-lg">
                See how it works
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          
          {/* Stats */}
          <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 w-full max-w-3xl">
            {[
              { value: "10x", label: "Faster Creation" },
              { value: "40%", label: "Higher Engagement" },
              { value: "24/7", label: "Content Pipeline" },
              { value: "100%", label: "SEO Optimized" },
            ].map((stat, i) => (
              <div 
                key={stat.label}
                className="flex flex-col items-center p-4 rounded-xl glass-card animate-fade-in" 
                style={getAnimationDelay(i + 3)}
              >
                <p className="text-2xl sm:text-3xl font-bold text-gradient">{stat.value}</p>
                <p className="text-sm sm:text-base text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features overview */}
      <section className="py-16 sm:py-20 bg-muted/10">
        <div className="container">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold animate-fade-in">Complete Blog Creation Pipeline</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl animate-fade-in" style={getAnimationDelay(1)}>
              From research to publishing, our AI handles every step of the content creation process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, i) => (
              <div 
                key={feature.title}
                className="p-6 rounded-xl glass-card card-hover animate-fade-in"
                style={getAnimationDelay(i + 2)}
              >
                <div className="h-12 w-12 rounded-full flex items-center justify-center bg-primary/10 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How it works */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent -z-10"></div>
        
        <div className="container">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold animate-fade-in">How It Works</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl animate-fade-in" style={getAnimationDelay(1)}>
              A simple, powerful workflow that delivers results with minimal effort.
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-4 sm:left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-primary/80 via-secondary/80 to-primary/80 transform -translate-x-1/2"></div>
            
            {/* Steps */}
            {workflowSteps.map((step, i) => (
              <div 
                key={step.step} 
                className={cn(
                  "relative mb-8 sm:mb-12 animate-fade-in",
                  i % 2 === 0 ? "sm:pr-1/2" : "sm:pl-1/2 sm:ml-auto"
                )}
                style={getAnimationDelay(i + 2)}
              >
                <div className={cn(
                  "flex flex-row sm:flex-col items-start gap-4",
                  i % 2 === 0 ? "sm:items-end sm:text-right" : "sm:items-start"
                )}>
                  {/* Step icon */}
                  <div className="relative">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white z-10 relative">
                      {step.step}
                    </div>
                    <div className="absolute inset-0 bg-primary rounded-full animate-pulse-glow"></div>
                  </div>
                  
                  {/* Step content */}
                  <div className="sm:max-w-xs">
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground mt-1">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="btn-gradient text-lg animate-fade-in" style={getAnimationDelay(8)}>
              <Link to="/demo">Try it yourself</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-muted/20">
        <div className="container">
          <div className="max-w-3xl mx-auto glass-card neon-glow p-8 sm:p-12 rounded-2xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to supercharge your content strategy?</h2>
            <p className="text-muted-foreground mb-8">
              Start creating SEO-optimized blog posts in minutes, not hours.
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

export default Home;

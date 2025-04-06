
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Search, PenTool, Edit, Sparkles, Mail, Linkedin, Loader2, Clock, AlertCircle, Lightbulb, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

// Demo workflow steps
const workflowSteps = [
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

type StepStatus = 'idle' | 'loading' | 'completed' | 'failed';

interface WorkflowStepStatus {
  id: string;
  status: StepStatus;
}

const Demo = () => {
  const { toast } = useToast();
  const [topic, setTopic] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [stepsStatus, setStepsStatus] = useState<WorkflowStepStatus[]>(
    workflowSteps.map(step => ({ id: step.id, status: 'idle' }))
  );
  const [progress, setProgress] = useState(0);
  const [generatedBlog, setGeneratedBlog] = useState<string | null>(null);

  // Process workflow steps sequentially
  useEffect(() => {
    if (!isGenerating || currentStepIndex >= workflowSteps.length) return;

    const currentStep = workflowSteps[currentStepIndex];
    
    // Update current step status to loading
    setStepsStatus(prev => 
      prev.map(step => 
        step.id === currentStep.id ? { ...step, status: 'loading' } : step
      )
    );

    // Calculate progress percentage
    const stepProgress = (currentStepIndex / workflowSteps.length) * 100;
    setProgress(stepProgress);

    const timer = setTimeout(() => {
      // Mark current step as completed
      setStepsStatus(prev => 
        prev.map(step => 
          step.id === currentStep.id ? { ...step, status: 'completed' } : step
        )
      );

      // Play a subtle sound effect when a step completes (in a real app)
      // new Audio('/sounds/complete.mp3').play().catch(() => {});

      // Show toast for important steps
      if (['titles', 'content', 'approval', 'publishing'].includes(currentStep.id)) {
        toast({
          title: `${currentStep.name} completed`,
          description: getToastMessage(currentStep.id),
        });
      }

      // If this is the last step, finish the process
      if (currentStepIndex === workflowSteps.length - 1) {
        setProgress(100);
        setIsGenerating(false);
        setGeneratedBlog(`# How to Optimize Your Website for ${topic}\n\nIn today's digital landscape, having a well-optimized website is crucial for attracting organic traffic and converting visitors into customers. This comprehensive guide explores effective strategies to optimize your website for "${topic}" and improve your online presence.\n\n## Understanding ${topic} and Its Importance\n\n${topic} has become increasingly important in the digital marketing space. As more businesses move online, the competition for visibility has never been higher. This section explores why ${topic} matters and how it can impact your business goals.\n\n## Key Strategies for ${topic} Optimization\n\n1. **Research and Analysis**: Begin with thorough keyword research to understand what your target audience is searching for related to ${topic}.\n\n2. **Technical Optimization**: Ensure your website's technical foundations support your ${topic} goals with fast loading times and mobile responsiveness.\n\n3. **Content Creation**: Develop high-quality, relevant content that addresses user needs while incorporating your targeted keywords naturally.\n\n4. **User Experience**: Design your website with user experience in mind, making navigation intuitive and information easily accessible.\n\n## Measuring Success and Making Adjustments\n\nImplementing analytics tools is essential to track the performance of your ${topic} strategy. This data allows you to make informed decisions and continuous improvements.\n\n## Conclusion\n\nOptimizing your website for ${topic} is an ongoing process that requires attention to detail, strategic planning, and regular updates. By following the guidelines outlined in this article, you'll be well on your way to improving your online visibility and achieving your business objectives.`);
        
        setTimeout(() => {
          toast({
            title: "Blog creation complete!",
            description: "Your blog has been successfully created and is ready for review.",
          });
        }, 1000);
        
        return;
      }

      // Move to next step
      setCurrentStepIndex(prev => prev + 1);
    }, currentStep.duration);

    return () => clearTimeout(timer);
  }, [isGenerating, currentStepIndex, topic, toast]);

  const getToastMessage = (stepId: string) => {
    switch (stepId) {
      case 'titles':
        return "Generated 5 SEO-optimized titles for your review";
      case 'content':
        return "Created a 1,500-word article optimized for search engines";
      case 'approval':
        return "Draft sent to your email for review and approval";
      case 'publishing':
        return "Content published successfully to LinkedIn";
      default:
        return "Step completed successfully";
    }
  };

  const handleStartGeneration = () => {
    if (!topic.trim()) {
      toast({
        title: "Topic required",
        description: "Please enter a blog topic to continue",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setCurrentStepIndex(0);
    setProgress(0);
    setGeneratedBlog(null);
    setStepsStatus(workflowSteps.map(step => ({ id: step.id, status: 'idle' })));
  };

  return (
    <div className="flex flex-col w-full">
      {/* Demo Section */}
      <section className="relative py-16 sm:py-20 min-h-[calc(100vh-64px)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10"></div>
        
        <div className="container h-full flex flex-col">
          <div className="max-w-3xl mx-auto w-full text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight animate-fade-in">
              Create Your <span className="text-gradient">SEO Blog</span> in Minutes
            </h1>
            
            <p className="mt-4 text-muted-foreground animate-fade-in" style={{ animationDelay: '100ms' }}>
              Enter your topic below and watch our AI agent create a fully optimized blog post for you.
            </p>
          </div>
          
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-16 flex-1">
            {/* Input Form */}
            <div className="w-full lg:w-1/3 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="glass-card p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">Start Your Blog</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="topic" className="block text-sm font-medium mb-1">
                      Blog Topic or Keyword <span className="text-primary">*</span>
                    </label>
                    <Input
                      id="topic"
                      placeholder="e.g., SEO best practices for 2025"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      disabled={isGenerating}
                      className="input-gradient"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="additional-info" className="block text-sm font-medium mb-1">
                      Additional Information (Optional)
                    </label>
                    <Textarea
                      id="additional-info"
                      placeholder="Target audience, specific points to cover, tone preference, etc."
                      value={additionalInfo}
                      onChange={(e) => setAdditionalInfo(e.target.value)}
                      disabled={isGenerating}
                      className="min-h-[120px] input-gradient"
                    />
                  </div>
                  
                  <Button
                    onClick={handleStartGeneration}
                    disabled={isGenerating || !topic.trim()}
                    className="w-full btn-gradient"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        Create Blog
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              {/* Steps List */}
              <div className="mt-6 glass-card p-6 rounded-xl">
                <h3 className="text-lg font-medium mb-4">Workflow Progress</h3>
                
                <div className="space-y-3">
                  {workflowSteps.map((step, index) => {
                    const stepStatus = stepsStatus.find(s => s.id === step.id)?.status || 'idle';
                    
                    return (
                      <div 
                        key={step.id}
                        className={cn(
                          "flex items-center justify-between p-2 rounded-lg transition-colors",
                          currentStepIndex === index ? "bg-muted/30" : "",
                          stepStatus === 'completed' ? "text-foreground" : "text-muted-foreground"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "h-8 w-8 rounded-full flex items-center justify-center",
                            stepStatus === 'loading' ? "bg-primary/20 animate-pulse" : 
                            stepStatus === 'completed' ? "bg-primary text-primary-foreground" : 
                            stepStatus === 'failed' ? "bg-destructive text-destructive-foreground" : 
                            "bg-muted/30"
                          )}>
                            {stepStatus === 'loading' ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : stepStatus === 'completed' ? (
                              <Check className="h-4 w-4" />
                            ) : stepStatus === 'failed' ? (
                              <AlertCircle className="h-4 w-4" />
                            ) : (
                              <step.icon className="h-4 w-4" />
                            )}
                          </div>
                          
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex flex-col text-left">
                                  <span className="text-sm font-medium">{step.name}</span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{step.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        
                        <div className="flex items-center">
                          {stepStatus === 'loading' && (
                            <Clock className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Progress bar */}
                <div className="mt-6">
                  <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 text-right text-sm text-muted-foreground">
                    {Math.round(progress)}% Complete
                  </div>
                </div>
              </div>
            </div>
            
            {/* Preview Panel */}
            <div className="w-full lg:w-2/3 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="glass-card h-full p-6 rounded-xl overflow-hidden flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Blog Preview</h2>
                
                <div className="flex-1 overflow-hidden">
                  {!isGenerating && !generatedBlog ? (
                    <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-6">
                      <FileText className="h-12 w-12 mb-4 text-muted-foreground/70" />
                      <h3 className="text-lg font-medium mb-2">No Content Generated Yet</h3>
                      <p className="max-w-md">
                        Enter a topic and click "Create Blog" to see your AI-generated content appear here in real-time.
                      </p>
                    </div>
                  ) : isGenerating ? (
                    <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-6">
                      <Loader2 className="h-12 w-12 mb-4 text-primary animate-spin" />
                      <h3 className="text-lg font-medium mb-2">Generating Content</h3>
                      <p className="max-w-md">
                        Our AI is working on creating your {topic} blog post. This typically takes about 45 seconds.
                      </p>
                    </div>
                  ) : (
                    <div className="h-full overflow-y-auto p-4 text-left">
                      {generatedBlog?.split('\n').map((line, i) => {
                        if (line.startsWith('# ')) {
                          return <h1 key={i} className="text-2xl font-bold mb-4">{line.replace('# ', '')}</h1>;
                        } else if (line.startsWith('## ')) {
                          return <h2 key={i} className="text-xl font-semibold mt-6 mb-3">{line.replace('## ', '')}</h2>;
                        } else if (line.trim() === '') {
                          return <br key={i} />;
                        } else {
                          return <p key={i} className="mb-3">{line}</p>;
                        }
                      })}
                    </div>
                  )}
                </div>
                
                {generatedBlog && (
                  <div className="mt-6 pt-4 border-t border-border flex flex-wrap justify-between gap-4">
                    <div className="text-sm text-muted-foreground">
                      Content created for: <span className="font-medium text-foreground">{topic}</span>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        Copy
                      </Button>
                      <Button size="sm" className="btn-gradient">
                        Approve & Publish
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-muted/10">
        <div className="container">
          <div className="max-w-3xl mx-auto glass-card neon-glow p-8 sm:p-12 rounded-2xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to scale your content strategy?</h2>
            <p className="text-muted-foreground mb-8">
              Get full access to our AI Blog Writer and create unlimited SEO-optimized content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-gradient text-lg">
                <Link to="/pricing">View pricing plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Demo;

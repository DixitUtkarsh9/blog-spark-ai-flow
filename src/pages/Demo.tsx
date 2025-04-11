
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import BlogForm from '@/components/blog/BlogForm';
import WorkflowProgress from '@/components/blog/WorkflowProgress';
import BlogPreview from '@/components/blog/BlogPreview';
import CtaSection from '@/components/blog/CtaSection';
import workflowSteps from '@/components/blog/workflowSteps';
import { WebhookResponse } from '@/components/blog/types';
import { StepStatus } from '@/components/blog/WorkflowProgress';

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
  const [webhookUrl] = useState('https://platform.copilotgigs.com/webhook/4b1ff6d7-0044-4ccd-9e0e-e550d5b2aecb');
  const [webhookResponse, setWebhookResponse] = useState<WebhookResponse | null>(null);
  const [isWebhookLoading, setIsWebhookLoading] = useState(false);

  useEffect(() => {
    if (!isGenerating || currentStepIndex >= workflowSteps.length) return;

    const currentStep = workflowSteps[currentStepIndex];
    
    setStepsStatus(prev => 
      prev.map(step => 
        step.id === currentStep.id ? { ...step, status: 'loading' } : step
      )
    );

    const stepProgress = (currentStepIndex / workflowSteps.length) * 100;
    setProgress(stepProgress);

    const timer = setTimeout(() => {
      setStepsStatus(prev => 
        prev.map(step => 
          step.id === currentStep.id ? { ...step, status: 'completed' } : step
        )
      );

      if (['titles', 'content', 'approval', 'publishing'].includes(currentStep.id)) {
        toast({
          title: `${currentStep.name} completed`,
          description: getToastMessage(currentStep.id),
        });
      }

      if (currentStepIndex === workflowSteps.length - 1) {
        setProgress(100);
        setIsGenerating(false);
        
        // Only set the default blog content if no webhook response was received
        if (!webhookResponse || !webhookResponse.content) {
          setGeneratedBlog(`# How to Optimize Your Website for ${topic}\n\nIn today's digital landscape, having a well-optimized website is crucial for attracting organic traffic and converting visitors into customers. This comprehensive guide explores effective strategies to optimize your website for "${topic}" and improve your online presence.\n\n## Understanding ${topic} and Its Importance\n\n${topic} has become increasingly important in the digital marketing space. As more businesses move online, the competition for visibility has never been higher. This section explores why ${topic} matters and how it can impact your business goals.\n\n## Key Strategies for ${topic} Optimization\n\n1. **Research and Analysis**: Begin with thorough keyword research to understand what your target audience is searching for related to ${topic}.\n\n2. **Technical Optimization**: Ensure your website's technical foundations support your ${topic} goals with fast loading times and mobile responsiveness.\n\n3. **Content Creation**: Develop high-quality, relevant content that addresses user needs while incorporating your targeted keywords naturally.\n\n4. **User Experience**: Design your website with user experience in mind, making navigation intuitive and information easily accessible.\n\n## Measuring Success and Making Adjustments\n\nImplementing analytics tools is essential to track the performance of your ${topic} strategy. This data allows you to make informed decisions and continuous improvements.\n\n## Conclusion\n\nOptimizing your website for ${topic} is an ongoing process that requires attention to detail, strategic planning, and regular updates. By following the guidelines outlined in this article, you'll be well on your way to improving your online visibility and achieving your business objectives.`);
        }
        
        setTimeout(() => {
          toast({
            title: "Blog creation complete!",
            description: "Your blog has been successfully created and is ready for review.",
          });
        }, 1000);
        
        return;
      }

      setCurrentStepIndex(prev => prev + 1);
    }, currentStep.duration);

    return () => clearTimeout(timer);
  }, [isGenerating, currentStepIndex, topic, toast, webhookResponse]);

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

  const triggerZapierWebhook = async () => {
    try {
      setIsWebhookLoading(true);
      console.log("Triggering webhook:", webhookUrl);
      
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic,
          additionalInfo: additionalInfo,
          timestamp: new Date().toISOString(),
          triggered_from: window.location.origin,
        }),
      });
      
      // Try to get the response data - this might fail due to CORS
      try {
        const data = await response.json();
        console.log("Webhook response data:", data);
        setWebhookResponse(data);
        
        // If we have actual content from the webhook, use it
        if (data && data.content) {
          setGeneratedBlog(data.content);
        }
      } catch (parseError) {
        console.log("Could not parse webhook response (likely due to CORS):", parseError);
      }
      
      console.log("Webhook triggered successfully");
      
      toast({
        title: "Content Generation Started",
        description: "Your request has been sent successfully. Content generation in progress...",
      });
    } catch (error) {
      console.error("Error triggering webhook:", error);
      toast({
        title: "Webhook Error",
        description: "Failed to trigger the webhook. Check the console for details.",
        variant: "destructive",
      });
    } finally {
      setIsWebhookLoading(false);
    }
  };

  const handleStartGeneration = (newTopic: string, newAdditionalInfo: string) => {
    setTopic(newTopic);
    setAdditionalInfo(newAdditionalInfo);
    
    triggerZapierWebhook();

    setIsGenerating(true);
    setCurrentStepIndex(0);
    setProgress(0);
    setGeneratedBlog(null);
    setWebhookResponse(null);
    setStepsStatus(workflowSteps.map(step => ({ id: step.id, status: 'idle' })));
  };

  return (
    <div className="flex flex-col w-full">
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
            <div className="w-full lg:w-1/3 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <BlogForm 
                onStartGeneration={handleStartGeneration}
                isGenerating={isGenerating}
                isWebhookLoading={isWebhookLoading}
              />
              
              <div className="mt-6">
                <WorkflowProgress
                  workflowSteps={workflowSteps}
                  stepsStatus={stepsStatus}
                  currentStepIndex={currentStepIndex}
                  progress={progress}
                />
              </div>
            </div>
            
            <div className="w-full lg:w-2/3 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <BlogPreview
                isGenerating={isGenerating}
                isWebhookLoading={isWebhookLoading}
                generatedBlog={generatedBlog}
                webhookResponse={webhookResponse}
                topic={topic}
              />
            </div>
          </div>
        </div>
      </section>
      
      <CtaSection />
    </div>
  );
};

export default Demo;

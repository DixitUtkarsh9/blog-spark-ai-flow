
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface BlogFormProps {
  onStartGeneration: (topic: string, additionalInfo: string) => void;
  isGenerating: boolean;
  isWebhookLoading: boolean;
}

const BlogForm: React.FC<BlogFormProps> = ({ 
  onStartGeneration, 
  isGenerating, 
  isWebhookLoading 
}) => {
  const { toast } = useToast();
  const [topic, setTopic] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [showWebhookInput, setShowWebhookInput] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('https://platform.copilotgigs.com/webhook/4b1ff6d7-0044-4ccd-9e0e-e550d5b2aecb');

  const handleSubmit = () => {
    if (!topic.trim()) {
      toast({
        title: "Topic required",
        description: "Please enter a blog topic to continue",
        variant: "destructive",
      });
      return;
    }

    onStartGeneration(topic, additionalInfo);
  };

  return (
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
          onClick={handleSubmit}
          disabled={isGenerating || isWebhookLoading || !topic.trim()}
          className="w-full btn-gradient"
        >
          {isGenerating || isWebhookLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isWebhookLoading ? "Contacting API..." : "Generating..."}
            </>
          ) : (
            <>
              Create Blog
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      
      <button 
        onClick={() => setShowWebhookInput(!showWebhookInput)} 
        className="text-xs text-muted-foreground/50 mt-2 hover:text-muted-foreground"
      >
        {showWebhookInput ? "Hide" : "Show"} Webhook Settings
      </button>
      
      {showWebhookInput && (
        <div className="mt-2 max-w-md mx-auto">
          <Input
            placeholder="Enter your webhook URL"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            className="text-xs p-2 h-8 bg-background/50"
          />
          <p className="text-xs text-muted-foreground/70 mt-1">
            This is for testing only. In production, use server-side environment variables.
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogForm;

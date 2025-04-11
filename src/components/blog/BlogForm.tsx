
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import InstructionsCard from './InstructionsCard';
import { ValidationError, BlogFormData } from './types';

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
  const [formData, setFormData] = useState<BlogFormData>({
    topic: '',
    additionalInfo: ''
  });
  const [errors, setErrors] = useState<ValidationError>({});
  const [showWebhookInput, setShowWebhookInput] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('https://platform.copilotgigs.com/webhook/4b1ff6d7-0044-4ccd-9e0e-e550d5b2aecb');
  const [touched, setTouched] = useState({
    topic: false,
    additionalInfo: false
  });

  const validate = (): boolean => {
    const newErrors: ValidationError = {};
    
    // Topic validation
    if (!formData.topic.trim()) {
      newErrors.topic = "Topic is required";
    } else if (formData.topic.trim().length < 5) {
      newErrors.topic = "Topic must be at least 5 characters";
    } else if (formData.topic.trim().split(' ').length < 2) {
      newErrors.topic = "Topic should contain at least 2 words for better results";
    }
    
    // Additional info validation (optional but with suggestion)
    if (formData.additionalInfo.trim() && formData.additionalInfo.trim().length < 10) {
      newErrors.additionalInfo = "Additional info should be more detailed or left empty";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when typing
    if (errors[name as keyof ValidationError]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validate();
  };

  const handleSubmit = () => {
    setTouched({ topic: true, additionalInfo: true });
    
    if (validate()) {
      onStartGeneration(formData.topic, formData.additionalInfo);
      toast({
        title: "Generation started",
        description: "Your blog post is being created...",
      });
    } else {
      toast({
        title: "Please check your inputs",
        description: "Fix the highlighted fields to continue",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="glass-card p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Start Your Blog</h2>
      
      <InstructionsCard />
      
      <div className="space-y-4">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium mb-1">
            Blog Topic or Keyword <span className="text-primary">*</span>
          </label>
          <Input
            id="topic"
            name="topic"
            placeholder="e.g., SEO best practices for 2025"
            value={formData.topic}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isGenerating}
            className={`input-gradient ${errors.topic && touched.topic ? 'border-destructive' : ''}`}
          />
          {errors.topic && touched.topic && (
            <div className="mt-1 text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              <span>{errors.topic}</span>
            </div>
          )}
        </div>
        
        <div>
          <label htmlFor="additionalInfo" className="block text-sm font-medium mb-1">
            Additional Information (Recommended)
          </label>
          <Textarea
            id="additionalInfo"
            name="additionalInfo"
            placeholder="Target audience, specific points to cover, tone preference, etc."
            value={formData.additionalInfo}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isGenerating}
            className={`min-h-[120px] input-gradient ${errors.additionalInfo && touched.additionalInfo ? 'border-destructive' : ''}`}
          />
          {errors.additionalInfo && touched.additionalInfo && (
            <div className="mt-1 text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              <span>{errors.additionalInfo}</span>
            </div>
          )}
        </div>
        
        <Button
          onClick={handleSubmit}
          disabled={isGenerating || isWebhookLoading}
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

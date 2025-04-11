
import React from 'react';
import { FileText, Loader2 } from 'lucide-react';

interface WebhookResponse {
  content?: string;
  title?: string;
  error?: string;
}

interface BlogPreviewProps {
  isGenerating: boolean;
  isWebhookLoading: boolean;
  generatedBlog: string | null;
  webhookResponse: WebhookResponse | null;
  topic: string;
}

const BlogPreview: React.FC<BlogPreviewProps> = ({
  isGenerating,
  isWebhookLoading,
  generatedBlog,
  webhookResponse,
  topic,
}) => {
  const formatContent = (content: string) => {
    // Check if content is already in Markdown format
    if (content.includes('#') || content.includes('**')) {
      return content.split('\n').map((line, i) => {
        if (line.startsWith('# ')) {
          return <h1 key={i} className="text-2xl font-bold mb-4">{line.replace('# ', '')}</h1>;
        } else if (line.startsWith('## ')) {
          return <h2 key={i} className="text-xl font-semibold mt-6 mb-3">{line.replace('## ', '')}</h2>;
        } else if (line.trim() === '') {
          return <br key={i} />;
        } else {
          return <p key={i} className="mb-3">{line}</p>;
        }
      });
    } else {
      // If it's plain text, render with paragraph breaks
      return content.split('\n\n').map((paragraph, i) => (
        paragraph.trim() ? <p key={i} className="mb-3">{paragraph}</p> : <br key={i} />
      ));
    }
  };

  return (
    <div className="glass-card h-full p-6 rounded-xl overflow-hidden flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Blog Preview</h2>
      
      <div className="flex-1 overflow-hidden">
        {!isGenerating && !generatedBlog && !isWebhookLoading ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-6">
            <FileText className="h-12 w-12 mb-4 text-muted-foreground/70" />
            <h3 className="text-lg font-medium mb-2">No Content Generated Yet</h3>
            <p className="max-w-md">
              Enter a topic and click "Create Blog" to see your AI-generated content appear here in real-time.
            </p>
          </div>
        ) : isGenerating || isWebhookLoading ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-6">
            <Loader2 className="h-12 w-12 mb-4 text-primary animate-spin" />
            <h3 className="text-lg font-medium mb-2">Generating Content</h3>
            <p className="max-w-md">
              Our AI is working on creating your {topic} blog post. This typically takes about 45 seconds.
            </p>
          </div>
        ) : (
          <div className="h-full overflow-y-auto p-4 text-left">
            {webhookResponse && webhookResponse.title && (
              <h1 className="text-2xl font-bold mb-4">{webhookResponse.title}</h1>
            )}
            
            {generatedBlog && formatContent(generatedBlog)}
            
            {webhookResponse && webhookResponse.error && (
              <div className="p-4 bg-destructive/10 text-destructive rounded-lg mt-4">
                <h3 className="font-medium mb-2">Error from API:</h3>
                <p>{webhookResponse.error}</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {generatedBlog && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Content created for: <span className="font-medium text-foreground">{topic}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPreview;

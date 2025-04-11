
import React from 'react';
import { Info, CheckCircle2, AlertTriangle } from 'lucide-react';

const InstructionsCard: React.FC = () => {
  return (
    <div className="bg-card/40 border border-border/50 rounded-lg p-4 mb-4">
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-sm mb-2">Tips for better results:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Be specific with your topic (e.g., "Content marketing strategies for SaaS startups" instead of just "Marketing")</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Include your target audience in the additional information field</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Specify any keywords you want to target</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <span>Avoid overly broad topics that could generate generic content</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InstructionsCard;


import React from 'react';
import { Check, Loader2, Clock, AlertCircle } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export type StepStatus = 'idle' | 'loading' | 'completed' | 'failed';

export interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  duration: number;
}

interface WorkflowStepStatus {
  id: string;
  status: StepStatus;
}

interface WorkflowProgressProps {
  workflowSteps: WorkflowStep[];
  stepsStatus: WorkflowStepStatus[];
  currentStepIndex: number;
  progress: number;
}

const WorkflowProgress: React.FC<WorkflowProgressProps> = ({
  workflowSteps,
  stepsStatus,
  currentStepIndex,
  progress,
}) => {
  return (
    <div className="glass-card p-6 rounded-xl">
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
  );
};

export default WorkflowProgress;

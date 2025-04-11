
export interface WebhookResponse {
  content?: string;
  title?: string;
  error?: string;
}

export interface DemoStep {
  title: string;
  description: string;
  image?: string;
}

export interface BlogFormData {
  topic: string;
  additionalInfo: string;
}

export interface ValidationError {
  topic?: string;
  additionalInfo?: string;
}

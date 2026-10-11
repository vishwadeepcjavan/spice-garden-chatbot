export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  sessionId: string;
  messages: ChatMessage[];
}

export interface ChatResponse {
  reply: string;
}

export interface ChatErrorResponse {
  error: string;
}

export interface MenuItem {
  name: string;
  description: string;
  price: number;
  emoji: string;
}


export interface Link {
  text: string;
  action: string;
}

export interface Message {
  id: string;
  role: 'user' | 'system';
  content: string;
  links?: Link[];
}

export interface ChatResponse {
  text: string;
  links?: Link[];
}

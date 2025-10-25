export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  current?: boolean;
  imageUrl?: string;
}
export interface Achievement {
  id: string;
  title: string;
  award: string;
  event: string;
  description: string;
  date: string;
  images: string[]; // Array untuk multiple images
  category: 'hackathon' | 'competition' | 'certification' | 'other';
}
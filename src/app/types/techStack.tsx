export interface TechStack {
  id: string;
  name: string;
  icon: string;
  color: string; // Warna brand untuk hover
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'mobile';
}
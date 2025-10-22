import { Project } from "../types/project";

export interface ProjectCategory {
  id: string;
  label: string;
}

export const projectCategories: ProjectCategory[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'web-mobile', label: 'Web & Mobile' },
  { id: 'design-docs', label: 'Design & Documentation' },
  { id: 'artwork', label: 'Artwork' },
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack web application with React, Node.js',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    githubUrl: 'https://github.com/username/ecommerce',
    liveUrl: 'https://ecommerce-demo.com',
    imageUrl: '/assets/projects/ecommerce.jpg',
    category: 'web-mobile',
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Mobile application with React Native',
    technologies: ['React Native', 'Firebase', 'Redux'],
    githubUrl: 'https://github.com/username/task-app',
    liveUrl: 'https://task-app-demo.com',
    imageUrl: '/assets/projects/task-app.jpg',
    category: 'web-mobile',
  },
  {
    id: '3',
    title: 'Portfolio Website',
    description: 'Personal portfolio with advanced animations',
    technologies: ['Vue.js', 'GSAP', 'CSS3'],
    githubUrl: 'https://github.com/username/portfolio',
    liveUrl: 'https://portfolio-demo.com',
    imageUrl: '/assets/projects/portfolio.jpg',
    category: 'web-mobile',
  },
  {
    id: '4',
    title: 'Brand Identity Design',
    description: 'Complete brand identity package for startup',
    technologies: ['Figma', 'Adobe Illustrator', 'Photoshop'],
    imageUrl: '/assets/projects/brand-identity.jpg',
    category: 'design-docs',
  },
  {
    id: '5',
    title: 'Mobile App UI/UX',
    description: 'User interface design for fitness app',
    technologies: ['Figma', 'Sketch', 'Prototyping'],
    imageUrl: '/assets/projects/mobile-ui.jpg',
    category: 'design-docs',
  },
  {
    id: '6',
    title: 'Digital Artwork',
    description: 'Collection of digital illustrations',
    technologies: ['Procreate', 'Adobe Illustrator', 'Digital Art'],
    imageUrl: '/assets/projects/digital-art.jpg',
    category: 'artwork',
  },
];
import { Achievement } from "../types/achievements";

export const achievements: Achievement[] = [
  {
    id: '1',
    title: 'IFest UNPAD Hackathon 2025',
    award: 'Finalist - Top 15',
    event: 'IFest UNPAD',
    description: 'Achieved finalist position among top 15 out of 42 participants in the prestigious IFest UNPAD Hackathon 2025, demonstrating strong problem-solving and technical skills.',
    date: '2025',
    images: [
      '/assets/achievements/IFEST-1.jpg',
      '/assets/achievements/IFEST-2.jpg'
    ],
    category: 'hackathon',
  },
  {
    id: '2',
    title: 'Technoday Hackathon UNNES 2025',
    award: '3rd Place',
    event: 'Technoday UNNES',
    description: 'Secured 3rd place in the Technoday Hackathon UNNES 2025, showcasing innovation and collaborative teamwork in developing cutting-edge solutions.',
    date: '2025',
    images: [
      '/assets/achievements/Technoday-1.jpg',
      '/assets/achievements/Technoday-2.jpg'
    ],
    category: 'hackathon',
  },
];
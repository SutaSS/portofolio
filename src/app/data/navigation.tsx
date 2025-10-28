import React from "react";

export const navigationItems = [
  {
    label: "Home",
    href: "#home",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 11.5L12 4l9 7.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 21V12.5h14V21"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "About",
    href: "#about",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M6 20c1.5-3 4.5-5 6-5s4.5 2 6 5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Projects",
    href: "#projects",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Tech Stack",
    href: "#tech-stack",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="6"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <rect
          x="3"
          y="15"
          width="18"
          height="6"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M7 9v6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Experience",
    href: "#experience",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="3"
          y="7"
          width="18"
          height="12"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Achievements",
    href: "#achievements",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2l2.6 5.6L20 9l-4 3.6L17.2 20 12 16.9 6.8 20 8 12.6 4 9l5.4-1.4L12 2z"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="transparent"
        />
      </svg>
    ),
  },
];

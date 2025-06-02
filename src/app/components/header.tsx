import React from "react";
import GooeyNav from "../reactBits/GooeyNav/GooeyNav";

// update with your own items
const items = [
  { label: "About", href: "#about me" },
  { label: "Tech Stack", href: "#tech stack" },
  { label: "project", href: "#project" },
];

const header = () => {
  return (
    <header className="bg-gray-800 text-white sticky top-0 p-8 z-50">
      <nav className="relative w-full flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">---</h1>
        </div>
        <div style={{ height: "30px", position: "relative" }}>
          <GooeyNav
            items={items}
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
            initialActiveIndex={0}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </div>
      </nav>
    </header>
  );
};

export default header;

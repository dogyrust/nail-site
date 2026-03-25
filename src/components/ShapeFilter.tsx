import { useState } from "react";

const shapes = [
  { name: "All", icon: "✦" },
  { name: "Almond", icon: "💅" },
  { name: "Oval", icon: "🔮" },
  { name: "Coffin", icon: "✨" },
  { name: "Squoval", icon: "💜" },
  { name: "Round", icon: "🌙" },
  { name: "Stiletto", icon: "⚡" },
];

interface ShapeFilterProps {
  onFilter: (shape: string) => void;
}

const ShapeFilter = ({ onFilter }: ShapeFilterProps) => {
  const [active, setActive] = useState("All");

  return (
    <div className="flex flex-wrap justify-center gap-3 py-6">
      {shapes.map((shape) => (
        <button
          key={shape.name}
          onClick={() => {
            setActive(shape.name);
            onFilter(shape.name);
          }}
          className={`rounded-full px-5 py-2.5 font-body text-sm font-medium transition-all ${
            active === shape.name
              ? "bg-primary text-primary-foreground shadow-card"
              : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
          }`}
        >
          <span className="mr-1.5">{shape.icon}</span>
          {shape.name}
        </button>
      ))}
    </div>
  );
};

export default ShapeFilter;

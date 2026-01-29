"use client";

import { Grid3X3, LayoutGrid } from "lucide-react";
import { useState } from "react";

export default function GridToggle() {
  const [cols, setCols] = useState<3 | 4>(4);

  return (
    <div className="flex gap-1 border rounded p-1">
      <button
        onClick={() => setCols(3)}
        className={cols === 3 ? "bg-primary text-white p-2" : "p-2"}
      >
        <Grid3X3 size={18} />
      </button>
      <button
        onClick={() => setCols(4)}
        className={cols === 4 ? "bg-primary text-white p-2" : "p-2"}
      >
        <LayoutGrid size={18} />
      </button>
    </div>
  );
}

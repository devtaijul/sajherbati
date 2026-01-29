"use client";

import { ChevronDown } from "lucide-react";
import React from "react";
import GridToggle from "./GridToggle";

export const ShopToolbar = ({ selectedSort }: { selectedSort: string }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="relative">
        <select
          defaultValue={selectedSort}
          onChange={(e) => {
            "use client";
            window.location.href = `/shop?sort=${e.target.value}`;
          }}
          className="border rounded px-4 py-2 pr-10"
        >
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2" />
      </div>

      <GridToggle />
    </div>
  );
};

"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";
import ShopFiltersMobile from "./ShopFiltersMobile";
import { Category } from "@/types/product";

export const ShopToolbarFilter = ({
  categories,
}: {
  categories: Category[] | null;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="outline"
        className="lg:hidden"
        onClick={() => setOpen(true)}
      >
        <Filter size={18} className="mr-2" />
        Filters
      </Button>
      <ShopFiltersMobile
        open={open}
        onClose={() => setOpen(false)}
        categories={categories}
      />
    </>
  );
};

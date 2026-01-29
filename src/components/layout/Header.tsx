"use client";

import { useCartContext } from "@/contexts/CartContext";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = usePathname();
  const { getCartCount, getFavoritesCount } = useCartContext();

  const cartCount = getCartCount();
  const favCount = getFavoritesCount();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    /* { name: "Categories", path: "/categories" }, */
    { name: "Track Order", path: "/track-order" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur-sm border-border">
      {/* Top bar */}
      {/*  <div className="py-2 bg-primary text-primary-foreground">
        <div className="flex items-center justify-between text-sm container-custom">
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>Free Delivery in Dhaka on orders 2000+</span>
          </div>
          <div className="items-center hidden gap-4 md:flex">
            <span>📞 01700-000000</span>
          </div>
        </div>
      </div> */}

      {/* Main header */}
      <div className="py-4 container-custom">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 md:gap-2 shrink-0">
            <Image
              width={100}
              height={100}
              src="/assets/logo.png"
              alt="Shajer Bati"
              className="w-auto h-14 md:h-16"
            />
            <span className="text-lg font-bold md:text-2xl text-primary">
              সাঁঝের বাতি
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="items-center hidden gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? "text-primary font-semibold"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 transition-colors rounded-full hover:bg-muted"
              aria-label="Search"
            >
              <Search size={22} className="text-foreground" />
            </button>

            {/* Favorites */}
            <Link
              href="/favorites"
              className="relative p-2 transition-colors rounded-full hover:bg-muted"
              aria-label="Favorites"
            >
              <Heart size={22} className="text-foreground" />
              {favCount > 0 && (
                <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-semibold rounded-full -top-1 -right-1 bg-accent text-accent-foreground">
                  {favCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 transition-colors rounded-full hover:bg-muted"
              aria-label="Cart"
            >
              <ShoppingBag size={22} className="text-foreground" />
              {cartCount > 0 && (
                <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-semibold rounded-full -top-1 -right-1 bg-primary text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 transition-colors rounded-full hover:bg-muted md:hidden"
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {isSearchOpen && (
          <div className="mt-4 animate-slide-down">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pr-12 input-field"
                autoFocus
              />
              <button className="absolute -translate-y-1/2 right-4 top-1/2">
                <Search size={20} className="text-muted-foreground" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="border-t md:hidden border-border animate-slide-down">
          <div className="flex flex-col gap-4 py-4 container-custom">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`py-2 font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? "text-primary font-semibold"
                    : "text-foreground/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;

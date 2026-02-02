"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const slides = [
  {
    id: 1,
    image: "/assets/hero-banner-1.jpg",
    title: "New Collection",
    subtitle: "Premium Jomjom Cotton Three Piece",
    cta: "Shop Now",
    link: "/shop",
  },
  {
    id: 2,
    image: "/assets/hero-banner-2.jpg",
    title: "Eid Special",
    subtitle: "Best Designs, Best Prices",
    cta: "Shop Now",
    link: "/shop?category=three-piece",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  return (
    <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            className="object-cover w-full h-full"
            width={500}
            height={500}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />

          <div className="absolute inset-0 flex items-center">
            <div className="container-custom">
              <div className="max-w-lg space-y-4 md:space-y-6">
                <span className="inline-block px-4 py-1 text-sm font-medium rounded-full bg-secondary text-secondary-foreground">
                  New Arrival
                </span>
                <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl font-display text-foreground">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground">
                  {slide.subtitle}
                </p>
                <Link href={slide.link}>
                  <Button size="lg" className="px-8 text-lg btn-primary">
                    {slide.cta}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute p-3 transition-all -translate-y-1/2 rounded-full shadow-lg left-4 top-1/2 bg-card/80 hover:bg-card"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} className="text-foreground" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute p-3 transition-all -translate-y-1/2 rounded-full shadow-lg right-4 top-1/2 bg-card/80 hover:bg-card"
        aria-label="Next slide"
      >
        <ChevronRight size={24} className="text-foreground" />
      </button>

      {/* Dots */}
      <div className="absolute flex gap-2 -translate-x-1/2 bottom-6 left-1/2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-primary w-8"
                : "bg-card/50 hover:bg-card"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;

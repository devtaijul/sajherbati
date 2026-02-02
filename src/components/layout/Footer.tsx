import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import Image from "next/image";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="py-12 container-custom">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Image
              src={"/assets/logo.png"}
              alt="Shajer Bati"
              className="w-auto h-20 p-2 bg-white rounded-full"
              width={100}
              height={100}
            />
            <p className="text-sm text-primary-foreground/80">
              Bangladesh&apos;s best traditional clothing collection. Premium
              quality at affordable prices.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 transition-colors rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="p-2 transition-colors rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold font-display">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shop"
                  className="transition-colors text-primary-foreground/80 hover:text-primary-foreground"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="transition-colors text-primary-foreground/80 hover:text-primary-foreground"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/track-order"
                  className="transition-colors text-primary-foreground/80 hover:text-primary-foreground"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  href="/favorites"
                  className="transition-colors text-primary-foreground/80 hover:text-primary-foreground"
                >
                  Favorites
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="mb-4 text-lg font-semibold font-display">
              Categories
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shop?category=three-piece"
                  className="transition-colors text-primary-foreground/80 hover:text-primary-foreground"
                >
                  Three Piece
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=salwar-kameez"
                  className="transition-colors text-primary-foreground/80 hover:text-primary-foreground"
                >
                  Salwar Kameez
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=kurti"
                  className="transition-colors text-primary-foreground/80 hover:text-primary-foreground"
                >
                  Kurti
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=saree"
                  className="transition-colors text-primary-foreground/80 hover:text-primary-foreground"
                >
                  Saree
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-lg font-semibold font-display">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 mt-0.5" />
                <span className="text-sm text-primary-foreground/80">
                  Khilkhet, Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0" />
                <span className="text-sm text-primary-foreground/80">
                  01620615021
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0" />
                <span className="text-sm text-primary-foreground/80">
                  yhmiraz12@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 mt-12 border-t border-primary-foreground/20">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-primary-foreground/60">
              © 2026 Shajer Bati. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/60">
              <span>Payment Option:</span>
              <span className="font-semibold">Cash on Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

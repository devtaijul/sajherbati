import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import Image from "next/image";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Image
              src={"/assets/logo.png"}
              alt="Shajer Bati"
              className="h-20 w-auto bg-white rounded-full p-2"
              width={100}
              height={100}
            />
            <p className="text-primary-foreground/80 text-sm">
              Bangladesh&apos;s best traditional clothing collection. Premium
              quality at affordable prices.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shop"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/track-order"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  href="/favorites"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Favorites
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">
              Categories
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shop?category=three-piece"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Three Piece
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=salwar-kameez"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Salwar Kameez
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=kurti"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Kurti
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=saree"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Saree
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">
                  Mirpur-10, Dhaka-1216, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">
                  01700-000000
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">
                  info@shajerbati.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/60 text-sm">
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

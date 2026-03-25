import { useState } from "react";
import { Menu, Search, Heart, X } from "lucide-react";
import { CartDrawer } from "./CartDrawer";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Promo bar */}
      <div className="bg-primary py-2 text-center font-body text-sm font-medium tracking-wide text-primary-foreground transform-gpu">
        ✨ FREE SHIPPING ON ORDERS $35+ &nbsp;|&nbsp; USE CODE <span className="font-bold">GLOW20</span> FOR 20% OFF
      </div>

      <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-foreground lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <a href="/" className="font-display text-2xl font-bold tracking-tight text-foreground transition-all hover:opacity-80">
              gracie's<span className="text-primary">nails</span>
            </a>
          </div>

          {/* Center links */}
          <div className="hidden items-center gap-8 font-body text-sm font-medium uppercase tracking-widest lg:flex">
            {["Shop All", "Press-Ons", "Gel", "Nail Art", "New"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-foreground/70 transition-colors hover:text-primary relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-4 text-foreground">
            <button aria-label="Search" className="transition-transform hover:scale-110"><Search size={20} /></button>
            <button aria-label="Wishlist" className="hidden sm:block transition-transform hover:scale-110"><Heart size={20} /></button>
            <CartDrawer />
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t bg-card px-6 py-4 lg:hidden">
            {["Shop All", "Press-Ons", "Gel", "Nail Art", "New"].map((item) => (
              <a
                key={item}
                href="#"
                className="block py-3 font-body text-sm font-medium uppercase tracking-widest text-foreground/70 transition-colors hover:text-primary"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;

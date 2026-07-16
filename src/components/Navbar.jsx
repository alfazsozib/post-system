import { Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./theme/ModeTogglw";

const Navbar = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-[#211F1A]/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-['Fraunces'] text-xl text-foreground">
            Divergent<span className="text-[#B4491F]">POS</span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8"></ul>

        {/* Cart + mobile menu */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-forground" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#B4491F] text-[#FAF7F0] text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <ModeToggle />

          <button
            onClick={toggleMenu}
            className="md:hidden text-[#211F1A]"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

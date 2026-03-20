import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Logo from "./Logo";

const CATEGORIES = [
  { label: "Điện Thoại Di Động", path: "/dien-thoai", icon: "ri-smartphone-line" },
  { label: "Làm Đẹp & Chăm Sóc", path: "/lam-dep", icon: "ri-sparkling-line" },
  { label: "Sức Khỏe – Wellness", path: "/suc-khoe", icon: "ri-heart-pulse-line" },
  { label: "Pet & Thú Cưng", path: "/thu-cung", icon: "ri-bear-smile-line" },
  { label: "Thời Trang & Phụ Kiện", path: "/thoi-trang", icon: "ri-t-shirt-line" },
  { label: "Nhà Cửa & Tiện Ích", path: "/nha-cua", icon: "ri-home-2-line" },
  { label: "Số & Giáo Dục Online", path: "/giao-duc", icon: "ri-graduation-cap-line" },
];

const navLinks = [
  { label: "Trang Chủ", path: "/" },
  { label: "Sản Phẩm", path: "/products" },
  { label: "Blog", path: "/blog" },
  { label: "Đơn Hàng", path: "/don-hang" },
  { label: "Liên Hệ", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { count } = useCart();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setMenuOpen(false); setCatOpen(false); }, [location]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) setCatOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isHome = location.pathname === "/";
  const isCatActive = CATEGORIES.some((c) => location.pathname.startsWith(c.path));

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || !isHome ? "bg-white border-b border-gray-100 shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between py-4">
        <Logo variant={scrolled || !isHome ? "dark" : "light"} size="md" />

        <div className="hidden md:flex items-center gap-6">
          {/* Danh Mục dropdown */}
          <div className="relative" ref={catRef}>
            <button
              onClick={() => setCatOpen(!catOpen)}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                isCatActive
                  ? scrolled || !isHome ? "text-gray-900" : "text-white"
                  : scrolled || !isHome ? "text-gray-500 hover:text-gray-900" : "text-white/80 hover:text-white"
              }`}
            >
              <i className="ri-grid-line text-base" />
              Danh Mục
              <i className={`ri-arrow-down-s-line text-base transition-transform ${catOpen ? "rotate-180" : ""}`} />
            </button>
            {catOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl border border-gray-100 overflow-hidden z-50 animate-fade-in">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.path}
                    to={cat.path}
                    className={`flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors cursor-pointer ${location.pathname === cat.path ? "text-gray-900 font-semibold bg-gray-50" : "text-gray-600"}`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <i className={`${cat.icon} text-sm text-gray-600`} />
                    </div>
                    {cat.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                location.pathname === link.path
                  ? scrolled || !isHome ? "text-gray-900" : "text-white"
                  : scrolled || !isHome ? "text-gray-500 hover:text-gray-900" : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/cart" className={`relative cursor-pointer w-10 h-10 flex items-center justify-center rounded-full transition-all ${scrolled || !isHome ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/20"}`}>
            <i className="ri-shopping-cart-2-line text-xl" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </Link>
          <Link to="/affiliate" className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${scrolled || !isHome ? "bg-gray-900 text-white hover:bg-gray-700" : "bg-white text-gray-900 hover:bg-gray-100"}`}>
            <i className="ri-medal-line text-base" />
            Tham Gia Affiliate
          </Link>
          <button className={`md:hidden w-10 h-10 flex items-center justify-center rounded-full cursor-pointer ${scrolled || !isHome ? "text-gray-700" : "text-white"}`} onClick={() => setMenuOpen(!menuOpen)}>
            <i className={`text-xl ${menuOpen ? "ri-close-line" : "ri-menu-3-line"}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-2 max-h-[80vh] overflow-y-auto">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1 mb-1">Danh Mục</p>
          {CATEGORIES.map((cat) => (
            <Link key={cat.path} to={cat.path} className={`flex items-center gap-3 py-2 text-sm cursor-pointer ${location.pathname === cat.path ? "text-gray-900 font-semibold" : "text-gray-600"}`}>
              <div className="w-6 h-6 flex items-center justify-center">
                <i className={`${cat.icon} text-sm`} />
              </div>
              {cat.label}
            </Link>
          ))}
          <div className="border-t border-gray-100 mt-2 pt-2">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className={`block py-2 text-sm font-medium cursor-pointer ${location.pathname === link.path ? "text-gray-900" : "text-gray-500"}`}>{link.label}</Link>
            ))}
          </div>
          <Link to="/affiliate" className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-full text-sm font-semibold cursor-pointer whitespace-nowrap">
            <i className="ri-medal-line" />
            Tham Gia Affiliate
          </Link>
        </div>
      )}
    </nav>
  );
}

import { Link } from "react-router-dom";

interface LogoProps {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
}

export default function Logo({ variant = "dark", size = "md" }: LogoProps) {
  const sizes = {
    sm: { icon: "w-7 h-7", cart: "text-base", bolt: "text-[9px]", text: "text-lg" },
    md: { icon: "w-9 h-9", cart: "text-xl", bolt: "text-xs", text: "text-xl" },
    lg: { icon: "w-12 h-12", cart: "text-2xl", bolt: "text-sm", text: "text-2xl" },
  };
  const s = sizes[size];

  return (
    <Link to="/" className="flex items-center gap-2.5 cursor-pointer select-none" aria-label="YamatoShop - Trang ch\u1ee7">
      {/* Icon container */}
      <div className={`relative ${s.icon} flex items-center justify-center bg-[#E53935] rounded-xl flex-shrink-0`}>
        <i className={`ri-shopping-cart-2-fill text-white ${s.cart}`} />
        {/* Lightning bolt overlay */}
        <span
          className={`absolute -bottom-1 -right-1 w-4 h-4 bg-[#1F1F1F] rounded-full flex items-center justify-center`}
        >
          <i className={`ri-flashlight-fill text-white ${s.bolt}`} />
        </span>
      </div>

      {/* Brand text */}
      <span
        className={`font-extrabold tracking-tight ${s.text} whitespace-nowrap`}
        style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.02em" }}
      >
        <span className={variant === "light" ? "text-white" : "text-[#1F1F1F]"}>Yamato</span>
        <span className="text-[#E53935]">Shop</span>
      </span>
    </Link>
  );
}

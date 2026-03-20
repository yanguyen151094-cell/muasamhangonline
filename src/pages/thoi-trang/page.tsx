import CategoryPage, { CategoryConfig } from "../category/CategoryPage";
import { fashionProducts } from "../../mocks/fashion";

const config: CategoryConfig = {
  title: "Thời Trang & Phụ Kiện",
  subtitle: "Giày Dép, Túi Xách, Đồng Hồ, Trang Sức & Phụ Kiện Thời Thượng",
  slug: "thoi-trang",
  bannerImage:
    "https://readdy.ai/api/search-image?query=fashion%20accessories%20flatlay%20shoes%20bags%20watches%20sunglasses%20elegant%20dark%20moody%20background%20luxury%20lifestyle%20product%20photography%20editorial%20style&width=1440&height=400&seq=603&orientation=landscape",
  accentColor: "text-violet-600",
  accentBg: "bg-violet-50",
  subcategories: [
    { id: "all", name: "Tất Cả", icon: "ri-apps-line" },
    { id: "shoes", name: "Giày Dép", icon: "ri-footprint-line" },
    { id: "bags", name: "Túi & Balo", icon: "ri-handbag-line" },
    { id: "watches", name: "Đồng Hồ", icon: "ri-time-line" },
    { id: "jewelry", name: "Trang Sức", icon: "ri-gemstone-line" },
    { id: "clothes", name: "Trang Phục", icon: "ri-t-shirt-line" },
  ],
  priceRanges: [
    { id: "all", label: "Tất Cả Mức Giá", min: 0, max: Infinity },
    { id: "under500", label: "Dưới 500.000₫", min: 0, max: 500000 },
    { id: "500to2m", label: "500k - 2 triệu", min: 500000, max: 2000000 },
    { id: "2mto5m", label: "2 - 5 triệu", min: 2000000, max: 5000000 },
    { id: "over5m", label: "Trên 5 triệu", min: 5000000, max: Infinity },
  ],
  features: [
    { icon: "ri-verified-badge-line", label: "Hàng chính hãng 100%", color: "text-violet-500" },
    { icon: "ri-exchange-2-line", label: "Đổi size miễn phí", color: "text-amber-500" },
    { icon: "ri-gift-line", label: "Gói quà sang trọng", color: "text-pink-500" },
    { icon: "ri-truck-line", label: "Giao hàng nhanh 2h", color: "text-rose-500" },
  ],
};

export default function ThoiTrangPage() {
  return <CategoryPage config={config} products={fashionProducts} />;
}

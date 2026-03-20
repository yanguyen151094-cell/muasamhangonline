import CategoryPage, { CategoryConfig } from "../category/CategoryPage";
import { beautyProducts } from "../../mocks/beauty";

const config: CategoryConfig = {
  title: "Làm Đẹp & Chăm Sóc Cá Nhân",
  subtitle: "Skincare, Makeup, Chăm Sóc Tóc & Dưỡng Thể Cao Cấp",
  slug: "lam-dep",
  bannerImage:
    "https://readdy.ai/api/search-image?query=luxury%20beauty%20skincare%20products%20flatlay%20arrangement%20elegant%20cosmetics%20perfume%20serum%20cream%20bottles%20pastel%20pink%20background%20minimalist%20professional%20photography&width=1440&height=400&seq=600&orientation=landscape",
  accentColor: "text-pink-500",
  accentBg: "bg-pink-50",
  subcategories: [
    { id: "all", name: "Tất Cả", icon: "ri-apps-line" },
    { id: "skincare", name: "Skincare", icon: "ri-leaf-line" },
    { id: "makeup", name: "Trang Điểm", icon: "ri-palette-line" },
    { id: "sunscreen", name: "Chống Nắng", icon: "ri-sun-line" },
    { id: "hair", name: "Chăm Sóc Tóc", icon: "ri-scissors-line" },
    { id: "tools", name: "Dụng Cụ Làm Đẹp", icon: "ri-magic-line" },
  ],
  priceRanges: [
    { id: "all", label: "Tất Cả Mức Giá", min: 0, max: Infinity },
    { id: "under300", label: "Dưới 300.000₫", min: 0, max: 300000 },
    { id: "300to700", label: "300k - 700k", min: 300000, max: 700000 },
    { id: "700to2m", label: "700k - 2 triệu", min: 700000, max: 2000000 },
    { id: "over2m", label: "Trên 2 triệu", min: 2000000, max: Infinity },
  ],
  features: [
    { icon: "ri-shield-check-line", label: "Hàng chính hãng", color: "text-emerald-500" },
    { icon: "ri-leaf-line", label: "Chiết xuất tự nhiên", color: "text-green-500" },
    { icon: "ri-award-line", label: "Bác sĩ da liễu kiểm định", color: "text-pink-500" },
    { icon: "ri-truck-line", label: "Giao hàng toàn quốc", color: "text-rose-500" },
  ],
};

export default function LamDepPage() {
  return <CategoryPage config={config} products={beautyProducts} />;
}

import CategoryPage, { CategoryConfig } from "../category/CategoryPage";
import { homeToolsProducts } from "../../mocks/home-tools";

const config: CategoryConfig = {
  title: "Nhà Cửa & Dụng Cụ Tiện Ích",
  subtitle: "Đồ Dùng Nhà Bếp, Smart Home, Dụng Cụ Sửa Chữa & Thiết Bị Tiện Lợi",
  slug: "nha-cua",
  bannerImage:
    "https://readdy.ai/api/search-image?query=modern%20home%20tools%20kitchen%20appliances%20smart%20home%20devices%20arrangement%20warm%20neutral%20beige%20interior%20background%20product%20photography%20minimal%20lifestyle&width=1440&height=400&seq=604&orientation=landscape",
  accentColor: "text-orange-600",
  accentBg: "bg-orange-50",
  subcategories: [
    { id: "all", name: "Tất Cả", icon: "ri-apps-line" },
    { id: "kitchen", name: "Nhà Bếp", icon: "ri-restaurant-line" },
    { id: "smart", name: "Smart Home", icon: "ri-home-wifi-line" },
    { id: "tools", name: "Dụng Cụ Sửa Chữa", icon: "ri-tools-line" },
    { id: "cleaning", name: "Dọn Dẹp", icon: "ri-brush-line" },
    { id: "security", name: "An Ninh", icon: "ri-shield-line" },
  ],
  priceRanges: [
    { id: "all", label: "Tất Cả Mức Giá", min: 0, max: Infinity },
    { id: "under500", label: "Dưới 500.000₫", min: 0, max: 500000 },
    { id: "500to2m", label: "500k - 2 triệu", min: 500000, max: 2000000 },
    { id: "2mto5m", label: "2 - 5 triệu", min: 2000000, max: 5000000 },
    { id: "over5m", label: "Trên 5 triệu", min: 5000000, max: Infinity },
  ],
  features: [
    { icon: "ri-shield-check-line", label: "Bảo hành chính hãng", color: "text-emerald-500" },
    { icon: "ri-settings-line", label: "Lắp đặt tận nơi", color: "text-orange-500" },
    { icon: "ri-exchange-line", label: "Đổi trả 30 ngày", color: "text-amber-500" },
    { icon: "ri-customer-service-line", label: "Kỹ thuật viên 24/7", color: "text-rose-500" },
  ],
};

export default function NhaCuaPage() {
  return <CategoryPage config={config} products={homeToolsProducts} />;
}

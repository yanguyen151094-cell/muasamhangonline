import CategoryPage, { CategoryConfig } from "../category/CategoryPage";
import { petProducts } from "../../mocks/pets";

const config: CategoryConfig = {
  title: "Pet & Phụ Kiện Thú Cưng",
  subtitle: "Thức Ăn, Phụ Kiện, Đồ Chơi & Chăm Sóc Cho Mèo, Chó Yêu",
  slug: "thu-cung",
  bannerImage:
    "https://readdy.ai/api/search-image?query=adorable%20pets%20cats%20dogs%20accessories%20products%20arrangement%20pastel%20beige%20warm%20background%20cute%20lifestyle%20product%20photography%20pet%20care&width=1440&height=400&seq=602&orientation=landscape",
  accentColor: "text-amber-600",
  accentBg: "bg-amber-50",
  subcategories: [
    { id: "all", name: "Tất Cả", icon: "ri-apps-line" },
    { id: "food", name: "Thức Ăn", icon: "ri-bowl-line" },
    { id: "accessories", name: "Phụ Kiện", icon: "ri-sparkling-line" },
    { id: "toys", name: "Đồ Chơi", icon: "ri-gamepad-line" },
    { id: "hygiene", name: "Vệ Sinh", icon: "ri-drops-line" },
    { id: "beds", name: "Nhà & Giường", icon: "ri-home-heart-line" },
  ],
  priceRanges: [
    { id: "all", label: "Tất Cả Mức Giá", min: 0, max: Infinity },
    { id: "under200", label: "Dưới 200.000₫", min: 0, max: 200000 },
    { id: "200to500", label: "200k - 500k", min: 200000, max: 500000 },
    { id: "500to2m", label: "500k - 2 triệu", min: 500000, max: 2000000 },
    { id: "over2m", label: "Trên 2 triệu", min: 2000000, max: Infinity },
  ],
  features: [
    { icon: "ri-shield-check-line", label: "Nguyên liệu an toàn", color: "text-emerald-500" },
    { icon: "ri-stethoscope-line", label: "Bác sĩ thú y khuyên", color: "text-amber-500" },
    { icon: "ri-truck-line", label: "Giao hàng nhanh", color: "text-rose-500" },
    { icon: "ri-heart-line", label: "Yêu thú cưng như con", color: "text-pink-500" },
  ],
};

export default function ThuCungPage() {
  return <CategoryPage config={config} products={petProducts} />;
}

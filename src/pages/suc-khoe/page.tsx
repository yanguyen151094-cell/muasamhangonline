import CategoryPage, { CategoryConfig } from "../category/CategoryPage";
import { healthProducts } from "../../mocks/health";

const config: CategoryConfig = {
  title: "Sức Khỏe – Wellness",
  subtitle: "Thiết Bị Y Tế, Thực Phẩm Chức Năng & Dụng Cụ Tập Luyện",
  slug: "suc-khoe",
  bannerImage:
    "https://readdy.ai/api/search-image?query=wellness%20health%20fitness%20products%20arrangement%20medical%20devices%20supplements%20yoga%20mat%20green%20mint%20background%20clean%20professional%20product%20photography&width=1440&height=400&seq=601&orientation=landscape",
  accentColor: "text-emerald-600",
  accentBg: "bg-emerald-50",
  subcategories: [
    { id: "all", name: "Tất Cả", icon: "ri-apps-line" },
    { id: "medical", name: "Thiết Bị Y Tế", icon: "ri-heart-pulse-line" },
    { id: "supplement", name: "Thực Phẩm Bổ Sung", icon: "ri-capsule-line" },
    { id: "fitness", name: "Dụng Cụ Thể Thao", icon: "ri-run-line" },
    { id: "massage", name: "Massage Phục Hồi", icon: "ri-hand-heart-line" },
    { id: "sleep", name: "Giấc Ngủ & Thư Giãn", icon: "ri-moon-line" },
  ],
  priceRanges: [
    { id: "all", label: "Tất Cả Mức Giá", min: 0, max: Infinity },
    { id: "under500", label: "Dưới 500.000₫", min: 0, max: 500000 },
    { id: "500to2m", label: "500k - 2 triệu", min: 500000, max: 2000000 },
    { id: "2mto5m", label: "2 - 5 triệu", min: 2000000, max: 5000000 },
    { id: "over5m", label: "Trên 5 triệu", min: 5000000, max: Infinity },
  ],
  features: [
    { icon: "ri-hospital-line", label: "Chứng nhận y tế", color: "text-emerald-500" },
    { icon: "ri-shield-check-line", label: "An toàn FDA/CE", color: "text-blue-500" },
    { icon: "ri-exchange-line", label: "Đổi trả 30 ngày", color: "text-amber-500" },
    { icon: "ri-customer-service-line", label: "Hỗ trợ 24/7", color: "text-rose-500" },
  ],
};

export default function SucKhoePage() {
  return <CategoryPage config={config} products={healthProducts} />;
}

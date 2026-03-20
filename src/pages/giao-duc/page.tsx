import CategoryPage, { CategoryConfig } from "../category/CategoryPage";
import { digitalProducts } from "../../mocks/digital";

const config: CategoryConfig = {
  title: "Sản Phẩm Số & Giáo Dục Online",
  subtitle: "Khóa Học Online, Phần Mềm, Ứng Dụng & Công Cụ Số Chuyên Nghiệp",
  slug: "giao-duc",
  bannerImage:
    "https://readdy.ai/api/search-image?query=online%20education%20digital%20learning%20laptop%20books%20technology%20dark%20blue%20gradient%20background%20e-learning%20course%20digital%20products%20professional%20photography&width=1440&height=400&seq=605&orientation=landscape",
  accentColor: "text-cyan-600",
  accentBg: "bg-cyan-50",
  subcategories: [
    { id: "all", name: "Tất Cả", icon: "ri-apps-line" },
    { id: "coding", name: "Lập Trình", icon: "ri-code-line" },
    { id: "language", name: "Ngoại Ngữ", icon: "ri-global-line" },
    { id: "design", name: "Thiết Kế", icon: "ri-pencil-ruler-line" },
    { id: "business", name: "Kinh Doanh", icon: "ri-briefcase-line" },
    { id: "software", name: "Phần Mềm", icon: "ri-computer-line" },
  ],
  priceRanges: [
    { id: "all", label: "Tất Cả Mức Giá", min: 0, max: Infinity },
    { id: "under500", label: "Dưới 500.000₫", min: 0, max: 500000 },
    { id: "500to2m", label: "500k - 2 triệu", min: 500000, max: 2000000 },
    { id: "2mto5m", label: "2 - 5 triệu", min: 2000000, max: 5000000 },
    { id: "over5m", label: "Trên 5 triệu", min: 5000000, max: Infinity },
  ],
  features: [
    { icon: "ri-infinity-line", label: "Truy cập trọn đời", color: "text-cyan-500" },
    { icon: "ri-award-line", label: "Chứng chỉ quốc tế", color: "text-amber-500" },
    { icon: "ri-refresh-line", label: "Cập nhật miễn phí", color: "text-emerald-500" },
    { icon: "ri-customer-service-line", label: "Hỗ trợ học viên 24/7", color: "text-rose-500" },
  ],
};

export default function GiaoDucPage() {
  return <CategoryPage config={config} products={digitalProducts} />;
}

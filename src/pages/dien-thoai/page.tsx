import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mockProducts } from "../../mocks/products";
import { extraPhones } from "../../mocks/phones";
import { extraPhones2 } from "../../mocks/phones2";
import Navbar from "../../components/feature/Navbar";
import Footer from "../../components/feature/Footer";
import OrderPhoneModal from "./components/OrderPhoneModal";

const BRANDS = [
  { id: "all", name: "Tất Cả", icon: "ri-apps-line" },
  { id: "apple", name: "Apple", icon: "ri-apple-line" },
  { id: "samsung", name: "Samsung", icon: "ri-smartphone-line" },
  { id: "xiaomi", name: "Xiaomi / POCO", icon: "ri-smartphone-line" },
  { id: "oppo", name: "OPPO", icon: "ri-smartphone-line" },
  { id: "vivo", name: "Vivo", icon: "ri-smartphone-line" },
  { id: "realme", name: "Realme", icon: "ri-smartphone-line" },
];

const PRICE_RANGES = [
  { id: "all", label: "Tất Cả Mức Giá", min: 0, max: Infinity },
  { id: "under5", label: "Dưới 5 triệu", min: 0, max: 5000000 },
  { id: "5to10", label: "5 – 10 triệu", min: 5000000, max: 10000000 },
  { id: "10to20", label: "10 – 20 triệu", min: 10000000, max: 20000000 },
  { id: "20to30", label: "20 – 30 triệu", min: 20000000, max: 30000000 },
  { id: "over30", label: "Trên 30 triệu", min: 30000000, max: Infinity },
];

const SORT_OPTIONS = [
  { value: "popular", label: "Phổ Biến Nhất" },
  { value: "price-asc", label: "Giá Thấp → Cao" },
  { value: "price-desc", label: "Giá Cao → Thấp" },
  { value: "newest", label: "Mới Nhất" },
  { value: "rating", label: "Đánh Giá Cao" },
];

const HIGHLIGHT_FEATURES = [
  { icon: "ri-shield-check-line", label: "BH 12 tháng", color: "text-emerald-400" },
  { icon: "ri-truck-line", label: "Giao toàn quốc", color: "text-rose-300" },
  { icon: "ri-exchange-line", label: "Đổi trả 30 ngày", color: "text-amber-300" },
  { icon: "ri-secure-payment-line", label: "Thanh toán an toàn", color: "text-indigo-300" },
];

const PAGE_SIZE = 12;

const allPhoneProducts = [
  ...mockProducts.filter((p) => p.category === "Điện Thoại Di Động"),
  ...extraPhones,
  ...extraPhones2,
];

function matchBrand(name: string, brandId: string): boolean {
  const n = name.toLowerCase();
  switch (brandId) {
    case "apple":   return n.includes("iphone");
    case "samsung": return n.includes("samsung");
    case "xiaomi":  return n.includes("xiaomi") || n.includes("redmi") || n.includes("poco");
    case "oppo":    return n.includes("oppo");
    case "vivo":    return n.includes("vivo");
    case "realme":  return n.includes("realme");
    default:        return true;
  }
}

interface SelectedPhone {
  name: string;
  price: number;
}

function MobileCard({
  product,
  onOrder,
}: {
  product: (typeof mockProducts)[0];
  onOrder: (name: string, price: number) => void;
}) {
  const navigate = useNavigate();
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const getBrand = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("iphone"))  return "Apple";
    if (n.includes("samsung")) return "Samsung";
    if (n.includes("poco"))    return "POCO";
    if (n.includes("xiaomi") || n.includes("redmi")) return "Xiaomi";
    if (n.includes("oppo"))    return "OPPO";
    if (n.includes("vivo"))    return "Vivo";
    if (n.includes("realme"))  return "Realme";
    return "";
  };

  const getSpecs = (name: string) => {
    const specs: string[] = [];
    if (name.includes("5G"))    specs.push("5G");
    if (name.includes("Pro"))   specs.push("Pro");
    if (name.includes("Ultra")) specs.push("Ultra");
    if (name.includes("Plus") || name.includes("+")) specs.push("Plus");
    if (name.includes("128GB")) specs.push("128GB");
    if (name.includes("256GB")) specs.push("256GB");
    if (name.includes("512GB")) specs.push("512GB");
    return specs.slice(0, 3);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Image */}
      <div
        className="relative bg-gray-50 overflow-hidden cursor-pointer"
        style={{ paddingBottom: "80%" }}
        onClick={() => navigate(`/products/${product.id}`)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.badge && (
            <span className="px-1.5 py-0.5 bg-rose-500 text-white text-[10px] font-semibold rounded-full whitespace-nowrap">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="px-1.5 py-0.5 bg-amber-500 text-white text-[10px] font-semibold rounded-full whitespace-nowrap">
              -{discount}%
            </span>
          )}
        </div>
        <div className="absolute top-2 right-2">
          <span className="px-1.5 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full whitespace-nowrap">
            HH {product.commission}%
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-semibold text-rose-500">{getBrand(product.name)}</span>
          <div className="flex items-center gap-0.5">
            <i className="ri-star-fill text-amber-400 text-[11px]" />
            <span className="text-[11px] text-gray-500 font-medium">{product.rating}</span>
          </div>
        </div>

        <h3
          className="text-xs font-semibold text-gray-900 line-clamp-2 leading-snug mb-2 cursor-pointer hover:text-rose-500 transition-colors"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          {product.name}
        </h3>

        <div className="flex flex-wrap gap-1 mb-2">
          {getSpecs(product.name).map((spec) => (
            <span key={spec} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded-full whitespace-nowrap">
              {spec}
            </span>
          ))}
        </div>

        <div className="mt-auto">
          <div className="mb-2">
            <div className="text-sm font-bold text-gray-900">
              {product.price.toLocaleString("vi-VN")}₫
            </div>
            <div className="text-[10px] text-gray-400 line-through">
              {product.originalPrice.toLocaleString("vi-VN")}₫
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOrder(product.name, product.price)}
            className="w-full py-2 bg-gray-900 text-white text-[11px] font-bold rounded-xl hover:bg-rose-600 transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-1"
          >
            <i className="ri-shopping-bag-3-line text-xs" />
            Đặt Hàng
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DienThoaiPage() {
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [orderModal, setOrderModal] = useState<SelectedPhone | null>(null);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const mobileProducts = useMemo(() => allPhoneProducts, []);

  const filtered = useMemo(() => {
    let list = [...mobileProducts];
    if (selectedBrand !== "all") {
      list = list.filter((p) => matchBrand(p.name, selectedBrand));
    }
    const priceRange = PRICE_RANGES.find((r) => r.id === selectedPrice);
    if (priceRange && priceRange.id !== "all") {
      list = list.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);
    }
    switch (sortBy) {
      case "price-asc":  list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating":     list.sort((a, b) => b.rating - a.rating); break;
      case "popular":    list.sort((a, b) => b.sold - a.sold); break;
    }
    return list;
  }, [mobileProducts, selectedBrand, selectedPrice, sortBy]);

  const displayed = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);
  const hasMore = visibleCount < filtered.length;

  const handleFilterChange = (type: "brand" | "price", value: string) => {
    if (type === "brand") setSelectedBrand(value);
    else setSelectedPrice(value);
    setVisibleCount(PAGE_SIZE);
  };

  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = { all: mobileProducts.length };
    mobileProducts.forEach((p) => {
      const n = p.name.toLowerCase();
      if (n.includes("iphone"))                                             counts.apple   = (counts.apple   || 0) + 1;
      else if (n.includes("samsung"))                                       counts.samsung = (counts.samsung || 0) + 1;
      else if (n.includes("xiaomi") || n.includes("redmi") || n.includes("poco")) counts.xiaomi  = (counts.xiaomi  || 0) + 1;
      else if (n.includes("oppo"))                                          counts.oppo    = (counts.oppo    || 0) + 1;
      else if (n.includes("vivo"))                                          counts.vivo    = (counts.vivo    || 0) + 1;
      else if (n.includes("realme"))                                        counts.realme  = (counts.realme  || 0) + 1;
    });
    return counts;
  }, [mobileProducts]);

  const resetFilters = () => {
    setSelectedBrand("all");
    setSelectedPrice("all");
    setSortBy("popular");
    setVisibleCount(PAGE_SIZE);
    setShowMobileFilter(false);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8]">
      <Navbar />

      {orderModal && (
        <OrderPhoneModal
          productName={orderModal.name}
          productPrice={orderModal.price}
          onClose={() => setOrderModal(null)}
        />
      )}

      {/* ── Hero Banner ── */}
      <div className="relative pt-16 overflow-hidden">
        <div
          className="w-full relative"
          style={{ minHeight: "160px", background: "linear-gradient(135deg,#1a1a2e 0%,#16213e 40%,#0f3460 100%)" }}
        >
          <img
            src="https://readdy.ai/api/search-image?query=collection%20of%20flagship%20smartphones%20iPhone%20Samsung%20Xiaomi%20displayed%20beautifully%20on%20dark%20navy%20blue%20gradient%20background%20with%20soft%20lighting%20premium%20tech%20photography%20arrangement&width=1440&height=400&seq=300&orientation=landscape"
            alt="Điện thoại di động"
            className="absolute inset-0 w-full h-full object-cover object-top opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <div className="flex items-center gap-2 text-white/60 text-xs sm:text-sm mb-2">
              <Link to="/" className="hover:text-white transition-colors cursor-pointer">Trang Chủ</Link>
              <i className="ri-arrow-right-s-line" />
              <span className="text-white">Điện Thoại Di Động</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-bold text-white mb-1">Điện Thoại Di Động</h1>
            <p className="text-white/70 text-xs sm:text-sm mb-4">
              <strong className="text-white">{mobileProducts.length}</strong> sản phẩm &bull; iPhone, Samsung, Xiaomi, OPPO...
            </p>
            {/* Feature badges — scroll on mobile */}
            <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto pb-1">
              {HIGHLIGHT_FEATURES.map((f) => (
                <div key={f.label} className="flex items-center gap-1.5 flex-shrink-0">
                  <div className={`w-4 h-4 flex items-center justify-center ${f.color}`}>
                    <i className={`${f.icon} text-sm`} />
                  </div>
                  <span className="text-white/80 text-xs whitespace-nowrap">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Brand Filter Bar ── */}
      <div className="bg-white border-b border-gray-100 sticky top-[56px] sm:top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex items-center gap-1.5 overflow-x-auto py-2.5">
            {BRANDS.map((brand) => (
              <button
                key={brand.id}
                onClick={() => handleFilterChange("brand", brand.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                  selectedBrand === brand.id
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <div className="w-3.5 h-3.5 flex items-center justify-center">
                  <i className={`${brand.icon} text-xs`} />
                </div>
                {brand.name}
                <span className={`text-[10px] ${selectedBrand === brand.id ? "text-white/60" : "text-gray-400"}`}>
                  ({brandCounts[brand.id] || 0})
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">

        {/* ── Mobile: Filter + Sort bar ── */}
        <div className="flex items-center gap-2 mb-4 md:hidden">
          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap border ${
              showMobileFilter || selectedPrice !== "all"
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-700 border-gray-200"
            }`}
          >
            <i className="ri-filter-3-line text-sm" />
            Lọc giá
            {selectedPrice !== "all" && (
              <span className="w-4 h-4 flex items-center justify-center bg-rose-500 text-white text-[10px] font-bold rounded-full flex-shrink-0">1</span>
            )}
          </button>

          <div className="flex-1 relative">
            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setVisibleCount(PAGE_SIZE); }}
              className="w-full appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:outline-none cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center pointer-events-none">
              <i className="ri-arrow-down-s-line text-gray-400" />
            </div>
          </div>

          <button
            onClick={() => setOrderModal({ name: "Tư vấn điện thoại", price: 0 })}
            className="flex items-center gap-1.5 px-3 py-2 bg-rose-500 text-white rounded-xl text-sm font-bold cursor-pointer whitespace-nowrap"
          >
            <i className="ri-phone-line" />
            Tư Vấn
          </button>
        </div>

        {/* ── Mobile: Collapsible price filter ── */}
        {showMobileFilter && (
          <div className="md:hidden bg-white rounded-2xl p-4 mb-4 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-gray-900">Lọc Theo Giá</span>
              {selectedPrice !== "all" && (
                <button
                  onClick={() => { setSelectedPrice("all"); setVisibleCount(PAGE_SIZE); }}
                  className="text-xs text-rose-500 font-semibold cursor-pointer"
                >
                  Xóa bộ lọc
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {PRICE_RANGES.map((range) => (
                <button
                  key={range.id}
                  onClick={() => { handleFilterChange("price", range.id); setShowMobileFilter(false); }}
                  className={`text-xs py-2 px-3 rounded-xl border text-left transition-colors cursor-pointer ${
                    selectedPrice === range.id
                      ? "border-rose-500 bg-rose-50 text-rose-600 font-semibold"
                      : "border-gray-200 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Flash Sale banner ── */}
        <div className="bg-gradient-to-r from-rose-500 to-orange-400 rounded-2xl p-4 mb-4 sm:mb-6 relative overflow-hidden">
          <div className="relative z-10 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <i className="ri-flashlight-line text-white text-sm" />
                <span className="text-white font-bold text-sm whitespace-nowrap">Flash Sale Hôm Nay</span>
              </div>
              <p className="text-white/90 text-xs hidden sm:block">Giảm đến 30% + đặt hàng trực tiếp không qua trung gian</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="bg-white/20 text-white rounded-lg px-2 py-1 text-xs font-semibold whitespace-nowrap">4:23:15</div>
              <button
                onClick={() => setOrderModal({ name: "Tư vấn điện thoại", price: 0 })}
                className="bg-white text-rose-500 rounded-xl px-3 py-1.5 text-xs font-bold cursor-pointer whitespace-nowrap"
              >
                Đặt Ngay
              </button>
            </div>
          </div>
          <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full" />
        </div>

        <div className="flex gap-5">
          {/* ── Desktop Sidebar ── */}
          <aside className="w-52 flex-shrink-0 hidden md:block">
            <div className="bg-white rounded-2xl p-5 sticky top-36">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-filter-3-line text-rose-500" />
                </div>
                Lọc Theo Giá
              </h3>
              <div className="flex flex-col gap-2">
                {PRICE_RANGES.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => handleFilterChange("price", range.id)}
                    className={`flex items-center gap-2.5 text-sm py-1.5 cursor-pointer transition-colors text-left whitespace-nowrap ${
                      selectedPrice === range.id
                        ? "text-rose-500 font-semibold"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      selectedPrice === range.id ? "border-rose-500 bg-rose-500" : "border-gray-300"
                    }`}>
                      {selectedPrice === range.id && <i className="ri-check-line text-white text-xs" />}
                    </span>
                    {range.label}
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-gray-100">
                <div className="bg-rose-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 flex items-center justify-center text-rose-500">
                      <i className="ri-gift-line text-sm" />
                    </div>
                    <span className="text-xs font-semibold text-rose-600">Ưu Đãi Hôm Nay</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Hoàn tiền 5% khi mua điện thoại qua affiliate link
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOrderModal({ name: "", price: 0 })}
                className="w-full mt-4 py-2.5 bg-rose-500 text-white rounded-xl text-sm font-bold hover:bg-rose-600 transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5"
              >
                <i className="ri-phone-line" />
                Tư Vấn Ngay
              </button>

              <button
                onClick={resetFilters}
                className="w-full mt-2 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
              >
                Đặt Lại Bộ Lọc
              </button>
            </div>
          </aside>

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0">
            {/* Sort row — desktop only */}
            <div className="hidden md:flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 flex items-center justify-center text-gray-400">
                  <i className="ri-smartphone-line" />
                </div>
                <span className="text-sm text-gray-500">
                  Hiển thị <strong className="text-gray-700">{displayed.length}</strong>
                  <span className="text-gray-400"> / </span>
                  <strong className="text-gray-700">{filtered.length}</strong> sản phẩm
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 whitespace-nowrap">Sắp xếp:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => { setSortBy(e.target.value); setVisibleCount(PAGE_SIZE); }}
                    className="appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:outline-none cursor-pointer"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center pointer-events-none">
                    <i className="ri-arrow-down-s-line text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile: result count */}
            <p className="md:hidden text-xs text-gray-400 mb-3">
              Đang hiển thị <strong className="text-gray-700">{displayed.length}</strong> / <strong className="text-gray-700">{filtered.length}</strong> sản phẩm
            </p>

            {/* Product grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl">
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <i className="ri-smartphone-line text-5xl text-gray-200" />
                </div>
                <h3 className="text-base font-semibold text-gray-500">Không tìm thấy sản phẩm</h3>
                <p className="text-gray-400 text-sm mt-1">Thử thay đổi bộ lọc</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-5 py-2 bg-gray-900 text-white rounded-full text-sm font-semibold cursor-pointer whitespace-nowrap"
                >
                  Xem Tất Cả
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {displayed.map((product) => (
                    <MobileCard
                      key={product.id}
                      product={product}
                      onOrder={(name, price) => setOrderModal({ name, price })}
                    />
                  ))}
                </div>

                {hasMore && (
                  <div className="mt-6 sm:mt-8 flex flex-col items-center gap-3">
                    <p className="text-sm text-gray-400">
                      <strong className="text-gray-700">{displayed.length}</strong> / <strong className="text-gray-700">{filtered.length}</strong> sản phẩm
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
                        className="w-full sm:w-auto px-5 py-2.5 border border-gray-900 text-gray-900 rounded-full text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-add-line mr-1.5" />
                        Xem Thêm {Math.min(PAGE_SIZE, filtered.length - visibleCount)} Sản Phẩm
                      </button>
                      <button
                        onClick={() => setVisibleCount(filtered.length)}
                        className="w-full sm:w-auto px-5 py-2.5 bg-gray-900 text-white rounded-full text-sm font-semibold hover:bg-gray-700 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-list-check-3 mr-1.5" />
                        Xem Tất Cả {filtered.length}
                      </button>
                    </div>
                    <div className="w-48 sm:w-64 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-rose-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${(displayed.length / filtered.length) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {!hasMore && filtered.length > 0 && (
                  <div className="mt-6 text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-sm font-medium">
                      <i className="ri-check-double-line" />
                      Đã hiển thị đầy đủ {filtered.length} sản phẩm
                    </span>
                  </div>
                )}
              </>
            )}

            {/* SEO block */}
            <div className="mt-8 bg-white rounded-2xl p-4 sm:p-6">
              <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-2">
                Mua Điện Thoại Di Động Chính Hãng - Giá Tốt Nhất
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Khám phá bộ sưu tập <strong>điện thoại di động</strong> chính hãng từ{" "}
                <strong>Apple iPhone</strong>, <strong>Samsung Galaxy</strong>, <strong>Xiaomi Redmi</strong>,{" "}
                <strong>OPPO</strong>, <strong>Vivo</strong>, <strong>Realme</strong>. Bảo hành 12 tháng, đổi trả 30 ngày.
                Đặt hàng trực tiếp, nhận tư vấn qua Zalo.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

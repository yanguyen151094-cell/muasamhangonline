import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/feature/Navbar";
import Footer from "../../components/feature/Footer";
import { useCart } from "../../context/CartContext";
import { Product } from "../../mocks/products";

export interface CategoryConfig {
  title: string;
  subtitle: string;
  slug: string;
  bannerImage: string;
  accentColor: string;
  accentBg: string;
  subcategories: { id: string; name: string; icon: string }[];
  priceRanges: { id: string; label: string; min: number; max: number }[];
  sortOptions?: { value: string; label: string }[];
  features: { icon: string; label: string; color: string }[];
}

const DEFAULT_PRICE_RANGES = [
  { id: "all", label: "Tất Cả Mức Giá", min: 0, max: Infinity },
  { id: "under200", label: "Dưới 200.000₫", min: 0, max: 200000 },
  { id: "200to500", label: "200k - 500k", min: 200000, max: 500000 },
  { id: "500to1m", label: "500k - 1 triệu", min: 500000, max: 1000000 },
  { id: "1mto5m", label: "1 - 5 triệu", min: 1000000, max: 5000000 },
  { id: "over5m", label: "Trên 5 triệu", min: 5000000, max: Infinity },
];

const DEFAULT_SORT_OPTIONS = [
  { value: "popular", label: "Phổ Biến Nhất" },
  { value: "price-asc", label: "Giá Thấp Đến Cao" },
  { value: "price-desc", label: "Giá Cao Đến Thấp" },
  { value: "rating", label: "Đánh Giá Cao" },
];

const PAGE_SIZE = 12;

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const shopeeUrl = "https://shopee.vn";
  const tiktokUrl = "https://www.tiktok.com/shop";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      commission: product.commission,
    });
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Image — fixed aspect ratio */}
      <div
        className="relative bg-gray-50 overflow-hidden cursor-pointer w-full"
        style={{ paddingBottom: "100%" }}
        onClick={() => navigate(`/products/${product.id}`)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.badge && (
            <span className="px-2 py-0.5 bg-rose-500 text-white text-[10px] font-semibold rounded-full whitespace-nowrap">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="px-2 py-0.5 bg-amber-500 text-white text-[10px] font-semibold rounded-full whitespace-nowrap">
              -{discount}%
            </span>
          )}
        </div>
        <div className="absolute top-2 right-2">
          <span className="px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full whitespace-nowrap">
            HH {product.commission}%
          </span>
        </div>
        <div className="absolute bottom-2 left-0 right-0 hidden md:flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleAddToCart}
            className="px-4 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-full cursor-pointer whitespace-nowrap"
          >
            <i className="ri-shopping-cart-2-line mr-1" />
            Thêm Giỏ Hàng
          </button>
        </div>
      </div>

      <div className="p-3 md:p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] md:text-xs font-medium text-gray-400 truncate">{product.category}</span>
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <i className="ri-star-fill text-amber-400 text-[10px] md:text-xs" />
            <span className="text-[10px] md:text-xs text-gray-500 font-medium">{product.rating}</span>
          </div>
        </div>
        <h3
          className="text-xs md:text-sm font-semibold text-gray-900 line-clamp-2 leading-snug mb-1.5 md:mb-2 flex-1 cursor-pointer hover:text-rose-500 transition-colors"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          {product.name}
        </h3>
        <p className="hidden md:block text-xs text-gray-400 line-clamp-2 mb-3 leading-relaxed">
          {product.shortDesc}
        </p>
        <div className="mt-auto">
          <div className="flex items-end justify-between mb-2 md:mb-3">
            <div>
              <div className="text-sm md:text-base font-bold text-gray-900">
                {product.price.toLocaleString("vi-VN")}₫
              </div>
              {product.originalPrice > product.price && (
                <div className="text-[10px] md:text-xs text-gray-400 line-through">
                  {product.originalPrice.toLocaleString("vi-VN")}₫
                </div>
              )}
            </div>
            <span className="text-[10px] md:text-xs text-gray-400">
              {product.sold >= 1000
                ? `${(product.sold / 1000).toFixed(1)}k`
                : product.sold.toLocaleString()} đã bán
            </span>
          </div>

          {/* Affiliate Buttons */}
          <div className="flex gap-1.5">
            <a
              href={shopeeUrl}
              target="_blank"
              rel="nofollow noopener"
              className="flex-1 flex items-center justify-center gap-1 py-2 md:py-2.5 bg-orange-500 text-white text-[10px] md:text-xs font-bold rounded-full hover:bg-orange-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-shopping-bag-2-line text-xs leading-none" />
              <span>Shopee</span>
            </a>
            <a
              href={tiktokUrl}
              target="_blank"
              rel="nofollow noopener"
              className="flex-1 flex items-center justify-center gap-1 py-2 md:py-2.5 bg-stone-900 text-white text-[10px] md:text-xs font-bold rounded-full hover:bg-stone-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-tiktok-line text-xs leading-none" />
              <span>TikTok</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CategoryPageProps {
  config: CategoryConfig;
  products: Product[];
}

export default function CategoryPage({ config, products }: CategoryPageProps) {
  const [selectedSub, setSelectedSub] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const priceRanges = config.priceRanges.length > 0 ? config.priceRanges : DEFAULT_PRICE_RANGES;
  const sortOptions = config.sortOptions ?? DEFAULT_SORT_OPTIONS;

  const filtered = useMemo(() => {
    let list = [...products];
    if (selectedSub !== "all") {
      const subcat = config.subcategories.find((s) => s.id === selectedSub);
      if (subcat) {
        list = list.filter((p) =>
          p.name.toLowerCase().includes(subcat.name.toLowerCase().split(" ")[0]) ||
          p.shortDesc?.toLowerCase().includes(subcat.id.toLowerCase())
        );
      }
    }
    const range = priceRanges.find((r) => r.id === selectedPrice);
    if (range && range.id !== "all") {
      list = list.filter((p) => p.price >= range.min && p.price <= range.max);
    }
    switch (sortBy) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      default: list.sort((a, b) => b.sold - a.sold);
    }
    return list;
  }, [products, selectedSub, selectedPrice, sortBy, config.subcategories, priceRanges]);

  const displayed = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);
  const hasMore = visibleCount < filtered.length;

  const resetFilters = () => {
    setSelectedSub("all");
    setSelectedPrice("all");
    setSortBy("popular");
    setVisibleCount(PAGE_SIZE);
    setMobileFilterOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8]">
      <Navbar />

      {/* Hero */}
      <div className="relative pt-16">
        <div className="h-40 md:h-52 w-full relative overflow-hidden" style={{ background: "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)" }}>
          <img
            src={config.bannerImage}
            alt={config.title}
            className="absolute inset-0 w-full h-full object-cover object-top opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 h-full flex flex-col justify-center">
            <div className="flex items-center gap-2 text-white/60 text-xs md:text-sm mb-1.5 md:mb-2">
              <Link to="/" className="hover:text-white transition-colors cursor-pointer">Trang Chủ</Link>
              <i className="ri-arrow-right-s-line" />
              <span className="text-white">{config.title}</span>
            </div>
            <h1 className="text-xl md:text-3xl font-bold text-white mb-1">{config.title}</h1>
            <p className="text-white/70 text-xs md:text-sm mb-2 md:mb-3">
              <strong className="text-white">{products.length}</strong> sản phẩm &bull; <span className="hidden sm:inline">{config.subtitle}</span>
            </p>
            {/* Features - scroll on mobile */}
            <div className="flex items-center gap-3 md:gap-6 overflow-x-auto pb-1 scrollbar-hide">
              {config.features.map((f) => (
                <div key={f.label} className="flex items-center gap-1.5 flex-shrink-0">
                  <div className={`w-4 h-4 flex items-center justify-center ${f.color}`}>
                    <i className={`${f.icon} text-xs md:text-sm`} />
                  </div>
                  <span className="text-white/80 text-[10px] md:text-xs whitespace-nowrap">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sub-category filter */}
      <div className="bg-white border-b border-gray-100 sticky top-[64px] z-30">
        <div className="max-w-7xl mx-auto px-3 md:px-6">
          <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 md:py-3 scrollbar-hide">
            {config.subcategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => { setSelectedSub(sub.id); setVisibleCount(PAGE_SIZE); }}
                className={`flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                  selectedSub === sub.id
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <div className="w-3.5 h-3.5 md:w-4 md:h-4 flex items-center justify-center">
                  <i className={`${sub.icon} text-xs md:text-sm`} />
                </div>
                {sub.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 md:px-6 py-4 md:py-6">
        {/* Mobile filter bar */}
        <div className="flex md:hidden items-center gap-2 mb-4">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
              selectedPrice !== "all"
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-700 border-gray-200"
            }`}
          >
            <i className="ri-filter-3-line" />
            Lọc Giá
            {selectedPrice !== "all" && <i className="ri-close-circle-fill text-xs" onClick={(e) => { e.stopPropagation(); setSelectedPrice("all"); }} />}
          </button>
          <div className="flex-1 relative">
            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setVisibleCount(PAGE_SIZE); }}
              className="w-full appearance-none pl-3 pr-7 py-2 border border-gray-200 rounded-full text-xs text-gray-700 bg-white focus:outline-none cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
              <i className="ri-arrow-down-s-line text-gray-400 text-sm" />
            </div>
          </div>
          <span className="text-xs text-gray-400 whitespace-nowrap">{filtered.length} SP</span>
        </div>

        {/* Mobile filter panel */}
        {mobileFilterOpen && (
          <div className="md:hidden bg-white rounded-2xl p-4 mb-4 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-gray-900">Lọc Theo Giá</span>
              <button onClick={() => setMobileFilterOpen(false)} className="w-6 h-6 flex items-center justify-center cursor-pointer">
                <i className="ri-close-line text-gray-500" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {priceRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => { setSelectedPrice(range.id); setVisibleCount(PAGE_SIZE); setMobileFilterOpen(false); }}
                  className={`flex items-center gap-2 text-xs py-2 px-3 rounded-xl border transition-all cursor-pointer text-left ${
                    selectedPrice === range.id
                      ? "border-rose-500 bg-rose-50 text-rose-600 font-semibold"
                      : "border-gray-200 text-gray-600"
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedPrice === range.id ? "border-rose-500 bg-rose-500" : "border-gray-300"
                    }`}
                  >
                    {selectedPrice === range.id && <i className="ri-check-line text-white text-[8px]" />}
                  </span>
                  {range.label}
                </button>
              ))}
            </div>
            <button
              onClick={resetFilters}
              className="w-full mt-3 py-2 bg-gray-100 text-gray-600 rounded-xl text-xs font-medium cursor-pointer whitespace-nowrap"
            >
              Đặt Lại
            </button>
          </div>
        )}

        <div className="flex gap-5">
          {/* Sidebar — desktop only */}
          <aside className="hidden md:block w-52 flex-shrink-0">
            <div className="bg-white rounded-2xl p-5 sticky top-36">
              <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-filter-3-line text-rose-500" />
                </div>
                Lọc Theo Giá
              </h3>
              <div className="flex flex-col gap-2">
                {priceRanges.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => { setSelectedPrice(range.id); setVisibleCount(PAGE_SIZE); }}
                    className={`flex items-center gap-2.5 text-sm py-1.5 cursor-pointer transition-colors text-left whitespace-nowrap ${
                      selectedPrice === range.id
                        ? "text-rose-500 font-semibold"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        selectedPrice === range.id ? "border-rose-500 bg-rose-500" : "border-gray-300"
                      }`}
                    >
                      {selectedPrice === range.id && (
                        <i className="ri-check-line text-white text-xs" />
                      )}
                    </span>
                    {range.label}
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-gray-100">
                <div className={`${config.accentBg} rounded-xl p-3`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-4 h-4 flex items-center justify-center ${config.accentColor}`}>
                      <i className="ri-percent-line text-sm" />
                    </div>
                    <span className={`text-xs font-semibold ${config.accentColor}`}>Hoa Hồng Hấp Dẫn</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Kiếm hoa hồng {config.title} lên đến 15% mỗi đơn hàng
                  </p>
                </div>
              </div>

              <button
                onClick={resetFilters}
                className="w-full mt-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
              >
                Đặt Lại Bộ Lọc
              </button>
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Sort bar — desktop only */}
            <div className="hidden md:flex items-center justify-between mb-5">
              <span className="text-sm text-gray-500">
                Hiển thị <strong className="text-gray-700">{displayed.length}</strong>
                <span className="text-gray-400"> / </span>
                <strong className="text-gray-700">{filtered.length}</strong> sản phẩm
              </span>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 whitespace-nowrap">Sắp xếp:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => { setSortBy(e.target.value); setVisibleCount(PAGE_SIZE); }}
                    className="appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:outline-none cursor-pointer"
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center pointer-events-none">
                    <i className="ri-arrow-down-s-line text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl">
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <i className="ri-inbox-line text-5xl text-gray-200" />
                </div>
                <h3 className="text-lg font-semibold text-gray-500">Không tìm thấy sản phẩm</h3>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-5 py-2 bg-gray-900 text-white rounded-full text-sm font-semibold cursor-pointer whitespace-nowrap"
                >
                  Xem Tất Cả
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-4">
                  {displayed.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {hasMore && (
                  <div className="mt-6 md:mt-8 flex flex-col items-center gap-3">
                    <p className="text-xs md:text-sm text-gray-400">
                      Đang xem <strong className="text-gray-700">{displayed.length}</strong> / <strong className="text-gray-700">{filtered.length}</strong>
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-3 w-full sm:w-auto">
                      <button
                        onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
                        className="w-full sm:w-auto px-5 md:px-6 py-2.5 border border-gray-900 text-gray-900 rounded-full text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-add-line mr-1.5" />
                        Xem Thêm {Math.min(PAGE_SIZE, filtered.length - visibleCount)} Sản Phẩm
                      </button>
                      <button
                        onClick={() => setVisibleCount(filtered.length)}
                        className="w-full sm:w-auto px-5 md:px-6 py-2.5 bg-gray-900 text-white rounded-full text-sm font-semibold hover:bg-gray-700 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Xem Tất Cả {filtered.length} Sản Phẩm
                      </button>
                    </div>
                    <div className="w-48 md:w-64 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-rose-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${(displayed.length / filtered.length) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {!hasMore && filtered.length > 0 && (
                  <div className="mt-6 md:mt-8 text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-xs md:text-sm font-medium">
                      <i className="ri-check-double-line" />
                      Đã hiển thị đầy đủ {filtered.length} sản phẩm
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

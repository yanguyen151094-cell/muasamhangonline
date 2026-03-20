import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { mockProducts, mockCategories } from "../../mocks/products";
import ProductCard from "../../components/feature/ProductCard";
import Navbar from "../../components/feature/Navbar";
import Footer from "../../components/feature/Footer";

const SORT_OPTIONS = [
  { value: "default", label: "Mặc Định" },
  { value: "price-asc", label: "Giá: Thấp đến Cao" },
  { value: "price-desc", label: "Giá: Cao đến Thấp" },
  { value: "rating", label: "Đánh Giá Cao Nhất" },
  { value: "sold", label: "Bán Chạy Nhất" },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 40000000]);
  const [minRating, setMinRating] = useState(0);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...mockProducts];
    if (selectedCategory !== "all") {
      const cat = mockCategories.find((c) => c.id === selectedCategory);
      if (cat) list = list.filter((p) => p.category === cat.name);
    }
    list = list.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1] && p.rating >= minRating
    );
    switch (sortBy) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      case "sold": list.sort((a, b) => b.sold - a.sold); break;
    }
    return list;
  }, [selectedCategory, sortBy, priceRange, minRating]);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setSearchParams(catId !== "all" ? { category: catId } : {});
    setMobileSidebarOpen(false);
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setSortBy("default");
    setPriceRange([0, 40000000]);
    setMinRating(0);
    setSearchParams({});
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Page Header */}
      <div className="pt-20 md:pt-24 pb-6 md:pb-10 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <span className="text-rose-500 text-xs md:text-sm font-semibold uppercase tracking-widest">Cửa Hàng</span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">Tất Cả Sản Phẩm</h1>
          <p className="text-gray-500 text-sm mt-1">Tìm thấy <strong>{filtered.length}</strong> sản phẩm</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 md:px-6 py-5 md:py-10">
        {/* Mobile filter bar */}
        <div className="flex md:hidden items-center gap-2 mb-4">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
              selectedCategory !== "all" || minRating > 0
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-700 border-gray-200"
            }`}
          >
            <i className="ri-filter-3-line" />
            Bộ Lọc
          </button>
          <div className="flex-1 relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none pl-3 pr-7 py-2 border border-gray-200 rounded-full text-xs text-gray-700 bg-white focus:outline-none cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <i className="ri-arrow-down-s-line absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
          </div>
          <span className="text-xs text-gray-400 whitespace-nowrap">{filtered.length} SP</span>
        </div>

        {/* Mobile filter panel */}
        {mobileSidebarOpen && (
          <div className="md:hidden bg-white rounded-2xl border border-gray-100 p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-gray-900">Bộ Lọc</span>
              <button onClick={() => setMobileSidebarOpen(false)} className="w-6 h-6 flex items-center justify-center cursor-pointer">
                <i className="ri-close-line text-gray-500" />
              </button>
            </div>

            {/* Category */}
            <div className="mb-4">
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Danh Mục</div>
              <div className="grid grid-cols-2 gap-1.5">
                {[{ id: "all", name: "Tất Cả" }, ...mockCategories].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`text-xs py-2 px-3 rounded-xl border transition-all cursor-pointer text-left ${
                      selectedCategory === cat.id
                        ? "border-rose-500 bg-rose-50 text-rose-600 font-semibold"
                        : "border-gray-200 text-gray-600"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="mb-4">
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Đánh Giá Tối Thiểu</div>
              <div className="grid grid-cols-2 gap-1.5">
                {[0, 4, 4.5, 4.8].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(rating)}
                    className={`text-xs py-2 px-3 rounded-xl border transition-all cursor-pointer ${
                      minRating === rating
                        ? "border-rose-500 bg-rose-50 text-rose-600 font-semibold"
                        : "border-gray-200 text-gray-600"
                    }`}
                  >
                    {rating === 0 ? "Tất cả" : `${rating}+ ⭐`}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={resetFilters} className="w-full py-2 bg-gray-900 text-white rounded-xl text-xs font-semibold cursor-pointer whitespace-nowrap">
              Đặt Lại Bộ Lọc
            </button>
          </div>
        )}

        <div className="flex gap-6 md:gap-8">
          {/* Sidebar Filter — desktop only */}
          <aside className="hidden md:block w-56 flex-shrink-0">
            <div className="sticky top-24 bg-white border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                <i className="ri-filter-3-line text-rose-500" />
                Bộ Lọc
              </h3>

              {/* Category */}
              <div className="mb-6">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Danh Mục</div>
                <div className="flex flex-col gap-2">
                  {[{ id: "all", name: "Tất Cả" }, ...mockCategories].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`flex items-center gap-2.5 text-sm py-1.5 cursor-pointer transition-colors text-left whitespace-nowrap ${
                        selectedCategory === cat.id ? "text-rose-500 font-semibold" : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                          selectedCategory === cat.id ? "border-rose-500 bg-rose-500" : "border-gray-300"
                        }`}
                      >
                        {selectedCategory === cat.id && (
                          <i className="ri-check-line text-white text-xs" />
                        )}
                      </span>
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Đánh Giá Tối Thiểu</div>
                <div className="flex flex-col gap-2">
                  {[0, 4, 4.5, 4.8].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`flex items-center gap-2 text-sm cursor-pointer transition-colors ${
                        minRating === rating ? "text-rose-500 font-semibold" : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                          minRating === rating ? "border-rose-500 bg-rose-500" : "border-gray-300"
                        }`}
                      >
                        {minRating === rating && <i className="ri-check-line text-white text-xs" />}
                      </span>
                      {rating === 0 ? "Tất cả" : (
                        <span className="flex items-center gap-0.5">
                          {rating}+ <i className="ri-star-fill text-amber-400 text-xs" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset */}
              <button
                onClick={resetFilters}
                className="w-full py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                Đặt Lại Bộ Lọc
              </button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {/* Sort bar — desktop only */}
            <div className="hidden md:flex items-center justify-between mb-6">
              <span className="text-gray-500 text-sm">
                Hiển thị <strong className="text-gray-900">{filtered.length}</strong> kết quả
              </span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:outline-none focus:border-gray-400 cursor-pointer"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <i className="ri-search-line text-5xl text-gray-200 mb-4 block" />
                <h3 className="text-lg font-semibold text-gray-500">Không tìm thấy sản phẩm</h3>
                <p className="text-gray-400 text-sm mt-1">Thử thay đổi bộ lọc của bạn</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-5">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

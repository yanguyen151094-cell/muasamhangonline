import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProductById, getRelatedProducts } from "../../mocks/allProducts";
import { useCart } from "../../context/CartContext";
import ProductCard from "../../components/feature/ProductCard";
import Navbar from "../../components/feature/Navbar";
import Footer from "../../components/feature/Footer";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = id ? getProductById(id) : undefined;
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [copiedLink, setCopiedLink] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center px-4">
          <i className="ri-error-warning-line text-5xl text-gray-300 block mb-4" />
          <h2 className="text-xl font-bold text-gray-700 mb-4">Không tìm thấy sản phẩm</h2>
          <Link to="/products" className="px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-semibold cursor-pointer whitespace-nowrap">
            Quay Lại Cửa Hàng
          </Link>
        </div>
      </div>
    );
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const commission = Math.round(product.price * (product.commission / 100));
  const related = getRelatedProducts(product, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({ id: product.id, name: product.name, price: product.price, image: product.image, commission: product.commission });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href + "?ref=affiliate123");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const reviews = [
    { name: "Nguyễn Văn An", rating: 5, date: "12/03/2026", text: "Sản phẩm rất tốt, đúng như mô tả. Giao hàng nhanh, đóng gói cẩn thận. Rất hài lòng!", avatar: "https://readdy.ai/api/search-image?query=asian%20man%20smiling%20portrait%20headshot%20professional&width=60&height=60&seq=60&orientation=squarish" },
    { name: "Trần Thị Bình", rating: 5, date: "08/03/2026", text: "Mình mua về dùng rất ổn định. Chất lượng xứng đáng với giá tiền. Sẽ mua lại lần sau.", avatar: "https://readdy.ai/api/search-image?query=asian%20woman%20smiling%20portrait%20headshot%20professional%20friendly&width=60&height=60&seq=61&orientation=squarish" },
    { name: "Lê Minh Tuấn", rating: 4, date: "01/03/2026", text: "Sản phẩm ok, nhưng thời gian giao hàng hơi lâu hơn so với dự kiến. Tổng thể vẫn hài lòng.", avatar: "https://readdy.ai/api/search-image?query=vietnamese%20man%20portrait%20headshot%20natural%20smile&width=60&height=60&seq=62&orientation=squarish" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-3 md:px-6 pt-18 md:pt-24 pb-10 md:pb-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs md:text-sm text-gray-400 mb-4 md:mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <Link to="/" className="hover:text-gray-700 transition-colors cursor-pointer flex-shrink-0">Trang Chủ</Link>
          <i className="ri-arrow-right-s-line flex-shrink-0" />
          <Link to="/products" className="hover:text-gray-700 transition-colors cursor-pointer flex-shrink-0">Sản Phẩm</Link>
          <i className="ri-arrow-right-s-line flex-shrink-0" />
          <span className="text-gray-600 truncate max-w-[140px] md:max-w-none">{product.name}</span>
        </nav>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 mb-10 md:mb-16">

          {/* ======== Images ======== */}
          <div className="flex flex-col gap-3">
            {/* Main Image */}
            <div className="w-full rounded-xl md:rounded-2xl overflow-hidden bg-gray-50" style={{ aspectRatio: "1/1" }}>
              <img
                src={product.images[selectedImg]}
                alt={product.name}
                className="w-full h-full object-cover object-top transition-all duration-300"
              />
            </div>
            {/* Thumbnails — horizontal scrollable row */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-lg md:rounded-xl overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
                    selectedImg === i ? "border-gray-900" : "border-gray-200"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          </div>

          {/* ======== Info ======== */}
          <div className="flex flex-col">
            {/* Badges */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2.5 py-1 bg-stone-100 text-stone-600 text-xs font-medium rounded-full whitespace-nowrap">{product.category}</span>
              {product.badge && (
                <span className="px-2.5 py-1 bg-rose-100 text-rose-600 text-xs font-medium rounded-full whitespace-nowrap">{product.badge}</span>
              )}
            </div>

            {/* Name */}
            <h1 className="text-lg md:text-3xl font-bold text-gray-900 leading-snug mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-4">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <i key={s} className={`ri-star-${s <= Math.floor(product.rating) ? "fill" : "line"} text-amber-400 text-sm`} />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
              <span className="text-xs text-gray-400">({product.reviews.toLocaleString()} đánh giá)</span>
              <span className="text-xs text-gray-400">·</span>
              <span className="text-xs text-gray-400">Đã bán {product.sold.toLocaleString()}</span>
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-end gap-2 mb-4 md:mb-5">
              <span className="text-2xl md:text-3xl font-bold text-gray-900">{product.price.toLocaleString("vi-VN")}₫</span>
              <span className="text-sm md:text-lg text-gray-400 line-through">{product.originalPrice.toLocaleString("vi-VN")}₫</span>
              <span className="px-2 py-0.5 bg-rose-100 text-rose-600 text-xs md:text-sm font-bold rounded-lg whitespace-nowrap">-{discount}%</span>
            </div>

            {/* Affiliate Box */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl md:rounded-2xl p-3 md:p-4 mb-4 md:mb-6">
              <div className="flex items-center justify-between mb-1.5 md:mb-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-medal-line text-emerald-600 text-sm md:text-lg" />
                  </div>
                  <span className="font-semibold text-emerald-700 text-xs md:text-sm">Hoa Hồng Affiliate</span>
                </div>
                <span className="text-base md:text-lg font-bold text-emerald-600">{product.commission}%</span>
              </div>
              <p className="text-emerald-600 text-xs md:text-sm mb-2 md:mb-3">
                Kiếm <strong>{commission.toLocaleString("vi-VN")}₫</strong> cho mỗi đơn hàng được giới thiệu thành công.
              </p>
              <button
                onClick={handleCopyLink}
                className="w-full py-2 md:py-2.5 bg-emerald-600 text-white rounded-lg md:rounded-xl text-xs md:text-sm font-semibold hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
              >
                <i className={copiedLink ? "ri-checkbox-circle-line" : "ri-links-line"} />
                {copiedLink ? "Đã sao chép link!" : "Sao Chép Link Affiliate"}
              </button>
            </div>

            {/* Short desc */}
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-4 md:mb-6">{product.shortDesc}</p>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-4 md:mb-5">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className={`text-sm ${product.stock > 10 ? "ri-checkbox-circle-line text-emerald-500" : "ri-error-warning-line text-amber-500"}`} />
              </div>
              <span className={`text-xs md:text-sm font-medium ${product.stock > 10 ? "text-emerald-600" : "text-amber-600"}`}>
                {product.stock > 10 ? `Còn hàng (${product.stock})` : `Còn ít hàng (${product.stock} cái)`}
              </span>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <span className="text-xs md:text-sm font-medium text-gray-700 whitespace-nowrap">Số lượng:</span>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <i className="ri-subtract-line" />
                </button>
                <span className="w-10 md:w-12 text-center text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <i className="ri-add-line" />
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-2 md:gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 md:py-3.5 border-2 rounded-xl font-semibold text-xs md:text-sm transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5 ${
                  added
                    ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                    : "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                }`}
              >
                <i className={added ? "ri-checkbox-circle-line" : "ri-shopping-cart-2-line"} />
                {added ? "Đã Thêm!" : "Thêm Vào Giỏ"}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 py-3 md:py-3.5 bg-rose-500 text-white rounded-xl font-semibold text-xs md:text-sm hover:bg-rose-600 transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5"
              >
                <i className="ri-flash-line" />
                Mua Ngay
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6 md:mb-8">
          <div className="flex gap-5 md:gap-8 overflow-x-auto scrollbar-hide">
            {[
              { key: "description", label: "Mô Tả" },
              { key: "reviews", label: `Đánh Giá (${reviews.length})` },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-3 text-xs md:text-sm font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap -mb-px flex-shrink-0 ${
                  activeTab === tab.key
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-400 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "description" && (
          <div className="max-w-3xl mb-10 md:mb-16">
            <p className="text-gray-600 leading-relaxed text-xs md:text-sm">{product.description}</p>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="max-w-3xl mb-10 md:mb-16">
            <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8 bg-stone-50 rounded-xl md:rounded-2xl p-4 md:p-6">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gray-900">{product.rating}</div>
                <div className="flex items-center justify-center gap-0.5 mt-1 mb-1">
                  {[1,2,3,4,5].map((s) => (
                    <i key={s} className={`ri-star-${s <= Math.floor(product.rating) ? "fill" : "line"} text-amber-400 text-xs md:text-sm`} />
                  ))}
                </div>
                <div className="text-gray-400 text-xs">{product.reviews.toLocaleString()} đánh giá</div>
              </div>
            </div>
            <div className="flex flex-col gap-5 md:gap-6">
              {reviews.map((review, i) => (
                <div key={i} className="flex gap-3 md:gap-4 pb-5 md:pb-6 border-b border-gray-100 last:border-0">
                  <img src={review.avatar} alt={review.name} className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover object-top flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs md:text-sm text-gray-900">{review.name}</span>
                      <span className="text-[10px] md:text-xs text-gray-400 flex-shrink-0 ml-2">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-0.5 mb-1.5">
                      {[1,2,3,4,5].map((s) => (
                        <i key={s} className={`ri-star-${s <= review.rating ? "fill" : "line"} text-amber-400 text-xs`} />
                      ))}
                    </div>
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed">{review.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-base md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Sản Phẩm Liên Quan</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Navbar from "../../components/feature/Navbar";
import Footer from "../../components/feature/Footer";

export default function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState(false);

  const discount = couponApplied ? Math.round(total * 0.1) : 0;
  const shipping = total > 0 ? (total >= 500000 ? 0 : 30000) : 0;
  const finalTotal = total - discount + shipping;

  const handleCoupon = () => {
    if (coupon.toUpperCase() === "AFFILIATE10") {
      setCouponApplied(true);
      setCouponError(false);
    } else {
      setCouponError(true);
      setCouponApplied(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="text-center py-24">
          <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-shopping-cart-2-line text-4xl text-stone-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-700 mb-3">Giỏ hàng trống</h2>
          <p className="text-gray-400 text-sm mb-8">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-semibold cursor-pointer whitespace-nowrap"
          >
            <i className="ri-shopping-bag-3-line" />
            Khám Phá Sản Phẩm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        {/* Header */}
        <div className="mb-10">
          <span className="text-rose-500 text-sm font-semibold uppercase tracking-widest">Giỏ Hàng</span>
          <h1 className="text-3xl font-bold text-gray-900 mt-1">
            Giỏ Hàng Của Bạn
          </h1>
          {items.length > 0 && (
            <p className="text-gray-500 text-sm mt-1">{items.reduce((sum, i) => sum + i.quantity, 0)} sản phẩm</p>
          )}
        </div>

        <div className="flex gap-8">
          {/* Items */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-5 bg-stone-50 rounded-2xl items-center"
                >
                  <Link to={`/products/${item.id}`} className="flex-shrink-0 cursor-pointer">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover object-top"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/products/${item.id}`}
                      className="font-semibold text-sm text-gray-900 line-clamp-2 hover:text-rose-500 transition-colors cursor-pointer"
                    >
                      {item.name}
                    </Link>
                    <div className="flex items-center gap-1.5 mt-1">
                      <i className="ri-medal-line text-emerald-500 text-xs" />
                      <span className="text-xs text-emerald-600">Hoa hồng: {item.commission}%</span>
                    </div>
                    <div className="text-sm font-bold text-gray-900 mt-1">
                      {item.price.toLocaleString("vi-VN")}₫
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white flex-shrink-0">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <i className="ri-subtract-line text-sm" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <i className="ri-add-line text-sm" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right flex-shrink-0 w-28">
                    <div className="text-sm font-bold text-gray-900">
                      {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                    </div>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-8 h-8 flex items-center justify-center text-rose-400 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer flex-shrink-0"
                  >
                    <i className="ri-delete-bin-line" />
                  </button>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between mt-6">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-arrow-left-line" />
                Tiếp Tục Mua Sắm
              </Link>
              <button
                onClick={clearCart}
                className="inline-flex items-center gap-2 text-sm text-rose-400 hover:text-rose-600 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-delete-bin-line" />
                Xóa Tất Cả
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="w-80 flex-shrink-0">
            <div className="sticky top-24 bg-stone-50 rounded-2xl p-6">
              <h2 className="font-bold text-gray-900 mb-5 text-lg">Tổng Đơn Hàng</h2>

              <div className="flex flex-col gap-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tạm tính</span>
                  <span className="font-medium">{total.toLocaleString("vi-VN")}₫</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-600">Giảm giá (10%)</span>
                    <span className="text-emerald-600 font-medium">-{discount.toLocaleString("vi-VN")}₫</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Phí vận chuyển</span>
                  <span className={shipping === 0 ? "text-emerald-600 font-medium" : "font-medium"}>
                    {shipping === 0 ? "Miễn phí" : `${shipping.toLocaleString("vi-VN")}₫`}
                  </span>
                </div>
              </div>

              {shipping === 0 && total > 0 && (
                <div className="flex items-center gap-2 mb-5 p-3 bg-emerald-50 rounded-xl">
                  <i className="ri-truck-line text-emerald-500" />
                  <span className="text-xs text-emerald-700">Bạn được miễn phí vận chuyển!</span>
                </div>
              )}

              {/* Coupon */}
              <div className="mb-5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => { setCoupon(e.target.value); setCouponError(false); }}
                    placeholder="Mã giảm giá"
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-gray-400 transition-colors"
                  />
                  <button
                    onClick={handleCoupon}
                    className="px-4 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Áp Dụng
                  </button>
                </div>
                {couponError && <p className="text-xs text-rose-500 mt-1.5">Mã không hợp lệ. Thử: AFFILIATE10</p>}
                {couponApplied && <p className="text-xs text-emerald-600 mt-1.5 flex items-center gap-1"><i className="ri-checkbox-circle-line" /> Mã AFFILIATE10 đã được áp dụng!</p>}
              </div>

              <div className="flex justify-between items-center py-4 border-t border-gray-200 mb-5">
                <span className="font-bold text-gray-900">Tổng Cộng</span>
                <span className="text-xl font-bold text-gray-900">{finalTotal.toLocaleString("vi-VN")}₫</span>
              </div>

              <button
                onClick={() => navigate("/payment")}
                className="w-full py-4 bg-rose-500 text-white rounded-xl font-bold text-base hover:bg-rose-600 transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
              >
                <i className="ri-secure-payment-line" />
                Tiến Hành Thanh Toán
              </button>

              <div className="flex items-center justify-center gap-4 mt-4">
                {["ri-visa-line", "ri-mastercard-line", "ri-paypal-line"].map((icon, i) => (
                  <div key={i} className="w-8 h-8 flex items-center justify-center">
                    <i className={`${icon} text-xl text-gray-400`} />
                  </div>
                ))}
                <span className="text-xs text-gray-400">& nhiều hơn nữa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

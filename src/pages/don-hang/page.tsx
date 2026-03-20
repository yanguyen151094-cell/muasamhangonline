import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/feature/Navbar";
import Footer from "../../components/feature/Footer";
import { getOrdersByPhone, OrderItem } from "../../utils/orderStorage";

const STATUS_CONFIG: Record<
  OrderItem["status"],
  { label: string; color: string; bg: string; icon: string }
> = {
  pending:   { label: "Đang Xử Lý",    color: "text-amber-600",  bg: "bg-amber-50",   icon: "ri-time-line" },
  confirmed: { label: "Đã Xác Nhận",   color: "text-emerald-600",bg: "bg-emerald-50", icon: "ri-checkbox-circle-line" },
  shipping:  { label: "Đang Giao Hàng",color: "text-indigo-600", bg: "bg-indigo-50",  icon: "ri-truck-line" },
  delivered: { label: "Đã Giao Thành Công", color: "text-emerald-700", bg: "bg-emerald-50", icon: "ri-check-double-line" },
};

const STEPS: { key: OrderItem["status"]; label: string; icon: string }[] = [
  { key: "pending",   label: "Đặt hàng",    icon: "ri-shopping-bag-3-line" },
  { key: "confirmed", label: "Xác nhận",    icon: "ri-checkbox-circle-line" },
  { key: "shipping",  label: "Đang giao",   icon: "ri-truck-line" },
  { key: "delivered", label: "Đã nhận",     icon: "ri-home-smile-line" },
];

const STATUS_LEVEL: Record<OrderItem["status"], number> = {
  pending: 0, confirmed: 1, shipping: 2, delivered: 3,
};

function OrderCard({ order }: { order: OrderItem }) {
  const cfg = STATUS_CONFIG[order.status];
  const level = STATUS_LEVEL[order.status];
  const date = new Date(order.createdAt);
  const dateStr = date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
  const timeStr = date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-gray-50">
        <div>
          <p className="text-xs text-gray-400">Mã đơn hàng</p>
          <p className="text-sm font-bold text-gray-900">#{order.orderId}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">{dateStr} lúc {timeStr}</p>
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold mt-1 ${cfg.bg} ${cfg.color}`}>
            <i className={`${cfg.icon} text-xs`} />
            {cfg.label}
          </span>
        </div>
      </div>

      {/* Product */}
      <div className="px-5 py-4 border-b border-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-xl flex-shrink-0">
            <i className="ri-smartphone-line text-gray-500 text-lg" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{order.productName || "Sản phẩm đã đặt"}</p>
            <p className="text-xs text-gray-400 mt-0.5">{order.address}</p>
          </div>
          {order.productPrice > 0 && (
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-bold text-gray-900">
                {order.productPrice.toLocaleString("vi-VN")}₫
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="px-5 py-4">
        <div className="flex items-center justify-between relative">
          {/* Progress line background */}
          <div className="absolute left-0 right-0 top-4 h-0.5 bg-gray-100 mx-6" />
          {/* Progress line fill */}
          <div
            className="absolute left-0 top-4 h-0.5 bg-emerald-400 mx-6 transition-all duration-700"
            style={{ width: `${(level / 3) * 100}%`, maxWidth: "calc(100% - 3rem)" }}
          />

          {STEPS.map((step, i) => {
            const done = i <= level;
            return (
              <div key={step.key} className="flex flex-col items-center gap-1.5 relative z-10">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all ${
                    done
                      ? "border-emerald-400 bg-emerald-400 text-white"
                      : "border-gray-200 bg-white text-gray-300"
                  }`}
                >
                  <i className={`${step.icon} text-xs`} />
                </div>
                <span className={`text-xs whitespace-nowrap ${done ? "text-emerald-600 font-semibold" : "text-gray-400"}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Note if exists */}
      {order.notes && (
        <div className="px-5 pb-4">
          <div className="flex items-start gap-2 bg-gray-50 rounded-xl px-3 py-2.5">
            <div className="w-4 h-4 flex items-center justify-center text-gray-400 flex-shrink-0 mt-0.5">
              <i className="ri-sticky-note-line text-sm" />
            </div>
            <p className="text-xs text-gray-500">{order.notes}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DonHangPage() {
  const [phone, setPhone] = useState("");
  const [searched, setSearched] = useState(false);
  const [orders, setOrders] = useState<OrderItem[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const result = getOrdersByPhone(phone);
    setOrders(result);
    setSearched(true);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8]">
      <Navbar />

      {/* Hero */}
      <div className="pt-16 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-12 text-center">
          <div className="w-14 h-14 flex items-center justify-center bg-rose-50 rounded-2xl mx-auto mb-4">
            <i className="ri-package-line text-rose-500 text-2xl" />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400 justify-center mb-3">
            <Link to="/" className="hover:text-gray-700 transition-colors cursor-pointer">Trang Chủ</Link>
            <i className="ri-arrow-right-s-line" />
            <span className="text-gray-700">Theo Dõi Đơn Hàng</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Đơn Hàng Của Tôi</h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Nhập số điện thoại bạn đã dùng khi đặt hàng để xem trạng thái đơn hàng.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Search form */}
        <div className="bg-white rounded-2xl p-4 md:p-6 mb-6 border border-gray-100">
          <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-5 h-5 flex items-center justify-center text-rose-500">
              <i className="ri-search-line" />
            </div>
            Tra Cứu Đơn Hàng
          </h2>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Nhập số điện thoại đã đặt hàng (VD: 0912345678)"
              required
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-900 transition-colors"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-rose-500 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-search-line mr-1.5" />
              Tra Cứu
            </button>
          </form>
        </div>

        {/* Results */}
        {searched && (
          <>
            {orders.length > 0 ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Tìm thấy <strong className="text-gray-900">{orders.length}</strong> đơn hàng
                  </p>
                  <span className="text-xs text-gray-400">SĐT: {phone}</span>
                </div>
                {orders.map((order) => (
                  <OrderCard key={order.orderId} order={order} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
                <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-2xl mx-auto mb-4">
                  <i className="ri-inbox-line text-gray-400 text-3xl" />
                </div>
                <h3 className="text-base font-bold text-gray-700 mb-2">
                  Không tìm thấy đơn hàng
                </h3>
                <p className="text-sm text-gray-400 mb-6 max-w-sm mx-auto">
                  Không có đơn hàng nào với số điện thoại <strong>{phone}</strong>. Vui lòng kiểm tra lại hoặc liên hệ hỗ trợ.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="tel:0982947645"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-rose-500 text-white rounded-xl text-sm font-semibold cursor-pointer whitespace-nowrap hover:bg-rose-600 transition-colors"
                  >
                    <i className="ri-phone-line" />
                    Gọi 0982.947.645
                  </a>
                  <a
                    href="https://zalo.me/0982947645"
                    target="_blank"
                    rel="nofollow noopener"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-green-500 text-white rounded-xl text-sm font-semibold cursor-pointer whitespace-nowrap hover:bg-green-600 transition-colors"
                  >
                    <i className="ri-chat-smile-2-line" />
                    Zalo Hỗ Trợ
                  </a>
                </div>
              </div>
            )}
          </>
        )}

        {/* First state — tips */}
        {!searched && (
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: "ri-smartphone-line", color: "text-rose-500", bg: "bg-rose-50", title: "Đặt Hàng Điện Thoại", desc: "Vào danh mục Điện Thoại, chọn máy và nhấn Đặt Hàng Ngay." },
              { icon: "ri-file-text-line", color: "text-amber-500", bg: "bg-amber-50", title: "Theo Dõi Đơn Hàng", desc: "Nhập SĐT đặt hàng để xem trạng thái và lịch sử mua." },
              { icon: "ri-headphone-line", color: "text-emerald-500", bg: "bg-emerald-50", title: "Hỗ Trợ 24/7", desc: "Liên hệ Zalo 0982.947.645 nếu cần hỗ trợ thêm." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-5 border border-gray-100">
                <div className={`w-10 h-10 flex items-center justify-center ${item.bg} rounded-xl mb-3`}>
                  <i className={`${item.icon} ${item.color} text-lg`} />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Contact bar */}
        <div className="mt-8 bg-stone-900 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white text-sm font-semibold">Cần hỗ trợ thêm?</p>
            <p className="text-stone-400 text-xs mt-0.5">Đội ngũ hỗ trợ sẵn sàng giúp bạn mọi lúc</p>
          </div>
          <div className="flex gap-3">
            <a
              href="tel:0982947645"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-rose-500 text-white rounded-xl text-xs font-semibold cursor-pointer whitespace-nowrap hover:bg-rose-600 transition-colors"
            >
              <i className="ri-phone-line" />
              0982.947.645
            </a>
            <a
              href="https://zalo.me/0982947645"
              target="_blank"
              rel="nofollow noopener"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-500 text-white rounded-xl text-xs font-semibold cursor-pointer whitespace-nowrap hover:bg-green-600 transition-colors"
            >
              <i className="ri-chat-smile-2-line" />
              Zalo
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

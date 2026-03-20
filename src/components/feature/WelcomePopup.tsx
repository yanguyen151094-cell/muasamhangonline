import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SESSION_KEY = "sa_welcome_shown";

export default function WelcomePopup() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const shown = sessionStorage.getItem(SESSION_KEY);
      if (!shown) setVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setVisible(false);
  };

  const handleShop = () => {
    close();
    navigate("/dien-thoai");
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)" }}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div
        className="relative bg-white rounded-3xl overflow-hidden w-full max-w-2xl flex flex-col md:flex-row"
        style={{ animation: "popIn 0.35s cubic-bezier(0.34,1.56,0.64,1)" }}
      >
        {/* Close */}
        <button
          type="button"
          onClick={close}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 text-gray-600 hover:bg-white hover:text-gray-900 transition-all cursor-pointer"
        >
          <i className="ri-close-line text-lg" />
        </button>

        {/* Left image panel */}
        <div className="relative md:w-52 flex-shrink-0 h-48 md:h-auto overflow-hidden">
          <img
            src="https://placehold.co/400x600/eeeeee/999999?text=Hinh+anh+15"
            alt="Ưu đãi hôm nay"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/40 via-transparent to-transparent" />
          {/* Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 bg-rose-500 text-white text-xs font-bold rounded-full whitespace-nowrap">
              🎉 Chào Mừng!
            </span>
          </div>
        </div>

        {/* Right content */}
        <div className="flex-1 p-7 flex flex-col justify-between">
          {/* Header */}
          <div>
            <p className="text-xs text-rose-500 font-semibold uppercase tracking-widest mb-2">
              Ưu Đãi Hôm Nay
            </p>
            <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-3">
              Mua Sắm Thông Minh,
              <span className="text-rose-500 block">Kiếm Tiền Dễ Dàng!</span>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Khám phá hàng nghìn sản phẩm chất lượng cao. Đặt hàng điện thoại trực tiếp — nhận hàng nhanh, bảo hành chính hãng.
            </p>

            {/* Benefit list */}
            <div className="flex flex-col gap-2.5 mb-6">
              {[
                { icon: "ri-shield-check-line", color: "text-emerald-500", text: "Bảo hành 12 tháng chính hãng" },
                { icon: "ri-truck-line", color: "text-amber-500", text: "Giao hàng toàn quốc, miễn ship" },
                { icon: "ri-exchange-line", color: "text-rose-500", text: "Đổi trả trong 30 ngày" },
                { icon: "ri-medal-line", color: "text-indigo-500", text: "Hoa hồng affiliate lên đến 15%" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2.5">
                  <div className={`w-5 h-5 flex items-center justify-center ${item.color} flex-shrink-0`}>
                    <i className={`${item.icon} text-sm`} />
                  </div>
                  <span className="text-sm text-gray-600">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-2.5">
            <button
              type="button"
              onClick={handleShop}
              className="w-full py-3 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-rose-500 transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
            >
              <i className="ri-smartphone-line" />
              Xem Điện Thoại Ngay
            </button>
            <button
              type="button"
              onClick={close}
              className="w-full py-2.5 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
            >
              Để Sau
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

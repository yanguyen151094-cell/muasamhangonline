import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new URLSearchParams(new FormData(form) as unknown as Record<string, string>);
    fetch("https://readdy.ai/api/form/d6tn5kgq778icnc8uru0", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: data.toString(),
    })
      .then(() => {
        form.reset();
        const btn = form.querySelector("button[type=submit]") as HTMLButtonElement;
        if (btn) { btn.textContent = "Đăng Ký Thành Công!"; btn.disabled = true; }
      })
      .catch(() => {});
  };

  return (
    <footer className="bg-stone-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Logo variant="light" size="md" />
            <p className="text-stone-400 text-sm leading-relaxed mt-4 max-w-xs">
              YamatoShop — Nền tảng mua sắm online nhanh chóng, điện thoại chính hãng, hàng nghìn sản phẩm chất lượng. Tham gia affiliate kiếm hoa hồng lên đến 15%.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {["ri-facebook-fill", "ri-instagram-line", "ri-tiktok-line", "ri-youtube-line"].map((icon, i) => (
                <a key={i} href="#" rel="nofollow"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-stone-800 text-stone-400 hover:bg-rose-500 hover:text-white transition-all cursor-pointer">
                  <i className={`${icon} text-base`} />
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3 mt-4 px-4 py-3 bg-stone-800 rounded-xl">
              <i className="ri-shield-check-line text-emerald-400 text-xl flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white">Bảo Mật SSL / HTTPS</p>
                <p className="text-xs text-stone-400">Thanh toán an toàn 256-bit</p>
              </div>
            </div>
          </div>

          {/* Mua Sắm */}
          <div>
            <h4 className="font-semibold text-sm mb-5 text-white">
              <a href="#shop" className="hover:text-rose-400 transition-colors">Mua Sắm</a>
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Tất Cả Sản Phẩm", to: "/products" },
                { label: "Điện Tử", to: "/products" },
                { label: "Gia Dụng", to: "/products" },
                { label: "Nhà Thông Minh", to: "/products" },
                { label: "Blog & Tin Tức", to: "/blog" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-stone-400 text-sm hover:text-white transition-colors cursor-pointer">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Chính Sách */}
          <div>
            <h4 className="font-semibold text-sm mb-5 text-white">
              <a href="#policy" className="hover:text-rose-400 transition-colors">Hỗ Trợ</a>
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Chính Sách Bảo Mật", to: "/policy" },
                { label: "Chính Sách Đổi Trả", to: "/policy" },
                { label: "Điều Khoản Dịch Vụ", to: "/policy" },
                { label: "Chính Sách Cookie", to: "/policy" },
                { label: "Liên Hệ", to: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-stone-400 text-sm hover:text-white transition-colors cursor-pointer">{item.label}</Link>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="mt-6 pt-5 border-t border-stone-800">
              <h5 className="text-xs font-semibold text-stone-300 mb-3 uppercase tracking-wider">Liên Hệ</h5>
              <div className="space-y-3">
                <a
                  href="tel:0982947645"
                  className="flex items-center gap-2.5 text-stone-400 hover:text-white transition-colors cursor-pointer group"
                >
                  <div className="w-7 h-7 flex items-center justify-center bg-stone-800 rounded-lg group-hover:bg-rose-500 transition-colors flex-shrink-0">
                    <i className="ri-phone-line text-sm" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-500">Điện thoại</p>
                    <p className="text-sm font-semibold">0982.947.645</p>
                  </div>
                </a>
                <a
                  href="https://zalo.me/0982947645"
                  target="_blank"
                  rel="nofollow noopener"
                  className="flex items-center gap-2.5 text-stone-400 hover:text-white transition-colors cursor-pointer group"
                >
                  <div className="w-7 h-7 flex items-center justify-center bg-stone-800 rounded-lg group-hover:bg-green-500 transition-colors flex-shrink-0">
                    <i className="ri-chat-smile-2-line text-sm" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-500">Zalo hỗ trợ</p>
                    <p className="text-sm font-semibold">0982.947.645</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 id="newsletter" className="font-semibold text-sm mb-5 text-white">
              <a href="#newsletter" className="hover:text-rose-400 transition-colors">Nhận Ưu Đãi</a>
            </h4>
            <p className="text-stone-400 text-sm mb-4">Đăng ký nhận thông báo sản phẩm mới và ưu đãi độc quyền.</p>
            <form data-readdy-form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <input
                type="email"
                name="email"
                placeholder="Email của bạn..."
                className="w-full px-4 py-3 bg-stone-800 border border-stone-700 rounded-xl text-sm text-white placeholder-stone-500 focus:outline-none focus:border-rose-500 transition-colors"
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-rose-500 text-white rounded-xl text-sm font-semibold hover:bg-rose-600 transition-colors cursor-pointer whitespace-nowrap"
              >
                Đăng Ký Nhận Ưu Đãi
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-stone-500 text-xs">© 2026 YamatoShop. Tất cả quyền được bảo lưu.</p>
          <div className="flex items-center gap-6">
            {[
              { label: "Chính sách bảo mật", to: "/policy" },
              { label: "Điều khoản dịch vụ", to: "/policy" },
              { label: "Đổi trả", to: "/policy" },
            ].map((item) => (
              <Link key={item.label} to={item.to} className="text-stone-500 text-xs hover:text-stone-300 transition-colors cursor-pointer whitespace-nowrap">{item.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

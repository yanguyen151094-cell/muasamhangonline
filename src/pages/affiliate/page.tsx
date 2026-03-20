import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/feature/Navbar";
import Footer from "../../components/feature/Footer";

const benefits = [
  { icon: "ri-percent-line", title: "Hoa Hồng Cao", desc: "Lên đến 15% hoa hồng cho mỗi đơn hàng thành công. Không giới hạn thu nhập." },
  { icon: "ri-time-line", title: "Thanh Toán Nhanh", desc: "Nhận tiền hoa hồng mỗi tuần qua ngân hàng hoặc ví điện tử." },
  { icon: "ri-bar-chart-2-line", title: "Dashboard Thống Kê", desc: "Theo dõi click, chuyển đổi và thu nhập theo thời gian thực." },
  { icon: "ri-customer-service-2-line", title: "Hỗ Trợ 24/7", desc: "Đội ngũ hỗ trợ affiliate chuyên nghiệp sẵn sàng giải đáp mọi thắc mắc." },
  { icon: "ri-links-line", title: "Link Tùy Chỉnh", desc: "Tạo link tracking riêng cho từng kênh tiếp thị để tối ưu hiệu quả." },
  { icon: "ri-gift-line", title: "Thưởng Thêm", desc: "Nhận thưởng đặc biệt khi đạt milestone doanh thu hàng tháng." },
];

const steps = [
  { num: "01", icon: "ri-user-add-line", title: "Đăng Ký Tài Khoản", desc: "Điền thông tin và đăng ký tài khoản affiliate miễn phí. Phê duyệt trong 24h." },
  { num: "02", icon: "ri-shopping-bag-3-line", title: "Chọn Sản Phẩm", desc: "Duyệt catalog hàng nghìn sản phẩm và chọn sản phẩm phù hợp với audience của bạn." },
  { num: "03", icon: "ri-share-forward-2-line", title: "Chia Sẻ Link", desc: "Lấy link affiliate và chia sẻ trên blog, YouTube, TikTok, Facebook..." },
  { num: "04", icon: "ri-wallet-3-line", title: "Nhận Hoa Hồng", desc: "Khi có người mua qua link của bạn, hoa hồng sẽ tự động cộng vào tài khoản." },
];

const commissions = [
  { category: "Điện Tử", rate: "5-10%", avg: "245,000₫" },
  { category: "Gia Dụng", rate: "8-12%", avg: "180,000₫" },
  { category: "Nhà Thông Minh", rate: "10-15%", avg: "320,000₫" },
  { category: "Máy Tính", rate: "4-6%", avg: "890,000₫" },
];

const testimonials = [
  {
    name: "Phạm Thị Lan",
    role: "Blogger Công Nghệ",
    income: "18,500,000₫",
    text: "Mình kiếm được hơn 18 triệu tháng vừa rồi chỉ từ blog review đồ công nghệ. Chương trình affiliate ở đây cực kỳ uy tín và thanh toán đúng hạn!",
    avatar: "https://readdy.ai/api/search-image?query=vietnamese%20woman%20blogger%20influencer%20smiling%20portrait%20professional%20headshot&width=120&height=120&seq=70&orientation=squarish"
  },
  {
    name: "Nguyễn Hải Nam",
    role: "YouTuber",
    income: "32,000,000₫",
    text: "Kênh YouTube review sản phẩm của mình đạt 200k sub và affiliate là nguồn thu chính. Hoa hồng cao, tracking chính xác, cực kỳ hài lòng!",
    avatar: "https://readdy.ai/api/search-image?query=vietnamese%20man%20youtuber%20content%20creator%20smiling%20portrait%20headshot&width=120&height=120&seq=71&orientation=squarish"
  },
  {
    name: "Trần Anh Khoa",
    role: "TikToker",
    income: "9,200,000₫",
    text: "Mới bắt đầu 2 tháng mà đã kiếm được gần 10 triệu. Dashboard rất dễ dùng, thấy rõ link nào hiệu quả để tập trung vào đó.",
    avatar: "https://readdy.ai/api/search-image?query=young%20vietnamese%20man%20tiktok%20content%20creator%20smiling%20friendly%20portrait&width=120&height=120&seq=72&orientation=squarish"
  },
];

export default function Affiliate() {
  const [formData, setFormData] = useState({ name: "", email: "", website: "", audience: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => body.append(key, value));
    try {
      await fetch("https://readdy.ai/api/form/d6tmc6lm9vk3c28i5lb0", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
    } catch (err) {
      console.error("Form submission error:", err);
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=abstract%20flowing%20lines%20geometric%20pattern%20dark%20charcoal%20background%20elegant%20minimal%20luxury&width=1440&height=600&seq=300&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-top opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white/80 text-sm mb-6">
            <i className="ri-medal-line text-amber-400" />
            Chương Trình Tiếp Thị Liên Kết #1 Việt Nam
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Kiếm Thu Nhập
            <span className="block font-light italic text-rose-400">Không Giới Hạn</span>
            Cùng Chúng Tôi
          </h1>
          <p className="text-stone-400 text-lg max-w-xl mx-auto mb-10">
            Tham gia cộng đồng 15,000+ affiliate đang kiếm hoa hồng từ 5% đến 15% mỗi đơn hàng thành công.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-rose-500 text-white rounded-full font-bold text-base hover:bg-rose-600 transition-all cursor-pointer whitespace-nowrap"
            >
              <i className="ri-user-add-line" />
              Đăng Ký Ngay - Miễn Phí
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/30 text-white rounded-full font-semibold text-base hover:bg-white/20 transition-all cursor-pointer whitespace-nowrap"
            >
              Tìm Hiểu Thêm
              <i className="ri-arrow-down-line" />
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto">
            {[
              { value: "15,000+", label: "Đối Tác Affiliate" },
              { value: "₫2.5 Tỷ+", label: "Hoa Hồng Đã Trả" },
              { value: "50,000+", label: "Sản Phẩm" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-stone-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-rose-500 text-sm font-semibold uppercase tracking-widest">Lợi Ích</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Tại Sao Chọn Chúng Tôi?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="bg-stone-50 rounded-2xl p-7 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-rose-100 rounded-xl mb-4">
                  <i className={`${b.icon} text-xl text-rose-500`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-rose-500 text-sm font-semibold uppercase tracking-widest">Quy Trình</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Cách Thức Hoạt Động</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6 mb-10 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 flex items-center justify-center bg-rose-500 text-white rounded-2xl font-bold text-lg flex-shrink-0">
                    {step.num}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex-1 w-0.5 bg-rose-100 mt-3 min-h-8" />
                  )}
                </div>
                <div className="pt-2 pb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <i className={`${step.icon} text-rose-500 text-xl`} />
                    <h3 className="font-bold text-gray-900 text-lg">{step.title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Table */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-rose-500 text-sm font-semibold uppercase tracking-widest">Hoa Hồng</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Bảng Hoa Hồng Theo Danh Mục</h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-3 bg-stone-900 text-white px-6 py-4">
                <span className="text-sm font-semibold">Danh Mục</span>
                <span className="text-sm font-semibold text-center">Hoa Hồng</span>
                <span className="text-sm font-semibold text-right">Thu Nhập TB/Đơn</span>
              </div>
              {commissions.map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-3 px-6 py-4 items-center ${i % 2 === 0 ? "bg-white" : "bg-stone-50"}`}
                >
                  <span className="font-medium text-gray-900 text-sm">{row.category}</span>
                  <span className="text-center">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">{row.rate}</span>
                  </span>
                  <span className="text-right text-sm font-semibold text-gray-700">{row.avg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-rose-500 text-sm font-semibold uppercase tracking-widest">Thành Công</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Câu Chuyện Thành Công</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-gray-100">
                <div className="flex items-center gap-4 mb-5">
                  <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full object-cover object-top flex-shrink-0" />
                  <div>
                    <div className="font-bold text-gray-900">{t.name}</div>
                    <div className="text-gray-400 text-xs">{t.role}</div>
                    <div className="text-rose-500 font-bold text-sm mt-0.5">{t.income}/tháng</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-0.5 mt-4">
                  {[1,2,3,4,5].map((s) => (
                    <i key={s} className="ri-star-fill text-amber-400 text-xs" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Register Form */}
      <section id="register" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-rose-500 text-sm font-semibold uppercase tracking-widest">Đăng Ký</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">Bắt Đầu Ngay Hôm Nay</h2>
              <p className="text-gray-500 text-sm mt-2">Hoàn toàn miễn phí. Phê duyệt trong 24 giờ.</p>
            </div>
            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-10 text-center">
                <i className="ri-checkbox-circle-line text-5xl text-emerald-500 block mb-4" />
                <h3 className="text-xl font-bold text-emerald-700 mb-2">Đăng Ký Thành Công!</h3>
                <p className="text-emerald-600 text-sm">Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ qua email.</p>
              </div>
            ) : (
              <form
                data-readdy-form
                id="affiliate-register-form"
                onSubmit={handleSubmit}
                className="bg-stone-50 rounded-2xl p-8 flex flex-col gap-5"
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Họ và Tên *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-gray-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-gray-400 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Website / Kênh Mạng Xã Hội</label>
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://yourblog.com hoặc @yourhandle"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-gray-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Quy Mô Audience</label>
                  <select
                    name="audience"
                    value={formData.audience}
                    onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-gray-400 transition-colors cursor-pointer appearance-none"
                  >
                    <option value="">Chọn quy mô</option>
                    <option value="under-1k">Dưới 1,000 người theo dõi</option>
                    <option value="1k-10k">1,000 - 10,000 người</option>
                    <option value="10k-100k">10,000 - 100,000 người</option>
                    <option value="over-100k">Trên 100,000 người</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-rose-500 text-white rounded-xl font-bold text-base hover:bg-rose-600 transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                >
                  <i className="ri-medal-line" />
                  Đăng Ký Tham Gia Affiliate
                </button>
                <p className="text-center text-gray-400 text-xs">
                  Bằng cách đăng ký, bạn đồng ý với{" "}
                  <a href="#" rel="nofollow" className="text-gray-600 underline cursor-pointer">Điều khoản dịch vụ</a> của chúng tôi.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

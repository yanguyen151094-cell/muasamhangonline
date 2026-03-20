import { useState } from "react";
import Navbar from "../../components/feature/Navbar";
import Footer from "../../components/feature/Footer";

const contactInfo = [
  { icon: "ri-map-pin-2-line", label: "Địa Chỉ", value: "123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh" },
  { icon: "ri-phone-line", label: "Điện Thoại", value: "1800 123 456 (Miễn phí)" },
  { icon: "ri-mail-line", label: "Email", value: "support@shopaffiliate.vn" },
  { icon: "ri-time-line", label: "Giờ Làm Việc", value: "Thứ 2 - Thứ 7, 8:00 - 18:00" },
];

const faqs = [
  { q: "Tôi có thể đổi trả sản phẩm không?", a: "Có, chúng tôi hỗ trợ đổi trả trong vòng 30 ngày nếu sản phẩm lỗi từ nhà sản xuất." },
  { q: "Thời gian giao hàng mất bao lâu?", a: "Nội thành TP.HCM và Hà Nội: 1-2 ngày. Các tỉnh khác: 2-5 ngày làm việc." },
  { q: "Làm thế nào để tham gia chương trình affiliate?", a: "Đăng ký tài khoản affiliate miễn phí tại trang Affiliate, phê duyệt trong 24h." },
  { q: "Hoa hồng affiliate được thanh toán như thế nào?", a: "Thanh toán hàng tuần qua chuyển khoản ngân hàng hoặc ví MoMo/ZaloPay." },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Page Header */}
      <div className="pt-28 pb-14 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-rose-500 text-sm font-semibold uppercase tracking-widest">Liên Hệ</span>
          <h1 className="text-4xl font-bold text-gray-900 mt-2">Chúng Tôi Luôn Lắng Nghe</h1>
          <p className="text-gray-500 mt-3 max-w-md mx-auto text-sm">
            Có câu hỏi về sản phẩm, đơn hàng hay chương trình affiliate? Hãy liên hệ với chúng tôi!
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Gửi Tin Nhắn</h2>
            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-10 text-center">
                <i className="ri-checkbox-circle-line text-5xl text-emerald-500 block mb-4" />
                <h3 className="text-xl font-bold text-emerald-700 mb-2">Gửi Thành Công!</h3>
                <p className="text-emerald-600 text-sm">
                  Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi trong vòng 24 giờ.
                </p>
              </div>
            ) : (
              <form
                data-readdy-form
                id="contact-form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Họ Và Tên *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-400 transition-colors"
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-400 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Chủ Đề</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-400 transition-colors cursor-pointer appearance-none bg-white"
                  >
                    <option value="">Chọn chủ đề</option>
                    <option value="order">Đơn Hàng / Giao Hàng</option>
                    <option value="product">Thông Tin Sản Phẩm</option>
                    <option value="affiliate">Chương Trình Affiliate</option>
                    <option value="return">Đổi Trả / Hoàn Tiền</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Tin Nhắn *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={(e) => {
                      if (e.target.value.length <= 500) {
                        setFormData({ ...formData, message: e.target.value });
                      }
                    }}
                    placeholder="Nhập nội dung tin nhắn..."
                    required
                    rows={5}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-400 transition-colors resize-none"
                  />
                  <p className="text-xs text-gray-400 mt-1 text-right">{formData.message.length}/500 ký tự</p>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-gray-700 transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <i className="ri-loader-4-line animate-spin" />
                      Đang Gửi...
                    </>
                  ) : (
                    <>
                      <i className="ri-send-plane-2-line" />
                      Gửi Tin Nhắn
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Thông Tin Liên Hệ</h2>
            <div className="bg-stone-50 rounded-2xl p-7 mb-6">
              <div className="flex flex-col gap-5">
                {contactInfo.map((info, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-rose-100 rounded-xl flex-shrink-0">
                      <i className={`${info.icon} text-rose-500`} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{info.label}</div>
                      <div className="text-sm font-medium text-gray-900 mt-0.5">{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Mạng Xã Hội</div>
                <div className="flex items-center gap-3">
                  {[
                    { icon: "ri-facebook-fill", label: "Facebook" },
                    { icon: "ri-instagram-line", label: "Instagram" },
                    { icon: "ri-tiktok-line", label: "TikTok" },
                    { icon: "ri-youtube-line", label: "YouTube" },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href="#"
                      rel="nofollow"
                      title={social.label}
                      className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all cursor-pointer"
                    >
                      <i className={`${social.icon} text-base`} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 mb-6" style={{ height: "220px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241674197354!2d106.69965367465745!3d10.77799458934168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4670702e31%3A0xa5777fb3a4d760a1!2zMTIzIE5ndXnhu4VuIEh14buHLCBC4bq_biBOZ2jDqSwgUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1710000000000!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Google Maps Location"
              />
            </div>

            {/* FAQ */}
            <h2 className="text-xl font-bold text-gray-900 mb-4">Câu Hỏi Thường Gặp</h2>
            <div className="flex flex-col gap-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-stone-50 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
                  >
                    <span className="font-semibold text-sm text-gray-900">{faq.q}</span>
                    <i className={`ri-arrow-${openFaq === i ? "up" : "down"}-s-line text-gray-400 flex-shrink-0 ml-3`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4">
                      <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

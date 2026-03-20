import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/feature/Navbar";
import Footer from "../../components/feature/Footer";

type PolicyTab = "privacy" | "return" | "terms" | "cookie";

const policyTabs: { id: PolicyTab; label: string; icon: string }[] = [
  { id: "privacy", label: "Chính Sách Bảo Mật", icon: "ri-shield-user-line" },
  { id: "return", label: "Chính Sách Đổi Trả", icon: "ri-loop-left-line" },
  { id: "terms", label: "Điều Khoản Dịch Vụ", icon: "ri-file-text-line" },
  { id: "cookie", label: "Chính Sách Cookie", icon: "ri-cookie-line" },
];

export default function PolicyPage() {
  const [activeTab, setActiveTab] = useState<PolicyTab>("privacy");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-12 bg-stone-50 border-b border-stone-100">
        <div className="max-w-5xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-5">
            <Link to="/" className="hover:text-gray-700 transition-colors cursor-pointer">Trang Chủ</Link>
            <i className="ri-arrow-right-s-line" />
            <span className="text-gray-600">Chính Sách</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Chính Sách & Điều Khoản</h1>
          <p className="text-gray-500 text-sm max-w-2xl">
            ShopAffiliate cam kết minh bạch và bảo vệ quyền lợi của khách hàng. Hãy đọc kỹ các chính sách sau để hiểu rõ quyền lợi và trách nhiệm của bạn.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex gap-10">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="sticky top-28 flex flex-col gap-1">
              {policyTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all cursor-pointer w-full ${
                    activeTab === tab.id ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <i className={`${tab.icon} text-base`} />
                  {tab.label}
                </button>
              ))}
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {activeTab === "privacy" && <PrivacyPolicy />}
            {activeTab === "return" && <ReturnPolicy />}
            {activeTab === "terms" && <TermsPolicy />}
            {activeTab === "cookie" && <CookiePolicy />}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h4 id={title} className="text-base font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">
        <a href={`#${title}`} className="hover:text-rose-500 transition-colors">{title}</a>
      </h4>
      <div className="text-gray-600 text-sm leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

function PrivacyPolicy() {
  return (
    <article>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 flex items-center justify-center bg-rose-50 rounded-xl">
          <i className="ri-shield-user-line text-rose-500 text-xl" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Chính Sách Bảo Mật</h2>
          <p className="text-xs text-gray-400">Cập nhật lần cuối: 19/03/2026</p>
        </div>
      </div>

      <SectionBlock title="1. Thông Tin Chúng Tôi Thu Thập">
        <p>ShopAffiliate thu thập thông tin cá nhân khi bạn đăng ký tài khoản, đặt hàng hoặc tham gia chương trình affiliate, bao gồm:</p>
        <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
          <li>Họ tên, địa chỉ email, số điện thoại</li>
          <li>Địa chỉ giao hàng và thông tin thanh toán</li>
          <li>Lịch sử mua hàng và hoạt động trên website</li>
          <li>Thông tin thiết bị và địa chỉ IP</li>
        </ul>
      </SectionBlock>

      <SectionBlock title="2. Mục Đích Sử Dụng Thông Tin">
        <p>Chúng tôi sử dụng thông tin để xử lý đơn hàng, cải thiện dịch vụ, gửi thông báo ưu đãi (nếu bạn đồng ý), và đảm bảo bảo mật tài khoản. Chúng tôi <strong>không bán</strong> thông tin cá nhân của bạn cho bên thứ ba.</p>
      </SectionBlock>

      <SectionBlock title="3. Bảo Mật Dữ Liệu">
        <p>Toàn bộ dữ liệu được mã hóa bằng công nghệ SSL/HTTPS 256-bit. Thông tin thẻ tín dụng được xử lý trực tiếp bởi các cổng thanh toán uy tín (MoMo, ZaloPay, Visa/MasterCard) và không được lưu trữ trên hệ thống của chúng tôi.</p>
      </SectionBlock>

      <SectionBlock title="4. Quyền Của Bạn">
        <p>Bạn có quyền truy cập, chỉnh sửa, hoặc xóa thông tin cá nhân của mình bất kỳ lúc nào. Liên hệ <strong>privacy@shopaffiliate.vn</strong> để thực hiện yêu cầu.</p>
      </SectionBlock>

      <SectionBlock title="5. Liên Hệ">
        <p>Nếu có câu hỏi về chính sách bảo mật, vui lòng liên hệ: <strong>privacy@shopaffiliate.vn</strong> hoặc gọi <strong>1800 6789</strong>.</p>
      </SectionBlock>
    </article>
  );
}

function ReturnPolicy() {
  return (
    <article>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 flex items-center justify-center bg-sky-50 rounded-xl">
          <i className="ri-loop-left-line text-sky-500 text-xl" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Chính Sách Đổi Trả & Hoàn Tiền</h2>
          <p className="text-xs text-gray-400">Cập nhật lần cuối: 19/03/2026</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { icon: "ri-time-line", title: "30 Ngày", desc: "Đổi trả tự do" },
          { icon: "ri-shield-check-line", title: "100%", desc: "Hoàn tiền nếu lỗi hàng" },
          { icon: "ri-truck-line", title: "Miễn Phí", desc: "Ship đổi hàng lần đầu" },
        ].map((item) => (
          <div key={item.title} className="text-center p-4 bg-sky-50 rounded-xl">
            <i className={`${item.icon} text-2xl text-sky-500 block mb-2`} />
            <p className="font-bold text-gray-900 text-sm">{item.title}</p>
            <p className="text-gray-500 text-xs">{item.desc}</p>
          </div>
        ))}
      </div>

      <SectionBlock title="1. Điều Kiện Đổi Trả">
        <p>Sản phẩm được chấp nhận đổi/trả trong vòng <strong>30 ngày</strong> kể từ ngày nhận hàng nếu:</p>
        <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
          <li>Sản phẩm bị lỗi kỹ thuật, không hoạt động</li>
          <li>Giao sai sản phẩm, sai màu/kích thước so với đơn hàng</li>
          <li>Hàng hóa bị hư hỏng trong quá trình vận chuyển</li>
          <li>Sản phẩm không đúng mô tả trên website</li>
        </ul>
      </SectionBlock>

      <SectionBlock title="2. Quy Trình Đổi Trả">
        <p>Bước 1: Liên hệ hotline <strong>1800 6789</strong> hoặc email <strong>support@shopaffiliate.vn</strong> trong vòng 30 ngày.</p>
        <p>Bước 2: Cung cấp mã đơn hàng và hình ảnh/video mô tả lỗi.</p>
        <p>Bước 3: Đội ngũ sẽ xác nhận trong 24 giờ làm việc.</p>
        <p>Bước 4: Gửi hàng về kho (miễn phí nếu lỗi từ nhà sản xuất/vận chuyển).</p>
        <p>Bước 5: Đổi hàng mới hoặc hoàn tiền trong 3-5 ngày làm việc.</p>
      </SectionBlock>

      <SectionBlock title="3. Chính Sách Hoàn Tiền">
        <p>Hoàn tiền 100% qua phương thức thanh toán ban đầu trong vòng 3-7 ngày làm việc. Đối với thanh toán COD, hoàn tiền qua chuyển khoản ngân hàng.</p>
      </SectionBlock>

      <SectionBlock title="4. Trường Hợp Không Được Đổi Trả">
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Sản phẩm đã qua sử dụng, không còn nguyên vẹn</li>
          <li>Không còn đầy đủ phụ kiện, hộp đựng, hóa đơn</li>
          <li>Lỗi do người dùng (rơi vỡ, ngấm nước)</li>
          <li>Quá 30 ngày kể từ ngày nhận hàng</li>
        </ul>
      </SectionBlock>
    </article>
  );
}

function TermsPolicy() {
  return (
    <article>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 flex items-center justify-center bg-amber-50 rounded-xl">
          <i className="ri-file-text-line text-amber-500 text-xl" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Điều Khoản Dịch Vụ</h2>
          <p className="text-xs text-gray-400">Cập nhật lần cuối: 19/03/2026</p>
        </div>
      </div>

      <SectionBlock title="1. Điều Khoản Chung">
        <p>Khi sử dụng ShopAffiliate, bạn đồng ý tuân thủ các điều khoản này. Chúng tôi có quyền cập nhật điều khoản bất cứ lúc nào và sẽ thông báo cho bạn qua email đã đăng ký.</p>
      </SectionBlock>

      <SectionBlock title="2. Điều Kiện Tham Gia Affiliate">
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Phải từ 18 tuổi trở lên và có tài khoản ngân hàng hợp lệ</li>
          <li>Không được sử dụng phương pháp quảng cáo gian lận</li>
          <li>Không được giả mạo nhấp chuột hoặc tạo đơn hàng ảo</li>
          <li>Vi phạm sẽ dẫn đến khóa tài khoản và không thanh toán hoa hồng</li>
        </ul>
      </SectionBlock>

      <SectionBlock title="3. Thanh Toán Hoa Hồng Affiliate">
        <p>Hoa hồng được tính trên giá trị đơn hàng thực tế (sau chiết khấu) và thanh toán vào thứ Sáu hàng tuần. Hoa hồng tối thiểu để rút là 100.000₫. Đơn hàng bị hủy hoặc hoàn trả sẽ không tính hoa hồng.</p>
      </SectionBlock>

      <SectionBlock title="4. Sở Hữu Trí Tuệ">
        <p>Toàn bộ nội dung, hình ảnh và thương hiệu trên ShopAffiliate thuộc sở hữu của chúng tôi. Nghiêm cấm sao chép, phân phối nội dung mà không có sự cho phép bằng văn bản.</p>
      </SectionBlock>
    </article>
  );
}

function CookiePolicy() {
  return (
    <article>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 flex items-center justify-center bg-emerald-50 rounded-xl">
          <i className="ri-cookie-line text-emerald-500 text-xl" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Chính Sách Cookie</h2>
          <p className="text-xs text-gray-400">Cập nhật lần cuối: 19/03/2026</p>
        </div>
      </div>

      <SectionBlock title="1. Cookie Là Gì?">
        <p>Cookie là các tệp văn bản nhỏ được lưu trên thiết bị của bạn khi truy cập website. Chúng giúp chúng tôi nhớ thông tin về bạn để cải thiện trải nghiệm sử dụng.</p>
      </SectionBlock>

      <SectionBlock title="2. Loại Cookie Chúng Tôi Sử Dụng">
        <div className="space-y-3">
          {[
            { name: "Cookie Bắt Buộc", desc: "Cần thiết để website hoạt động (đăng nhập, giỏ hàng). Không thể tắt." },
            { name: "Cookie Phân Tích", desc: "Google Analytics theo dõi lưu lượng truy cập ẩn danh." },
            { name: "Cookie Tiếp Thị", desc: "Theo dõi link affiliate và hiển thị quảng cáo phù hợp." },
            { name: "Cookie Chức Năng", desc: "Lưu tùy chọn ngôn ngữ, giao diện của bạn." },
          ].map((c) => (
            <div key={c.name} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
              <i className="ri-cookie-line text-emerald-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 text-xs">{c.name}</p>
                <p className="text-gray-500 text-xs mt-0.5">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock title="3. Quản Lý Cookie">
        <p>Bạn có thể tắt cookie trong cài đặt trình duyệt. Tuy nhiên, một số tính năng website có thể không hoạt động đúng nếu tắt cookie bắt buộc. Để kiểm soát cookie tiếp thị, liên hệ <strong>privacy@shopaffiliate.vn</strong>.</p>
      </SectionBlock>
    </article>
  );
}

import { useState, useRef } from "react";
import { saveOrder } from "../../../utils/orderStorage";

interface OrderPhoneModalProps {
  productName?: string;
  productPrice?: number;
  onClose: () => void;
}

const ZALO_NUMBER = "0862261095";
const ZALO_DISPLAY = "0862.261.095";
const ZALO_URL = `https://zalo.me/${ZALO_NUMBER}`;

export default function OrderPhoneModal({ productName, productPrice, onClose }: OrderPhoneModalProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [tab, setTab] = useState<"form" | "zalo">("zalo");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const body = new URLSearchParams(formData as unknown as Record<string, string>);

    const customerName = (formData.get("ho_ten") as string) || "";
    const phone = (formData.get("so_dien_thoai") as string) || "";
    const address = (formData.get("dia_chi") as string) || "";
    const notes = (formData.get("ghi_chu") as string) || "";

    try {
      await fetch("https://readdy.ai/api/form/d6tu6fv5ehaffuo432t0", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      saveOrder({
        productName: productName || "Sản phẩm điện thoại",
        productPrice: productPrice || 0,
        customerName,
        phone,
        address,
        notes,
      });

      setStatus("success");
      formRef.current?.reset();
    } catch {
      setStatus("error");
    }
  };

  const openZalo = () => {
    window.open(ZALO_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      style={{ background: "rgba(0,0,0,0.55)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md overflow-hidden" style={{ maxHeight: "92vh", overflowY: "auto" }}>

        {/* ── Header ── */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
          <div>
            <h2 className="text-white font-bold text-sm sm:text-base">Đặt Hàng Trực Tiếp</h2>
            <p className="text-white/60 text-xs mt-0.5">Giao hàng toàn quốc • Bảo hành 12 tháng</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-lg" />
          </button>
        </div>

        <div className="p-4 sm:p-6">

          {/* ── Product info ── */}
          {productName && (
            <div className="bg-rose-50 rounded-xl p-3 flex items-center gap-3 mb-4">
              <div className="w-8 h-8 flex items-center justify-center text-rose-500 flex-shrink-0">
                <i className="ri-smartphone-line text-xl" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-rose-500 font-semibold">Sản phẩm đã chọn</p>
                <p className="text-sm font-semibold text-gray-900 truncate">{productName}</p>
                {productPrice != null && productPrice > 0 && (
                  <p className="text-xs text-rose-600 font-bold">{productPrice.toLocaleString("vi-VN")}₫</p>
                )}
              </div>
            </div>
          )}

          {/* ── Success screen ── */}
          {status === "success" ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 flex items-center justify-center bg-emerald-100 rounded-full mx-auto mb-3">
                <i className="ri-check-double-line text-3xl text-emerald-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Đặt Hàng Thành Công!</h3>
              <p className="text-gray-500 text-sm mb-5">Đơn đã ghi nhận. Nhắn Zalo ngay để xác nhận và giao hàng nhanh hơn!</p>

              <a
                href={ZALO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 bg-[#0068FF] hover:bg-[#0055cc] text-white rounded-xl font-bold text-base transition-colors cursor-pointer mb-3"
              >
                <div className="w-7 h-7 flex items-center justify-center">
                  <i className="ri-chat-smile-3-fill text-2xl" />
                </div>
                Nhắn Zalo {ZALO_DISPLAY}
              </a>
              <p className="text-xs text-gray-400 mb-4">Hoặc gọi điện để được hỗ trợ ngay</p>
              <a
                href={`tel:${ZALO_NUMBER}`}
                className="flex items-center justify-center gap-2 w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-semibold text-sm transition-colors cursor-pointer mb-4"
              >
                <i className="ri-phone-line" /> Gọi {ZALO_DISPLAY}
              </a>
              <button
                onClick={onClose}
                className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer underline"
              >
                Đóng
              </button>
            </div>
          ) : (
            <>
              {/* ── Tab switcher ── */}
              <div className="flex rounded-xl bg-gray-100 p-1 mb-4">
                <button
                  type="button"
                  onClick={() => setTab("zalo")}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5 ${tab === "zalo" ? "bg-[#0068FF] text-white" : "text-gray-500 hover:text-gray-700"}`}
                >
                  <i className="ri-chat-smile-3-fill" />
                  Nhắn Zalo
                </button>
                <button
                  type="button"
                  onClick={() => setTab("form")}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5 ${tab === "form" ? "bg-white text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
                >
                  <i className="ri-file-list-3-line" />
                  Điền Form
                </button>
              </div>

              {/* ── Tab: Zalo ── */}
              {tab === "zalo" && (
                <div className="flex flex-col gap-3">
                  <div className="bg-[#0068FF]/8 border border-[#0068FF]/20 rounded-2xl p-4 text-center">
                    <div className="w-12 h-12 flex items-center justify-center bg-[#0068FF] rounded-2xl mx-auto mb-2">
                      <i className="ri-chat-smile-3-fill text-white text-2xl" />
                    </div>
                    <p className="text-gray-900 font-bold text-sm mb-0.5">Zalo YamatoShop</p>
                    <p className="text-[#0068FF] font-extrabold text-xl mb-1">{ZALO_DISPLAY}</p>
                    <p className="text-gray-500 text-xs">Phản hồi trong vài phút • 8:00 – 22:00</p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3 flex flex-col gap-2.5">
                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Cách đặt hàng qua Zalo</p>
                    {[
                      { n: "1", text: `Bấm "Mở Zalo" bên dưới` },
                      { n: "2", text: `Nhắn tên sản phẩm${productName ? `: "${productName}"` : " muốn mua"}` },
                      { n: "3", text: "Cung cấp địa chỉ giao hàng" },
                      { n: "4", text: "Xác nhận đơn & thanh toán khi nhận hàng" },
                    ].map((s) => (
                      <div key={s.n} className="flex items-start gap-2.5">
                        <span className="w-5 h-5 flex items-center justify-center bg-[#0068FF] text-white text-xs font-bold rounded-full flex-shrink-0 mt-0.5">{s.n}</span>
                        <p className="text-xs text-gray-600">{s.text}</p>
                      </div>
                    ))}
                  </div>

                  <a
                    href={ZALO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-4 bg-[#0068FF] hover:bg-[#0055cc] text-white rounded-xl font-bold text-base transition-colors cursor-pointer"
                  >
                    <i className="ri-chat-smile-3-fill text-xl" />
                    Mở Zalo Chat Ngay
                  </a>

                  <a
                    href={`tel:${ZALO_NUMBER}`}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-semibold text-sm transition-colors cursor-pointer"
                  >
                    <i className="ri-phone-line" />
                    Gọi Điện: {ZALO_DISPLAY}
                  </a>

                  <p className="text-center text-xs text-gray-400">
                    Muốn để lại thông tin?{" "}
                    <button type="button" onClick={() => setTab("form")} className="text-gray-700 font-semibold underline cursor-pointer">Điền form tại đây</button>
                  </p>
                </div>
              )}

              {/* ── Tab: Form ── */}
              {tab === "form" && (
                <form ref={formRef} data-readdy-form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input type="hidden" name="san_pham" value={productName || ""} />

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Họ và Tên <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      name="ho_ten"
                      placeholder="Nhập họ và tên của bạn"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-900 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Số Điện Thoại <span className="text-rose-500">*</span></label>
                    <input
                      type="tel"
                      name="so_dien_thoai"
                      placeholder="Số điện thoại liên hệ"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-900 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Địa Chỉ Giao Hàng <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      name="dia_chi"
                      placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-900 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Ghi Chú</label>
                    <textarea
                      name="ghi_chu"
                      placeholder="Màu sắc, phiên bản, yêu cầu khác..."
                      rows={2}
                      maxLength={500}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-900 transition-colors resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 bg-blue-50 rounded-xl px-3 py-2.5">
                    <div className="w-5 h-5 flex items-center justify-center text-[#0068FF] flex-shrink-0">
                      <i className="ri-chat-smile-3-fill text-base" />
                    </div>
                    <p className="text-xs text-blue-700">Sau khi gửi, chúng tôi liên hệ qua <strong>Zalo {ZALO_DISPLAY}</strong> trong 30 phút</p>
                  </div>

                  {status === "error" && (
                    <p className="text-xs text-rose-500 text-center">Gửi thất bại — vui lòng thử lại hoặc nhắn Zalo trực tiếp.</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-4 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-700 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-60"
                  >
                    {status === "submitting" ? (
                      <span className="flex items-center justify-center gap-2">
                        <i className="ri-loader-4-line animate-spin" /> Đang gửi...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <i className="ri-shopping-bag-3-line" /> Xác Nhận Đặt Hàng
                      </span>
                    )}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

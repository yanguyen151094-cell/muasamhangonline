import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/feature/Navbar";
import Footer from "../../components/feature/Footer";
import { useCart } from "../../context/CartContext";

type PaymentMethod = "momo" | "zalopay" | "visa" | "mastercard" | "cod";

interface OrderInfo {
  name: string;
  phone: string;
  address: string;
  city: string;
  note: string;
}

export default function PaymentPage() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("momo");
  const [step, setStep] = useState<"info" | "payment" | "success">("info");
  const [processing, setProcessing] = useState(false);
  const [orderInfo, setOrderInfo] = useState<OrderInfo>({
    name: "", phone: "", address: "", city: "", note: ""
  });
  const [cardInfo, setCardInfo] = useState({ number: "", expiry: "", cvv: "", holder: "" });
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const shippingFee = total >= 500000 ? 0 : 30000;
  const finalTotal = total + shippingFee;

  const paymentMethods: { id: PaymentMethod; label: string; icon: string; color: string; desc: string }[] = [
    { id: "momo", label: "Ví MoMo", icon: "ri-wallet-3-line", color: "#ae2070", desc: "Thanh toán qua ví điện tử MoMo" },
    { id: "zalopay", label: "ZaloPay", icon: "ri-secure-payment-line", color: "#0068ff", desc: "Thanh toán qua ví ZaloPay" },
    { id: "visa", label: "Thẻ Visa", icon: "ri-visa-line", color: "#1a1f71", desc: "Thẻ Visa / Debit" },
    { id: "mastercard", label: "MasterCard", icon: "ri-mastercard-line", color: "#eb001b", desc: "Thẻ MasterCard / Credit" },
    { id: "cod", label: "Thanh Toán COD", icon: "ri-cash-line", color: "#16a34a", desc: "Trả tiền mặt khi nhận hàng" },
  ];

  if (items.length === 0 && step !== "success") {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <i className="ri-shopping-cart-line text-5xl text-gray-200 block mb-4" />
            <h2 className="text-xl font-bold text-gray-700 mb-2">Giỏ hàng trống</h2>
            <p className="text-gray-400 text-sm mb-6">Hãy thêm sản phẩm trước khi thanh toán</p>
            <Link to="/products" className="px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-semibold cursor-pointer whitespace-nowrap">
              Khám Phá Sản Phẩm
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setProcessing(false);
    setStep("success");
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (step === "success") {
    const orderCode = `SA${Date.now().toString().slice(-8)}`;
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-24 px-6">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-checkbox-circle-fill text-5xl text-emerald-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Đặt Hàng Thành Công!</h1>
            <p className="text-gray-500 text-sm mb-6">Đơn hàng <strong className="text-gray-900">#{orderCode}</strong> của bạn đã được xác nhận. Chúng tôi sẽ giao hàng trong 2-5 ngày làm việc.</p>

            <div className="bg-gray-50 rounded-2xl p-5 mb-6 text-left">
              <div className="flex justify-between text-sm mb-3">
                <span className="text-gray-500">Tổng tiền hàng</span>
                <span className="font-medium">{total.toLocaleString("vi-VN")}₫</span>
              </div>
              <div className="flex justify-between text-sm mb-3">
                <span className="text-gray-500">Phí vận chuyển</span>
                <span className={shippingFee === 0 ? "text-emerald-600 font-medium" : "font-medium"}>{shippingFee === 0 ? "Miễn phí" : `${shippingFee.toLocaleString("vi-VN")}₫`}</span>
              </div>
              <div className="flex justify-between text-sm pt-3 border-t border-gray-200">
                <span className="font-bold text-gray-900">Tổng thanh toán</span>
                <span className="font-bold text-rose-600 text-lg">{finalTotal.toLocaleString("vi-VN")}₫</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link to="/" className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-semibold text-sm cursor-pointer whitespace-nowrap text-center">
                Về Trang Chủ
              </Link>
              <Link to="/products" className="w-full py-3.5 border border-gray-200 text-gray-700 rounded-xl font-semibold text-sm cursor-pointer whitespace-nowrap text-center">
                Tiếp Tục Mua Sắm
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">
        {/* Steps */}
        <div className="flex items-center justify-center gap-0 mb-12">
          {["Thông Tin", "Thanh Toán", "Xác Nhận"].map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                (i === 0 && step === "info") || (i === 1 && step === "payment") || (i === 2 && step === "success")
                  ? "bg-gray-900 text-white"
                  : (i === 0 && step !== "info") ? "text-emerald-600 bg-emerald-50"
                  : "text-gray-400"
              }`}>
                <span className={`w-5 h-5 rounded-full text-xs flex items-center justify-center ${
                  (i === 0 && step !== "info") ? "bg-emerald-500 text-white" : "bg-current/20"
                }`}>
                  {i === 0 && step !== "info" ? <i className="ri-check-line" /> : i + 1}
                </span>
                {s}
              </div>
              {i < 2 && <div className="w-12 h-px bg-gray-200 mx-1" />}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Form */}
          <div className="md:col-span-2">
            {step === "info" ? (
              <form onSubmit={handleInfoSubmit}>
                <div className="bg-white rounded-2xl p-8 mb-6">
                  <h2 className="font-bold text-gray-900 text-lg mb-6">Thông Tin Giao Hàng</h2>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Họ và Tên <span className="text-rose-500">*</span></label>
                      <input required value={orderInfo.name} onChange={(e) => setOrderInfo({ ...orderInfo, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-400 transition-colors" placeholder="Nguyễn Văn A" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Số Điện Thoại <span className="text-rose-500">*</span></label>
                      <input required type="tel" value={orderInfo.phone} onChange={(e) => setOrderInfo({ ...orderInfo, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-400 transition-colors" placeholder="0901234567" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Địa Chỉ <span className="text-rose-500">*</span></label>
                      <input required value={orderInfo.address} onChange={(e) => setOrderInfo({ ...orderInfo, address: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-400 transition-colors" placeholder="Số nhà, tên đường, phường/xã" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tỉnh / Thành Phố <span className="text-rose-500">*</span></label>
                      <select required value={orderInfo.city} onChange={(e) => setOrderInfo({ ...orderInfo, city: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-400 transition-colors bg-white cursor-pointer">
                        <option value="">Chọn tỉnh thành...</option>
                        {["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ", "Nha Trang", "Huế", "Biên Hòa"].map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ghi Chú</label>
                      <input value={orderInfo.note} onChange={(e) => setOrderInfo({ ...orderInfo, note: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-400 transition-colors" placeholder="Ghi chú thêm cho đơn hàng..." />
                    </div>
                  </div>
                </div>

                {/* SSL Notice */}
                <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-6">
                  <i className="ri-shield-check-line text-emerald-500 text-xl flex-shrink-0" />
                  <p className="text-emerald-700 text-sm">Thông tin của bạn được bảo mật bởi <strong>SSL/HTTPS 256-bit</strong>. Chúng tôi cam kết không chia sẻ dữ liệu cá nhân.</p>
                </div>

                <button type="submit" className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-gray-700 transition-all cursor-pointer whitespace-nowrap">
                  Tiếp Tục &rarr; Chọn Phương Thức Thanh Toán
                </button>
              </form>
            ) : (
              <form onSubmit={handlePayment}>
                <div className="bg-white rounded-2xl p-8 mb-6">
                  <h2 className="font-bold text-gray-900 text-lg mb-6">Phương Thức Thanh Toán</h2>
                  <div className="grid grid-cols-1 gap-3 mb-8">
                    {paymentMethods.map((method) => (
                      <label key={method.id} className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        paymentMethod === method.id ? "border-gray-900 bg-gray-50" : "border-gray-200 hover:border-gray-300"
                      }`}>
                        <input type="radio" name="payment" value={method.id} checked={paymentMethod === method.id}
                          onChange={() => setPaymentMethod(method.id)} className="sr-only" />
                        <div className="w-10 h-10 flex items-center justify-center rounded-xl" style={{ background: `${method.color}15` }}>
                          <i className={`${method.icon} text-xl`} style={{ color: method.color }} />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-sm">{method.label}</p>
                          <p className="text-gray-500 text-xs">{method.desc}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          paymentMethod === method.id ? "border-gray-900" : "border-gray-300"
                        }`}>
                          {paymentMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />}
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* MoMo Account Info */}
                  {paymentMethod === "momo" && (
                    <div className="border-2 border-rose-200 rounded-2xl overflow-hidden">
                      <div className="bg-gradient-to-r from-rose-500 to-pink-600 px-5 py-3 flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <i className="ri-wallet-3-line text-white text-base" />
                        </div>
                        <span className="text-white font-bold text-sm">Ví MoMo - Thông Tin Nhận Tiền</span>
                      </div>
                      <div className="bg-rose-50 p-5">
                        <div className="flex flex-col gap-3">
                          <InfoRow label="Số điện thoại" value="0982 947 645" field="momo-phone" copiedField={copiedField} onCopy={copyToClipboard} highlight />
                          <InfoRow label="Chủ tài khoản" value="NGUYEN VAN HAI" field="momo-name" copiedField={copiedField} onCopy={copyToClipboard} />
                          <div className="mt-2 p-3 bg-rose-100 rounded-xl">
                            <p className="text-rose-700 text-xs flex items-start gap-2">
                              <i className="ri-information-line text-base flex-shrink-0 mt-0.5" />
                              Chuyển tiền vào số MoMo trên, sau đó chụp ảnh màn hình xác nhận giao dịch và gửi về Zalo/Hotline <strong>0982 947 645</strong>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ZaloPay Account Info */}
                  {paymentMethod === "zalopay" && (
                    <div className="border-2 border-sky-200 rounded-2xl overflow-hidden">
                      <div className="bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-3 flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <i className="ri-secure-payment-line text-white text-base" />
                        </div>
                        <span className="text-white font-bold text-sm">ZaloPay - Thông Tin Nhận Tiền</span>
                      </div>
                      <div className="bg-sky-50 p-5">
                        <div className="flex flex-col gap-3">
                          <InfoRow label="Số điện thoại" value="0982 947 645" field="zalo-phone" copiedField={copiedField} onCopy={copyToClipboard} highlight />
                          <InfoRow label="Chủ tài khoản" value="NGUYEN VAN HAI" field="zalo-name" copiedField={copiedField} onCopy={copyToClipboard} />
                          <div className="mt-2 p-3 bg-sky-100 rounded-xl">
                            <p className="text-sky-700 text-xs flex items-start gap-2">
                              <i className="ri-information-line text-base flex-shrink-0 mt-0.5" />
                              Chuyển tiền vào số ZaloPay trên, sau đó chụp ảnh màn hình xác nhận và gửi về Zalo <strong>0982 947 645</strong>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bank Transfer (Visa/MasterCard) */}
                  {(paymentMethod === "visa" || paymentMethod === "mastercard") && (
                    <div className="border-2 border-indigo-200 rounded-2xl overflow-hidden">
                      <div className="bg-gradient-to-r from-indigo-600 to-violet-700 px-5 py-3 flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <i className="ri-bank-line text-white text-base" />
                        </div>
                        <span className="text-white font-bold text-sm">Chuyển Khoản Ngân Hàng</span>
                      </div>
                      <div className="bg-indigo-50 p-5">
                        <div className="flex flex-col gap-3">
                          <InfoRow label="Ngân hàng" value="VPBank (Ngân Hàng Việt Nam Thịnh Vượng)" field="bank-name" copiedField={copiedField} onCopy={copyToClipboard} />
                          <InfoRow label="Số tài khoản" value="0384 797 294" field="bank-stk" copiedField={copiedField} onCopy={copyToClipboard} highlight />
                          <InfoRow label="Chủ tài khoản" value="NGUYEN VAN HAI" field="bank-holder" copiedField={copiedField} onCopy={copyToClipboard} />
                          <InfoRow label="Nội dung CK" value={`Thanh toan don hang ${orderInfo.name || "TEN KHACH HANG"}`} field="bank-note" copiedField={copiedField} onCopy={copyToClipboard} />
                          <div className="mt-2 p-3 bg-indigo-100 rounded-xl">
                            <p className="text-indigo-700 text-xs flex items-start gap-2">
                              <i className="ri-information-line text-base flex-shrink-0 mt-0.5" />
                              Vui lòng ghi đúng nội dung chuyển khoản. Sau khi chuyển khoản, gửi ảnh xác nhận về Zalo/Hotline <strong>0982 947 645</strong>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "cod" && (
                    <div className="border-2 border-emerald-200 rounded-2xl overflow-hidden">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-3 flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <i className="ri-cash-line text-white text-base" />
                        </div>
                        <span className="text-white font-bold text-sm">Thanh Toán Khi Nhận Hàng (COD)</span>
                      </div>
                      <div className="bg-emerald-50 p-5">
                        <div className="flex items-start gap-3">
                          <i className="ri-checkbox-circle-line text-emerald-500 text-xl flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-emerald-800 text-sm mb-1">Thanh toán tiền mặt khi nhận hàng</p>
                            <p className="text-emerald-700 text-xs">Bạn sẽ thanh toán <strong>{finalTotal.toLocaleString("vi-VN")}₫</strong> bằng tiền mặt khi shipper giao hàng đến tay bạn. Không cần chuyển khoản trước.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep("info")} className="px-6 py-4 border border-gray-200 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-all cursor-pointer whitespace-nowrap">
                    &larr; Quay Lại
                  </button>
                  <button type="submit" disabled={processing} className="flex-1 py-4 bg-rose-500 text-white rounded-xl font-bold text-sm hover:bg-rose-600 transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 disabled:opacity-70">
                    {processing ? (
                      <><i className="ri-loader-4-line animate-spin" /> Đang Xử Lý...</>
                    ) : (
                      <><i className="ri-lock-line" /> Xác Nhận Thanh Toán {finalTotal.toLocaleString("vi-VN")}₫</>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl p-6 sticky top-28">
              <h3 className="font-bold text-gray-900 mb-5">Đơn Hàng ({items.length} sản phẩm)</h3>
              <div className="flex flex-col gap-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800 line-clamp-2">{item.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">x{item.quantity}</p>
                    </div>
                    <span className="text-xs font-semibold text-gray-900 whitespace-nowrap">{(item.price * item.quantity).toLocaleString("vi-VN")}₫</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tạm tính</span>
                  <span>{total.toLocaleString("vi-VN")}₫</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Phí vận chuyển</span>
                  <span className={shippingFee === 0 ? "text-emerald-600 font-medium" : ""}>
                    {shippingFee === 0 ? "Miễn phí" : `${shippingFee.toLocaleString("vi-VN")}₫`}
                  </span>
                </div>
                {shippingFee > 0 && (
                  <p className="text-xs text-gray-400">Miễn phí vận chuyển cho đơn từ 500.000₫</p>
                )}
                <div className="flex justify-between font-bold text-base pt-3 border-t border-gray-100">
                  <span>Tổng Cộng</span>
                  <span className="text-rose-600">{finalTotal.toLocaleString("vi-VN")}₫</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-5 pt-5 border-t border-gray-100 grid grid-cols-2 gap-3">
                {[
                  { icon: "ri-shield-check-line", label: "Bảo mật SSL", color: "text-emerald-500" },
                  { icon: "ri-loop-left-line", label: "Đổi trả 30 ngày", color: "text-sky-500" },
                  { icon: "ri-truck-line", label: "Giao nhanh 2-5 ngày", color: "text-amber-500" },
                  { icon: "ri-customer-service-line", label: "Hỗ trợ 24/7", color: "text-rose-500" },
                ].map((b) => (
                  <div key={b.label} className="flex items-center gap-2">
                    <i className={`${b.icon} ${b.color} text-base`} />
                    <span className="text-xs text-gray-500">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
  field: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
  highlight?: boolean;
}

function InfoRow({ label, value, field, copiedField, onCopy, highlight }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 bg-white rounded-xl px-4 py-3 border border-gray-100">
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400 mb-0.5">{label}</p>
        <p className={`font-bold text-sm truncate ${highlight ? "text-gray-900 text-base" : "text-gray-700"}`}>{value}</p>
      </div>
      <button
        type="button"
        onClick={() => onCopy(value.replace(/\s/g, ""), field)}
        className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
          copiedField === field
            ? "bg-emerald-100 text-emerald-600"
            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
        }`}
      >
        <i className={copiedField === field ? "ri-checkbox-circle-line" : "ri-file-copy-line"} />
        {copiedField === field ? "Đã sao chép" : "Sao chép"}
      </button>
    </div>
  );
}

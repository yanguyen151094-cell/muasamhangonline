import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';

type Step = 'form' | 'success' | 'already';

export default function AdminRegisterPage() {
  const [step, setStep] = useState<Step>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [existingStatus, setExistingStatus] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', reason: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password.length < 6) { setError('Mật khẩu phải có ít nhất 6 ký tự.'); return; }

    setLoading(true);
    try {
      // Kiểm tra email đã đăng ký chưa
      const { data: existing } = await supabase
        .from('admin_registrations')
        .select('status')
        .eq('email', form.email)
        .maybeSingle();

      if (existing) {
        setExistingStatus(existing.status);
        setStep('already');
        setLoading(false);
        return;
      }

      // Kiểm tra email đã có trong admin_accounts chưa
      const { data: existAccount } = await supabase
        .from('admin_accounts')
        .select('email')
        .eq('email', form.email)
        .maybeSingle();

      if (existAccount) {
        setError('Email này đã tồn tại trong hệ thống. Vui lòng dùng email khác.');
        setLoading(false);
        return;
      }

      const { error: insertError } = await supabase.from('admin_registrations').insert({
        name: form.name,
        email: form.email,
        password_hash: form.password,
        phone: form.phone,
        reason: form.reason,
        status: 'pending',
      });

      if (insertError) throw insertError;
      setStep('success');
    } catch {
      setError('Có lỗi xảy ra, vui lòng thử lại.');
    }
    setLoading(false);
  };

  const statusLabel: Record<string, { text: string; color: string }> = {
    pending: { text: 'Đang chờ phê duyệt', color: 'text-yellow-600' },
    approved: { text: 'Đã được phê duyệt — bạn có thể đăng nhập!', color: 'text-green-600' },
    rejected: { text: 'Yêu cầu đã bị từ chối', color: 'text-red-600' },
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-3xl">Y</span>
          </div>
          <h1 className="text-white font-bold text-2xl">Đăng Ký Tài Khoản Admin</h1>
          <p className="text-gray-400 text-sm mt-1">Gửi yêu cầu — Admin Cấp 1 sẽ phê duyệt cho bạn</p>
        </div>

        {step === 'form' && (
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
            <div className="flex items-center gap-3 px-4 py-3 bg-orange-950 border border-orange-900 rounded-xl mb-6">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="ri-shield-user-line text-white text-base"></i>
              </div>
              <div>
                <div className="text-orange-400 text-xs font-bold uppercase tracking-wide">Admin Cấp 2</div>
                <div className="text-gray-400 text-[11px]">Tài khoản nhân viên — Quyền hạn giới hạn</div>
              </div>
            </div>
            {error && (
              <div className="mb-4 px-4 py-3 bg-red-950 border border-red-800 rounded-lg flex items-center gap-2">
                <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                  <i className="ri-error-warning-line text-red-400 text-sm"></i>
                </div>
                <span className="text-red-400 text-sm">{error}</span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Họ và tên *</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                    <i className="ri-user-line text-gray-500 text-base"></i>
                  </div>
                  <input type="text" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required placeholder="Nguyễn Văn A"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-500 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Email đăng nhập *</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                    <i className="ri-mail-line text-gray-500 text-base"></i>
                  </div>
                  <input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} required placeholder="ten@yamatoshop.vn"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-500 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Mật khẩu *</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                    <i className="ri-lock-line text-gray-500 text-base"></i>
                  </div>
                  <input type={showPass ? 'text' : 'password'} value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} required placeholder="Tối thiểu 6 ký tự"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-10 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-500 transition-colors" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center cursor-pointer">
                    <i className={`${showPass ? 'ri-eye-off-line' : 'ri-eye-line'} text-gray-500 text-base`}></i>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Số điện thoại</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                    <i className="ri-phone-line text-gray-500 text-base"></i>
                  </div>
                  <input type="tel" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} placeholder="0901 234 567"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-500 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Lý do đăng ký / Vị trí công việc *</label>
                <textarea value={form.reason} onChange={(e) => setForm((p) => ({ ...p, reason: e.target.value.slice(0, 300) }))} required rows={3} maxLength={300}
                  placeholder="VD: Nhân viên xử lý đơn hàng, phòng kinh doanh..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-500 transition-colors resize-none" />
                <div className="text-right text-gray-600 text-[10px] mt-1">{form.reason.length}/300</div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition-colors text-sm cursor-pointer whitespace-nowrap mt-2">
                {loading ? (<span className="flex items-center justify-center gap-2"><i className="ri-loader-4-line animate-spin text-base"></i>Đang gửi...</span>) : 'Gửi Yêu Cầu Đăng Ký'}
              </button>
            </form>
            <div className="mt-6 pt-5 border-t border-gray-800 text-center">
              <span className="text-gray-500 text-xs">Đã có tài khoản? </span>
              <Link to="/admin/login" className="text-orange-400 hover:text-orange-300 text-xs font-medium transition-colors">Đăng nhập ngay</Link>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="bg-gray-900 rounded-2xl p-10 border border-gray-800 text-center">
            <div className="w-16 h-16 bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-checkbox-circle-line text-green-400 text-4xl"></i>
            </div>
            <h2 className="text-white font-bold text-xl mb-2">Yêu cầu đã được gửi!</h2>
            <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
              Yêu cầu của <span className="text-white font-medium">{form.name}</span> đã được ghi nhận. Admin Cấp 1 sẽ xem xét và phê duyệt trong thời gian sớm nhất.
            </p>
            <div className="flex items-center gap-3 bg-gray-800 rounded-xl px-5 py-4 mb-6 text-left">
              <div className="w-9 h-9 bg-yellow-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="ri-time-line text-yellow-400 text-base"></i>
              </div>
              <div>
                <div className="text-yellow-400 text-xs font-semibold">Đang chờ phê duyệt</div>
                <div className="text-gray-400 text-[11px] mt-0.5">Email: {form.email}</div>
              </div>
            </div>
            <Link to="/admin/login" className="block w-full text-center bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-3 rounded-lg transition-colors text-sm whitespace-nowrap">
              Về trang đăng nhập
            </Link>
          </div>
        )}

        {step === 'already' && existingStatus && (
          <div className="bg-gray-900 rounded-2xl p-10 border border-gray-800 text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${existingStatus === 'approved' ? 'bg-green-900' : existingStatus === 'rejected' ? 'bg-red-900' : 'bg-yellow-900'}`}>
              <i className={`text-4xl ${existingStatus === 'approved' ? 'ri-checkbox-circle-line text-green-400' : existingStatus === 'rejected' ? 'ri-close-circle-line text-red-400' : 'ri-time-line text-yellow-400'}`}></i>
            </div>
            <h2 className="text-white font-bold text-xl mb-2">Email đã được đăng ký</h2>
            <p className={`text-sm font-medium mb-6 ${statusLabel[existingStatus]?.color}`}>{statusLabel[existingStatus]?.text}</p>
            <Link to="/admin/login" className="block w-full text-center bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-3 rounded-lg transition-colors text-sm whitespace-nowrap">
              Về trang đăng nhập
            </Link>
          </div>
        )}

        <div className="text-center mt-6">
          <a href="/" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">← Quay về trang chủ</a>
        </div>
      </div>
    </div>
  );
}

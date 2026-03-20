import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';

const DEMO_ACCOUNTS = [
  { email: 'admin@yamatoshop.vn', password: 'admin123', name: 'Nguyễn Minh Tuấn', role: 'admin1', avatar: 'T' },
  { email: 'staff@yamatoshop.vn', password: 'staff123', name: 'Trần Thị Lan', role: 'admin2', avatar: 'L' },
];

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data, error: dbError } = await supabase
        .from('admin_accounts')
        .select('email, name, role, status')
        .eq('email', form.email)
        .eq('password_hash', form.password)
        .maybeSingle();

      if (dbError) throw dbError;

      if (!data) {
        setError('Email hoặc mật khẩu không đúng. Vui lòng thử lại.');
        setLoading(false);
        return;
      }

      if (data.status !== 'active') {
        setError('Tài khoản đã bị vô hiệu hóa. Liên hệ Admin Cấp 1 để được hỗ trợ.');
        setLoading(false);
        return;
      }

      // Cập nhật last_login_at
      await supabase
        .from('admin_accounts')
        .update({ last_login_at: new Date().toISOString() })
        .eq('email', form.email);

      localStorage.setItem('admin_auth', JSON.stringify({
        email: data.email,
        name: data.name,
        role: data.role,
        loginAt: new Date().toISOString(),
      }));
      navigate('/admin/dashboard');
    } catch {
      setError('Có lỗi kết nối, vui lòng thử lại.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-3xl">Y</span>
          </div>
          <h1 className="text-white font-bold text-2xl">YamatoShop Admin</h1>
          <p className="text-gray-400 text-sm mt-1">Đăng nhập vào trang quản trị</p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          {error && (
            <div className="mb-4 px-4 py-3 bg-red-950 border border-red-800 rounded-lg flex items-center gap-2">
              <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                <i className="ri-error-warning-line text-red-400 text-sm"></i>
              </div>
              <span className="text-red-400 text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Email đăng nhập</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                  <i className="ri-mail-line text-gray-500 text-base"></i>
                </div>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  placeholder="admin@yamatoshop.vn"
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Mật khẩu</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                  <i className="ri-lock-line text-gray-500 text-base"></i>
                </div>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-10 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center cursor-pointer"
                >
                  <i className={`${showPass ? 'ri-eye-off-line' : 'ri-eye-line'} text-gray-500 text-base`}></i>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition-colors text-sm cursor-pointer whitespace-nowrap"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="ri-loader-4-line animate-spin text-base"></i>
                  Đang đăng nhập...
                </span>
              ) : (
                'Đăng Nhập'
              )}
            </button>
          </form>

          {/* Demo accounts */}
          <div className="mt-5 pt-5 border-t border-gray-800 space-y-2">
            <p className="text-gray-600 text-[10px] uppercase tracking-wide font-semibold text-center mb-3">Tài khoản demo</p>
            {DEMO_ACCOUNTS.map((a) => (
              <button
                key={a.email}
                type="button"
                onClick={() => setForm({ email: a.email, password: a.password })}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer"
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${a.role === 'admin1' ? 'bg-red-600' : 'bg-orange-500'}`}>
                  {a.avatar}
                </div>
                <div className="text-left flex-1 min-w-0">
                  <div className="text-gray-300 text-xs font-medium truncate">{a.name}</div>
                  <div className="text-gray-500 text-[10px] truncate">{a.email}</div>
                </div>
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold whitespace-nowrap ${a.role === 'admin1' ? 'bg-red-950 text-red-400' : 'bg-orange-950 text-orange-400'}`}>
                  {a.role === 'admin1' ? 'Cấp 1' : 'Cấp 2'}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-gray-800 text-center">
            <span className="text-gray-500 text-xs">Chưa có tài khoản? </span>
            <Link to="/admin/register" className="text-orange-400 hover:text-orange-300 text-xs font-semibold transition-colors">
              Đăng ký Admin Cấp 2
            </Link>
          </div>
        </div>

        <div className="text-center mt-6">
          <a href="/" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">
            ← Quay về trang chủ
          </a>
        </div>
      </div>
    </div>
  );
}

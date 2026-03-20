import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { useAdminAuth } from '../../../hooks/useAdminAuth';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  requiredPermission?: string;
}

export default function AdminLayout({ children, title, subtitle, requiredPermission }: AdminLayoutProps) {
  const navigate = useNavigate();
  const { auth, can, isAdmin1 } = useAdminAuth();

  useEffect(() => {
    if (!auth) {
      navigate('/admin/login');
    }
  }, [auth, navigate]);

  // Block access if permission required and user doesn't have it
  if (requiredPermission && !can(requiredPermission)) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 ml-64 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-lock-line text-red-500 text-4xl"></i>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Không có quyền truy cập</h2>
            <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">
              Tài khoản Admin Cấp 2 không có quyền truy cập vào trang này. Vui lòng liên hệ Admin Cấp 1.
            </p>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium cursor-pointer whitespace-nowrap transition-colors"
            >
              Về Tổng Quan
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-gray-900 font-bold text-lg">{title}</h1>
                {!isAdmin1 && (
                  <span className="flex items-center gap-1 text-[9px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-semibold">
                    <i className="ri-shield-user-line text-xs"></i>
                    Cấp 2
                  </span>
                )}
                {isAdmin1 && (
                  <span className="flex items-center gap-1 text-[9px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-semibold">
                    <i className="ri-shield-star-line text-xs"></i>
                    Toàn quyền
                  </span>
                )}
              </div>
              {subtitle && <p className="text-gray-500 text-sm mt-0.5">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-3">
              <button className="relative w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                <i className="ri-notification-3-line text-gray-600 text-base"></i>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] flex items-center justify-center font-bold">3</span>
              </button>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100 whitespace-nowrap"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-external-link-line text-sm"></i>
                </div>
                Xem website
              </a>
            </div>
          </div>
        </header>
        {/* Content */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}

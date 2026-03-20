import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../../hooks/useAdminAuth';

interface SidebarItem {
  key: string;
  label: string;
  icon: string;
  path: string;
  permissionKey?: string;
  children?: { label: string; path: string }[];
}

const sidebarItems: SidebarItem[] = [
  { key: 'dashboard', label: 'Tổng Quan', icon: 'ri-dashboard-line', path: '/admin/dashboard' },
  {
    key: 'products',
    label: 'Sản Phẩm',
    icon: 'ri-shopping-bag-3-line',
    path: '/admin/products',
    children: [
      { label: 'Danh sách sản phẩm', path: '/admin/products' },
      { label: 'Thêm sản phẩm', path: '/admin/products/add' },
      { label: 'Danh mục', path: '/admin/products/categories' },
      { label: 'Khuyến mãi & Coupon', path: '/admin/products/coupons' },
    ],
  },
  {
    key: 'orders',
    label: 'Đơn Hàng',
    icon: 'ri-file-list-3-line',
    path: '/admin/orders',
    children: [
      { label: 'Tất cả đơn hàng', path: '/admin/orders' },
      { label: 'Đơn hàng mới', path: '/admin/orders?status=new' },
      { label: 'Đang xử lý', path: '/admin/orders?status=processing' },
      { label: 'Đã giao', path: '/admin/orders?status=delivered' },
    ],
  },
  {
    key: 'customers',
    label: 'Khách Hàng',
    icon: 'ri-group-line',
    path: '/admin/customers',
    children: [
      { label: 'Danh sách khách', path: '/admin/customers' },
      { label: 'Khách VIP', path: '/admin/customers?tier=vip' },
      { label: 'Gửi thông báo', path: '/admin/customers/notify' },
    ],
  },
  {
    key: 'content',
    label: 'Nội Dung',
    icon: 'ri-article-line',
    path: '/admin/content',
    children: [
      { label: 'Bài viết Blog', path: '/admin/content' },
      { label: 'Banner & Slider', path: '/admin/content/banners' },
      { label: 'Trang tĩnh', path: '/admin/content/pages' },
    ],
  },
  { key: 'reports', label: 'Báo Cáo', icon: 'ri-bar-chart-2-line', path: '/admin/reports' },
  {
    key: 'settings',
    label: 'Cài Đặt',
    icon: 'ri-settings-3-line',
    path: '/admin/settings',
    permissionKey: 'settings_access',
  },
  {
    key: 'advanced',
    label: 'Marketing & SEO',
    icon: 'ri-megaphone-line',
    path: '/admin/advanced',
    permissionKey: 'advanced_access',
  },
];

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth, can } = useAdminAuth();
  const [expanded, setExpanded] = useState<string[]>(['products']);

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  const isParentActive = (item: SidebarItem) => {
    if (isActive(item.path)) return true;
    return item.children?.some((c) => location.pathname.startsWith(c.path)) ?? false;
  };

  const toggleExpand = (key: string) => {
    setExpanded((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    navigate('/admin/login');
  };

  const visibleItems = sidebarItems.filter(
    (item) => !item.permissionKey || can(item.permissionKey),
  );

  const isAdmin1 = auth?.role === 'admin1';

  return (
    <aside className="w-64 bg-gray-900 min-h-screen flex flex-col fixed left-0 top-0 z-50">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-base">Y</span>
          </div>
          <div>
            <div className="text-white font-bold text-sm">YamatoShop</div>
            <div className="text-gray-400 text-[10px]">Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Role Badge */}
      <div className="px-4 py-3 border-b border-gray-800">
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isAdmin1 ? 'bg-red-950' : 'bg-orange-950'}`}>
          <div className={`w-5 h-5 flex items-center justify-center flex-shrink-0`}>
            <i className={`text-sm ${isAdmin1 ? 'ri-shield-star-line text-red-400' : 'ri-shield-user-line text-orange-400'}`}></i>
          </div>
          <div className="flex-1 min-w-0">
            <div className={`text-[10px] font-bold uppercase tracking-wide ${isAdmin1 ? 'text-red-400' : 'text-orange-400'}`}>
              {isAdmin1 ? 'Admin Cấp 1' : 'Admin Cấp 2'}
            </div>
            <div className="text-gray-500 text-[9px] truncate">
              {isAdmin1 ? 'Toàn quyền quản trị' : 'Quyền hạn giới hạn'}
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {visibleItems.map((item) => (
          <div key={item.key} className="mb-1">
            {item.children ? (
              <>
                <button
                  onClick={() => toggleExpand(item.key)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors cursor-pointer ${isParentActive(item) ? 'bg-red-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className={`${item.icon} text-base`}></i>
                    </div>
                    <span>{item.label}</span>
                  </div>
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className={`ri-arrow-right-s-line text-sm transition-transform ${expanded.includes(item.key) ? 'rotate-90' : ''}`}></i>
                  </div>
                </button>
                {expanded.includes(item.key) && (
                  <div className="mt-1 ml-8 space-y-0.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className={`block px-3 py-2 rounded-lg text-xs transition-colors ${location.pathname === child.path ? 'text-red-400 bg-red-950' : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800'}`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${isActive(item.path) ? 'bg-red-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className={`${item.icon} text-base`}></i>
                </div>
                <span>{item.label}</span>
              </Link>
            )}
          </div>
        ))}

        {/* Locked items for admin2 */}
        {!isAdmin1 && (
          <div className="mt-4 pt-4 border-t border-gray-800">
            <div className="text-gray-600 text-[9px] uppercase tracking-wide px-3 mb-2 font-semibold">Không có quyền truy cập</div>
            {[
              { label: 'Cài Đặt & Bảo Mật', icon: 'ri-settings-3-line' },
              { label: 'Marketing & SEO', icon: 'ri-megaphone-line' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 opacity-50 cursor-not-allowed mb-1"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className={`${item.icon} text-base`}></i>
                </div>
                <span className="text-sm">{item.label}</span>
                <div className="w-4 h-4 flex items-center justify-center ml-auto">
                  <i className="ri-lock-line text-sm"></i>
                </div>
              </div>
            ))}
          </div>
        )}
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-gray-800">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-8 h-8 ${isAdmin1 ? 'bg-red-600' : 'bg-orange-500'} rounded-full flex items-center justify-center flex-shrink-0`}>
            <span className="text-white text-xs font-bold">{auth?.name?.charAt(0) ?? 'A'}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-xs font-medium truncate">{auth?.name ?? 'Admin'}</div>
            <div className="text-gray-500 text-[10px] truncate">{auth?.email ?? ''}</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors text-xs cursor-pointer"
        >
          <div className="w-4 h-4 flex items-center justify-center">
            <i className="ri-logout-box-r-line text-sm"></i>
          </div>
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}

// ============================================================
// ADMIN ACCOUNTS & PERMISSIONS (RBAC)
// ============================================================

export type AdminRole = 'admin1' | 'admin2';

export interface AdminAccount {
  email: string;
  password: string;
  name: string;
  role: AdminRole;
  avatar: string;
  title: string;
}

export const adminAccounts: AdminAccount[] = [
  {
    email: 'admin@yamatoshop.vn',
    password: 'admin123',
    name: 'Nguyễn Minh Tuấn',
    role: 'admin1',
    avatar: 'T',
    title: 'Admin Cấp 1 — Toàn quyền',
  },
  {
    email: 'staff@yamatoshop.vn',
    password: 'staff123',
    name: 'Trần Thị Lan',
    role: 'admin2',
    avatar: 'L',
    title: 'Admin Cấp 2 — Nhân viên',
  },
];

export const adminPermissions: Record<AdminRole, Record<string, boolean>> = {
  admin1: {
    products_add: true,
    products_edit: true,
    products_delete: true,
    products_edit_sku: true,
    products_edit_category: true,
    products_promotion: true,
    orders_view: true,
    orders_update_status: true,
    orders_cancel: true,
    orders_refund: true,
    orders_export: true,
    customers_view: true,
    customers_edit: true,
    customers_delete: true,
    customers_change_vip: true,
    customers_notify: true,
    content_add_edit: true,
    content_delete_page: true,
    content_change_menu: true,
    reports_view: true,
    reports_export: true,
    settings_access: true,
    advanced_access: true,
    warehouse_update: true,
    warehouse_manage: true,
  },
  admin2: {
    products_add: true,
    products_edit: true,
    products_delete: false,
    products_edit_sku: false,
    products_edit_category: false,
    products_promotion: true,
    orders_view: true,
    orders_update_status: true,
    orders_cancel: false,
    orders_refund: false,
    orders_export: false,
    customers_view: true,
    customers_edit: false,
    customers_delete: false,
    customers_change_vip: false,
    customers_notify: true,
    content_add_edit: true,
    content_delete_page: false,
    content_change_menu: false,
    reports_view: true,
    reports_export: false,
    settings_access: false,
    advanced_access: false,
    warehouse_update: true,
    warehouse_manage: false,
  },
};

// ============================================================
// ADMIN MOCK DATA
// ============================================================
// Thay thế dữ liệu thật khi kết nối Supabase

// --- THỐNG KÊ TỔNG QUAN ---
export const adminStats = {
  totalRevenue: 1842500000,
  revenueChange: 12.4,
  totalOrders: 3842,
  ordersChange: 8.1,
  totalCustomers: 1256,
  customersChange: 5.3,
  totalProducts: 348,
  productsChange: 2.6,
};

// --- DOANH THU THEO THÁNG ---
export const revenueData = [
  { month: 'T1', revenue: 120000000, orders: 280 },
  { month: 'T2', revenue: 145000000, orders: 310 },
  { month: 'T3', revenue: 138000000, orders: 295 },
  { month: 'T4', revenue: 162000000, orders: 340 },
  { month: 'T5', revenue: 175000000, orders: 368 },
  { month: 'T6', revenue: 158000000, orders: 322 },
  { month: 'T7', revenue: 192000000, orders: 405 },
  { month: 'T8', revenue: 210000000, orders: 438 },
  { month: 'T9', revenue: 198000000, orders: 412 },
  { month: 'T10', revenue: 235000000, orders: 478 },
  { month: 'T11', revenue: 248000000, orders: 510 },
  { month: 'T12', revenue: 261000000, orders: 484 },
];

// --- SẢN PHẨM BÁN CHẠY ---
export const topProducts = [
  { id: 1, name: 'Samsung Galaxy S24 Ultra', category: 'Điện Thoại', sold: 342, revenue: 1025400000, stock: 45, image: 'https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20S24%20Ultra%20smartphone%20premium%20black%20minimalist%20product%20shot%20white%20background&width=60&height=60&seq=admin1&orientation=squarish' },
  { id: 2, name: 'iPhone 15 Pro Max 256GB', category: 'Điện Thoại', sold: 298, revenue: 1041000000, stock: 23, image: 'https://readdy.ai/api/search-image?query=iPhone%2015%20Pro%20Max%20titanium%20smartphone%20product%20photography%20clean%20white%20background&width=60&height=60&seq=admin2&orientation=squarish' },
  { id: 3, name: 'Kem chống nắng Anessa SPF50+', category: 'Làm Đẹp', sold: 521, revenue: 130250000, stock: 156, image: 'https://readdy.ai/api/search-image?query=Anessa%20sunscreen%20cream%20beauty%20product%20gold%20bottle%20white%20background%20clean%20minimal&width=60&height=60&seq=admin3&orientation=squarish' },
  { id: 4, name: 'Serum HA Céraline 30ml', category: 'Làm Đẹp', sold: 445, revenue: 111250000, stock: 89, image: 'https://readdy.ai/api/search-image?query=serum%20hyaluronic%20acid%20skincare%20small%20bottle%20dropper%20white%20background%20minimalist%20product&width=60&height=60&seq=admin4&orientation=squarish' },
  { id: 5, name: 'Máy đo huyết áp Omron HEM', category: 'Sức Khỏe', sold: 312, revenue: 93600000, stock: 67, image: 'https://readdy.ai/api/search-image?query=Omron%20blood%20pressure%20monitor%20medical%20device%20white%20blue%20clean%20product%20shot%20white%20background&width=60&height=60&seq=admin5&orientation=squarish' },
];

// --- ĐƠN HÀNG GẦN ĐÂY ---
export const recentOrders = [
  { id: '#DH-2024-001', customer: 'Nguyễn Văn An', phone: '0901234567', total: 3499000, status: 'new', date: '2026-03-20', items: 2, payment: 'COD' },
  { id: '#DH-2024-002', customer: 'Trần Thị Bình', phone: '0912345678', total: 1250000, status: 'processing', date: '2026-03-20', items: 3, payment: 'Chuyển khoản' },
  { id: '#DH-2024-003', customer: 'Lê Văn Cường', phone: '0923456789', total: 8900000, status: 'delivered', date: '2026-03-19', items: 1, payment: 'MoMo' },
  { id: '#DH-2024-004', customer: 'Phạm Thị Duyên', phone: '0934567890', total: 520000, status: 'cancelled', date: '2026-03-19', items: 2, payment: 'COD' },
  { id: '#DH-2024-005', customer: 'Hoàng Văn Em', phone: '0945678901', total: 2100000, status: 'delivered', date: '2026-03-18', items: 4, payment: 'VNPay' },
  { id: '#DH-2024-006', customer: 'Vũ Thị Fong', phone: '0956789012', total: 450000, status: 'processing', date: '2026-03-18', items: 1, payment: 'ZaloPay' },
  { id: '#DH-2024-007', customer: 'Đặng Văn Giàu', phone: '0967890123', total: 15800000, status: 'new', date: '2026-03-17', items: 2, payment: 'Thẻ tín dụng' },
  { id: '#DH-2024-008', customer: 'Bùi Thị Hoa', phone: '0978901234', total: 680000, status: 'delivered', date: '2026-03-17', items: 3, payment: 'COD' },
  { id: '#DH-2024-009', customer: 'Ngô Văn Inh', phone: '0989012345', total: 3200000, status: 'processing', date: '2026-03-16', items: 1, payment: 'MoMo' },
  { id: '#DH-2024-010', customer: 'Lý Thị Kim', phone: '0990123456', total: 920000, status: 'delivered', date: '2026-03-16', items: 2, payment: 'Chuyển khoản' },
  { id: '#DH-2024-011', customer: 'Trương Văn Long', phone: '0901122334', total: 4500000, status: 'new', date: '2026-03-15', items: 3, payment: 'VNPay' },
  { id: '#DH-2024-012', customer: 'Mai Thị Mận', phone: '0912233445', total: 1100000, status: 'delivered', date: '2026-03-15', items: 2, payment: 'COD' },
];

// --- KHÁCH HÀNG ---
export const customers = [
  { id: 1, name: 'Nguyễn Văn An', email: 'an.nguyen@gmail.com', phone: '0901234567', tier: 'vip', totalOrders: 28, totalSpent: 45200000, lastOrder: '2026-03-20', joined: '2024-01-15', status: 'active' },
  { id: 2, name: 'Trần Thị Bình', email: 'binh.tran@email.com', phone: '0912345678', tier: 'regular', totalOrders: 12, totalSpent: 18500000, lastOrder: '2026-03-20', joined: '2024-03-22', status: 'active' },
  { id: 3, name: 'Lê Văn Cường', email: 'cuong.le@yahoo.com', phone: '0923456789', tier: 'vip', totalOrders: 45, totalSpent: 98700000, lastOrder: '2026-03-19', joined: '2023-08-10', status: 'active' },
  { id: 4, name: 'Phạm Thị Duyên', email: 'duyen.pham@gmail.com', phone: '0934567890', tier: 'new', totalOrders: 2, totalSpent: 1200000, lastOrder: '2026-03-19', joined: '2026-03-01', status: 'active' },
  { id: 5, name: 'Hoàng Văn Em', email: 'em.hoang@email.com', phone: '0945678901', tier: 'regular', totalOrders: 17, totalSpent: 31000000, lastOrder: '2026-03-18', joined: '2024-06-05', status: 'active' },
  { id: 6, name: 'Vũ Thị Fong', email: 'fong.vu@gmail.com', phone: '0956789012', tier: 'regular', totalOrders: 9, totalSpent: 12400000, lastOrder: '2026-03-18', joined: '2024-09-14', status: 'inactive' },
  { id: 7, name: 'Đặng Văn Giàu', email: 'giau.dang@email.com', phone: '0967890123', tier: 'vip', totalOrders: 62, totalSpent: 214000000, lastOrder: '2026-03-17', joined: '2023-02-28', status: 'active' },
  { id: 8, name: 'Bùi Thị Hoa', email: 'hoa.bui@yahoo.com', phone: '0978901234', tier: 'new', totalOrders: 3, totalSpent: 2800000, lastOrder: '2026-03-17', joined: '2026-02-14', status: 'active' },
  { id: 9, name: 'Ngô Văn Inh', email: 'inh.ngo@gmail.com', phone: '0989012345', tier: 'regular', totalOrders: 21, totalSpent: 38600000, lastOrder: '2026-03-16', joined: '2024-04-20', status: 'active' },
  { id: 10, name: 'Lý Thị Kim', email: 'kim.ly@email.com', phone: '0990123456', tier: 'vip', totalOrders: 38, totalSpent: 76500000, lastOrder: '2026-03-16', joined: '2023-11-08', status: 'active' },
  { id: 11, name: 'Trương Văn Long', email: 'long.truong@gmail.com', phone: '0901122334', tier: 'regular', totalOrders: 15, totalSpent: 24100000, lastOrder: '2026-03-15', joined: '2024-07-30', status: 'active' },
  { id: 12, name: 'Mai Thị Mận', email: 'man.mai@yahoo.com', phone: '0912233445', tier: 'new', totalOrders: 5, totalSpent: 7300000, lastOrder: '2026-03-15', joined: '2026-01-20', status: 'blocked' },
];

// --- SẢN PHẨM ADMIN ---
export const adminProducts = [
  { id: 1, name: 'iPhone 15 Pro Max 256GB', sku: 'IP15PM-256-BLK', category: 'Điện Thoại', price: 34990000, originalPrice: 38000000, stock: 23, sold: 298, status: 'active', image: 'https://readdy.ai/api/search-image?query=iPhone%2015%20Pro%20Max%20titanium%20black%20smartphone%20premium%20product%20photo%20white%20background&width=60&height=60&seq=ap1&orientation=squarish' },
  { id: 2, name: 'Samsung Galaxy S24 Ultra', sku: 'SGS24U-256-BLK', category: 'Điện Thoại', price: 29990000, originalPrice: 32000000, stock: 45, sold: 342, status: 'active', image: 'https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20S24%20Ultra%20black%20smartphone%20sleek%20design%20white%20background%20product%20photo&width=60&height=60&seq=ap2&orientation=squarish' },
  { id: 3, name: 'Xiaomi 14 Pro 512GB', sku: 'XI14P-512-WHT', category: 'Điện Thoại', price: 18990000, originalPrice: 21000000, stock: 67, sold: 215, status: 'active', image: 'https://readdy.ai/api/search-image?query=Xiaomi%2014%20Pro%20white%20smartphone%20clean%20product%20photo%20white%20background%20premium&width=60&height=60&seq=ap3&orientation=squarish' },
  { id: 4, name: 'Kem chống nắng Anessa SPF50+', sku: 'ANESSA-SPF50-40G', category: 'Làm Đẹp', price: 250000, originalPrice: 280000, stock: 156, sold: 521, status: 'active', image: 'https://readdy.ai/api/search-image?query=Anessa%20sunscreen%20gold%20tube%20SPF%2050%20beauty%20skincare%20product%20white%20background&width=60&height=60&seq=ap4&orientation=squarish' },
  { id: 5, name: 'Serum HA Céraline 30ml', sku: 'CERA-HA-30ML', category: 'Làm Đẹp', price: 250000, originalPrice: 320000, stock: 89, sold: 445, status: 'active', image: 'https://readdy.ai/api/search-image?query=hyaluronic%20acid%20serum%20skincare%20dropper%20bottle%20clean%20white%20background%20beauty%20product&width=60&height=60&seq=ap5&orientation=squarish' },
  { id: 6, name: 'Máy đo huyết áp Omron HEM', sku: 'OMRON-HEM-7121', category: 'Sức Khỏe', price: 300000, originalPrice: 350000, stock: 67, sold: 312, status: 'active', image: 'https://readdy.ai/api/search-image?query=Omron%20blood%20pressure%20monitor%20medical%20health%20device%20white%20blue%20product%20white%20background&width=60&height=60&seq=ap6&orientation=squarish' },
  { id: 7, name: 'Áo thun basic Unisex', sku: 'ATB-UNI-M-WHT', category: 'Thời Trang', price: 150000, originalPrice: 200000, stock: 234, sold: 678, status: 'active', image: 'https://readdy.ai/api/search-image?query=basic%20white%20unisex%20t-shirt%20fashion%20clothing%20minimal%20product%20photo%20clean%20white%20background&width=60&height=60&seq=ap7&orientation=squarish' },
  { id: 8, name: 'Thức ăn mèo Royal Canin 2kg', sku: 'RC-CAT-ADULT-2K', category: 'Thú Cưng', price: 280000, originalPrice: 320000, stock: 0, sold: 189, status: 'out_of_stock', image: 'https://readdy.ai/api/search-image?query=Royal%20Canin%20cat%20food%20bag%20premium%20pet%20food%20product%20white%20background%20clean&width=60&height=60&seq=ap8&orientation=squarish' },
  { id: 9, name: 'Robot hút bụi Xiaomi S10+', sku: 'XM-VACUUM-S10P', category: 'Nhà Cửa', price: 4500000, originalPrice: 5500000, stock: 12, sold: 87, status: 'active', image: 'https://readdy.ai/api/search-image?query=Xiaomi%20robot%20vacuum%20cleaner%20S10%20smart%20home%20appliance%20white%20circular%20device%20clean%20background&width=60&height=60&seq=ap9&orientation=squarish' },
  { id: 10, name: 'Laptop ASUS VivoBook 15', sku: 'ASUS-VB15-I5-8G', category: 'Giáo Dục', price: 12500000, originalPrice: 14000000, stock: 8, sold: 56, status: 'draft', image: 'https://readdy.ai/api/search-image?query=ASUS%20VivoBook%20laptop%20silver%20thin%20lightweight%20student%20product%20photo%20white%20background&width=60&height=60&seq=ap10&orientation=squarish' },
];

// --- NHÂN VIÊN / TÀI KHOẢN ADMIN ---
export const adminUsers = [
  { id: 1, name: 'Nguyễn Minh Tuấn', email: 'admin@yamatoshop.vn', role: 'super_admin', status: 'active', lastLogin: '2026-03-20 08:32', avatar: 'https://readdy.ai/api/search-image?query=professional%20vietnamese%20man%20portrait%20avatar%20headshot%20clean%20background%20friendly%20smile&width=40&height=40&seq=au1&orientation=squarish' },
  { id: 2, name: 'Trần Thị Lan', email: 'lan.tran@yamatoshop.vn', role: 'manager', status: 'active', lastLogin: '2026-03-20 07:15', avatar: 'https://readdy.ai/api/search-image?query=professional%20vietnamese%20woman%20portrait%20avatar%20headshot%20clean%20background%20friendly&width=40&height=40&seq=au2&orientation=squarish' },
  { id: 3, name: 'Lê Văn Hùng', email: 'hung.le@yamatoshop.vn', role: 'order_staff', status: 'active', lastLogin: '2026-03-19 16:48', avatar: 'https://readdy.ai/api/search-image?query=young%20professional%20vietnamese%20man%20avatar%20portrait%20clean%20background%20office&width=40&height=40&seq=au3&orientation=squarish' },
  { id: 4, name: 'Phạm Quỳnh Anh', email: 'quynh@yamatoshop.vn', role: 'content_staff', status: 'active', lastLogin: '2026-03-18 10:22', avatar: 'https://readdy.ai/api/search-image?query=young%20professional%20vietnamese%20woman%20portrait%20avatar%20clean%20studio%20background&width=40&height=40&seq=au4&orientation=squarish' },
  { id: 5, name: 'Hoàng Đức Tài', email: 'tai@yamatoshop.vn', role: 'product_staff', status: 'inactive', lastLogin: '2026-03-10 14:05', avatar: 'https://readdy.ai/api/search-image?query=vietnamese%20man%20professional%20portrait%20avatar%20headshot%20neutral%20background&width=40&height=40&seq=au5&orientation=squarish' },
];

// --- KHUYẾN MÃI / COUPON ---
export const coupons = [
  { id: 1, code: 'YAMATO10', type: 'percent', value: 10, minOrder: 500000, maxDiscount: 100000, used: 234, limit: 500, expiry: '2026-04-30', status: 'active' },
  { id: 2, code: 'FREESHIP', type: 'freeship', value: 0, minOrder: 300000, maxDiscount: 50000, used: 445, limit: 1000, expiry: '2026-03-31', status: 'active' },
  { id: 3, code: 'VIP20', type: 'percent', value: 20, minOrder: 2000000, maxDiscount: 500000, used: 89, limit: 200, expiry: '2026-05-31', status: 'active' },
  { id: 4, code: 'FLASH50K', type: 'fixed', value: 50000, minOrder: 400000, maxDiscount: 50000, used: 500, limit: 500, expiry: '2026-03-15', status: 'expired' },
  { id: 5, code: 'NEWUSER', type: 'percent', value: 15, minOrder: 200000, maxDiscount: 150000, used: 312, limit: 999, expiry: '2026-12-31', status: 'active' },
];

// --- BÀI VIẾT BLOG ---
export const adminPosts = [
  { id: 1, title: '5 bí quyết chăm sóc da mùa hè hiệu quả', category: 'Làm Đẹp', status: 'published', views: 4521, date: '2026-03-15', author: 'Trần Thị Lan' },
  { id: 2, title: 'So sánh iPhone 15 và Samsung S24: Chọn cái nào?', category: 'Điện Thoại', status: 'published', views: 8932, date: '2026-03-12', author: 'Nguyễn Minh Tuấn' },
  { id: 3, title: 'Top 10 thực phẩm bổ sung tốt nhất 2026', category: 'Sức Khỏe', status: 'draft', views: 0, date: '2026-03-20', author: 'Lê Văn Hùng' },
  { id: 4, title: 'Xu hướng thời trang xuân hè 2026', category: 'Thời Trang', status: 'published', views: 3215, date: '2026-03-10', author: 'Phạm Quỳnh Anh' },
  { id: 5, title: 'Cách chăm sóc thú cưng đúng cách', category: 'Thú Cưng', status: 'published', views: 2108, date: '2026-03-08', author: 'Phạm Quỳnh Anh' },
];

// --- TRUY CẬP ADMIN LOG ---
export const accessLogs = [
  { id: 1, user: 'admin@yamatoshop.vn', action: 'Đăng nhập thành công', ip: '118.70.125.45', time: '2026-03-20 08:32', status: 'success' },
  { id: 2, user: 'lan.tran@yamatoshop.vn', action: 'Cập nhật đơn hàng #DH-2024-003', ip: '183.81.44.23', time: '2026-03-20 07:22', status: 'success' },
  { id: 3, user: 'unknown', action: 'Đăng nhập thất bại', ip: '45.227.100.12', time: '2026-03-19 23:15', status: 'failed' },
  { id: 4, user: 'hung.le@yamatoshop.vn', action: 'Xem danh sách khách hàng', ip: '117.3.25.84', time: '2026-03-19 16:48', status: 'success' },
  { id: 5, user: 'admin@yamatoshop.vn', action: 'Thêm sản phẩm mới', ip: '118.70.125.45', time: '2026-03-19 14:30', status: 'success' },
];

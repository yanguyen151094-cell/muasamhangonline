import AdminLayout from '../components/AdminLayout';
import { adminStats, revenueData, topProducts, recentOrders } from '../../../mocks/adminData';

const fmt = (n: number) => new Intl.NumberFormat('vi-VN').format(n);
const fmtVnd = (n: number) => {
  if (n >= 1000000000) return (n / 1000000000).toFixed(1) + ' tỷ';
  if (n >= 1000000) return (n / 1000000).toFixed(0) + ' tr';
  return fmt(n);
};

const statusConfig: Record<string, { label: string; color: string }> = {
  new: { label: 'Mới', color: 'bg-blue-100 text-blue-700' },
  processing: { label: 'Đang xử lý', color: 'bg-yellow-100 text-yellow-700' },
  delivered: { label: 'Đã giao', color: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-700' },
};

const maxRevenue = Math.max(...revenueData.map(d => d.revenue));

export default function AdminDashboardPage() {
  const statCards = [
    { label: 'Tổng Doanh Thu', value: fmtVnd(adminStats.totalRevenue) + '₫', change: adminStats.revenueChange, icon: 'ri-money-dollar-circle-line', color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Tổng Đơn Hàng', value: fmt(adminStats.totalOrders), change: adminStats.ordersChange, icon: 'ri-shopping-cart-2-line', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Khách Hàng', value: fmt(adminStats.totalCustomers), change: adminStats.customersChange, icon: 'ri-group-line', color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Sản Phẩm', value: fmt(adminStats.totalProducts), change: adminStats.productsChange, icon: 'ri-shopping-bag-3-line', color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <AdminLayout title="Tổng Quan" subtitle="Xin chào, Admin Tuấn! Đây là tổng hợp hoạt động hôm nay.">
      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        {statCards.map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 ${s.bg} rounded-lg flex items-center justify-center`}>
                <i className={`${s.icon} ${s.color} text-xl`}></i>
              </div>
              <span className="flex items-center gap-1 text-green-600 text-xs font-medium bg-green-50 px-2 py-0.5 rounded-full">
                <i className="ri-arrow-up-line text-xs"></i>
                {s.change}%
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            <div className="text-gray-500 text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5 mb-8">
        {/* Revenue Chart */}
        <div className="col-span-2 bg-white rounded-xl p-5 border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-gray-900 text-sm">Doanh Thu Theo Tháng</h3>
              <p className="text-gray-400 text-xs mt-0.5">Năm 2025</p>
            </div>
            <span className="text-xs text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">+12.4% so với năm trước</span>
          </div>
          <div className="flex items-end gap-2 h-44">
            {revenueData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-red-500 rounded-t hover:bg-red-600 transition-colors cursor-pointer group relative"
                  style={{ height: `${(d.revenue / maxRevenue) * 160}px` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {fmtVnd(d.revenue)}₫
                  </div>
                </div>
                <span className="text-[10px] text-gray-400">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Order Status */}
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <h3 className="font-bold text-gray-900 text-sm mb-4">Trạng Thái Đơn Hàng</h3>
          {[
            { label: 'Đơn mới', value: 48, color: 'bg-blue-500', percent: 48 },
            { label: 'Đang xử lý', value: 124, color: 'bg-yellow-500', percent: 31 },
            { label: 'Đã giao', value: 3512, color: 'bg-green-500', percent: 91 },
            { label: 'Đã hủy', value: 158, color: 'bg-red-400', percent: 15 },
          ].map((s, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-gray-600">{s.label}</span>
                <span className="font-semibold text-gray-900">{fmt(s.value)}</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.percent}%` }}></div>
              </div>
            </div>
          ))}
          <div className="mt-5 pt-4 border-t border-gray-100">
            <div className="text-xs text-gray-500">Tổng đơn hàng</div>
            <div className="text-xl font-bold text-gray-900 mt-0.5">{fmt(adminStats.totalOrders)}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 text-sm">Đơn Hàng Gần Đây</h3>
            <a href="/admin/orders" className="text-xs text-red-600 hover:underline">Xem tất cả</a>
          </div>
          <div className="divide-y divide-gray-50">
            {recentOrders.slice(0, 6).map(o => (
              <div key={o.id} className="px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div>
                  <div className="text-xs font-semibold text-gray-900">{o.id}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{o.customer}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-gray-900">{fmtVnd(o.total)}₫</div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${statusConfig[o.status].color}`}>
                    {statusConfig[o.status].label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 text-sm">Sản Phẩm Bán Chạy</h3>
            <a href="/admin/products" className="text-xs text-red-600 hover:underline">Xem tất cả</a>
          </div>
          <div className="divide-y divide-gray-50">
            {topProducts.map((p, i) => (
              <div key={p.id} className="px-5 py-3 flex items-center gap-3">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${i === 0 ? 'bg-yellow-400 text-white' : i === 1 ? 'bg-gray-300 text-gray-700' : i === 2 ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {i + 1}
                </span>
                <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-gray-900 truncate">{p.name}</div>
                  <div className="text-[10px] text-gray-400">{p.category} · {p.sold} đã bán</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs font-semibold text-gray-900">{fmtVnd(p.revenue)}₫</div>
                  <div className={`text-[10px] ${p.stock < 20 ? 'text-red-500' : 'text-gray-400'}`}>Còn {p.stock}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

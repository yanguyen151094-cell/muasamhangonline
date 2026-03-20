import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { revenueData, topProducts, adminStats } from '../../../mocks/adminData';
import { useAdminAuth } from '../../../hooks/useAdminAuth';

const fmt = (n: number) => new Intl.NumberFormat('vi-VN').format(n);
const fmtVnd = (n: number) => {
  if (n >= 1000000000) return (n / 1000000000).toFixed(2) + ' tỷ';
  if (n >= 1000000) return (n / 1000000).toFixed(0) + 'tr';
  return fmt(n);
};

const maxRevenue = Math.max(...revenueData.map(d => d.revenue));

const categoryRevenue = [
  { name: 'Điện Thoại', value: 720000000, percent: 78 },
  { name: 'Làm Đẹp', value: 241500000, percent: 65 },
  { name: 'Sức Khỏe', value: 93600000, percent: 42 },
  { name: 'Thời Trang', value: 105000000, percent: 35 },
  { name: 'Nhà Cửa', value: 63000000, percent: 28 },
  { name: 'Giáo Dục', value: 56000000, percent: 22 },
];

const colors = ['bg-red-500', 'bg-pink-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400', 'bg-teal-400'];

export default function AdminReportsPage() {
  const { can } = useAdminAuth();
  const canExport = can('reports_export');
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');

  const totalRevenue = revenueData.reduce((s, d) => s + d.revenue, 0);
  const totalOrders = revenueData.reduce((s, d) => s + d.orders, 0);
  const avgOrderValue = Math.round(totalRevenue / totalOrders);

  return (
    <AdminLayout title="Báo Cáo & Thống Kê" subtitle="Phân tích doanh thu, đơn hàng và hiệu suất bán hàng">
      {/* Period selector */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
          {(['week', 'month', 'year'] as const).map(p => (
            <button key={p} onClick={() => setPeriod(p)} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${period === p ? 'bg-white text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
              {p === 'week' ? 'Tuần này' : p === 'month' ? 'Tháng này' : 'Năm 2025'}
            </button>
          ))}
        </div>
        {canExport ? (
          <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer whitespace-nowrap">
            <div className="w-4 h-4 flex items-center justify-center"><i className="ri-download-2-line text-sm"></i></div>
            Xuất báo cáo
          </button>
        ) : (
          <div className="flex items-center gap-2 border border-gray-100 rounded-lg px-4 py-2 text-sm text-gray-300 cursor-not-allowed whitespace-nowrap">
            <div className="w-4 h-4 flex items-center justify-center"><i className="ri-lock-line text-sm"></i></div>
            Xuất báo cáo (Cần Cấp 1)
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        {[
          { label: 'Tổng Doanh Thu', value: fmtVnd(totalRevenue) + '₫', sub: '+12.4% so với kỳ trước', icon: 'ri-money-dollar-circle-line', color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Tổng Đơn Hàng', value: fmt(totalOrders), sub: `${fmt(Math.round(totalOrders / 12))} đơn/tháng TB`, icon: 'ri-shopping-cart-2-line', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Giá Trị TB/Đơn', value: fmtVnd(avgOrderValue) + '₫', sub: '+5.2% so với kỳ trước', icon: 'ri-price-tag-3-line', color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Khách Mới', value: fmt(adminStats.totalCustomers), sub: '+5.3% tháng qua', icon: 'ri-user-add-line', color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-gray-100">
            <div className={`w-10 h-10 ${s.bg} rounded-lg flex items-center justify-center mb-3`}>
              <i className={`${s.icon} ${s.color} text-xl`}></i>
            </div>
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            <div className="text-gray-500 text-xs mt-1">{s.label}</div>
            <div className="text-green-600 text-[10px] mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5 mb-8">
        {/* Revenue Chart */}
        <div className="col-span-2 bg-white rounded-xl p-5 border border-gray-100">
          <h3 className="font-bold text-gray-900 text-sm mb-5">Doanh Thu & Đơn Hàng Theo Tháng</h3>
          <div className="flex items-end gap-2 h-48 mb-2">
            {revenueData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1 group">
                <div className="w-full flex flex-col items-center gap-0.5">
                  <div
                    className="w-full bg-red-100 rounded-t-sm group-hover:bg-red-200 transition-colors relative cursor-pointer"
                    style={{ height: `${(d.orders / Math.max(...revenueData.map(x => x.orders))) * 60}px` }}
                  >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] text-gray-400 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                      {d.orders} đơn
                    </div>
                  </div>
                  <div
                    className="w-full bg-red-500 rounded-t group-hover:bg-red-600 transition-colors relative cursor-pointer"
                    style={{ height: `${(d.revenue / maxRevenue) * 120}px` }}
                  >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-10">
                      {fmtVnd(d.revenue)}₫
                    </div>
                  </div>
                </div>
                <span className="text-[9px] text-gray-400">{d.month}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-red-500 rounded-sm"></div><span className="text-xs text-gray-500">Doanh thu</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-red-100 rounded-sm"></div><span className="text-xs text-gray-500">Đơn hàng</span></div>
          </div>
        </div>

        {/* Category Revenue */}
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <h3 className="font-bold text-gray-900 text-sm mb-4">Doanh Thu Theo Danh Mục</h3>
          <div className="space-y-3">
            {categoryRevenue.map((c, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${colors[i]}`}></div>
                    <span className="text-gray-700 font-medium">{c.name}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{fmtVnd(c.value)}₫</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${colors[i]} rounded-full`} style={{ width: `${c.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-sm">Top Sản Phẩm Bán Chạy</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase w-8">#</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Sản phẩm</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Danh mục</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Đã bán</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Doanh thu</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Còn kho</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {topProducts.map((p, i) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${i === 0 ? 'bg-yellow-400 text-white' : i === 1 ? 'bg-gray-300 text-gray-700' : i === 2 ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {i + 1}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-900">{p.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-600">{p.category}</td>
                <td className="px-4 py-3 text-right text-sm font-semibold text-gray-900">{fmt(p.sold)}</td>
                <td className="px-4 py-3 text-right text-sm font-semibold text-green-700">{fmtVnd(p.revenue)}₫</td>
                <td className="px-4 py-3 text-right">
                  <span className={`text-sm font-medium ${p.stock < 20 ? 'text-red-500' : 'text-gray-900'}`}>{p.stock}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { recentOrders } from '../../../mocks/adminData';
import { useAdminAuth } from '../../../hooks/useAdminAuth';

const fmt = (n: number) => new Intl.NumberFormat('vi-VN').format(n);

const statusConfig: Record<string, { label: string; color: string; icon: string }> = {
  new: { label: 'Mới', color: 'bg-blue-100 text-blue-700', icon: 'ri-inbox-line' },
  processing: { label: 'Đang xử lý', color: 'bg-yellow-100 text-yellow-700', icon: 'ri-loader-4-line' },
  delivered: { label: 'Đã giao', color: 'bg-green-100 text-green-700', icon: 'ri-checkbox-circle-line' },
  cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-700', icon: 'ri-close-circle-line' },
};

type Order = typeof recentOrders[0] & { payStatus?: string };

export default function AdminOrdersPage() {
  const { can } = useAdminAuth();
  const canCancel = can('orders_cancel');
  const canRefund = can('orders_refund');
  const canExport = can('orders_export');

  const [orders, setOrders] = useState<Order[]>(
    recentOrders.map((o, i) => ({
      ...o,
      payStatus: o.payment === 'COD' ? 'pending' : i % 5 === 3 ? 'refunded' : 'paid',
    })),
  );
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [toast, setToast] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast(msg);
    setToastType(type);
    setTimeout(() => setToast(''), 3000);
  };

  const filtered = orders.filter((o) => {
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.phone.includes(search);
    return matchStatus && matchSearch;
  });

  const updateStatus = (id: string, status: string) => {
    // Restrict cancel for admin2
    if (status === 'cancelled' && !canCancel) {
      showToast('Admin Cấp 2 không có quyền hủy đơn hàng!', 'error');
      return;
    }
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    if (selectedOrder?.id === id) setSelectedOrder((prev) => (prev ? { ...prev, status } : null));
    showToast('Cập nhật trạng thái thành công!');
  };

  const stats = {
    all: orders.length,
    new: orders.filter((o) => o.status === 'new').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
    cancelled: orders.filter((o) => o.status === 'cancelled').length,
  };

  // Allowed status transitions for admin2 (cannot set to cancelled/refunded)
  const allowedStatuses = (currentStatus: string): string[] => {
    if (canCancel) return Object.keys(statusConfig);
    // admin2: can only move forward, not cancel
    const flow = ['new', 'processing', 'delivered'];
    const idx = flow.indexOf(currentStatus);
    if (idx === -1) return ['new', 'processing', 'delivered'];
    return flow;
  };

  return (
    <AdminLayout title="Quản Lý Đơn Hàng" subtitle="Xem, cập nhật và theo dõi tất cả đơn hàng">
      {toast && (
        <div className={`fixed top-5 right-5 text-white text-sm px-4 py-3 rounded-lg z-50 flex items-center gap-2 ${toastType === 'error' ? 'bg-red-600' : 'bg-gray-900'}`}>
          <i className={`text-base ${toastType === 'error' ? 'ri-error-warning-line text-white' : 'ri-checkbox-circle-line text-green-400'}`}></i>
          {toast}
        </div>
      )}

      {/* Permission notice for admin2 */}
      {!canCancel && (
        <div className="mb-4 flex items-center gap-2 px-4 py-3 bg-orange-50 border border-orange-200 rounded-lg text-orange-700 text-xs">
          <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
            <i className="ri-information-line text-sm"></i>
          </div>
          <span>Admin Cấp 2: Chỉ cập nhật trạng thái (mới → xử lý → đã giao). Không hủy đơn, không hoàn tiền, không xuất hóa đơn.</span>
        </div>
      )}

      {/* Status pills */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {[
          { key: 'all', label: 'Tất cả', count: stats.all },
          { key: 'new', label: 'Mới', count: stats.new },
          { key: 'processing', label: 'Đang xử lý', count: stats.processing },
          { key: 'delivered', label: 'Đã giao', count: stats.delivered },
          { key: 'cancelled', label: 'Đã hủy', count: stats.cancelled },
        ].map((s) => (
          <button
            key={s.key}
            onClick={() => setStatusFilter(s.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap border ${statusFilter === s.key ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
          >
            {s.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${statusFilter === s.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>{s.count}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-5">
        {/* Order list */}
        <div className="flex-1">
          <div className="mb-4 relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
              <i className="ri-search-line text-gray-400 text-sm"></i>
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm mã đơn, khách hàng, SĐT..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-400"
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Mã đơn</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Khách hàng</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Tổng tiền</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Thanh toán</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Trạng thái</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Ngày</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((o) => (
                  <tr
                    key={o.id}
                    onClick={() => setSelectedOrder(o)}
                    className={`hover:bg-gray-50 transition-colors cursor-pointer ${selectedOrder?.id === o.id ? 'bg-red-50' : ''}`}
                  >
                    <td className="px-5 py-3 font-mono text-xs font-semibold text-gray-900">{o.id}</td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-gray-900">{o.customer}</div>
                      <div className="text-[10px] text-gray-400">{o.phone}</div>
                    </td>
                    <td className="px-4 py-3 text-right text-sm font-semibold text-gray-900">{fmt(o.total)}₫</td>
                    <td className="px-4 py-3 text-center text-[10px] text-gray-600">{o.payment}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${statusConfig[o.status]?.color}`}>
                        {statusConfig[o.status]?.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-[10px] text-gray-400">{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-400 text-sm">Không có đơn hàng nào</div>
            )}
          </div>
        </div>

        {/* Order detail panel */}
        {selectedOrder && (
          <div className="w-72 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden sticky top-24">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <span className="font-bold text-gray-900 text-sm">{selectedOrder.id}</span>
                <button onClick={() => setSelectedOrder(null)} className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer">
                  <i className="ri-close-line text-lg"></i>
                </button>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Khách hàng</div>
                  <div className="font-semibold text-gray-900 text-sm">{selectedOrder.customer}</div>
                  <div className="text-xs text-gray-500">{selectedOrder.phone}</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Tổng tiền</div>
                    <div className="font-bold text-red-600 text-sm">{fmt(selectedOrder.total)}₫</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Số sản phẩm</div>
                    <div className="font-semibold text-gray-900 text-sm">{selectedOrder.items} sản phẩm</div>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Phương thức TT</div>
                  <div className="text-sm text-gray-900">{selectedOrder.payment}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-2">Cập nhật trạng thái</div>
                  <div className="space-y-1.5">
                    {Object.entries(statusConfig)
                      .filter(([key]) => allowedStatuses(selectedOrder.status).includes(key))
                      .map(([key, val]) => {
                        const isLocked = key === 'cancelled' && !canCancel;
                        return (
                          <button
                            key={key}
                            onClick={() => !isLocked && updateStatus(selectedOrder.id, key)}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors whitespace-nowrap ${isLocked ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer'} ${selectedOrder.status === key ? val.color + ' font-semibold' : isLocked ? '' : 'text-gray-600 hover:bg-gray-50'}`}
                          >
                            <div className="w-4 h-4 flex items-center justify-center">
                              <i className={`${isLocked ? 'ri-lock-line' : val.icon} text-sm`}></i>
                            </div>
                            {val.label}
                            {isLocked && <span className="ml-auto text-[9px] text-gray-300">Cần Cấp 1</span>}
                            {selectedOrder.status === key && !isLocked && (
                              <div className="w-3 h-3 flex items-center justify-center ml-auto">
                                <i className="ri-check-line text-xs"></i>
                              </div>
                            )}
                          </button>
                        );
                      })}
                  </div>
                </div>

                {/* Refund button — admin1 only */}
                {canRefund && (
                  <button
                    onClick={() => showToast('Đã khởi tạo yêu cầu hoàn tiền!')}
                    className="w-full flex items-center justify-center gap-2 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-lg py-2.5 text-xs font-medium cursor-pointer whitespace-nowrap transition-colors"
                  >
                    <div className="w-4 h-4 flex items-center justify-center"><i className="ri-refund-2-line text-sm"></i></div>
                    Hoàn Tiền
                  </button>
                )}

                {/* Export invoice */}
                {canExport ? (
                  <button className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg py-2.5 text-xs font-medium cursor-pointer whitespace-nowrap transition-colors">
                    <div className="w-4 h-4 flex items-center justify-center"><i className="ri-printer-line text-sm"></i></div>
                    In hóa đơn
                  </button>
                ) : (
                  <div className="w-full flex items-center justify-center gap-2 bg-gray-50 text-gray-300 rounded-lg py-2.5 text-xs font-medium cursor-not-allowed whitespace-nowrap">
                    <div className="w-4 h-4 flex items-center justify-center"><i className="ri-lock-line text-sm"></i></div>
                    In hóa đơn (Cần Cấp 1)
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

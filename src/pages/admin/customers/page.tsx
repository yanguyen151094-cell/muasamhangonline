import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { customers } from '../../../mocks/adminData';
import { useAdminAuth } from '../../../hooks/useAdminAuth';

const fmt = (n: number) => new Intl.NumberFormat('vi-VN').format(n);
const fmtVnd = (n: number) => {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'tr';
  return fmt(n);
};

const tierConfig: Record<string, { label: string; color: string; icon: string }> = {
  vip: { label: 'VIP', color: 'bg-yellow-100 text-yellow-700', icon: 'ri-vip-crown-2-line' },
  regular: { label: 'Thường xuyên', color: 'bg-blue-100 text-blue-700', icon: 'ri-user-star-line' },
  new: { label: 'Mới', color: 'bg-green-100 text-green-700', icon: 'ri-user-add-line' },
};

const statusConfig: Record<string, { label: string; color: string }> = {
  active: { label: 'Hoạt động', color: 'bg-green-100 text-green-700' },
  inactive: { label: 'Không HĐ', color: 'bg-gray-100 text-gray-600' },
  blocked: { label: 'Bị khóa', color: 'bg-red-100 text-red-600' },
};

type Customer = typeof customers[0] & { tier: string; status: string };

export default function AdminCustomersPage() {
  const { can } = useAdminAuth();
  const canEdit = can('customers_edit');
  const canDelete = can('customers_delete');
  const canChangeVIP = can('customers_change_vip');
  const canNotify = can('customers_notify');

  const [customerList, setCustomerList] = useState<Customer[]>(customers as Customer[]);
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [selected, setSelected] = useState<Customer | null>(null);
  const [showNotify, setShowNotify] = useState(false);
  const [notifyMsg, setNotifyMsg] = useState('');
  const [toast, setToast] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast(msg);
    setToastType(type);
    setTimeout(() => setToast(''), 3000);
  };

  const handleDeleteCustomer = (id: number) => {
    setCustomerList((prev) => prev.filter((c) => c.id !== id));
    setSelected(null);
    setDeleteConfirm(null);
    showToast('Đã xóa khách hàng!');
  };

  const handleChangeVIP = (id: number, tier: string) => {
    if (!canChangeVIP) {
      showToast('Admin Cấp 2 không có quyền thay đổi phân loại VIP!', 'error');
      return;
    }
    setCustomerList((prev) => prev.map((c) => (c.id === id ? { ...c, tier } : c)));
    if (selected?.id === id) setSelected((prev) => (prev ? { ...prev, tier } : null));
    showToast('Cập nhật phân loại thành công!');
  };

  const filtered = customerList.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search);
    const matchTier = tierFilter === 'all' || c.tier === tierFilter;
    return matchSearch && matchTier;
  });

  const stats = {
    total: customerList.length,
    vip: customerList.filter((c) => c.tier === 'vip').length,
    regular: customerList.filter((c) => c.tier === 'regular').length,
    new: customerList.filter((c) => c.tier === 'new').length,
  };

  return (
    <AdminLayout title="Quản Lý Khách Hàng" subtitle="Xem thông tin, phân loại và theo dõi khách hàng">
      {toast && (
        <div className={`fixed top-5 right-5 text-white text-sm px-4 py-3 rounded-lg z-50 flex items-center gap-2 ${toastType === 'error' ? 'bg-red-600' : 'bg-gray-900'}`}>
          <i className={`text-base ${toastType === 'error' ? 'ri-error-warning-line' : 'ri-checkbox-circle-line text-green-400'}`}></i>
          {toast}
        </div>
      )}

      {/* Permission notice for admin2 */}
      {!canEdit && (
        <div className="mb-4 flex items-center gap-2 px-4 py-3 bg-orange-50 border border-orange-200 rounded-lg text-orange-700 text-xs">
          <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
            <i className="ri-information-line text-sm"></i>
          </div>
          <span>Admin Cấp 2: Chỉ xem thông tin và gửi thông báo. Không xóa khách hàng, không thay đổi phân loại VIP.</span>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Tổng khách', value: stats.total, icon: 'ri-group-line', color: 'text-gray-700', bg: 'bg-gray-100' },
          { label: 'Khách VIP', value: stats.vip, icon: 'ri-vip-crown-2-line', color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Thường xuyên', value: stats.regular, icon: 'ri-user-star-line', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Khách mới', value: stats.new, icon: 'ri-user-add-line', color: 'text-green-600', bg: 'bg-green-50' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-4">
            <div className={`w-10 h-10 ${s.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <i className={`${s.icon} ${s.color} text-xl`}></i>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-5">
        {/* List */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-sm">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
                <i className="ri-search-line text-gray-400 text-sm"></i>
              </div>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm tên, email, SĐT..."
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-400"
              />
            </div>
            <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
              {[
                { key: 'all', label: 'Tất cả' },
                { key: 'vip', label: 'VIP' },
                { key: 'regular', label: 'Thường xuyên' },
                { key: 'new', label: 'Mới' },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTierFilter(t.key)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${tierFilter === t.key ? 'bg-white text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Khách hàng</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Phân loại</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Đơn hàng</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Tổng chi</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Đơn cuối</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Trạng thái</th>
                  {canDelete && <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Xóa</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => setSelected(c)}
                    className={`hover:bg-gray-50 transition-colors cursor-pointer ${selected?.id === c.id ? 'bg-red-50' : ''}`}
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{c.name}</div>
                          <div className="text-[10px] text-gray-400">{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${tierConfig[c.tier]?.color}`}>
                        <i className={`${tierConfig[c.tier]?.icon} mr-1`}></i>
                        {tierConfig[c.tier]?.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm font-semibold text-gray-900">{c.totalOrders}</td>
                    <td className="px-4 py-3 text-right text-sm font-semibold text-gray-900">{fmtVnd(c.totalSpent)}₫</td>
                    <td className="px-4 py-3 text-center text-xs text-gray-500">{c.lastOrder}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${statusConfig[c.status]?.color}`}>
                        {statusConfig[c.status]?.label}
                      </span>
                    </td>
                    {canDelete && (
                      <td className="px-4 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setDeleteConfirm(c.id)}
                          className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer mx-auto"
                        >
                          <i className="ri-delete-bin-line text-sm"></i>
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden sticky top-24">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <span className="font-bold text-gray-900 text-sm">Chi tiết</span>
                <button onClick={() => setSelected(null)} className="w-6 h-6 flex items-center justify-center text-gray-400 cursor-pointer">
                  <i className="ri-close-line text-lg"></i>
                </button>
              </div>
              <div className="p-4">
                <div className="text-center mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-2">
                    {selected.name.charAt(0)}
                  </div>
                  <div className="font-bold text-gray-900 text-sm">{selected.name}</div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${tierConfig[selected.tier]?.color}`}>
                    {tierConfig[selected.tier]?.label}
                  </span>
                </div>

                {/* Change VIP — admin1 only */}
                {canChangeVIP && (
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-2">Thay đổi phân loại</div>
                    <div className="flex gap-1">
                      {['vip', 'regular', 'new'].map((tier) => (
                        <button
                          key={tier}
                          onClick={() => handleChangeVIP(selected.id, tier)}
                          className={`flex-1 py-1.5 rounded-lg text-[9px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${selected.tier === tier ? tierConfig[tier].color : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        >
                          {tierConfig[tier].label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-3 text-xs">
                  {[
                    { icon: 'ri-mail-line', label: 'Email', value: selected.email },
                    { icon: 'ri-phone-line', label: 'Điện thoại', value: selected.phone },
                    { icon: 'ri-calendar-line', label: 'Tham gia', value: selected.joined },
                    { icon: 'ri-shopping-cart-2-line', label: 'Tổng đơn', value: `${selected.totalOrders} đơn` },
                    { icon: 'ri-money-dollar-circle-line', label: 'Tổng chi', value: `${fmt(selected.totalSpent)}₫` },
                  ].map((row, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-5 h-5 flex items-center justify-center text-gray-400 flex-shrink-0 mt-0.5">
                        <i className={`${row.icon} text-sm`}></i>
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-400">{row.label}</div>
                        <div className="text-gray-900 font-medium break-all">{row.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {canNotify && (
                  <button
                    onClick={() => setShowNotify(true)}
                    className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white text-xs font-medium py-2.5 rounded-lg cursor-pointer whitespace-nowrap transition-colors flex items-center justify-center gap-2"
                  >
                    <div className="w-4 h-4 flex items-center justify-center"><i className="ri-send-plane-line text-sm"></i></div>
                    Gửi thông báo
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Notify Modal */}
      {showNotify && selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">Gửi Thông Báo</h3>
              <button onClick={() => setShowNotify(false)} className="w-8 h-8 flex items-center justify-center text-gray-400 cursor-pointer">
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Gửi đến</label>
                <input readOnly value={selected.email} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 text-gray-500" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Nội dung tin nhắn</label>
                <textarea
                  value={notifyMsg}
                  onChange={(e) => setNotifyMsg(e.target.value.slice(0, 500))}
                  rows={4}
                  maxLength={500}
                  placeholder="Nhập nội dung thông báo..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-red-400 resize-none"
                />
                <div className="text-right text-xs text-gray-400 mt-1">{notifyMsg.length}/500</div>
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={() => setShowNotify(false)} className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer whitespace-nowrap">Hủy</button>
              <button
                onClick={() => { setShowNotify(false); setNotifyMsg(''); showToast('Đã gửi thông báo thành công!'); }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg py-2.5 text-sm font-medium cursor-pointer whitespace-nowrap"
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm !== null && canDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-sm p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-user-unfollow-line text-red-600 text-2xl"></i>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Xóa khách hàng?</h3>
            <p className="text-gray-500 text-sm mb-5">Hành động này không thể hoàn tác. Toàn bộ lịch sử mua hàng sẽ bị xóa.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer whitespace-nowrap">Hủy</button>
              <button onClick={() => handleDeleteCustomer(deleteConfirm)} className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg py-2.5 text-sm font-medium cursor-pointer whitespace-nowrap">Xóa</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

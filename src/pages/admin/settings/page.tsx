import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { adminUsers, accessLogs } from '../../../mocks/adminData';
import { useAdminAuth } from '../../../hooks/useAdminAuth';
import {
  getPendingAccounts,
  getPendingCount,
  approveAccount,
  rejectAccount,
  type PendingAccount,
} from '../../../utils/adminAccountStorage';

const roleMap: Record<string, { label: string; color: string }> = {
  super_admin: { label: 'Super Admin', color: 'bg-red-100 text-red-700' },
  manager: { label: 'Quản lý', color: 'bg-purple-100 text-purple-700' },
  order_staff: { label: 'Xử lý đơn', color: 'bg-blue-100 text-blue-700' },
  content_staff: { label: 'Nội dung', color: 'bg-green-100 text-green-700' },
  product_staff: { label: 'Sản phẩm', color: 'bg-orange-100 text-orange-700' },
};

const payMethods = [
  { id: 1, name: 'Thanh toán khi nhận hàng (COD)', icon: 'ri-hand-coin-line', enabled: true },
  { id: 2, name: 'Chuyển khoản ngân hàng', icon: 'ri-bank-line', enabled: true },
  { id: 3, name: 'Ví MoMo', icon: 'ri-wallet-3-line', enabled: true },
  { id: 4, name: 'VNPay', icon: 'ri-secure-payment-line', enabled: true },
  { id: 5, name: 'ZaloPay', icon: 'ri-money-cny-box-line', enabled: false },
  { id: 6, name: 'Thẻ tín dụng / Visa', icon: 'ri-bank-card-line', enabled: false },
];

const shippingPartners = [
  { id: 1, name: 'GHN - Giao Hàng Nhanh', fee: 25000, enabled: true },
  { id: 2, name: 'GHTK - Giao Hàng Tiết Kiệm', fee: 22000, enabled: true },
  { id: 3, name: 'J&T Express', fee: 20000, enabled: false },
  { id: 4, name: 'Viettel Post', fee: 18000, enabled: false },
];

export default function AdminSettingsPage() {
  const { auth } = useAdminAuth();
  const [tab, setTab] = useState<'accounts' | 'requests' | 'payment' | 'security'>('accounts');
  const [pendingList, setPendingList] = useState<PendingAccount[]>(() => getPendingAccounts());
  const [pendingCount, setPendingCount] = useState(() => getPendingCount());
  const [payToggle, setPayToggle] = useState<Record<number, boolean>>(
    payMethods.reduce((a, m) => ({ ...a, [m.id]: m.enabled }), {})
  );
  const [shipToggle, setShipToggle] = useState<Record<number, boolean>>(
    shippingPartners.reduce((a, p) => ({ ...a, [p.id]: p.enabled }), {})
  );
  const [showAddUser, setShowAddUser] = useState(false);
  const [showChangePw, setShowChangePw] = useState(false);
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });
  const [toast, setToast] = useState('');
  const [twoFA, setTwoFA] = useState(false);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };
  const fmt = (n: number) => new Intl.NumberFormat('vi-VN').format(n);

  const handleApprove = (id: string) => {
    approveAccount(id, auth?.name ?? 'Admin');
    const updated = getPendingAccounts();
    setPendingList(updated);
    setPendingCount(updated.filter((a) => a.status === 'pending').length);
    showToast('Đã phê duyệt tài khoản thành công!');
  };

  const handleReject = (id: string) => {
    rejectAccount(id, auth?.name ?? 'Admin');
    const updated = getPendingAccounts();
    setPendingList(updated);
    setPendingCount(updated.filter((a) => a.status === 'pending').length);
    showToast('Đã từ chối yêu cầu đăng ký.');
  };

  return (
    <AdminLayout title="Cài Đặt & Bảo Mật" subtitle="Quản lý tài khoản nhân viên, phân quyền và bảo mật hệ thống" requiredPermission="settings_access">
      {toast && (
        <div className="fixed top-5 right-5 bg-gray-900 text-white text-sm px-4 py-3 rounded-lg z-50 flex items-center gap-2">
          <i className="ri-checkbox-circle-line text-green-400 text-base"></i>
          {toast}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit mb-6">
        {([
          { key: 'accounts', label: 'Tài Khoản & Phân Quyền', icon: 'ri-team-line' },
          { key: 'requests', label: 'Yêu Cầu Đăng Ký', icon: 'ri-user-received-line', badge: pendingCount },
          { key: 'payment', label: 'Thanh Toán & Vận Chuyển', icon: 'ri-bank-card-line' },
          { key: 'security', label: 'Bảo Mật', icon: 'ri-shield-check-line' },
        ] as const).map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`relative flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${tab === t.key ? 'bg-white text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <i className={`${t.icon} text-sm`}></i>
            </div>
            {t.label}
            {('badge' in t) && (t as { badge?: number }).badge! > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] flex items-center justify-center font-bold">
                {(t as { badge?: number }).badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* === TAB: REGISTRATION REQUESTS === */}
      {tab === 'requests' && (
        <div className="space-y-5">
          {pendingList.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-16 text-center">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="ri-user-received-line text-gray-400 text-3xl"></i>
              </div>
              <p className="text-gray-500 text-sm font-medium">Chưa có yêu cầu đăng ký nào</p>
              <p className="text-gray-400 text-xs mt-1">Các yêu cầu từ Admin Cấp 2 sẽ xuất hiện ở đây</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-sm">Yêu Cầu Đăng Ký Admin Cấp 2</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{pendingList.filter((a) => a.status === 'pending').length} đang chờ</span>
                  {pendingCount > 0 && (
                    <span className="bg-red-100 text-red-600 text-[10px] px-2 py-0.5 rounded-full font-semibold">Cần duyệt</span>
                  )}
                </div>
              </div>
              <div className="divide-y divide-gray-50">
                {pendingList.map((acc) => (
                  <div key={acc.id} className="p-5 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {acc.name.charAt(0)}
                      </div>
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-gray-900 text-sm">{acc.name}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                            acc.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            acc.status === 'approved' ? 'bg-green-100 text-green-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {acc.status === 'pending' ? 'Đang chờ' : acc.status === 'approved' ? 'Đã duyệt' : 'Từ chối'}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <i className="ri-mail-line text-[10px]"></i>{acc.email}
                          </span>
                          {acc.phone && (
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <i className="ri-phone-line text-[10px]"></i>{acc.phone}
                            </span>
                          )}
                        </div>
                        {acc.reason && (
                          <div className="mt-2 text-xs text-gray-600 bg-gray-100 rounded-lg px-3 py-2">
                            <span className="font-medium text-gray-500">Lý do: </span>{acc.reason}
                          </div>
                        )}
                        <div className="mt-2 text-[10px] text-gray-400">
                          Gửi lúc: {new Date(acc.submittedAt).toLocaleString('vi-VN')}
                          {acc.reviewedAt && acc.reviewedBy && (
                            <span className="ml-3">• Duyệt bởi: {acc.reviewedBy} lúc {new Date(acc.reviewedAt).toLocaleString('vi-VN')}</span>
                          )}
                        </div>
                      </div>
                      {/* Actions */}
                      {acc.status === 'pending' && (
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleApprove(acc.id)}
                            className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-xs font-medium cursor-pointer whitespace-nowrap transition-colors"
                          >
                            <div className="w-3 h-3 flex items-center justify-center">
                              <i className="ri-check-line text-xs"></i>
                            </div>
                            Phê duyệt
                          </button>
                          <button
                            onClick={() => handleReject(acc.id)}
                            className="flex items-center gap-1.5 bg-gray-200 hover:bg-red-100 text-gray-600 hover:text-red-600 px-3 py-2 rounded-lg text-xs font-medium cursor-pointer whitespace-nowrap transition-colors"
                          >
                            <div className="w-3 h-3 flex items-center justify-center">
                              <i className="ri-close-line text-xs"></i>
                            </div>
                            Từ chối
                          </button>
                        </div>
                      )}
                      {acc.status !== 'pending' && (
                        <div className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium flex-shrink-0 ${acc.status === 'approved' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                          <div className="w-3 h-3 flex items-center justify-center">
                            <i className={`text-xs ${acc.status === 'approved' ? 'ri-checkbox-circle-line' : 'ri-close-circle-line'}`}></i>
                          </div>
                          {acc.status === 'approved' ? 'Đã duyệt' : 'Đã từ chối'}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'accounts' && (
        <div className="space-y-5">
          <div className="flex justify-end">
            <button onClick={() => setShowAddUser(true)} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium cursor-pointer whitespace-nowrap">
              <div className="w-4 h-4 flex items-center justify-center"><i className="ri-user-add-line text-base"></i></div>
              Thêm tài khoản
            </button>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Nhân viên</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Vai trò</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Trạng thái</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Đăng nhập gần nhất</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {adminUsers.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{u.name}</div>
                          <div className="text-[10px] text-gray-400">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${roleMap[u.role]?.color}`}>
                        {roleMap[u.role]?.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${u.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {u.status === 'active' ? 'Hoạt động' : 'Tắt'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-xs text-gray-400">{u.lastLogin}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => showToast('Đã cập nhật thông tin!')} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md cursor-pointer">
                          <i className="ri-edit-line text-sm"></i>
                        </button>
                        {u.role !== 'super_admin' && (
                          <button onClick={() => showToast('Đã xóa tài khoản!')} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md cursor-pointer">
                            <i className="ri-delete-bin-line text-sm"></i>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Permissions Matrix */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 text-sm mb-4">Ma Trận Phân Quyền</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr>
                    <th className="text-left py-2 pr-4 text-gray-500 font-semibold">Chức năng</th>
                    {Object.entries(roleMap).map(([key, val]) => (
                      <th key={key} className="text-center py-2 px-3 text-gray-500 font-semibold whitespace-nowrap">{val.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { name: 'Quản lý sản phẩm', roles: ['super_admin', 'manager', 'product_staff'] },
                    { name: 'Quản lý đơn hàng', roles: ['super_admin', 'manager', 'order_staff'] },
                    { name: 'Quản lý khách hàng', roles: ['super_admin', 'manager', 'order_staff'] },
                    { name: 'Quản lý nội dung', roles: ['super_admin', 'manager', 'content_staff'] },
                    { name: 'Xem báo cáo', roles: ['super_admin', 'manager'] },
                    { name: 'Cài đặt hệ thống', roles: ['super_admin'] },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="py-2.5 pr-4 text-gray-700 font-medium">{row.name}</td>
                      {Object.keys(roleMap).map(role => (
                        <td key={role} className="text-center py-2.5 px-3">
                          {row.roles.includes(role) ? (
                            <div className="w-5 h-5 flex items-center justify-center mx-auto"><i className="ri-checkbox-circle-fill text-green-500 text-base"></i></div>
                          ) : (
                            <div className="w-5 h-5 flex items-center justify-center mx-auto"><i className="ri-close-circle-line text-gray-200 text-base"></i></div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === 'payment' && (
        <div className="grid grid-cols-2 gap-5">
          {/* Payment Methods */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 text-sm mb-4">Phương Thức Thanh Toán</h3>
            <div className="space-y-3">
              {payMethods.map(m => (
                <div key={m.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className={`${m.icon} text-gray-600 text-base`}></i>
                    </div>
                    <span className="text-sm text-gray-700">{m.name}</span>
                  </div>
                  <button
                    onClick={() => { setPayToggle(p => ({ ...p, [m.id]: !p[m.id] })); showToast('Đã cập nhật!'); }}
                    className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer flex-shrink-0 ${payToggle[m.id] ? 'bg-green-500' : 'bg-gray-200'}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${payToggle[m.id] ? 'left-6' : 'left-1'}`}></span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 text-sm mb-4">Đơn Vị Vận Chuyển</h3>
            <div className="space-y-3">
              {shippingPartners.map(p => (
                <div key={p.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="ri-truck-line text-gray-600 text-base"></i>
                    </div>
                    <div>
                      <div className="text-sm text-gray-700">{p.name}</div>
                      <div className="text-[10px] text-gray-400">Phí cơ bản: {fmt(p.fee)}₫</div>
                    </div>
                  </div>
                  <button
                    onClick={() => { setShipToggle(prev => ({ ...prev, [p.id]: !prev[p.id] })); showToast('Đã cập nhật!'); }}
                    className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer flex-shrink-0 ${shipToggle[p.id] ? 'bg-green-500' : 'bg-gray-200'}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${shipToggle[p.id] ? 'left-6' : 'left-1'}`}></span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'security' && (
        <div className="space-y-5">
          {/* Security Actions */}
          <div className="grid grid-cols-2 gap-5">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <i className="ri-lock-password-line text-blue-600 text-xl"></i>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">Đổi Mật Khẩu</h3>
                  <p className="text-xs text-gray-500">Cập nhật mật khẩu đăng nhập</p>
                </div>
              </div>
              <button onClick={() => setShowChangePw(true)} className="w-full border border-gray-200 rounded-lg py-2.5 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer whitespace-nowrap">Đổi mật khẩu</button>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <i className="ri-shield-keyhole-line text-green-600 text-xl"></i>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">Xác Thực 2 Lớp (2FA)</h3>
                  <p className="text-xs text-gray-500">Bảo mật thêm cho tài khoản</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${twoFA ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
                  {twoFA ? 'Đã bật' : 'Chưa bật'}
                </span>
                <button
                  onClick={() => { setTwoFA(!twoFA); showToast(twoFA ? 'Đã tắt 2FA!' : 'Đã bật 2FA!'); }}
                  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${twoFA ? 'bg-green-500' : 'bg-gray-200'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${twoFA ? 'left-6' : 'left-1'}`}></span>
                </button>
              </div>
            </div>
          </div>

          {/* Access Logs */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-sm">Nhật Ký Truy Cập</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Tài khoản</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Hành động</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">IP</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Thời gian</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Kết quả</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {accessLogs.map(log => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 text-xs text-gray-700 font-medium">{log.user}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{log.action}</td>
                    <td className="px-4 py-3 text-center font-mono text-xs text-gray-500">{log.ip}</td>
                    <td className="px-4 py-3 text-center text-xs text-gray-400">{log.time}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${log.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {log.status === 'success' ? 'Thành công' : 'Thất bại'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePw && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">Đổi Mật Khẩu</h3>
              <button onClick={() => setShowChangePw(false)} className="w-8 h-8 flex items-center justify-center text-gray-400 cursor-pointer">
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              {[
                { label: 'Mật khẩu hiện tại', key: 'current' },
                { label: 'Mật khẩu mới', key: 'newPw' },
                { label: 'Xác nhận mật khẩu mới', key: 'confirm' },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">{f.label}</label>
                  <input type="password" value={pwForm[f.key as keyof typeof pwForm]} onChange={e => setPwForm(p => ({ ...p, [f.key]: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-red-400" placeholder="••••••••" />
                </div>
              ))}
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={() => setShowChangePw(false)} className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer whitespace-nowrap">Hủy</button>
              <button onClick={() => { setShowChangePw(false); setPwForm({ current: '', newPw: '', confirm: '' }); showToast('Đã đổi mật khẩu thành công!'); }} className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg py-2.5 text-sm font-medium cursor-pointer whitespace-nowrap">Lưu</button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">Thêm Tài Khoản Nhân Viên</h3>
              <button onClick={() => setShowAddUser(false)} className="w-8 h-8 flex items-center justify-center text-gray-400 cursor-pointer">
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">Họ tên</label>
                  <input className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-red-400" placeholder="Nguyễn Văn A" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">Vai trò</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-red-400 cursor-pointer">
                    {Object.entries(roleMap).filter(([k]) => k !== 'super_admin').map(([k, v]) => (
                      <option key={k} value={k}>{v.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Email</label>
                <input type="email" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-red-400" placeholder="nhanvien@yamatoshop.vn" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Mật khẩu tạm thời</label>
                <input type="password" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-red-400" placeholder="••••••••" />
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={() => setShowAddUser(false)} className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer whitespace-nowrap">Hủy</button>
              <button onClick={() => { setShowAddUser(false); showToast('Đã tạo tài khoản thành công!'); }} className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg py-2.5 text-sm font-medium cursor-pointer whitespace-nowrap">Tạo tài khoản</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

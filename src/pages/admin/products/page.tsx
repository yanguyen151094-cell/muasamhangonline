import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { adminProducts, coupons } from '../../../mocks/adminData';
import { useAdminAuth } from '../../../hooks/useAdminAuth';

const fmt = (n: number) => new Intl.NumberFormat('vi-VN').format(n);
const categories = ['Tất cả', 'Điện Thoại', 'Làm Đẹp', 'Sức Khỏe', 'Thời Trang', 'Thú Cưng', 'Nhà Cửa', 'Giáo Dục'];

const statusMap: Record<string, { label: string; color: string }> = {
  active: { label: 'Đang bán', color: 'bg-green-100 text-green-700' },
  draft: { label: 'Nháp', color: 'bg-gray-100 text-gray-600' },
  out_of_stock: { label: 'Hết hàng', color: 'bg-red-100 text-red-600' },
};

interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  originalPrice: number;
  stock: number;
  sold: number;
  status: string;
  image: string;
}

export default function AdminProductsPage() {
  const { can } = useAdminAuth();
  const [tab, setTab] = useState<'products' | 'coupons'>('products');
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('Tất cả');
  const [products, setProducts] = useState<Product[]>(adminProducts as Product[]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', sku: '', category: 'Điện Thoại', price: '', originalPrice: '', stock: '', status: 'active' });
  const [toast, setToast] = useState('');

  const canDelete = can('products_delete');
  const canEditSKU = can('products_edit_sku');
  const canEditCategory = can('products_edit_category');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === 'Tất cả' || p.category === catFilter;
    return matchSearch && matchCat;
  });

  const openAdd = () => {
    setEditProduct(null);
    setForm({ name: '', sku: '', category: 'Điện Thoại', price: '', originalPrice: '', stock: '', status: 'active' });
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setEditProduct(p);
    setForm({ name: p.name, sku: p.sku, category: p.category, price: String(p.price), originalPrice: String(p.originalPrice), stock: String(p.stock), status: p.status });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name || !form.price) return;
    if (editProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editProduct.id
            ? {
                ...p,
                name: form.name,
                price: Number(form.price),
                originalPrice: Number(form.originalPrice),
                stock: Number(form.stock),
                status: form.status,
                // Only update sku & category if permitted
                ...(canEditSKU ? { sku: form.sku } : {}),
                ...(canEditCategory ? { category: form.category } : {}),
              }
            : p,
        ),
      );
      showToast('Cập nhật sản phẩm thành công!');
    } else {
      const newP: Product = {
        id: Date.now(),
        name: form.name,
        sku: canEditSKU ? form.sku : '',
        category: canEditCategory ? form.category : 'Điện Thoại',
        price: Number(form.price),
        originalPrice: Number(form.originalPrice),
        stock: Number(form.stock),
        sold: 0,
        status: form.status,
        image: '',
      };
      setProducts((prev) => [newP, ...prev]);
      showToast('Thêm sản phẩm thành công!');
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirm(null);
    showToast('Đã xóa sản phẩm!');
  };

  return (
    <AdminLayout title="Quản Lý Sản Phẩm" subtitle="Thêm, sửa, xóa sản phẩm và quản lý danh mục">
      {toast && (
        <div className="fixed top-5 right-5 bg-gray-900 text-white text-sm px-4 py-3 rounded-lg z-50 flex items-center gap-2">
          <i className="ri-checkbox-circle-line text-green-400 text-base"></i>
          {toast}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit mb-6">
        {(['products', 'coupons'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${tab === t ? 'bg-white text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {t === 'products' ? 'Danh Sách Sản Phẩm' : 'Khuyến Mãi & Coupon'}
          </button>
        ))}
      </div>

      {tab === 'products' && (
        <>
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-3 flex-1">
              <div className="relative flex-1 max-w-sm">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
                  <i className="ri-search-line text-gray-400 text-sm"></i>
                </div>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm tên, SKU..."
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-400"
                />
              </div>
              <select
                value={catFilter}
                onChange={(e) => setCatFilter(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white text-gray-700 focus:outline-none cursor-pointer"
              >
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            {can('products_add') && (
              <button
                onClick={openAdd}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
              >
                <div className="w-4 h-4 flex items-center justify-center"><i className="ri-add-line text-base"></i></div>
                Thêm Sản Phẩm
              </button>
            )}
          </div>

          {/* Permission Notice for admin2 */}
          {!canDelete && (
            <div className="mb-4 flex items-center gap-2 px-4 py-3 bg-orange-50 border border-orange-200 rounded-lg text-orange-700 text-xs">
              <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                <i className="ri-information-line text-sm"></i>
              </div>
              <span>Admin Cấp 2: Có thể thêm/sửa giá, mô tả, hình ảnh, khuyến mãi. Không xóa sản phẩm, không chỉnh SKU/danh mục quan trọng.</span>
            </div>
          )}

          {/* Table */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Sản phẩm</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">SKU</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Danh mục</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Giá</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Tồn kho</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Đã bán</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Trạng thái</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        {p.image ? (
                          <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex-shrink-0"></div>
                        )}
                        <span className="text-sm font-medium text-gray-900 line-clamp-2 max-w-[200px]">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 font-mono">{p.sku || '—'}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{p.category}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="text-sm font-semibold text-gray-900">{fmt(p.price)}₫</div>
                      {p.originalPrice > p.price && (
                        <div className="text-xs text-gray-400 line-through">{fmt(p.originalPrice)}₫</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`text-sm font-medium ${p.stock === 0 ? 'text-red-500' : p.stock < 20 ? 'text-orange-500' : 'text-gray-900'}`}>
                        {p.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-gray-600">{fmt(p.sold)}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusMap[p.status]?.color || 'bg-gray-100 text-gray-600'}`}>
                        {statusMap[p.status]?.label || p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {can('products_edit') && (
                          <button
                            onClick={() => openEdit(p)}
                            className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors cursor-pointer"
                            title="Chỉnh sửa"
                          >
                            <i className="ri-edit-line text-sm"></i>
                          </button>
                        )}
                        {canDelete ? (
                          <button
                            onClick={() => setDeleteConfirm(p.id)}
                            className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                            title="Xóa"
                          >
                            <i className="ri-delete-bin-line text-sm"></i>
                          </button>
                        ) : (
                          <div className="w-7 h-7 flex items-center justify-center text-gray-300 cursor-not-allowed" title="Không có quyền xóa">
                            <i className="ri-lock-line text-sm"></i>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <div className="w-10 h-10 flex items-center justify-center mx-auto mb-2">
                  <i className="ri-shopping-bag-3-line text-4xl"></i>
                </div>
                <p className="text-sm">Không tìm thấy sản phẩm</p>
              </div>
            )}
          </div>
        </>
      )}

      {tab === 'coupons' && (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900 text-sm">Danh Sách Coupon ({coupons.length})</h3>
            {can('products_promotion') && (
              <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-xs font-medium cursor-pointer whitespace-nowrap">
                <i className="ri-add-line text-sm"></i> Tạo Coupon
              </button>
            )}
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Mã</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Loại</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Giá trị</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Đơn tối thiểu</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Đã dùng</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Hết hạn</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 font-mono font-bold text-gray-900 text-sm">{c.code}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">
                    {c.type === 'percent' ? 'Phần trăm' : c.type === 'fixed' ? 'Số tiền cố định' : 'Miễn phí ship'}
                  </td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-red-600">
                    {c.type === 'percent' ? `-${c.value}%` : c.type === 'fixed' ? `-${fmt(c.value)}₫` : 'Free ship'}
                  </td>
                  <td className="px-4 py-3 text-right text-xs text-gray-600">{fmt(c.minOrder)}₫</td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-xs text-gray-700">
                      {c.used}<span className="text-gray-400">/{c.limit}</span>
                    </span>
                    <div className="h-1 bg-gray-100 rounded-full mt-1 w-16 ml-auto overflow-hidden">
                      <div className="h-full bg-red-400 rounded-full" style={{ width: `${(c.used / c.limit) * 100}%` }}></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-xs text-gray-500">{c.expiry}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${c.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {c.status === 'active' ? 'Hoạt động' : 'Hết hạn'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">{editProduct ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer">
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Tên sản phẩm *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-red-400"
                  placeholder="VD: iPhone 15 Pro Max 256GB"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`text-sm font-medium block mb-1.5 ${canEditSKU ? 'text-gray-700' : 'text-gray-400'}`}>
                    SKU {!canEditSKU && <span className="text-[10px] text-orange-500 ml-1">(không có quyền)</span>}
                  </label>
                  <input
                    value={form.sku}
                    onChange={(e) => setForm((p) => ({ ...p, sku: e.target.value }))}
                    disabled={!canEditSKU}
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-red-400 ${canEditSKU ? 'border-gray-200' : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'}`}
                    placeholder="VD: IP15PM-256-BLK"
                  />
                </div>
                <div>
                  <label className={`text-sm font-medium block mb-1.5 ${canEditCategory ? 'text-gray-700' : 'text-gray-400'}`}>
                    Danh mục {!canEditCategory && <span className="text-[10px] text-orange-500 ml-1">(không có quyền)</span>}
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                    disabled={!canEditCategory}
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-red-400 ${canEditCategory ? 'border-gray-200 cursor-pointer' : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'}`}
                  >
                    {categories.filter((c) => c !== 'Tất cả').map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">Giá bán (₫) *</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-red-400"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">Giá gốc (₫)</label>
                  <input
                    type="number"
                    value={form.originalPrice}
                    onChange={(e) => setForm((p) => ({ ...p, originalPrice: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-red-400"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">Tồn kho</label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) => setForm((p) => ({ ...p, stock: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-red-400"
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Trạng thái</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-red-400 cursor-pointer"
                >
                  <option value="active">Đang bán</option>
                  <option value="draft">Nháp</option>
                  <option value="out_of_stock">Hết hàng</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer whitespace-nowrap"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg py-2.5 text-sm font-medium cursor-pointer whitespace-nowrap"
              >
                {editProduct ? 'Cập Nhật' : 'Thêm Mới'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm !== null && canDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-sm p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-delete-bin-line text-red-600 text-2xl"></i>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Xóa sản phẩm?</h3>
            <p className="text-gray-500 text-sm mb-5">Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa?</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer whitespace-nowrap">Hủy</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg py-2.5 text-sm font-medium cursor-pointer whitespace-nowrap">Xóa</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { adminPosts } from '../../../mocks/adminData';

const statusMap: Record<string, { label: string; color: string }> = {
  published: { label: 'Đã đăng', color: 'bg-green-100 text-green-700' },
  draft: { label: 'Nháp', color: 'bg-gray-100 text-gray-600' },
};

const banners = [
  { id: 1, name: 'Banner Trang Chủ Hero', size: '1920x600', status: 'active', updated: '2026-03-15' },
  { id: 2, name: 'Banner Flash Sale', size: '1200x400', status: 'active', updated: '2026-03-10' },
  { id: 3, name: 'Banner Mùa Hè 2026', size: '1920x600', status: 'inactive', updated: '2026-02-28' },
  { id: 4, name: 'Slider Sản Phẩm Hot', size: '800x400', status: 'active', updated: '2026-03-18' },
];

const staticPages = [
  { id: 1, name: 'Trang Giới Thiệu', slug: '/about', status: 'published', updated: '2026-02-20' },
  { id: 2, name: 'Trang Liên Hệ', slug: '/contact', status: 'published', updated: '2026-03-01' },
  { id: 3, name: 'Chính Sách Đổi Trả', slug: '/policy', status: 'published', updated: '2026-01-15' },
  { id: 4, name: 'FAQ - Câu Hỏi Thường Gặp', slug: '/faq', status: 'draft', updated: '2026-03-10' },
];

export default function AdminContentPage() {
  const [tab, setTab] = useState<'posts' | 'banners' | 'pages'>('posts');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const filteredPosts = adminPosts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
  );

  const fmt = (n: number) => new Intl.NumberFormat('vi-VN').format(n);

  return (
    <AdminLayout title="Quản Lý Nội Dung" subtitle="Blog, banner, slider và trang tĩnh website">
      {toast && (
        <div className="fixed top-5 right-5 bg-gray-900 text-white text-sm px-4 py-3 rounded-lg z-50 flex items-center gap-2">
          <i className="ri-checkbox-circle-line text-green-400 text-base"></i>
          {toast}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit mb-6">
        {([
          { key: 'posts', label: 'Bài Viết Blog', icon: 'ri-article-line' },
          { key: 'banners', label: 'Banner & Slider', icon: 'ri-image-line' },
          { key: 'pages', label: 'Trang Tĩnh', icon: 'ri-file-text-line' },
        ] as const).map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${tab === t.key ? 'bg-white text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
            <div className="w-4 h-4 flex items-center justify-center"><i className={`${t.icon} text-sm`}></i></div>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'posts' && (
        <>
          <div className="flex items-center justify-between mb-4">
            <div className="relative max-w-sm w-full">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
                <i className="ri-search-line text-gray-400 text-sm"></i>
              </div>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm bài viết..." className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-400" />
            </div>
            <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap">
              <div className="w-4 h-4 flex items-center justify-center"><i className="ri-add-line text-base"></i></div>
              Viết bài mới
            </button>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Tiêu đề</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Danh mục</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Lượt xem</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Tác giả</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Ngày đăng</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Trạng thái</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredPosts.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 max-w-xs">
                      <span className="text-sm font-medium text-gray-900 line-clamp-1">{p.title}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{p.category}</td>
                    <td className="px-4 py-3 text-right text-sm text-gray-700">{fmt(p.views)}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{p.author}</td>
                    <td className="px-4 py-3 text-center text-xs text-gray-400">{p.date}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${statusMap[p.status]?.color}`}>
                        {statusMap[p.status]?.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer">
                          <i className="ri-edit-line text-sm"></i>
                        </button>
                        <button onClick={() => showToast('Đã xóa bài viết!')} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer">
                          <i className="ri-delete-bin-line text-sm"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === 'banners' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium cursor-pointer whitespace-nowrap">
              <div className="w-4 h-4 flex items-center justify-center"><i className="ri-add-line text-base"></i></div>
              Thêm Banner
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {banners.map(b => (
              <div key={b.id} className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="h-28 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <div className="w-12 h-12 flex items-center justify-center text-gray-300">
                    <i className="ri-image-2-line text-5xl"></i>
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{b.name}</div>
                    <div className="text-xs text-gray-400 mt-1">Kích thước: {b.size} · Cập nhật: {b.updated}</div>
                  </div>
                  <span className={`text-[10px] px-2 py-1 rounded-full font-medium flex-shrink-0 ml-2 ${b.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {b.status === 'active' ? 'Đang dùng' : 'Tắt'}
                  </span>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 border border-gray-200 rounded-lg py-2 text-xs text-gray-600 hover:bg-gray-50 cursor-pointer whitespace-nowrap">Thay ảnh</button>
                  <button onClick={() => showToast('Đã lưu thay đổi!')} className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg py-2 text-xs font-medium cursor-pointer whitespace-nowrap">Chỉnh sửa</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'pages' && (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900 text-sm">Các Trang Tĩnh</h3>
            <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-xs font-medium cursor-pointer whitespace-nowrap">
              <i className="ri-add-line text-sm"></i> Thêm trang
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Tên trang</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Đường dẫn</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Cập nhật</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Trạng thái</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {staticPages.map(p => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 text-sm font-medium text-gray-900">{p.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{p.slug}</td>
                  <td className="px-4 py-3 text-center text-xs text-gray-400">{p.updated}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${statusMap[p.status]?.color}`}>
                      {statusMap[p.status]?.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md cursor-pointer">
                        <i className="ri-edit-line text-sm"></i>
                      </button>
                      <a href={p.slug} target="_blank" rel="noopener noreferrer" className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-md cursor-pointer">
                        <i className="ri-external-link-line text-sm"></i>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}

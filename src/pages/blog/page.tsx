import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/feature/Navbar";
import Footer from "../../components/feature/Footer";
import { mockBlogPosts, blogCategories } from "../../mocks/blog";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("Tất Cả");
  const [searchQuery, setSearchQuery] = useState("");

  const featured = mockBlogPosts.filter((p) => p.featured);
  const filtered = mockBlogPosts.filter((post) => {
    const matchCat = activeCategory === "Tất Cả" || post.category === activeCategory;
    const matchSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, #e11d48 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 right-32 w-80 h-80 rounded-full" style={{ background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)" }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white/80 rounded-full text-xs font-medium mb-6 border border-white/20">
            <i className="ri-article-line" />
            Blog & Tin Tức
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Kiến Thức & Kinh Nghiệm<br />
            <span className="text-rose-400">Affiliate Marketing</span>
          </h1>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Hướng dẫn, mẹo và chiến lược giúp bạn tối ưu thu nhập từ tiếp thị liên kết và mua sắm thông minh.
          </p>
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm bài viết..."
              className="w-full pl-12 pr-5 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-white/50 transition-all text-sm backdrop-blur-sm"
            />
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {!searchQuery && activeCategory === "Tất Cả" && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-xl font-bold text-gray-900 mb-8">Bài Viết Nổi Bật</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featured.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group relative rounded-2xl overflow-hidden cursor-pointer block"
                style={{ aspectRatio: "16/9" }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 bg-rose-500 text-white text-xs font-semibold rounded-full mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-white font-bold text-lg leading-snug mb-2 group-hover:text-rose-300 transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 text-white/60 text-xs">
                    <span>{post.author}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime} phút đọc</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Category Filter + Posts */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-10">
          {blogCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <i className="ri-search-line text-4xl text-gray-300 block mb-4" />
            <p className="text-gray-500">Không tìm thấy bài viết phù hợp.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {filtered.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

function BlogCard({ post }: { post: ReturnType<typeof mockBlogPosts[number]["id"] extends string ? typeof mockBlogPosts[number] : never> }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group flex flex-col cursor-pointer block">
      <div className="relative w-full h-52 rounded-2xl overflow-hidden mb-5 bg-gray-100">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold rounded-full">
            {post.category}
          </span>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          {post.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="px-2 py-0.5 bg-rose-50 text-rose-600 text-xs rounded-md">#{tag}</span>
          ))}
        </div>
        <h3 className="font-bold text-gray-900 text-base leading-snug mb-2 group-hover:text-rose-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
          <img src={post.authorAvatar} alt={post.author} className="w-8 h-8 rounded-full object-cover object-top" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-700 truncate">{post.author}</p>
            <p className="text-xs text-gray-400">{post.date} · {post.readTime} phút đọc</p>
          </div>
          <i className="ri-arrow-right-line text-gray-400 group-hover:text-rose-500 transition-colors" />
        </div>
      </div>
    </Link>
  );
}

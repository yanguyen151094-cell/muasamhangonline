import { useParams, Link } from "react-router-dom";
import Navbar from "../../../components/feature/Navbar";
import Footer from "../../../components/feature/Footer";
import { mockBlogPosts } from "../../../mocks/blog";

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = mockBlogPosts.find((p) => p.slug === slug);
  const related = mockBlogPosts.filter((p) => p.id !== post?.id).slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <i className="ri-article-line text-5xl text-gray-300 block mb-4" />
          <h2 className="text-xl font-bold text-gray-700 mb-4">Bài viết không tồn tại</h2>
          <Link to="/blog" className="px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-semibold cursor-pointer whitespace-nowrap">
            Quay Lại Blog
          </Link>
        </div>
      </div>
    );
  }

  const articleContent = [
    {
      heading: "Tại Sao Cần Bắt Đầu Ngay Hôm Nay?",
      body: `Tiếp thị liên kết (affiliate marketing) đang là xu hướng kiếm tiền online phổ biến nhất tại Việt Nam năm 2026. Với hơn 60 triệu người dùng internet và thói quen mua sắm online ngày càng tăng, đây là thời điểm vàng để bắt đầu. Mô hình này cho phép bạn kiếm hoa hồng từ 5-15% mỗi đơn hàng mà không cần quản lý kho hay giao hàng.`
    },
    {
      heading: "Bước 1: Chọn Sản Phẩm Phù Hợp",
      body: `Thành công trong affiliate marketing bắt đầu từ việc chọn đúng sản phẩm. Hãy tập trung vào các sản phẩm bạn thực sự hiểu và tin dùng. Điện tử, gia dụng thông minh và sản phẩm sức khỏe là những danh mục có tỷ lệ chuyển đổi cao nhất hiện nay. Hoa hồng lên đến 15% cho mỗi đơn hàng thành công là động lực tuyệt vời để bắt đầu.`
    },
    {
      heading: "Bước 2: Xây Dựng Kênh Phân Phối",
      body: `Kênh phân phối hiệu quả nhất hiện nay bao gồm: TikTok Shop, Facebook/Instagram Reels, YouTube review, và blog SEO. Mỗi kênh có đặc thù riêng. TikTok cho phép viral nhanh, YouTube cho phép đánh giá chi tiết, còn blog giúp thu hút traffic tự nhiên từ Google. Kết hợp cả ba kênh sẽ tối đa hóa thu nhập của bạn.`
    },
    {
      heading: "Bước 3: Tối Ưu Link Affiliate",
      body: `Link affiliate cần được đặt đúng vị trí để tối đa tỷ lệ click. Trong video, đặt link trong description và ghim comment. Trong bài viết, đặt link sau 300 chữ đầu và cuối bài. Sử dụng CTA (Call-to-Action) rõ ràng như "Mua ngay", "Xem giá tốt nhất". Đừng quên theo dõi performance qua bảng thống kê affiliate để điều chỉnh chiến lược.`
    },
    {
      heading: "Kết Luận",
      body: `Affiliate marketing không phải con đường làm giàu nhanh, nhưng với sự kiên trì và chiến lược đúng đắn, bạn hoàn toàn có thể đạt thu nhập từ 10-50 triệu đồng/tháng chỉ sau 6-12 tháng. Đăng ký tham gia ShopAffiliate ngay hôm nay để bắt đầu hành trình kiếm tiền thụ động của bạn!`
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <article className="max-w-4xl mx-auto px-6 pt-28 pb-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link to="/" className="hover:text-gray-700 transition-colors cursor-pointer">Trang Chủ</Link>
          <i className="ri-arrow-right-s-line" />
          <Link to="/blog" className="hover:text-gray-700 transition-colors cursor-pointer">Blog</Link>
          <i className="ri-arrow-right-s-line" />
          <span className="text-gray-600 line-clamp-1">{post.title}</span>
        </nav>

        {/* Category + Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="px-3 py-1 bg-rose-100 text-rose-600 text-xs font-semibold rounded-full">{post.category}</span>
          {post.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md">#{tag}</span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">{post.title}</h1>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
          <img src={post.authorAvatar} alt={post.author} className="w-12 h-12 rounded-full object-cover object-top" />
          <div>
            <p className="font-semibold text-gray-900 text-sm">{post.author}</p>
            <div className="flex items-center gap-2 text-gray-400 text-xs mt-0.5">
              <span>{post.date}</span>
              <span>·</span>
              <i className="ri-time-line" />
              <span>{post.readTime} phút đọc</span>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <a href="https://facebook.com" rel="nofollow" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-rose-50 hover:text-rose-500 transition-all cursor-pointer">
              <i className="ri-facebook-fill" />
            </a>
            <a href="https://twitter.com" rel="nofollow" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-rose-50 hover:text-rose-500 transition-all cursor-pointer">
              <i className="ri-twitter-x-line" />
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-rose-50 hover:text-rose-500 transition-all cursor-pointer"
            >
              <i className="ri-links-line" />
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full h-80 md:h-96 rounded-2xl overflow-hidden mb-10 bg-gray-100">
          <img src={post.image} alt={post.title} title={`${post.title} - ShopAffiliate`} className="w-full h-full object-cover object-top" />
        </div>

        {/* Excerpt (Lead) */}
        <p className="text-lg text-gray-600 leading-relaxed mb-10 border-l-4 border-rose-400 pl-6 italic">{post.excerpt}</p>

        {/* Article Content */}
        <div className="prose prose-gray max-w-none">
          {articleContent.map((section, i) => (
            <div key={i} className="mb-8">
              <h4 id={`section-${i}`} className="text-xl font-bold text-gray-900 mb-4">
                <a href={`#section-${i}`} className="hover:text-rose-500 transition-colors">{section.heading}</a>
              </h4>
              <p className="text-gray-600 leading-relaxed text-base">{section.body}</p>
            </div>
          ))}
        </div>

        {/* CTA Box */}
        <div className="bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-100 rounded-2xl p-8 my-12 text-center">
          <i className="ri-medal-line text-4xl text-rose-500 block mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-3">Sẵn Sàng Bắt Đầu Kiếm Tiền?</h3>
          <p className="text-gray-600 text-sm mb-5">Đăng ký miễn phí chương trình affiliate và nhận hoa hồng lên đến 15% ngay hôm nay.</p>
          <Link
            to="/affiliate"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-rose-500 text-white rounded-full font-semibold text-sm hover:bg-rose-600 transition-all cursor-pointer whitespace-nowrap"
          >
            <i className="ri-rocket-line" />
            Tham Gia Ngay - Miễn Phí
          </Link>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-8 border-t border-gray-100">
          <span className="text-sm font-medium text-gray-700 mr-2">Tags:</span>
          {post.tags.map((tag) => (
            <Link key={tag} to={`/blog?tag=${tag}`} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-rose-100 hover:text-rose-600 transition-colors cursor-pointer">
              #{tag}
            </Link>
          ))}
        </div>
      </article>

      {/* Related Posts */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-xl font-bold text-gray-900 mb-8">Bài Viết Liên Quan</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {related.map((rPost) => (
            <Link key={rPost.id} to={`/blog/${rPost.slug}`} className="group cursor-pointer block">
              <div className="w-full h-40 rounded-xl overflow-hidden mb-4 bg-gray-100">
                <img src={rPost.image} alt={rPost.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" />
              </div>
              <span className="text-xs font-medium text-rose-500">{rPost.category}</span>
              <h4 className="font-semibold text-gray-900 text-sm mt-1 leading-snug group-hover:text-rose-600 transition-colors line-clamp-2">{rPost.title}</h4>
              <p className="text-xs text-gray-400 mt-1">{rPost.date}</p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

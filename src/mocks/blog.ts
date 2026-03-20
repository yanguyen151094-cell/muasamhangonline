export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: number;
  image: string;
  tags: string[];
  featured?: boolean;
}

export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "cach-kiem-tien-affiliate-marketing-hieu-qua",
    title: "Cách Kiếm Tiền Với Affiliate Marketing Hiệu Quả Năm 2026",
    excerpt: "Hướng dẫn chi tiết từng bước để bắt đầu kiếm thu nhập thụ động từ tiếp thị liên kết, từ chọn sản phẩm đến xây dựng kênh phân phối.",
    content: "Tiếp thị liên kết (affiliate marketing) đang là xu hướng kiếm tiền online phổ biến nhất hiện nay...",
    category: "Hướng Dẫn Affiliate",
    author: "Nguyễn Văn Minh",
    authorAvatar: "https://readdy.ai/api/search-image?query=professional%20vietnamese%20man%20smiling%20headshot%20portrait%20clean%20background&width=80&height=80&seq=100&orientation=squarish",
    date: "18/03/2026",
    readTime: 8,
    image: "https://readdy.ai/api/search-image?query=person%20working%20on%20laptop%20earning%20money%20online%20affiliate%20marketing%20modern%20minimalist%20workspace%20with%20charts%20and%20graphs%20warm%20lighting&width=800&height=500&seq=101&orientation=landscape",
    tags: ["affiliate", "kiếm tiền online", "tiếp thị liên kết", "thu nhập thụ động"],
    featured: true
  },
  {
    id: "2",
    slug: "top-san-pham-cong-nghe-ban-chay-2026",
    title: "Top 10 Sản Phẩm Công Nghệ Bán Chạy Nhất Tháng 3/2026",
    excerpt: "Danh sách sản phẩm điện tử được người tiêu dùng Việt Nam tìm kiếm và mua nhiều nhất, cơ hội vàng cho các affiliate marketer.",
    content: "Thị trường sản phẩm công nghệ Việt Nam đang bùng nổ với nhiều xu hướng mới...",
    category: "Sản Phẩm Nổi Bật",
    author: "Trần Thị Lan",
    authorAvatar: "https://readdy.ai/api/search-image?query=professional%20vietnamese%20woman%20smiling%20headshot%20portrait%20clean%20background%20friendly&width=80&height=80&seq=102&orientation=squarish",
    date: "15/03/2026",
    readTime: 5,
    image: "https://readdy.ai/api/search-image?query=modern%20electronics%20gadgets%20collection%20smartphones%20earbuds%20smartwatch%20on%20clean%20white%20marble%20surface%20minimalist%20product%20photography&width=800&height=500&seq=103&orientation=landscape",
    tags: ["công nghệ", "sản phẩm bán chạy", "điện tử", "review sản phẩm"],
    featured: true
  },
  {
    id: "3",
    slug: "meo-tang-ty-le-chuyen-doi-affiliate",
    title: "7 Mẹo Tăng Tỷ Lệ Chuyển Đổi Cho Affiliate Marketer",
    excerpt: "Những kỹ thuật tối ưu nội dung và chiến lược giúp tăng tỷ lệ click và mua hàng qua link affiliate của bạn.",
    content: "Tỷ lệ chuyển đổi cao là mục tiêu của mọi affiliate marketer thành công...",
    category: "Mẹo & Kinh Nghiệm",
    author: "Lê Hoàng Nam",
    authorAvatar: "https://readdy.ai/api/search-image?query=young%20vietnamese%20man%20professional%20portrait%20smiling%20clean%20background&width=80&height=80&seq=104&orientation=squarish",
    date: "10/03/2026",
    readTime: 6,
    image: "https://readdy.ai/api/search-image?query=digital%20marketing%20strategy%20conversion%20rate%20optimization%20charts%20analytics%20on%20computer%20screen%20modern%20office%20warm%20tone&width=800&height=500&seq=105&orientation=landscape",
    tags: ["tỷ lệ chuyển đổi", "tối ưu", "affiliate tips", "digital marketing"]
  },
  {
    id: "4",
    slug: "review-may-loc-khong-khi-tot-nhat",
    title: "Review Chi Tiết: Máy Lọc Không Khí Tốt Nhất 2026",
    excerpt: "So sánh và đánh giá toàn diện các dòng máy lọc không khí phổ biến nhất trên thị trường hiện nay.",
    content: "Không khí trong nhà đang ngày càng bị ô nhiễm, máy lọc không khí trở thành thiết bị không thể thiếu...",
    category: "Review Sản Phẩm",
    author: "Phạm Thị Thu",
    authorAvatar: "https://readdy.ai/api/search-image?query=professional%20asian%20woman%20portrait%20smiling%20tech%20blogger%20natural%20background&width=80&height=80&seq=106&orientation=squarish",
    date: "05/03/2026",
    readTime: 10,
    image: "https://readdy.ai/api/search-image?query=air%20purifier%20machine%20modern%20white%20design%20in%20clean%20bright%20living%20room%20minimalist%20interior%20natural%20light&width=800&height=500&seq=107&orientation=landscape",
    tags: ["review", "máy lọc không khí", "sức khỏe", "gia dụng"]
  },
  {
    id: "5",
    slug: "xay-dung-kenh-youtube-ban-san-pham",
    title: "Xây Dựng Kênh YouTube Để Bán Hàng Affiliate Thành Công",
    excerpt: "Bí quyết tạo kênh YouTube thu hút hàng nghìn lượt xem và tối ưu hóa link affiliate trong video.",
    content: "YouTube là một trong những kênh hiệu quả nhất để quảng bá sản phẩm affiliate...",
    category: "Hướng Dẫn Affiliate",
    author: "Nguyễn Văn Minh",
    authorAvatar: "https://readdy.ai/api/search-image?query=professional%20vietnamese%20man%20smiling%20headshot%20portrait%20clean%20background&width=80&height=80&seq=100&orientation=squarish",
    date: "28/02/2026",
    readTime: 7,
    image: "https://readdy.ai/api/search-image?query=youtube%20content%20creator%20filming%20product%20review%20home%20studio%20setup%20ring%20light%20camera%20modern%20minimalist&width=800&height=500&seq=108&orientation=landscape",
    tags: ["YouTube", "content creator", "affiliate", "video marketing"]
  },
  {
    id: "6",
    slug: "chinh-sach-hoan-tien-mua-sam-thong-minh",
    title: "Mua Sắm Thông Minh: Tận Dụng Chính Sách Hoàn Tiền",
    excerpt: "Hướng dẫn cách tận dụng các chương trình hoàn tiền, cashback và voucher để tiết kiệm tối đa khi mua sắm online.",
    content: "Mua sắm online thông minh không chỉ là chọn sản phẩm tốt mà còn là tận dụng mọi ưu đãi...",
    category: "Mẹo Mua Sắm",
    author: "Trần Thị Lan",
    authorAvatar: "https://readdy.ai/api/search-image?query=professional%20vietnamese%20woman%20smiling%20headshot%20portrait%20clean%20background%20friendly&width=80&height=80&seq=102&orientation=squarish",
    date: "20/02/2026",
    readTime: 4,
    image: "https://readdy.ai/api/search-image?query=online%20shopping%20cashback%20savings%20money%20coins%20smartphone%20app%20colorful%20bright%20modern%20flat%20lay&width=800&height=500&seq=109&orientation=landscape",
    tags: ["mua sắm", "cashback", "tiết kiệm", "ưu đãi"]
  }
];

export const blogCategories = [
  "Tất Cả",
  "Hướng Dẫn Affiliate",
  "Review Sản Phẩm",
  "Mẹo & Kinh Nghiệm",
  "Sản Phẩm Nổi Bật",
  "Mẹo Mua Sắm"
];

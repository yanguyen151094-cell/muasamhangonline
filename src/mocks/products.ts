export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  commission: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  category: string;
  description: string;
  shortDesc: string;
  stock: number;
  badge?: string;
  sold: number;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Máy Lọc Không Khí Xiaomi Mi Air Purifier 4 Pro",
    price: 2990000,
    originalPrice: 3990000,
    commission: 8,
    rating: 4.8,
    reviews: 1247,
    image: "https://readdy.ai/api/search-image?query=xiaomi%20air%20purifier%20white%20modern%20sleek%20design%20on%20clean%20white%20background%20minimalist%20product%20photography&width=400&height=400&seq=1&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=xiaomi%20air%20purifier%20white%20modern%20sleek%20design%20on%20clean%20white%20background%20minimalist%20product%20photography&width=600&height=600&seq=1&orientation=squarish",
      "https://readdy.ai/api/search-image?query=air%20purifier%20device%20side%20view%20modern%20white%20appliance%20clean%20background&width=600&height=600&seq=2&orientation=squarish",
      "https://readdy.ai/api/search-image?query=air%20purifier%20top%20view%20circular%20fan%20design%20white%20device&width=600&height=600&seq=3&orientation=squarish"
    ],
    category: "Điện Tử",
    description: "Máy lọc không khí Xiaomi Mi Air Purifier 4 Pro sử dụng công nghệ lọc HEPA thế hệ mới, loại bỏ 99.97% bụi mịn PM2.5, vi khuẩn và các chất ô nhiễm. Kết nối thông minh qua app Xiaomi Home, điều khiển từ xa tiện lợi. Phù hợp không gian lên đến 60m².",
    shortDesc: "Lọc 99.97% bụi mịn PM2.5, kết nối thông minh, phù hợp 60m²",
    stock: 45,
    badge: "Bán chạy",
    sold: 3892
  },
  {
    id: "2",
    name: "Tai Nghe Chống Ồn Sony WH-1000XM5",
    price: 6490000,
    originalPrice: 8990000,
    commission: 10,
    rating: 4.9,
    reviews: 2891,
    image: "https://readdy.ai/api/search-image?query=Sony%20WH-1000XM5%20black%20wireless%20headphones%20over-ear%20on%20clean%20white%20background%20professional%20product%20shot&width=400&height=400&seq=4&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=Sony%20WH-1000XM5%20black%20wireless%20headphones%20over-ear%20on%20clean%20white%20background%20professional%20product%20shot&width=600&height=600&seq=4&orientation=squarish",
      "https://readdy.ai/api/search-image?query=premium%20wireless%20headphones%20side%20profile%20black%20matte%20finish%20clean%20background&width=600&height=600&seq=5&orientation=squarish",
      "https://readdy.ai/api/search-image?query=headphones%20top%20view%20black%20cushion%20ear%20pads%20luxury%20product%20photo&width=600&height=600&seq=6&orientation=squarish"
    ],
    category: "Điện Tử",
    description: "Sony WH-1000XM5 với công nghệ chống ồn chủ động hàng đầu thế giới, 8 microphone xử lý tiếng ồn. Thời lượng pin 30 giờ, sạc nhanh 3 phút nghe 3 giờ. Âm thanh Hi-Res Audio, phù hợp cho công việc và giải trí.",
    shortDesc: "Chống ồn hàng đầu, 30h pin, âm thanh Hi-Res Audio",
    stock: 28,
    badge: "Hot Deal",
    sold: 5621
  },
  {
    id: "3",
    name: "Đồng Hồ Thông Minh Apple Watch Series 9 GPS",
    price: 10990000,
    originalPrice: 12990000,
    commission: 6,
    rating: 4.7,
    reviews: 3401,
    image: "https://readdy.ai/api/search-image?query=Apple%20Watch%20Series%209%20silver%20aluminum%20case%20on%20white%20background%20minimalist%20product%20photography%20smartwatch&width=400&height=400&seq=7&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=Apple%20Watch%20Series%209%20silver%20aluminum%20case%20on%20white%20background%20minimalist%20product%20photography%20smartwatch&width=600&height=600&seq=7&orientation=squarish",
      "https://readdy.ai/api/search-image?query=smartwatch%20face%20close%20up%20clean%20display%20health%20tracking%20white%20background&width=600&height=600&seq=8&orientation=squarish"
    ],
    category: "Điện Tử",
    description: "Apple Watch Series 9 với chip S9 mạnh mẽ, màn hình Retina luôn bật sáng. Theo dõi sức khỏe toàn diện: nhịp tim, oxy trong máu, phát hiện té ngã. Chức năng Double Tap điều khiển một tay tiện lợi.",
    shortDesc: "Chip S9, màn hình Always-On, theo dõi sức khỏe toàn diện",
    stock: 15,
    badge: "Mới",
    sold: 2104
  },
  {
    id: "4",
    name: "Máy Pha Cà Phê DeLonghi Magnifica Evo",
    price: 15990000,
    originalPrice: 19990000,
    commission: 12,
    rating: 4.6,
    reviews: 892,
    image: "https://readdy.ai/api/search-image?query=DeLonghi%20espresso%20coffee%20machine%20silver%20black%20modern%20kitchen%20appliance%20clean%20white%20background%20product%20photo&width=400&height=400&seq=9&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=DeLonghi%20espresso%20coffee%20machine%20silver%20black%20modern%20kitchen%20appliance%20clean%20white%20background%20product%20photo&width=600&height=600&seq=9&orientation=squarish",
      "https://readdy.ai/api/search-image?query=automatic%20espresso%20machine%20front%20view%20buttons%20panel%20stainless%20steel%20white%20background&width=600&height=600&seq=10&orientation=squarish"
    ],
    category: "Gia Dụng",
    description: "Máy pha cà phê DeLonghi Magnifica Evo tự động từ hạt cà phê tươi, nghiền tích hợp 13 cấp độ. Công nghệ LatteCrema tạo bọt sữa hoàn hảo. Màn hình cảm ứng, kết nối app Coffee Link cho trải nghiệm barista tại nhà.",
    shortDesc: "Tự động từ hạt, nghiền tươi, bọt sữa LatteCrema",
    stock: 8,
    sold: 431
  },
  {
    id: "5",
    name: "Robot Hút Bụi Roborock S8 Pro Ultra",
    price: 18990000,
    originalPrice: 22990000,
    commission: 9,
    rating: 4.8,
    reviews: 1654,
    image: "https://readdy.ai/api/search-image?query=Roborock%20robot%20vacuum%20cleaner%20black%20round%20smart%20home%20device%20clean%20white%20background%20minimalist%20product%20photo&width=400&height=400&seq=11&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=Roborock%20robot%20vacuum%20cleaner%20black%20round%20smart%20home%20device%20clean%20white%20background%20minimalist%20product%20photo&width=600&height=600&seq=11&orientation=squarish"
    ],
    category: "Gia Dụng",
    description: "Roborock S8 Pro Ultra với trạm tự làm sạch giẻ lau, tự đổ bụi và tự đổ nước. Cảm biến LiDAR lập bản đồ 3D, lực hút 6000Pa mạnh nhất phân khúc. Hoạt động hoàn toàn tự động không cần can thiệp trong 7 tuần.",
    shortDesc: "Tự làm sạch hoàn toàn, bản đồ 3D LiDAR, hút 6000Pa",
    stock: 12,
    badge: "Premium",
    sold: 987
  },
  {
    id: "6",
    name: "Đèn LED Thông Minh Philips Hue Starter Kit",
    price: 2490000,
    originalPrice: 3290000,
    commission: 15,
    rating: 4.5,
    reviews: 2103,
    image: "https://readdy.ai/api/search-image?query=Philips%20Hue%20smart%20LED%20bulb%20colorful%20light%20white%20background%20modern%20home%20product%20photography&width=400&height=400&seq=12&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=Philips%20Hue%20smart%20LED%20light%20bulb%20colorful%20glowing%20white%20background%20modern%20home%20product%20photography&width=600&height=600&seq=12&orientation=squarish"
    ],
    category: "Nhà Thông Minh",
    description: "Bộ starter kit Philips Hue với 3 bóng đèn E27 và Bridge Hub. Hơn 16 triệu màu sắc, điều chỉnh qua app hoặc giọng nói (Alexa, Google, Siri). Lên lịch tự động, đồng bộ với âm nhạc và phim ảnh.",
    shortDesc: "16 triệu màu, điều khiển giọng nói, đồng bộ âm nhạc",
    stock: 67,
    sold: 4521
  },
  {
    id: "7",
    name: "Laptop Gaming ASUS ROG Zephyrus G14",
    price: 32990000,
    originalPrice: 38990000,
    commission: 5,
    rating: 4.7,
    reviews: 743,
    image: "https://readdy.ai/api/search-image?query=ASUS%20ROG%20gaming%20laptop%20black%20RGB%20keyboard%20open%20display%20on%20clean%20white%20background%20product%20photography&width=400&height=400&seq=13&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=ASUS%20ROG%20gaming%20laptop%20black%20RGB%20keyboard%20open%20display%20on%20clean%20white%20background%20product%20photography&width=600&height=600&seq=13&orientation=squarish"
    ],
    category: "Máy Tính",
    description: "ASUS ROG Zephyrus G14 trang bị AMD Ryzen 9 8945HS và NVIDIA RTX 4070. Màn hình OLED 14\" 165Hz, độ phân giải 2.8K, độ sáng 500 nits. Thiết kế nhỏ gọn 1.65kg, pin 73Wh cho 10 giờ sử dụng văn phòng.",
    shortDesc: "Ryzen 9 + RTX 4070, OLED 165Hz, 1.65kg siêu nhẹ",
    stock: 5,
    badge: "Giới Hạn",
    sold: 312
  },
  {
    id: "8",
    name: "Máy Hút Ẩm Daikin MCK55TVM6",
    price: 8990000,
    originalPrice: 10990000,
    commission: 11,
    rating: 4.6,
    reviews: 567,
    image: "https://readdy.ai/api/search-image?query=Daikin%20air%20purifier%20dehumidifier%20white%20modern%20appliance%20clean%20simple%20background%20product%20photo&width=400&height=400&seq=14&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=Daikin%20air%20purifier%20dehumidifier%20white%20modern%20appliance%20clean%20simple%20background%20product%20photo&width=600&height=600&seq=14&orientation=squarish"
    ],
    category: "Gia Dụng",
    description: "Máy hút ẩm Daikin MCK55TVM6 kết hợp lọc không khí HEPA và Flash Streamer. Công suất hút ẩm 25L/ngày, phù hợp diện tích 50m². Cảm biến độ ẩm tự động điều chỉnh, chế độ Laundry mode sấy quần áo nhanh.",
    shortDesc: "Hút ẩm 25L/ngày, lọc HEPA + Flash Streamer, tự động",
    stock: 20,
    sold: 789
  },
  {
    id: "p001",
    name: "iPhone 15 Pro Max 256GB",
    price: 29990000,
    originalPrice: 34990000,
    commission: 6,
    rating: 4.9,
    reviews: 8821,
    image: "https://readdy.ai/api/search-image?query=iPhone%2015%20Pro%20Max%20titanium%20black%20smartphone%20front%20and%20back%20view%20on%20clean%20white%20background%20professional%20product%20photography%20premium%20Apple%20device&width=400&height=400&seq=101&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=iPhone%2015%20Pro%20Max%20titanium%20black%20smartphone%20front%20and%20back%20view%20on%20clean%20white%20background%20professional%20product%20photography%20premium%20Apple%20device&width=600&height=600&seq=101&orientation=squarish",
      "https://readdy.ai/api/search-image?query=iPhone%2015%20Pro%20Max%20side%20view%20titanium%20frame%20triple%20camera%20system%20close%20up%20white%20background&width=600&height=600&seq=102&orientation=squarish",
      "https://readdy.ai/api/search-image?query=iPhone%2015%20Pro%20Max%20back%20camera%20triple%20lens%20titanium%20body%20detail%20shot%20white%20background&width=600&height=600&seq=103&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "iPhone 15 Pro Max với chip A17 Pro mạnh nhất từ trước đến nay, thiết kế titan aerospace cao cấp. Camera 48MP với zoom quang học 5x, quay video 4K ProRes. Màn hình Super Retina XDR 6.7 inch, Dynamic Island thông minh. Pin 4422mAh sạc nhanh USB-C.",
    shortDesc: "Chip A17 Pro, camera zoom 5x, titan aerospace, màn 6.7\"",
    stock: 32,
    badge: "Mới Nhất",
    sold: 12540
  },
  {
    id: "p002",
    name: "iPhone 15 128GB",
    price: 19990000,
    originalPrice: 22990000,
    commission: 5,
    rating: 4.8,
    reviews: 6432,
    image: "https://readdy.ai/api/search-image?query=iPhone%2015%20pink%20coral%20color%20smartphone%20flat%20lay%20on%20white%20background%20minimalist%20Apple%20product%20photography%20new%20model&width=400&height=400&seq=104&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=iPhone%2015%20pink%20coral%20color%20smartphone%20flat%20lay%20on%20white%20background%20minimalist%20Apple%20product%20photography%20new%20model&width=600&height=600&seq=104&orientation=squarish",
      "https://readdy.ai/api/search-image?query=iPhone%2015%20side%20profile%20slim%20design%20USB-C%20port%20clean%20white%20background&width=600&height=600&seq=105&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "iPhone 15 với thiết kế viền nhôm mới, màn hình Dynamic Island lần đầu trên dòng thường. Camera chính 48MP nâng cấp vượt trội, cổng USB-C tiện lợi hơn Lightning. Chip A16 Bionic xử lý mượt mà mọi tác vụ.",
    shortDesc: "Dynamic Island, camera 48MP, USB-C, chip A16 Bionic",
    stock: 45,
    badge: "Bán Chạy",
    sold: 9871
  },
  {
    id: "p003",
    name: "Samsung Galaxy S24 Ultra 256GB",
    price: 31990000,
    originalPrice: 36990000,
    commission: 7,
    rating: 4.9,
    reviews: 5621,
    image: "https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20S24%20Ultra%20black%20titanium%20smartphone%20with%20S%20Pen%20stylus%20on%20white%20background%20premium%20flagship%20product%20photography&width=400&height=400&seq=106&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20S24%20Ultra%20black%20titanium%20smartphone%20with%20S%20Pen%20stylus%20on%20white%20background%20premium%20flagship%20product%20photography&width=600&height=600&seq=106&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20S24%20Ultra%20camera%20system%20200MP%20back%20view%20titanium%20frame%20white%20background&width=600&height=600&seq=107&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20S24%20Ultra%20S%20Pen%20built-in%20slot%20side%20view%20clean%20background%20detail&width=600&height=600&seq=108&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "Samsung Galaxy S24 Ultra đỉnh cao với camera 200MP zoom 100x không gian. Tích hợp S Pen, khung titan bền bỉ. AI Galaxy tích hợp thông minh: dịch thuật thời gian thực, Circle to Search, chỉnh sửa ảnh AI. Màn hình 6.8\" QHD+ 120Hz sáng 2600 nits.",
    shortDesc: "Camera 200MP zoom 100x, S Pen, AI Galaxy, titan frame",
    stock: 18,
    badge: "Hot",
    sold: 7430
  },
  {
    id: "p004",
    name: "Samsung Galaxy S24+ 256GB",
    price: 24990000,
    originalPrice: 28990000,
    commission: 6,
    rating: 4.8,
    reviews: 3240,
    image: "https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20S24%20Plus%20violet%20cobalt%20color%20premium%20Android%20smartphone%20white%20clean%20background%20flat%20lay%20minimal%20product%20photography&width=400&height=400&seq=109&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20S24%20Plus%20violet%20cobalt%20color%20premium%20Android%20smartphone%20white%20clean%20background%20flat%20lay%20minimal%20product%20photography&width=600&height=600&seq=109&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20S24%20Plus%20front%20display%20bright%20QHD%20screen%20on%20white%20background&width=600&height=600&seq=110&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "Samsung Galaxy S24+ với chip Snapdragon 8 Gen 3 for Galaxy, màn hình AMOLED 6.7\" QHD+ 120Hz sáng 2600 nits. Bộ ba camera 50MP+10MP+12MP, pin 4900mAh sạc nhanh 45W. AI Galaxy đầy đủ, bảo mật Knox Vault.",
    shortDesc: "Snapdragon 8 Gen 3, màn 6.7\" 2600nit, camera 50MP",
    stock: 25,
    sold: 4210
  },
  {
    id: "p005",
    name: "Samsung Galaxy A55 5G 256GB",
    price: 9490000,
    originalPrice: 11490000,
    commission: 8,
    rating: 4.7,
    reviews: 4891,
    image: "https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20A55%205G%20awesome%20navy%20blue%20color%20mid-range%20Android%20phone%20on%20white%20background%20clean%20product%20photography&width=400&height=400&seq=111&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20A55%205G%20awesome%20navy%20blue%20color%20mid-range%20Android%20phone%20on%20white%20background%20clean%20product%20photography&width=600&height=600&seq=111&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20A55%20back%20camera%20triple%20lens%20navy%20blue%20body%20white%20background&width=600&height=600&seq=112&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "Samsung Galaxy A55 5G nâng cấp mạnh với chipset Exynos 1480, RAM 8GB, bộ nhớ 256GB. Camera chính 50MP OIS chụp ổn định, selfie 32MP. Màn hình Super AMOLED 6.6\" 120Hz, pin 5000mAh sạc 25W. Thiết kế kính Corning Gorilla Glass Victus+.",
    shortDesc: "Exynos 1480, 50MP OIS, 5000mAh, AMOLED 120Hz",
    stock: 60,
    badge: "Giảm Giá",
    sold: 8920
  },
  {
    id: "p006",
    name: "Xiaomi 14 Ultra 512GB",
    price: 27990000,
    originalPrice: 32990000,
    commission: 7,
    rating: 4.8,
    reviews: 2901,
    image: "https://readdy.ai/api/search-image?query=Xiaomi%2014%20Ultra%20black%20titanium%20flagship%20smartphone%20Leica%20camera%20large%20round%20lens%20housing%20premium%20photography%20white%20background&width=400&height=400&seq=113&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=Xiaomi%2014%20Ultra%20black%20titanium%20flagship%20smartphone%20Leica%20camera%20large%20round%20lens%20housing%20premium%20photography%20white%20background&width=600&height=600&seq=113&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Xiaomi%2014%20Ultra%20back%20camera%20Leica%20quad%20lens%20circular%20housing%20detail%20shot%20white%20background&width=600&height=600&seq=114&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "Xiaomi 14 Ultra hợp tác Leica với hệ thống 4 camera Leica Summilux đỉnh cao: 50MP chính + 50MP tele 5x + 50MP tele 3.2x + 50MP góc rộng. Chip Snapdragon 8 Gen 3, pin 5000mAh sạc siêu nhanh 90W không dây. Màn hình LTPO AMOLED 6.73\" 120Hz.",
    shortDesc: "Leica 4 camera 50MP, Snapdragon 8 Gen 3, sạc 90W",
    stock: 14,
    badge: "Premium",
    sold: 3180
  },
  {
    id: "p007",
    name: "Xiaomi Redmi Note 13 Pro+ 5G 256GB",
    price: 8490000,
    originalPrice: 9990000,
    commission: 9,
    rating: 4.7,
    reviews: 7210,
    image: "https://readdy.ai/api/search-image?query=Xiaomi%20Redmi%20Note%2013%20Pro%20Plus%20midnight%20black%20slim%20Android%20smartphone%20white%20background%20clean%20product%20photography%20budget%20flagship&width=400&height=400&seq=115&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=Xiaomi%20Redmi%20Note%2013%20Pro%20Plus%20midnight%20black%20slim%20Android%20smartphone%20white%20background%20clean%20product%20photography%20budget%20flagship&width=600&height=600&seq=115&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Xiaomi%20Redmi%20Note%2013%20Pro%20camera%20200MP%20back%20view%20black%20body%20detail%20white%20background&width=600&height=600&seq=116&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "Xiaomi Redmi Note 13 Pro+ 5G với camera 200MP OIS chất lượng flagship. Chip Dimensity 7200 Ultra mạnh mẽ, sạc siêu nhanh 120W chỉ 19 phút đầy pin. Màn hình AMOLED 6.67\" 120Hz 1800 nits. Thiết kế mỏng nhẹ 6.67mm, kính mờ cao cấp.",
    shortDesc: "Camera 200MP OIS, sạc 120W, AMOLED 120Hz, 5G",
    stock: 55,
    badge: "Best Value",
    sold: 15200
  },
  {
    id: "p008",
    name: "OPPO Reno 12 Pro 5G 256GB",
    price: 13490000,
    originalPrice: 15990000,
    commission: 8,
    rating: 4.6,
    reviews: 3410,
    image: "https://readdy.ai/api/search-image?query=OPPO%20Reno%2012%20Pro%20silver%20black%20elegant%20slim%20Android%20phone%20white%20background%20product%20photography%20stylish%20design%20portrait%20camera&width=400&height=400&seq=117&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=OPPO%20Reno%2012%20Pro%20silver%20black%20elegant%20slim%20Android%20phone%20white%20background%20product%20photography%20stylish%20design%20portrait%20camera&width=600&height=600&seq=117&orientation=squarish",
      "https://readdy.ai/api/search-image?query=OPPO%20Reno%2012%20Pro%20back%20camera%20triple%20lens%20silver%20body%20slim%20profile%20white%20background&width=600&height=600&seq=118&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "OPPO Reno 12 Pro 5G với chip MediaTek Dimensity 7300 Energy, camera portrait 50MP AI xóa phông đẹp. Màn hình AMOLED 6.7\" 120Hz độ sáng 1200 nits. Pin 5000mAh sạc nhanh SUPERVOOC 80W. Thiết kế mỏng 7.4mm viền cong tinh tế.",
    shortDesc: "AI portrait camera, SUPERVOOC 80W, màn 6.7\" AMOLED",
    stock: 38,
    sold: 5640
  },
  {
    id: "p009",
    name: "OPPO A3 Pro 5G 256GB",
    price: 6990000,
    originalPrice: 8490000,
    commission: 9,
    rating: 4.5,
    reviews: 2180,
    image: "https://readdy.ai/api/search-image?query=OPPO%20A3%20Pro%205G%20ocean%20blue%20slim%20budget%20smartphone%20white%20background%20clean%20product%20photo%20young%20trendy%20design&width=400&height=400&seq=119&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=OPPO%20A3%20Pro%205G%20ocean%20blue%20slim%20budget%20smartphone%20white%20background%20clean%20product%20photo%20young%20trendy%20design&width=600&height=600&seq=119&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "OPPO A3 Pro 5G siêu bền với tiêu chuẩn IP69 chống bụi nước cấp cao nhất. Màn hình 6.7\" LCD 90Hz, pin khổng lồ 5100mAh sạc 67W. Camera 50MP chụp ảnh ngày và đêm rõ nét. Chip Dimensity 6300 5G kết nối siêu nhanh.",
    shortDesc: "IP69 siêu bền, pin 5100mAh, 5G, camera 50MP",
    stock: 70,
    badge: "Mới",
    sold: 4320
  },
  {
    id: "p010",
    name: "Vivo V30 Pro 5G 256GB",
    price: 12990000,
    originalPrice: 14990000,
    commission: 8,
    rating: 4.6,
    reviews: 2765,
    image: "https://readdy.ai/api/search-image?query=Vivo%20V30%20Pro%20elegant%20champagne%20gold%20slim%20Android%20phone%20ZEISS%20camera%20portrait%20photography%20white%20background%20sleek%20premium%20design&width=400&height=400&seq=120&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=Vivo%20V30%20Pro%20elegant%20champagne%20gold%20slim%20Android%20phone%20ZEISS%20camera%20portrait%20photography%20white%20background%20sleek%20premium%20design&width=600&height=600&seq=120&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Vivo%20V30%20Pro%20back%20ZEISS%20dual%20ring%20camera%20gold%20gradient%20clean%20white%20background%20product%20photo&width=600&height=600&seq=121&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "Vivo V30 Pro 5G hợp tác ZEISS với camera selfie 50MP đèn ring AURA, chụp ảnh chân dung phòng thu chuyên nghiệp. Camera sau bộ ba 50MP+50MP+12MP ZEISS Optics. Chip Snapdragon 7 Gen 3, pin 5000mAh FlashCharge 80W. Màn hình AMOLED 6.78\" 120Hz.",
    shortDesc: "ZEISS portrait camera, selfie 50MP đèn ring, sạc 80W",
    stock: 30,
    sold: 4780
  },
  {
    id: "p011",
    name: "Realme GT 6 5G 256GB",
    price: 11990000,
    originalPrice: 13990000,
    commission: 9,
    rating: 4.7,
    reviews: 1890,
    image: "https://readdy.ai/api/search-image?query=Realme%20GT%206%20gaming%20performance%20smartphone%20white%20silver%20color%20on%20clean%20background%20product%20photography%20speed%20gaming%20phone%20slim&width=400&height=400&seq=122&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=Realme%20GT%206%20gaming%20performance%20smartphone%20white%20silver%20color%20on%20clean%20background%20product%20photography%20speed%20gaming%20phone%20slim&width=600&height=600&seq=122&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "Realme GT 6 với chip Snapdragon 8s Gen 3 hiệu năng gaming mạnh mẽ. Màn hình AMOLED 6.78\" 120Hz sáng 6000 nits - sáng nhất phân khúc. Camera Sony LYT-808 50MP OIS, sạc SUPERVOOC 120W đầy pin chỉ 25 phút. RAM 12GB LPDDR5X.",
    shortDesc: "Snapdragon 8s Gen 3, màn 6000nits, sạc 120W siêu nhanh",
    stock: 22,
    badge: "Gaming",
    sold: 3210
  },
  {
    id: "p012",
    name: "Samsung Galaxy Z Fold 6 512GB",
    price: 49990000,
    originalPrice: 55990000,
    commission: 5,
    rating: 4.8,
    reviews: 1240,
    image: "https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20Z%20Fold%206%20silver%20titanium%20foldable%20smartphone%20open%20book%20form%20showing%20inner%20display%20premium%20flagship%20white%20background%20product%20photography&width=400&height=400&seq=123&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20Z%20Fold%206%20silver%20titanium%20foldable%20smartphone%20open%20book%20form%20showing%20inner%20display%20premium%20flagship%20white%20background%20product%20photography&width=600&height=600&seq=123&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20Z%20Fold%206%20folded%20closed%20form%20cover%20display%20titanium%20silver%20white%20background%20detail&width=600&height=600&seq=124&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20Z%20Fold%206%20inner%20large%20tablet%20display%20unfolded%20side%20view%20hinge%20detail%20white%20background&width=600&height=600&seq=125&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "Samsung Galaxy Z Fold 6 - điện thoại gập cao cấp nhất với màn hình trong 7.6\" AMOLED 120Hz như máy tính bảng. Chip Snapdragon 8 Gen 3 for Galaxy, khung titan nhẹ hơn 14g. AI Galaxy mạnh mẽ, Camera 50MP+10MP+10MP. Bản lề ProFlex cải tiến chống bụi nước IPX8.",
    shortDesc: "Màn gập 7.6\" AMOLED, Snapdragon 8 Gen 3, titan, IPX8",
    stock: 8,
    badge: "Flagship",
    sold: 1870
  },
  {
    id: "p013",
    name: "Xiaomi Redmi 13C 128GB",
    price: 2990000,
    originalPrice: 3690000,
    commission: 10,
    rating: 4.4,
    reviews: 9841,
    image: "https://readdy.ai/api/search-image?query=Xiaomi%20Redmi%2013C%20budget%20affordable%20Android%20smartphone%20star%20trail%20black%20white%20background%20clean%20product%20photography%20entry%20level%20phone&width=400&height=400&seq=126&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=Xiaomi%20Redmi%2013C%20budget%20affordable%20Android%20smartphone%20star%20trail%20black%20white%20background%20clean%20product%20photography%20entry%20level%20phone&width=600&height=600&seq=126&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "Xiaomi Redmi 13C phân khúc giá rẻ nhưng hiệu năng tốt với chip Helio G85, RAM 4GB. Màn hình lớn 6.74\" HD+ 90Hz mượt mà. Camera 50MP chụp ảnh sắc nét trong tầm giá. Pin 5000mAh dùng cả ngày không lo hết pin. Thiết kế tinh tế dành cho người dùng phổ thông.",
    shortDesc: "Helio G85, màn 6.74\" 90Hz, camera 50MP, pin 5000mAh",
    stock: 120,
    badge: "Giá Tốt",
    sold: 22400
  },
  {
    id: "p014",
    name: "iPhone 14 128GB",
    price: 15990000,
    originalPrice: 18990000,
    commission: 5,
    rating: 4.8,
    reviews: 11200,
    image: "https://readdy.ai/api/search-image?query=iPhone%2014%20midnight%20black%20color%20smartphone%20clean%20white%20background%20minimal%20Apple%20product%20photography%20compact%20design&width=400&height=400&seq=127&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=iPhone%2014%20midnight%20black%20color%20smartphone%20clean%20white%20background%20minimal%20Apple%20product%20photography%20compact%20design&width=600&height=600&seq=127&orientation=squarish",
      "https://readdy.ai/api/search-image?query=iPhone%2014%20back%20dual%20camera%20system%20black%20midnight%20clean%20white%20background%20detail&width=600&height=600&seq=128&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "iPhone 14 với chip A15 Bionic vẫn cực mạnh, camera 12MP chế độ Action Mode quay phim chống rung. Crash Detection và Emergency SOS qua vệ tinh bảo vệ an toàn. Màn hình Super Retina XDR 6.1\", thiết kế nhôm aerospace bền bỉ.",
    shortDesc: "A15 Bionic, Action Mode camera, Emergency SOS vệ tinh",
    stock: 40,
    sold: 18900
  },
  {
    id: "p015",
    name: "OPPO Find X7 Ultra 512GB",
    price: 35990000,
    originalPrice: 40990000,
    commission: 6,
    rating: 4.8,
    reviews: 980,
    image: "https://readdy.ai/api/search-image?query=OPPO%20Find%20X7%20Ultra%20black%20ceramic%20premium%20flagship%20phone%20Hasselblad%20camera%20large%20circular%20lens%20housing%20white%20background%20product%20photography&width=400&height=400&seq=129&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=OPPO%20Find%20X7%20Ultra%20black%20ceramic%20premium%20flagship%20phone%20Hasselblad%20camera%20large%20circular%20lens%20housing%20white%20background%20product%20photography&width=600&height=600&seq=129&orientation=squarish",
      "https://readdy.ai/api/search-image?query=OPPO%20Find%20X7%20Ultra%20Hasselblad%20quad%20camera%20back%20view%20ceramic%20black%20premium%20white%20background%20detail&width=600&height=600&seq=130&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "OPPO Find X7 Ultra đỉnh cao với camera Hasselblad 4 ống kính: 50MP chính + 50MP tele 3x + 50MP tele 6x + 50MP góc rộng. Chip Snapdragon 8 Gen 3, sạc SUPERVOOC 100W không dây 50W. Màn hình LTPO AMOLED 6.82\" 120Hz. Vỏ ceramic cao cấp siêu sang.",
    shortDesc: "Hasselblad 4 camera, Snapdragon 8 Gen 3, sạc 100W",
    stock: 10,
    badge: "Ultra Premium",
    sold: 1240
  },
  {
    id: "p016",
    name: "iPhone 15 Pro 256GB",
    price: 25990000,
    originalPrice: 29990000,
    commission: 6,
    rating: 4.9,
    reviews: 7240,
    image: "https://readdy.ai/api/search-image?query=iPhone%2015%20Pro%20natural%20titanium%20color%20premium%20smartphone%20front%20view%20on%20clean%20white%20studio%20background%20Apple%20flagship%20product%20photography&width=400&height=400&seq=131&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=iPhone%2015%20Pro%20natural%20titanium%20color%20premium%20smartphone%20front%20view%20on%20clean%20white%20studio%20background%20Apple%20flagship%20product%20photography&width=600&height=600&seq=131&orientation=squarish",
      "https://readdy.ai/api/search-image?query=iPhone%2015%20Pro%20back%20triple%20camera%20titanium%20natural%20color%20brushed%20metal%20texture%20white%20background%20close%20up&width=600&height=600&seq=132&orientation=squarish",
      "https://readdy.ai/api/search-image?query=iPhone%2015%20Pro%20Action%20Button%20side%20titanium%20frame%20slim%20profile%20white%20background%20product%20detail%20shot&width=600&height=600&seq=133&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "iPhone 15 Pro với chip A17 Pro mạnh nhất trên 3nm, Action Button tùy chỉnh linh hoạt. Camera 48MP + 12MP tele 3x + 12MP góc siêu rộng, quay video 4K ProRes. Thiết kế titan nhẹ hơn 19g so với thế hệ trước, USB-C Gen 2 tốc độ cao.",
    shortDesc: "A17 Pro 3nm, Action Button, camera zoom 3x, titan nhẹ",
    stock: 28,
    badge: "Bán Chạy",
    sold: 10320
  },
  {
    id: "p017",
    name: "iPhone 15 Plus 256GB",
    price: 22990000,
    originalPrice: 25990000,
    commission: 5,
    rating: 4.7,
    reviews: 4180,
    image: "https://readdy.ai/api/search-image?query=iPhone%2015%20Plus%20yellow%20sunshine%20large%20display%20smartphone%20flat%20lay%20white%20background%20Apple%20product%20photography%20cheerful%20color&width=400&height=400&seq=134&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=iPhone%2015%20Plus%20yellow%20sunshine%20large%20display%20smartphone%20flat%20lay%20white%20background%20Apple%20product%20photography%20cheerful%20color&width=600&height=600&seq=134&orientation=squarish",
      "https://readdy.ai/api/search-image?query=iPhone%2015%20Plus%20back%20dual%20camera%20system%20yellow%20color%20big%20screen%20phone%20white%20background&width=600&height=600&seq=135&orientation=squarish",
      "https://readdy.ai/api/search-image?query=iPhone%2015%20Plus%20side%20profile%20slim%20design%20USB-C%20port%20clean%20white%20background&width=600&height=600&seq=136&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "iPhone 15 Plus màn hình lớn 6.7\" Super Retina XDR, pin siêu trâu 4383mAh dùng cả ngày thoải mái. Dynamic Island, camera 48MP chụp ảnh đêm rõ nét, USB-C. Chip A16 Bionic mạnh mẽ, 5G tốc độ cao.",
    shortDesc: "Màn 6.7\" lớn, pin cực trâu, Dynamic Island, 48MP",
    stock: 35,
    sold: 6840
  },
  {
    id: "p018",
    name: "iPhone 14 Pro Max 256GB",
    price: 20990000,
    originalPrice: 24990000,
    commission: 5,
    rating: 4.8,
    reviews: 9870,
    image: "https://readdy.ai/api/search-image?query=iPhone%2014%20Pro%20Max%20space%20black%20deep%20purple%20color%20premium%20smartphone%20Dynamic%20Island%20display%20clean%20white%20background%20product%20photography&width=400&height=400&seq=137&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=iPhone%2014%20Pro%20Max%20space%20black%20deep%20purple%20color%20premium%20smartphone%20Dynamic%20Island%20display%20clean%20white%20background%20product%20photography&width=600&height=600&seq=137&orientation=squarish",
      "https://readdy.ai/api/search-image?query=iPhone%2014%20Pro%20Max%20back%20triple%20camera%2048MP%20quad%20array%20stainless%20steel%20frame%20white%20background&width=600&height=600&seq=138&orientation=squarish",
      "https://readdy.ai/api/search-image?query=iPhone%2014%20Pro%20Max%20Always%20On%20Display%20lock%20screen%20clock%20widgets%20space%20black%20white%20background&width=600&height=600&seq=139&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "iPhone 14 Pro Max - chiếc iPhone đầu tiên có Dynamic Island thay thế tai thỏ. Camera 48MP main lần đầu trên iPhone, Always-On Display, chip A16 Bionic. Màn hình ProMotion 120Hz luôn bật, pin 4323mAh dung lượng lớn.",
    shortDesc: "Dynamic Island đầu tiên, camera 48MP, Always-On 120Hz",
    stock: 22,
    badge: "Hot Deal",
    sold: 14200
  },
  {
    id: "p019",
    name: "iPhone 13 128GB",
    price: 13990000,
    originalPrice: 16990000,
    commission: 5,
    rating: 4.7,
    reviews: 15420,
    image: "https://readdy.ai/api/search-image?query=iPhone%2013%20starlight%20white%20slim%20compact%20smartphone%20notch%20design%20clean%20white%20background%20Apple%20product%20classic%20model&width=400&height=400&seq=140&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=iPhone%2013%20starlight%20white%20slim%20compact%20smartphone%20notch%20design%20clean%20white%20background%20Apple%20product%20classic%20model&width=600&height=600&seq=140&orientation=squarish",
      "https://readdy.ai/api/search-image?query=iPhone%2013%20back%20dual%20camera%20diagonal%20arrangement%20white%20starlight%20color%20clean%20background&width=600&height=600&seq=141&orientation=squarish",
      "https://readdy.ai/api/search-image?query=iPhone%2013%20side%20profile%20slim%20aluminum%20frame%20starlight%20white%20product%20photo%20white%20background&width=600&height=600&seq=142&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "iPhone 13 vẫn là lựa chọn tuyệt vời với chip A15 Bionic siêu mạnh, camera kép 12MP cải tiến chế độ ban đêm. Màn hình Super Retina XDR 6.1\" đẹp sắc nét, pin tăng 2.5 giờ so với iPhone 12. Thiết kế Ceramic Shield bền bỉ, IP68 chống nước.",
    shortDesc: "A15 Bionic, pin lâu hơn 2.5h, camera night mode, IP68",
    stock: 50,
    badge: "Giá Tốt",
    sold: 28900
  },
  {
    id: "p020",
    name: "Samsung Galaxy S24 256GB",
    price: 18990000,
    originalPrice: 22990000,
    commission: 6,
    rating: 4.7,
    reviews: 5430,
    image: "https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20S24%20marble%20gray%20compact%20flagship%20Android%20phone%20white%20background%20product%20photography%20clean%20minimal%202024&width=400&height=400&seq=143&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20S24%20marble%20gray%20compact%20flagship%20Android%20phone%20white%20background%20product%20photography%20clean%20minimal%202024&width=600&height=600&seq=143&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20S24%20back%20triple%20camera%20gray%20color%20flat%20lay%20white%20background&width=600&height=600&seq=144&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20S24%20front%20display%20AMOLED%20screen%20bright%20white%20background%20product%20photo&width=600&height=600&seq=145&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "Samsung Galaxy S24 nhỏ gọn 6.2\" với chip Snapdragon 8 Gen 3 đầy đủ AI Galaxy. Camera 50MP+10MP+12MP chụp sắc nét, màn hình AMOLED 120Hz sáng 2600 nits. Thiết kế phẳng Armor Aluminum sang trọng, pin 4000mAh sạc 25W.",
    shortDesc: "Snapdragon 8 Gen 3, màn 6.2\" 2600nit, gọn nhẹ 167g",
    stock: 40,
    sold: 7860
  },
  {
    id: "p021",
    name: "Samsung Galaxy A35 5G 128GB",
    price: 7490000,
    originalPrice: 8990000,
    commission: 9,
    rating: 4.6,
    reviews: 6120,
    image: "https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20A35%205G%20awesome%20iceblue%20color%20mid-range%20slim%20Android%20phone%20white%20background%20clean%20simple%20product%20photography&width=400&height=400&seq=146&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20A35%205G%20awesome%20iceblue%20color%20mid-range%20slim%20Android%20phone%20white%20background%20clean%20simple%20product%20photography&width=600&height=600&seq=146&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20A35%20back%20triple%20camera%20ice%20blue%20gradient%20color%20clean%20white%20background&width=600&height=600&seq=147&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20A35%20display%20AMOLED%20screen%20bright%20front%20view%20white%20background%20product%20photo&width=600&height=600&seq=148&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "Samsung Galaxy A35 5G với chip Exynos 1380 mạnh mẽ tầm trung, màn hình Super AMOLED 6.6\" 120Hz FHD+. Camera 50MP OIS chụp ổn định, selfie 13MP. Pin 5000mAh sạc 25W, thiết kế Gorilla Glass Victus+ bền bỉ. Có NFC thanh toán tiện lợi.",
    shortDesc: "Exynos 1380, AMOLED 120Hz, 50MP OIS, NFC, 5G",
    stock: 75,
    sold: 11240
  },
  {
    id: "p022",
    name: "Samsung Galaxy A15 5G 128GB",
    price: 4490000,
    originalPrice: 5490000,
    commission: 10,
    rating: 4.4,
    reviews: 8940,
    image: "https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20A15%205G%20blue%20black%20entry%20level%20affordable%205G%20smartphone%20white%20background%20clean%20simple%20product%20photography&width=400&height=400&seq=149&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20A15%205G%20blue%20black%20entry%20level%20affordable%205G%20smartphone%20white%20background%20clean%20simple%20product%20photography&width=600&height=600&seq=149&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20A15%20back%20triple%20camera%20budget%20phone%20blue%20color%20white%20background%20flat%20lay&width=600&height=600&seq=150&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "Samsung Galaxy A15 5G - điện thoại 5G giá rẻ nhất từ Samsung, chip MediaTek Dimensity 6100+. Màn hình Super AMOLED 6.5\" 90Hz đẹp trong tầm giá. Camera 50MP+5MP+2MP, pin 5000mAh, thiết kế mỏng đẹp dùng hàng ngày.",
    shortDesc: "5G giá rẻ, AMOLED 90Hz, camera 50MP, Dimensity 6100+",
    stock: 100,
    badge: "Giá Tốt",
    sold: 19800
  },
  {
    id: "p023",
    name: "Samsung Galaxy Z Flip 6 256GB",
    price: 27990000,
    originalPrice: 32990000,
    commission: 6,
    rating: 4.7,
    reviews: 2340,
    image: "https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20Z%20Flip%206%20yellow%20gold%20foldable%20flip%20phone%20open%20closed%20folded%20clamshell%20design%20white%20background%20product%20photography%20premium&width=400&height=400&seq=151&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20Z%20Flip%206%20yellow%20gold%20foldable%20flip%20phone%20open%20closed%20folded%20clamshell%20design%20white%20background%20product%20photography%20premium&width=600&height=600&seq=151&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20Z%20Flip%206%20open%20unfolded%20showing%20full%20display%20yellow%20gold%20white%20background&width=600&height=600&seq=152&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20Z%20Flip%206%20cover%20screen%20folded%20compact%20size%20yellow%20gold%20white%20background%20detail&width=600&height=600&seq=153&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "Samsung Galaxy Z Flip 6 thiết kế gập clamshell thời trang, màn hình trong 6.7\" Full HD+ AMOLED 120Hz. Màn hình ngoài FlexWindow 3.4\" lớn nhất dòng Flip. Chip Snapdragon 8 Gen 3, camera kép 50MP+12MP, IPX8 chống nước. Gấp gọn bỏ túi cực kỳ tiện.",
    shortDesc: "Gập thời trang, màn ngoài 3.4\", Snapdragon 8 Gen 3",
    stock: 15,
    badge: "Thời Trang",
    sold: 3920
  },
  {
    id: "p024",
    name: "Samsung Galaxy S23 FE 256GB",
    price: 11990000,
    originalPrice: 14990000,
    commission: 8,
    rating: 4.6,
    reviews: 4210,
    image: "https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20S23%20FE%20graphite%20gray%20Fan%20Edition%20flagship%20features%20mid-price%20Android%20phone%20clean%20white%20background%20product%20photography&width=400&height=400&seq=154&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20S23%20FE%20graphite%20gray%20Fan%20Edition%20flagship%20features%20mid-price%20Android%20phone%20clean%20white%20background%20product%20photography&width=600&height=600&seq=154&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20S23%20FE%20back%20triple%20camera%20gray%20flat%20body%20white%20background%20product%20photo&width=600&height=600&seq=155&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "Samsung Galaxy S23 FE mang tính năng flagship với giá tầm trung. Chip Snapdragon 8 Gen 1, màn hình Dynamic AMOLED 6.4\" 120Hz FHD+. Camera 50MP OIS + 8MP tele + 12MP góc rộng, pin 4500mAh IP68. Thiết kế Contour Cut Camera đặc trưng dòng S.",
    shortDesc: "Flagship features tầm trung, Snapdragon 8 Gen 1, IP68",
    stock: 35,
    sold: 8740
  },
  {
    id: "p025",
    name: "Xiaomi 13T Pro 256GB",
    price: 14990000,
    originalPrice: 17990000,
    commission: 8,
    rating: 4.7,
    reviews: 3840,
    image: "https://readdy.ai/api/search-image?query=Xiaomi%2013T%20Pro%20black%20Leica%20camera%20flagship%20performance%20Android%20phone%20white%20background%20product%20photography%20powerful%20specs&width=400&height=400&seq=156&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=Xiaomi%2013T%20Pro%20black%20Leica%20camera%20flagship%20performance%20Android%20phone%20white%20background%20product%20photography%20powerful%20specs&width=600&height=600&seq=156&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Xiaomi%2013T%20Pro%20back%20Leica%20triple%20camera%20system%20black%20clean%20white%20background%20detail%20shot&width=600&height=600&seq=157&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Xiaomi%2013T%20Pro%20display%20AMOLED%20bright%20vivid%20screen%20front%20view%20white%20background&width=600&height=600&seq=158&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "Xiaomi 13T Pro trang bị chip Dimensity 9200+ hiệu năng cao, camera Leica 50MP+50MP+50MP ba ống đều 50MP cực hiếm. Màn hình AMOLED 6.67\" 144Hz, sạc siêu nhanh HyperCharge 120W đầy pin 23 phút. Hệ thống làm mát LiquidCool 2.0 chơi game mượt.",
    shortDesc: "Leica 3x50MP, sạc 120W, Dimensity 9200+, màn 144Hz",
    stock: 28,
    sold: 5670
  },
  {
    id: "p026",
    name: "Xiaomi POCO X6 Pro 5G 256GB",
    price: 9990000,
    originalPrice: 11990000,
    commission: 9,
    rating: 4.7,
    reviews: 5120,
    image: "https://readdy.ai/api/search-image?query=Xiaomi%20POCO%20X6%20Pro%20yellow%20gaming%20smartphone%20bold%20design%20white%20background%20performance%20mid-range%205G%20Android%20product%20photography&width=400&height=400&seq=159&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=Xiaomi%20POCO%20X6%20Pro%20yellow%20gaming%20smartphone%20bold%20design%20white%20background%20performance%20mid-range%205G%20Android%20product%20photography&width=600&height=600&seq=159&orientation=squarish",
      "https://readdy.ai/api/search-image?query=POCO%20X6%20Pro%20back%20camera%20triple%20lens%20yellow%20bold%20design%20white%20background%20clean&width=600&height=600&seq=160&orientation=squarish",
      "https://readdy.ai/api/search-image?query=POCO%20X6%20Pro%20gaming%20display%20flow%20AMOLED%20120Hz%20bright%20screen%20yellow%20white%20background&width=600&height=600&seq=161&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "Xiaomi POCO X6 Pro 5G với chip Dimensity 8300 Ultra - mạnh nhất tầm giá, AnTuTu vượt 1.7 triệu điểm. Màn hình Flow AMOLED 6.67\" 120Hz CrystalRes, camera 64MP Sony IMX686. Pin 5000mAh sạc 67W. Làm mát LiquidCool 2.0, thiết kế gaming cực ngầu.",
    shortDesc: "Dimensity 8300 Ultra, Flow AMOLED, 64MP Sony, gaming",
    stock: 45,
    badge: "Gaming",
    sold: 9340
  },
  {
    id: "p027",
    name: "Xiaomi Redmi Note 12 5G 128GB",
    price: 5490000,
    originalPrice: 6490000,
    commission: 10,
    rating: 4.5,
    reviews: 12800,
    image: "https://readdy.ai/api/search-image?query=Xiaomi%20Redmi%20Note%2012%205G%20onyx%20gray%20slim%20affordable%20smartphone%20white%20background%20clean%20product%20photography%20great%20value%20mid-range&width=400&height=400&seq=162&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=Xiaomi%20Redmi%20Note%2012%205G%20onyx%20gray%20slim%20affordable%20smartphone%20white%20background%20clean%20product%20photography%20great%20value%20mid-range&width=600&height=600&seq=162&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Xiaomi%20Redmi%20Note%2012%20back%20camera%20triple%20lens%20gray%20slim%20body%20white%20background%20product%20photo&width=600&height=600&seq=163&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "Xiaomi Redmi Note 12 5G siêu giá trị với chip Snapdragon 4 Gen 1, màn hình AMOLED 6.67\" 120Hz sắc nét. Camera 48MP chụp ảnh đẹp trong tầm giá. Pin 5000mAh sạc 33W. Thiết kế mỏng 7.98mm, đầu đọc dấu vân tay sườn. Kết nối 5G tốc độ cao.",
    shortDesc: "5G tầm giá, AMOLED 120Hz, Snapdragon 4 Gen 1, 48MP",
    stock: 80,
    badge: "Giá Tốt",
    sold: 24600
  },
  {
    id: "p028",
    name: "OPPO Reno 11 5G 256GB",
    price: 10990000,
    originalPrice: 12990000,
    commission: 8,
    rating: 4.6,
    reviews: 3960,
    image: "https://readdy.ai/api/search-image?query=OPPO%20Reno%2011%205G%20rock%20gray%20slim%20stylish%20Android%20phone%20with%20portrait%20camera%20white%20background%20clean%20product%20photography%20modern%20design&width=400&height=400&seq=164&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=OPPO%20Reno%2011%205G%20rock%20gray%20slim%20stylish%20Android%20phone%20with%20portrait%20camera%20white%20background%20clean%20product%20photography%20modern%20design&width=600&height=600&seq=164&orientation=squarish",
      "https://readdy.ai/api/search-image?query=OPPO%20Reno%2011%20back%20camera%20system%20gray%20slim%20body%20portrait%20selfie%20white%20background&width=600&height=600&seq=165&orientation=squarish",
      "https://readdy.ai/api/search-image?query=OPPO%20Reno%2011%20display%20AMOLED%20curved%20screen%20selfie%20camera%20front%20view%20white%20background&width=600&height=600&seq=166&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "OPPO Reno 11 5G thiết kế mỏng 7.3mm siêu đẹp, chip MediaTek Dimensity 7050. Camera selfie 32MP cho ảnh chân dung chuẩn studio, camera sau 50MP+32MP+8MP. Màn hình AMOLED 6.7\" 120Hz curved, pin 5000mAh SUPERVOOC 67W. NFC, 5G đầy đủ.",
    shortDesc: "Thiết kế mỏng 7.3mm, selfie 32MP, SUPERVOOC 67W, 5G",
    stock: 42,
    sold: 7230
  },
  {
    id: "p029",
    name: "OPPO A78 5G 128GB",
    price: 5990000,
    originalPrice: 7490000,
    commission: 10,
    rating: 4.5,
    reviews: 7140,
    image: "https://readdy.ai/api/search-image?query=OPPO%20A78%205G%20aqua%20green%20slim%20affordable%20budget%205G%20smartphone%20white%20background%20clean%20product%20photo%20trendy%20design%20young&width=400&height=400&seq=167&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=OPPO%20A78%205G%20aqua%20green%20slim%20affordable%20budget%205G%20smartphone%20white%20background%20clean%20product%20photo%20trendy%20design%20young&width=600&height=600&seq=167&orientation=squarish",
      "https://readdy.ai/api/search-image?query=OPPO%20A78%205G%20back%20dual%20camera%20aqua%20green%20color%20slim%20body%20white%20background%20product%20photo&width=600&height=600&seq=168&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "OPPO A78 5G phân khúc giá rẻ 5G đáng mua nhất, chip Snapdragon 695 5G ổn định. Màn hình AMOLED 6.56\" 90Hz sắc nét, camera 50MP chính chụp ngày đêm. Pin 5000mAh sạc 67W SUPERVOOC đầy nhanh. Thiết kế mỏng đẹp, đầu đọc vân tay sườn.",
    shortDesc: "5G Snapdragon 695, AMOLED 90Hz, sạc 67W, 50MP",
    stock: 65,
    badge: "Giá Tốt",
    sold: 16800
  },
  {
    id: "p030",
    name: "Vivo X100 Pro 512GB",
    price: 28990000,
    originalPrice: 33990000,
    commission: 7,
    rating: 4.8,
    reviews: 1820,
    image: "https://readdy.ai/api/search-image?query=Vivo%20X100%20Pro%20black%20flagship%20smartphone%20ZEISS%20Gimbal%20camera%20large%20periscope%20lens%20housing%20premium%20photography%20white%20background%20sleek%20design&width=400&height=400&seq=169&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=Vivo%20X100%20Pro%20black%20flagship%20smartphone%20ZEISS%20Gimbal%20camera%20large%20periscope%20lens%20housing%20premium%20photography%20white%20background%20sleek%20design&width=600&height=600&seq=169&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Vivo%20X100%20Pro%20back%20ZEISS%20triple%20camera%20periscope%20telephoto%20lens%20black%20titanium%20body%20white%20background&width=600&height=600&seq=170&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Vivo%20X100%20Pro%20front%20display%20AMOLED%20curved%20screen%20flagship%20bright%20white%20background%20detail&width=600&height=600&seq=171&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "Vivo X100 Pro đỉnh của chóp với ZEISS Gimbal Camera chống rung như quay phim chuyên nghiệp. Camera 50MP chính + 50MP tele 4x + 50MP góc rộng, đèn ring ZEISS. Chip Dimensity 9300 mạnh nhất, pin 5400mAh sạc FlashCharge 100W không dây 50W. Màn hình AMOLED 6.78\" 120Hz 3000 nits.",
    shortDesc: "ZEISS Gimbal camera, Dimensity 9300, sạc 100W, 5400mAh",
    stock: 12,
    badge: "Premium",
    sold: 2890
  },
  {
    id: "p031",
    name: "Vivo Y100 5G 256GB",
    price: 7990000,
    originalPrice: 9490000,
    commission: 9,
    rating: 4.5,
    reviews: 4320,
    image: "https://readdy.ai/api/search-image?query=Vivo%20Y100%205G%20velvet%20red%20slim%20mid-range%20Android%20smartphone%20white%20background%20clean%20simple%20product%20photography%20budget%20phone&width=400&height=400&seq=172&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=Vivo%20Y100%205G%20velvet%20red%20slim%20mid-range%20Android%20smartphone%20white%20background%20clean%20simple%20product%20photography%20budget%20phone&width=600&height=600&seq=172&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Vivo%20Y100%205G%20back%20dual%20camera%20red%20slim%20body%20white%20background%20product%20photo%20detail&width=600&height=600&seq=173&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "Vivo Y100 5G mỏng nhất phân khúc chỉ 6.89mm, thiết kế thời trang với 8 lớp bảo vệ. Chip Snapdragon 4 Gen 1 5G ổn định, màn hình AMOLED 6.67\" 120Hz. Camera 64MP OIS chụp ảnh đẹp, pin 4500mAh sạc 44W FlashCharge. RAM 12GB đa nhiệm mượt.",
    shortDesc: "Snapdragon 4 Gen 1, màn 6.67\" 120Hz, 64MP OIS",
    stock: 48,
    badge: "Giá Tốt",
    sold: 13450
  },
  {
    id: "p032",
    name: "Vivo Y36 128GB",
    price: 4990000,
    originalPrice: 5990000,
    commission: 10,
    rating: 4.4,
    reviews: 5680,
    image: "https://readdy.ai/api/search-image?query=Vivo%20Y36%20meteor%20black%20budget%20affordable%20slim%20smartphone%20entry%20mid-range%20white%20background%20clean%20simple%20product%20photography%20value&width=400&height=400&seq=174&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=Vivo%20Y36%20meteor%20black%20budget%20affordable%20slim%20smartphone%20entry%20mid-range%20white%20background%20clean%20simple%20product%20photography%20value&width=600&height=600&seq=174&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Vivo%20Y36%20back%20dual%20camera%20black%20body%20slim%20profile%20white%20background%20product%20photo%20detail&width=600&height=600&seq=175&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "Vivo Y36 thiết kế mỏng đẹp tầm giá, chip Snapdragon 680 ổn định. Màn hình IPS 6.72\" 90Hz FHD+ lớn và đẹp, camera 50MP chính chụp ảnh rõ nét. Pin 5000mAh sạc 44W FlashCharge đầy nhanh. Bộ nhớ 128GB rộng rãi, hỗ trợ thẻ nhớ mở rộng.",
    shortDesc: "Snapdragon 680, màn 6.72\" 90Hz, 50MP chính, 44W sạc",
    stock: 90,
    badge: "Giá Rẻ",
    sold: 21300
  },
  {
    id: "p033",
    name: "Realme 12 Pro+ 5G 256GB",
    price: 10490000,
    originalPrice: 12490000,
    commission: 9,
    rating: 4.7,
    reviews: 3210,
    image: "https://readdy.ai/api/search-image?query=Realme%2012%20Pro%20Plus%205G%20submarine%20blue%20slim%20elegant%20Android%20phone%20periscope%20camera%20white%20background%20clean%20product%20photography%20affordable%20flagship&width=400&height=400&seq=176&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=Realme%2012%20Pro%20Plus%205G%20submarine%20blue%20slim%20elegant%20Android%20phone%20periscope%20camera%20white%20background%20clean%20product%20photography%20affordable%20flagship&width=600&height=600&seq=176&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Realme%2012%20Pro%20Plus%20back%20periscope%20telephoto%20camera%20system%20blue%20premium%20body%20white%20background&width=600&height=600&seq=177&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Realme%2012%20Pro%20Plus%20front%20AMOLED%20display%20curved%20edges%20blue%20phone%20white%20background%20product&width=600&height=600&seq=178&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "Realme 12 Pro+ 5G với camera periscope Sony IMX890 64MP zoom quang 3x đầu tiên tầm giá này. Chip Snapdragon 7s Gen 2, màn hình AMOLED 6.7\" 120Hz curved cực đẹp. Pin 5000mAh SUPERVOOC 45W, thiết kế da vải nhám cao cấp, mỏng 8.55mm.",
    shortDesc: "Periscope 64MP zoom 3x, Snapdragon 7s Gen 2, AMOLED curved",
    stock: 55,
    badge: "Giá Tốt",
    sold: 10890
  },
  {
    id: "p034",
    name: "Realme C67 4G 256GB",
    price: 3990000,
    originalPrice: 4990000,
    commission: 11,
    rating: 4.4,
    reviews: 9840,
    image: "https://readdy.ai/api/search-image?query=Realme%20C67%20sunny%20oasis%20green%20budget%20affordable%20slim%20smartphone%20white%20background%20clean%20simple%20product%20photography%20value&width=400&height=400&seq=179&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=Realme%20C67%20sunny%20oasis%20green%20budget%20affordable%20slim%20smartphone%20white%20background%20clean%20simple%20product%20photography%20value&width=600&height=600&seq=179&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Realme%20C67%20back%20camera%20108MP%20green%20slim%20body%20white%20background%20product%20photo%20detail&width=600&height=600&seq=180&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "Realme C67 bất ngờ với camera 108MP sắc nét nhất phân khúc giá rẻ. Màn hình IPS 6.72\" 90Hz FHD+ lớn và đẹp, chip Snapdragon 685 mượt mà. Pin 5000mAh sạc 33W, thiết kế mỏng 7.59mm, kính mờ cao cấp. Hỗ trợ NFC thanh toán.",
    shortDesc: "Camera 108MP, IPS 90Hz, 33W sạc, 7.59mm mỏng",
    stock: 110,
    badge: "Giá Tốt",
    sold: 21300
  },
  {
    id: "p035",
    name: "Realme Narzo 70 Pro 5G 256GB",
    price: 6490000,
    originalPrice: 7990000,
    commission: 10,
    rating: 4.5,
    reviews: 4560,
    image: "https://readdy.ai/api/search-image?query=Realme%20Narzo%2070%20Pro%205G%20glass%20green%20premium%20look%20gaming%20performance%20phone%20white%20background%20clean%20simple%20product%20photography%20affordable%20flagship&width=400&height=400&seq=181&orientation=squarish",
    images: [
      "https://readdy.ai/api/search-image?query=Realme%20Narzo%2070%20Pro%205G%20glass%20green%20premium%20look%20gaming%20performance%20phone%20white%20background%20clean%20simple%20product%20photography%20affordable%20flagship&width=600&height=600&seq=181&orientation=squarish",
      "https://readdy.ai/api/search-image?query=Realme%20Narzo%2070%20Pro%205G%20back%20camera%20green%20glass%20body%20dual%20lens%20white%20background%20product%20photo&width=600&height=600&seq=182&orientation=squarish"
    ],
    category: "Điện Thoại Di Động",
    description: "Realme Narzo 70 Pro 5G tập trung gaming với chip Dimensity 7050 mạnh, tản nhiệt tốt. Màn hình AMOLED 6.67\" 120Hz, camera 50MP Sony IMX766 OIS chụp đẹp. Pin 5000mAh sạc 45W, thiết kế kính gradient premium bắt mắt. RAM 8GB mở rộng ảo lên 16GB.",
    shortDesc: "Dimensity 7050 gaming, AMOLED 120Hz, 50MP OIS, 5G",
    stock: 55,
    badge: "Giá Tốt",
    sold: 10890
  }
];

export const mockCategories = [
  {
    id: "dien-thoai",
    name: "Điện Thoại Di Động",
    count: 215,
    image: "https://readdy.ai/api/search-image?query=collection%20of%20premium%20smartphones%20iPhone%20Samsung%20arranged%20neatly%20on%20light%20pastel%20background%20minimal%20flat%20lay%20top%20view%20product%20photography&width=400&height=300&seq=200&orientation=landscape"
  },
  {
    id: "dien-tu",
    name: "Điện Tử",
    count: 128,
    image: "https://readdy.ai/api/search-image?query=modern%20electronics%20gadgets%20smartphones%20earbuds%20on%20pastel%20pink%20background%20minimalist%20flat%20lay&width=400&height=300&seq=20&orientation=landscape"
  },
  {
    id: "gia-dung",
    name: "Gia Dụng",
    count: 94,
    image: "https://readdy.ai/api/search-image?query=modern%20home%20appliances%20kitchen%20gadgets%20on%20light%20mint%20green%20background%20minimalist%20clean&width=400&height=300&seq=21&orientation=landscape"
  },
  {
    id: "nha-thong-minh",
    name: "Nhà Thông Minh",
    count: 67,
    image: "https://readdy.ai/api/search-image?query=smart%20home%20devices%20hub%20sensors%20lights%20on%20warm%20beige%20background%20minimalist%20product%20flat%20lay&width=400&height=300&seq=22&orientation=landscape"
  },
  {
    id: "may-tinh",
    name: "Máy Tính",
    count: 45,
    image: "https://readdy.ai/api/search-image?query=laptop%20computer%20accessories%20keyboard%20mouse%20on%20light%20gray%20background%20minimalist%20tech%20product%20photography&width=400&height=300&seq=23&orientation=landscape"
  }
];

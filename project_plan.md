# ShopAffiliate - Website Bán Hàng Tiếp Thị Liên Kết

## 1. Mô Tả Dự Án
Website thương mại điện tử tích hợp chương trình tiếp thị liên kết (affiliate marketing). Người dùng có thể xem, mua sản phẩm và tham gia chương trình affiliate để kiếm hoa hồng khi giới thiệu bạn bè mua hàng.

**Đối tượng**: Người mua hàng online và các affiliate marketer.
**Giá trị cốt lõi**: Mua sắm dễ dàng + kiếm tiền qua giới thiệu sản phẩm.

## 2. Cấu Trúc Trang
- `/` - Trang Chủ (Home)
- `/products` - Danh Sách Sản Phẩm
- `/products/:id` - Chi Tiết Sản Phẩm
- `/affiliate` - Chương Trình Affiliate
- `/cart` - Giỏ Hàng
- `/contact` - Liên Hệ

## 3. Tính Năng Cốt Lõi
- [ ] Hiển thị sản phẩm với hoa hồng affiliate
- [ ] Giỏ hàng (Cart context)
- [ ] Trang chi tiết sản phẩm với thông tin affiliate link
- [ ] Chương trình affiliate: đăng ký, lợi ích, cách hoạt động
- [ ] Form liên hệ
- [ ] Navbar với giỏ hàng counter
- [ ] Footer với newsletter

## 4. Data Model (Mock)
- Products: id, name, price, originalPrice, commission, rating, reviews, images, category, description
- Categories: id, name, image, count
- AffiliateStats: partners, totalCommission, avgCommission

## 5. Tích Hợp
- Supabase: Chưa kết nối (sử dụng mock data)
- Stripe: Chưa kết nối (chức năng thanh toán cơ bản)
- Form liên hệ: Readdy Form

## 6. Kế Hoạch Phát Triển

### Phase 1: Core UI - Tất Cả Trang
- Mục tiêu: Xây dựng toàn bộ UI với mock data
- Deliverable: 6 trang hoàn chỉnh, navbar, footer, cart context

### Phase 2: Kết Nối Backend (Tương Lai)
- Supabase cho dữ liệu sản phẩm thực
- Stripe cho thanh toán

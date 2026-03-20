/**
 * ============================================================
 *  HƯỚNG DẪN THAY / THÊM SẢN PHẨM
 * ============================================================
 *
 *  File này GỘP tất cả sản phẩm từ mọi danh mục thành một mảng duy nhất.
 *  Trang chi tiết sản phẩm dùng file này để tìm kiếm.
 *
 *  ĐỂ THAY SẢN PHẨM — mở file tương ứng với danh mục:
 *
 *  📱 Điện Thoại Di Động  → src/mocks/products.ts  (mục mockProducts)
 *                          → src/mocks/phones.ts    (mục extraPhones)
 *  💄 Làm Đẹp             → src/mocks/beauty.ts    (mục beautyProducts)
 *  💊 Sức Khỏe            → src/mocks/health.ts    (mục healthProducts)
 *  👗 Thời Trang          → src/mocks/fashion.ts   (mục fashionProducts)
 *  🐾 Pet & Thú Cưng      → src/mocks/pets.ts      (mục petProducts)
 *  🏠 Nhà Cửa & Tiện Ích  → src/mocks/home-tools.ts (mục homeToolsProducts)
 *  📚 Số & Giáo Dục       → src/mocks/digital.ts   (mục digitalProducts)
 *
 *  MỖI SẢN PHẨM CÓ CÁC TRƯỜNG:
 *    id          — Mã duy nhất (không được trùng)
 *    name        — Tên sản phẩm
 *    price       — Giá bán (VNĐ)
 *    originalPrice — Giá gốc trước giảm (VNĐ)
 *    commission  — % hoa hồng affiliate
 *    rating      — Điểm đánh giá (4.0 ~ 5.0)
 *    reviews     — Số lượng đánh giá
 *    image       — Ảnh thumbnail (URL)
 *    images      — Mảng ảnh chi tiết (URL[])
 *    category    — Tên danh mục (khớp với subcategory)
 *    description — Mô tả dài (hiển thị tab Mô Tả)
 *    shortDesc   — Mô tả ngắn (hiển thị trang danh sách)
 *    stock       — Số lượng tồn kho
 *    badge       — Nhãn nổi bật (tuỳ chọn: "Mới", "Hot", "Giá Tốt"...)
 *    sold        — Số đã bán
 *
 * ============================================================
 */

import { mockProducts } from "./products";
import { extraPhones } from "./phones";
import { beautyProducts } from "./beauty";
import { healthProducts } from "./health";
import { fashionProducts } from "./fashion";
import { petProducts } from "./pets";
import { homeToolsProducts } from "./home-tools";
import { digitalProducts } from "./digital";
import type { Product } from "./products";

/**
 * allProducts — Toàn bộ sản phẩm từ TẤT CẢ danh mục.
 * Dùng cho: trang chi tiết sản phẩm, tìm kiếm toàn cục.
 */
export const allProducts: Product[] = [
  ...mockProducts,
  ...extraPhones,
  ...beautyProducts,
  ...healthProducts,
  ...fashionProducts,
  ...petProducts,
  ...homeToolsProducts,
  ...digitalProducts,
];

/**
 * getProductById — Tìm sản phẩm theo id trong toàn bộ danh mục.
 */
export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

/**
 * getRelatedProducts — Lấy tối đa `limit` sản phẩm cùng danh mục.
 */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

import { Link } from "react-router-dom";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    image: string;
    commission: number;
    badge?: string;
    category?: string;
    rating: number;
    reviews: number;
    sold: number;
    shopeeLink?: string;
    tiktokLink?: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const shopeeUrl = product.shopeeLink || "https://shopee.vn";
  const tiktokUrl = product.tiktokLink || "https://www.tiktok.com/shop";

  return (
    <Link
      to={`/products/${product.id}`}
      className="group bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex flex-col"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-50" style={{ paddingBottom: "100%" }}>
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top-left: discount badge only */}
        {discount > 0 && (
          <div className="absolute top-2 left-2">
            <span className="px-1.5 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full leading-none">
              -{discount}%
            </span>
          </div>
        )}

        {/* Top-right: commission badge */}
        <div className="absolute top-2 right-2">
          <span className="px-1.5 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full leading-none whitespace-nowrap">
            HH {product.commission}%
          </span>
        </div>

        {/* Bottom-left: badge label */}
        {product.badge && (
          <div className="absolute bottom-2 left-2">
            <span className="px-1.5 py-0.5 bg-rose-500 text-white text-[10px] font-semibold rounded-full leading-none max-w-[80px] truncate block">
              {product.badge}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <p className="text-[10px] text-gray-400 mb-0.5 uppercase tracking-wide">{product.category}</p>
        <h3 className="text-xs font-semibold text-gray-900 line-clamp-2 leading-snug mb-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <i
                key={star}
                className={`ri-star-${star <= Math.floor(product.rating) ? "fill" : "line"} text-amber-400 text-[10px]`}
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-500">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="mb-3">
          <div className="flex items-baseline gap-1 flex-wrap">
            <span className="text-sm font-bold text-gray-900">
              {product.price.toLocaleString("vi-VN")}₫
            </span>
            <span className="text-[10px] text-gray-400 line-through">
              {product.originalPrice.toLocaleString("vi-VN")}₫
            </span>
          </div>
          <p className="text-[10px] text-gray-400 mt-0.5">Đã bán {product.sold.toLocaleString()}</p>
        </div>

        {/* Affiliate Buttons */}
        <div
          className="flex gap-1.5 mt-auto"
          onClick={(e) => e.preventDefault()}
        >
          <a
            href={shopeeUrl}
            target="_blank"
            rel="nofollow noopener"
            className="flex-1 flex items-center justify-center gap-1 py-2 bg-orange-500 text-white text-[10px] font-bold rounded-full hover:bg-orange-600 transition-colors cursor-pointer whitespace-nowrap min-w-0"
          >
            <i className="ri-shopping-bag-2-line text-xs leading-none flex-shrink-0" />
            <span className="truncate">Shopee</span>
          </a>
          <a
            href={tiktokUrl}
            target="_blank"
            rel="nofollow noopener"
            className="flex-1 flex items-center justify-center gap-1 py-2 bg-stone-900 text-white text-[10px] font-bold rounded-full hover:bg-stone-700 transition-colors cursor-pointer whitespace-nowrap min-w-0"
          >
            <i className="ri-tiktok-line text-xs leading-none flex-shrink-0" />
            <span className="truncate">TikTok</span>
          </a>
        </div>
      </div>
    </Link>
  );
}

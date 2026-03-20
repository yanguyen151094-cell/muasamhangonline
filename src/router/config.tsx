import { RouteObject } from "react-router-dom";
import HomePage from "../pages/home/page";
import ProductsPage from "../pages/products/page";
import ProductDetailPage from "../pages/product-detail/page";
import AffiliatePage from "../pages/affiliate/page";
import CartPage from "../pages/cart/page";
import ContactPage from "../pages/contact/page";
import BlogPage from "../pages/blog/page";
import BlogDetailPage from "../pages/blog/detail/page";
import PaymentPage from "../pages/payment/page";
import PolicyPage from "../pages/policy/page";
import DienThoaiPage from "../pages/dien-thoai/page";
import LamDepPage from "../pages/lam-dep/page";
import SucKhoePage from "../pages/suc-khoe/page";
import ThuCungPage from "../pages/thu-cung/page";
import ThoiTrangPage from "../pages/thoi-trang/page";
import NhaCuaPage from "../pages/nha-cua/page";
import GiaoDucPage from "../pages/giao-duc/page";
import DonHangPage from "../pages/don-hang/page";
import NotFound from "../pages/NotFound";
// Admin Pages
import AdminLoginPage from "../pages/admin/login/page";
import AdminDashboardPage from "../pages/admin/dashboard/page";
import AdminProductsPage from "../pages/admin/products/page";
import AdminOrdersPage from "../pages/admin/orders/page";
import AdminCustomersPage from "../pages/admin/customers/page";
import AdminContentPage from "../pages/admin/content/page";
import AdminReportsPage from "../pages/admin/reports/page";
import AdminSettingsPage from "../pages/admin/settings/page";
import AdminRegisterPage from "../pages/admin/register/page";

const routes: RouteObject[] = [
  { path: "/", element: <HomePage /> },
  { path: "/products", element: <ProductsPage /> },
  { path: "/products/:id", element: <ProductDetailPage /> },
  { path: "/dien-thoai", element: <DienThoaiPage /> },
  { path: "/lam-dep", element: <LamDepPage /> },
  { path: "/suc-khoe", element: <SucKhoePage /> },
  { path: "/thu-cung", element: <ThuCungPage /> },
  { path: "/thoi-trang", element: <ThoiTrangPage /> },
  { path: "/nha-cua", element: <NhaCuaPage /> },
  { path: "/giao-duc", element: <GiaoDucPage /> },
  { path: "/affiliate", element: <AffiliatePage /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "/don-hang", element: <DonHangPage /> },
  { path: "/blog", element: <BlogPage /> },
  { path: "/blog/:slug", element: <BlogDetailPage /> },
  { path: "/payment", element: <PaymentPage /> },
  { path: "/policy", element: <PolicyPage /> },
  // Admin Routes
  { path: "/admin/login", element: <AdminLoginPage /> },
  { path: "/admin/dashboard", element: <AdminDashboardPage /> },
  { path: "/admin/products", element: <AdminProductsPage /> },
  { path: "/admin/products/add", element: <AdminProductsPage /> },
  { path: "/admin/products/categories", element: <AdminProductsPage /> },
  { path: "/admin/products/coupons", element: <AdminProductsPage /> },
  { path: "/admin/orders", element: <AdminOrdersPage /> },
  { path: "/admin/customers", element: <AdminCustomersPage /> },
  { path: "/admin/customers/notify", element: <AdminCustomersPage /> },
  { path: "/admin/content", element: <AdminContentPage /> },
  { path: "/admin/content/banners", element: <AdminContentPage /> },
  { path: "/admin/content/pages", element: <AdminContentPage /> },
  { path: "/admin/reports", element: <AdminReportsPage /> },
  { path: "/admin/settings", element: <AdminSettingsPage /> },
  { path: "/admin/register", element: <AdminRegisterPage /> },
  { path: "*", element: <NotFound /> },
];

export default routes;

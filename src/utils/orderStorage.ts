export interface OrderItem {
  orderId: string;
  productName: string;
  productPrice: number;
  customerName: string;
  phone: string;
  address: string;
  notes: string;
  status: "pending" | "confirmed" | "shipping" | "delivered";
  createdAt: string;
}

const STORAGE_KEY = "sa_orders";

function loadAll(): OrderItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as OrderItem[]) : [];
  } catch {
    return [];
  }
}

function saveAll(orders: OrderItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function saveOrder(
  data: Pick<OrderItem, "productName" | "productPrice" | "customerName" | "phone" | "address" | "notes">
): OrderItem {
  const ts = Date.now();
  const order: OrderItem = {
    ...data,
    orderId: `DH-${ts.toString().slice(-8)}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  const all = loadAll();
  all.unshift(order);
  saveAll(all);
  return order;
}

export function getOrdersByPhone(phone: string): OrderItem[] {
  const digits = phone.replace(/\D/g, "");
  return loadAll().filter((o) => o.phone.replace(/\D/g, "") === digits);
}

export function getAllOrders(): OrderItem[] {
  return loadAll();
}

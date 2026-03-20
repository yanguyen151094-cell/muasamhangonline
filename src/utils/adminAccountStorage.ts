// ============================================================
// ADMIN ACCOUNT STORAGE — quản lý tài khoản đăng ký & duyệt
// Lưu trữ qua localStorage (thay bằng Supabase khi kết nối)
// ============================================================

export type PendingStatus = 'pending' | 'approved' | 'rejected';

export interface PendingAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  reason: string;
  submittedAt: string;
  status: PendingStatus;
  reviewedAt?: string;
  reviewedBy?: string;
}

const PENDING_KEY = 'admin_pending_accounts';
const APPROVED_KEY = 'admin_approved_accounts';

// ---- READ ----
export function getPendingAccounts(): PendingAccount[] {
  try {
    return JSON.parse(localStorage.getItem(PENDING_KEY) ?? '[]') as PendingAccount[];
  } catch {
    return [];
  }
}

export function getApprovedAccounts(): PendingAccount[] {
  try {
    return JSON.parse(localStorage.getItem(APPROVED_KEY) ?? '[]') as PendingAccount[];
  } catch {
    return [];
  }
}

export function getPendingCount(): number {
  return getPendingAccounts().filter((a) => a.status === 'pending').length;
}

// ---- WRITE ----
export function submitRegistration(data: Omit<PendingAccount, 'id' | 'submittedAt' | 'status'>): void {
  const list = getPendingAccounts();
  const exists = list.some((a) => a.email === data.email);
  if (exists) throw new Error('Email này đã gửi yêu cầu đăng ký trước đó!');

  const newItem: PendingAccount = {
    ...data,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString(),
    status: 'pending',
  };
  localStorage.setItem(PENDING_KEY, JSON.stringify([...list, newItem]));
}

export function approveAccount(id: string, reviewerName: string): void {
  const list = getPendingAccounts().map((a) =>
    a.id === id
      ? { ...a, status: 'approved' as PendingStatus, reviewedAt: new Date().toISOString(), reviewedBy: reviewerName }
      : a,
  );
  localStorage.setItem(PENDING_KEY, JSON.stringify(list));

  // Also save to approved list for login
  const approved = getApprovedAccounts();
  const account = list.find((a) => a.id === id);
  if (account) {
    localStorage.setItem(APPROVED_KEY, JSON.stringify([...approved, account]));
  }
}

export function rejectAccount(id: string, reviewerName: string): void {
  const list = getPendingAccounts().map((a) =>
    a.id === id
      ? { ...a, status: 'rejected' as PendingStatus, reviewedAt: new Date().toISOString(), reviewedBy: reviewerName }
      : a,
  );
  localStorage.setItem(PENDING_KEY, JSON.stringify(list));
}

// ---- CHECK IF EMAIL EXISTS (login) ----
export function findApprovedAccount(email: string, password: string): PendingAccount | null {
  const approved = getApprovedAccounts();
  return approved.find((a) => a.email === email && a.password === password) ?? null;
}

// ---- CHECK IF REGISTRATION WAS SUBMITTED ----
export function getRegistrationStatus(email: string): PendingStatus | null {
  const list = getPendingAccounts();
  const item = list.find((a) => a.email === email);
  return item?.status ?? null;
}

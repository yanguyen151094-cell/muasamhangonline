import { useCallback, useMemo } from 'react';
import { adminPermissions } from '../mocks/adminData';
import type { AdminRole } from '../mocks/adminData';

export interface AdminAuthInfo {
  email: string;
  name: string;
  role: AdminRole;
  loginAt: string;
}

export function useAdminAuth() {
  const auth = useMemo<AdminAuthInfo | null>(() => {
    try {
      const raw = localStorage.getItem('admin_auth');
      if (!raw) return null;
      return JSON.parse(raw) as AdminAuthInfo;
    } catch {
      return null;
    }
  }, []);

  const can = useCallback(
    (permission: string): boolean => {
      if (!auth) return false;
      const role = auth.role ?? 'admin1';
      return adminPermissions[role]?.[permission] ?? false;
    },
    [auth],
  );

  const isAdmin1 = auth?.role === 'admin1';
  const isAdmin2 = auth?.role === 'admin2';

  return { auth, can, isAdmin1, isAdmin2 };
}

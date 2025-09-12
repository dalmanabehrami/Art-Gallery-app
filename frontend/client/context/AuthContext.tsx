import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Role = "admin" | "user" | null;

type AuthContextValue = {
  role: Role;
  setRole: (r: Role) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<Role>(null);
  useEffect(() => {
    const stored = localStorage.getItem("role");
    if (stored === "admin" || stored === "user") setRoleState(stored);
  }, []);
  const setRole = (r: Role) => {
    setRoleState(r);
    if (r) localStorage.setItem("role", r);
    else localStorage.removeItem("role");
  };
  const signOut = () => setRole(null);
  const value = useMemo(() => ({ role, setRole, signOut }), [role]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { CartItem } from "./CartProvider";

export interface Address {
  id: string;
  label: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phone?: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  cogs: number;
  total: number;
  status: string;
  email: string;
  shipTo?: string;
  discountCode?: string;
  influencerId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // dummy only — never do this with a real backend
  addresses: Address[];
  orders: Order[];
}

const USERS_KEY = "luxe_users_v1";
const CURRENT_KEY = "luxe_auth_current_v1";

type PublicUser = Omit<User, "password">;

interface AuthContextValue {
  user: PublicUser | null;
  ready: boolean;
  register: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  updateProfile: (data: { name?: string; email?: string }) => void;
  addAddress: (address: Omit<Address, "id">) => void;
  updateAddress: (id: string, data: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  addOrder: (order: Order) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function toPublic(u: User): PublicUser {
  const { password: _pw, ...rest } = u;
  void _pw;
  return rest;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const email = localStorage.getItem(CURRENT_KEY);
      if (email) {
        const found = readUsers().find((u) => u.email === email);
        if (found) setUser(toPublic(found));
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const syncFromStore = (email: string) => {
    const found = readUsers().find((u) => u.email === email);
    if (found) setUser(toPublic(found));
  };

  const register = (name: string, email: string, password: string) => {
    email = email.trim().toLowerCase();
    if (!name || !email || !password)
      return { ok: false, error: "All fields are required." };
    const users = readUsers();
    if (users.some((u) => u.email === email))
      return { ok: false, error: "An account with that email already exists." };
    const newUser: User = {
      id: `u-${Date.now()}`,
      name,
      email,
      password,
      addresses: [],
      orders: [],
    };
    writeUsers([...users, newUser]);
    localStorage.setItem(CURRENT_KEY, email);
    setUser(toPublic(newUser));
    return { ok: true };
  };

  const login = (email: string, password: string) => {
    email = email.trim().toLowerCase();
    const found = readUsers().find((u) => u.email === email);
    if (!found || found.password !== password)
      return { ok: false, error: "Incorrect email or password." };
    localStorage.setItem(CURRENT_KEY, email);
    setUser(toPublic(found));
    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem(CURRENT_KEY);
    setUser(null);
  };

  const mutateCurrent = (fn: (u: User) => User) => {
    if (!user) return;
    const users = readUsers();
    const next = users.map((u) => (u.id === user.id ? fn(u) : u));
    writeUsers(next);
    // if email changed, update the current pointer
    const updated = next.find((u) => u.id === user.id);
    if (updated) {
      localStorage.setItem(CURRENT_KEY, updated.email);
      setUser(toPublic(updated));
    }
  };

  const updateProfile = (data: { name?: string; email?: string }) =>
    mutateCurrent((u) => ({
      ...u,
      name: data.name ?? u.name,
      email: data.email ? data.email.trim().toLowerCase() : u.email,
    }));

  const addAddress = (address: Omit<Address, "id">) =>
    mutateCurrent((u) => {
      const addr: Address = { ...address, id: `a-${Date.now()}` };
      const addresses = addr.isDefault
        ? u.addresses.map((a) => ({ ...a, isDefault: false }))
        : u.addresses;
      // first address becomes default automatically
      if (addresses.length === 0) addr.isDefault = true;
      return { ...u, addresses: [...addresses, addr] };
    });

  const updateAddress = (id: string, data: Partial<Address>) =>
    mutateCurrent((u) => ({
      ...u,
      addresses: u.addresses.map((a) =>
        a.id === id ? { ...a, ...data } : data.isDefault ? { ...a, isDefault: false } : a
      ),
    }));

  const deleteAddress = (id: string) =>
    mutateCurrent((u) => ({
      ...u,
      addresses: u.addresses.filter((a) => a.id !== id),
    }));

  const addOrder = (order: Order) => {
    // attach to current user if signed in
    if (!user) return;
    mutateCurrent((u) => ({ ...u, orders: [order, ...u.orders] }));
    void syncFromStore;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        ready,
        register,
        login,
        logout,
        updateProfile,
        addAddress,
        updateAddress,
        deleteAddress,
        addOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

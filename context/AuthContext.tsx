"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string) => boolean;
    signup: (email: string, name: string) => boolean;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem("rama_user");
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                console.error("Failed to parse user", e);
            }
        }
    }, []);

    const login = (email: string) => {
        const savedUsers = localStorage.getItem("rama_users");
        const users = savedUsers ? JSON.parse(savedUsers) : [];
        const existingUser = users.find((u: User) => u.email === email);

        if (existingUser) {
            setUser(existingUser);
            localStorage.setItem("rama_user", JSON.stringify(existingUser));
            router.push("/profile");
            return true;
        }
        return false;
    };

    const signup = (email: string, name: string) => {
        const newUser = { id: Math.random().toString(36).substr(2, 9), email, name };

        const savedUsers = localStorage.getItem("rama_users");
        const users = savedUsers ? JSON.parse(savedUsers) : [];

        if (users.find((u: User) => u.email === email)) {
            return false; // User already exists
        }

        const updatedUsers = [...users, newUser];
        localStorage.setItem("rama_users", JSON.stringify(updatedUsers));

        setUser(newUser);
        localStorage.setItem("rama_user", JSON.stringify(newUser));
        router.push("/profile");
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("rama_user");
        router.push("/");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                signup,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

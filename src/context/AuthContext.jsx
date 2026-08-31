import React, { createContext, useContext, useState } from "react";
import {
  signup as signupApi,
  login as loginApi,
  updateAccount as updateAccountApi,
} from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Current logged in user profile
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("shopmodern_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("shopmodern_auth") === "true";
  });

  const signup = async (name, email, password) => {
    try {
      const newUser = await signupApi({ name, email, password });

      // Log the user in immediately after signup
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem("shopmodern_user", JSON.stringify(newUser));
      localStorage.setItem("shopmodern_auth", "true");
    } catch (error) {
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const data = await loginApi({ email, password });
      const flatUser = { ...data.account, token: data.token };
      setUser(flatUser);
      setIsAuthenticated(true);
      localStorage.setItem("shopmodern_user", JSON.stringify(flatUser));
      localStorage.setItem("shopmodern_auth", "true");
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("shopmodern_user");
    localStorage.removeItem("shopmodern_auth");
  };

  const updateProfile = async (updatedDetails) => {
    try {
      if (!user || !user.id) {
        throw new Error("User not logged in");
      }

      const updatedUser = await updateAccountApi(user.id, updatedDetails);
      setUser(updatedUser);
      localStorage.setItem("shopmodern_user", JSON.stringify(updatedUser));
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, signup, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

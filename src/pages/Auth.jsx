import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useToast } from "../context/ToastContext";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { login, signup } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password);
        addToast("Welcome back!", "success");
      } else {
        await signup(name, email, password);
        addToast("Account created successfully!", "success");
      }
      navigate("/");
    } catch (err) {
      addToast(err.message, "error");
    }
  };

  return (
    <div className="min-h-screen bg-brand-surface/30 flex items-center justify-center px-3 sm:px-4 py-8 sm:py-12">
      <Card className="w-full max-w-md p-5 sm:p-8 border border-gray-100 shadow-xl bg-white min-w-0">
        <div className="text-center mb-5 sm:mb-8 min-w-0">
          <span className="text-xl sm:text-2xl font-extrabold text-brand-primary break-words">ShopModern</span>
          <h1 className="text-lg sm:text-xl font-extrabold text-brand-on-surface mt-1.5 sm:mt-2 break-words">
            {isLogin ? "Welcome back" : "Create an account"}
          </h1>
          <p className="text-[11px] sm:text-xs text-gray-500 mt-1 break-words px-1">
            {isLogin ? "Sign in to access your workspace storefront" : "Enter your details to register an account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 min-w-0">
          {!isLogin && (
            <div className="min-w-0">
              <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1 break-words">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full min-w-0 text-[11px] sm:text-xs px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg outline-none focus:border-brand-primary bg-white min-h-[44px]"
              />
            </div>
          )}

          <div className="min-w-0">
            <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1 break-words">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full min-w-0 text-[11px] sm:text-xs px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg outline-none focus:border-brand-primary bg-white min-h-[44px]"
            />
          </div>

          <div className="min-w-0">
            <label className="block text-[11px] sm:text-xs font-bold text-gray-700 mb-1 break-words">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full min-w-0 text-[11px] sm:text-xs px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg outline-none focus:border-brand-primary bg-white min-h-[44px]"
            />
          </div>

          <Button type="submit" className="w-full py-2.5 sm:py-3 text-[11px] sm:text-xs font-bold bg-brand-primary text-white rounded-lg mt-1 sm:mt-2 min-h-[48px]">
            {isLogin ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <div className="mt-4 sm:mt-6 text-center border-t border-gray-100 pt-3 sm:pt-4 px-1">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-[11px] sm:text-xs text-brand-primary font-bold hover:underline min-h-[40px] inline-flex items-center break-words"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </Card>
    </div>
  );
};
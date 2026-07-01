"use client";

import React, { useState, useEffect } from "react";

interface AccessGateProps {
  children: React.ReactNode;
}

export function AccessGate({ children }: AccessGateProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const CORRECT_CODE = process.env.NEXT_PUBLIC_APP_ACCESS_CODE || "YCPS-DEMO-2026";

  useEffect(() => {
    const cached = typeof window !== "undefined" ? sessionStorage.getItem("ycps_gate_unlocked") : null;
    setTimeout(() => {
      if (cached === "true") {
        setIsUnlocked(true);
      }
      setIsMounted(true);
    }, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === CORRECT_CODE) {
      sessionStorage.setItem("ycps_gate_unlocked", "true");
      setIsUnlocked(true);
      setError("");
    } else {
      setError("Invalid access code.");
    }
  };

  if (!isMounted) {
    // Return a dark background during hydration/server render to avoid flicker
    return <div className="min-h-screen bg-brand-navy-dark" />;
  }

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-navy-dark p-6 font-sans">
      <div className="w-full max-w-md glass-panel p-8 rounded-2xl border border-brand-gold/30 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/40 flex items-center justify-center mx-auto mb-2">
            <span className="text-brand-gold font-bold text-lg">🔒</span>
          </div>
          <h1 className="text-2xl font-extrabold text-brand-offwhite tracking-tight uppercase">
            Protected Prototype
          </h1>
          <p className="text-sm text-brand-grey-text leading-relaxed">
            YCPS Toolkit Lab is a private interview/demo prototype. Please enter the access code.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="access-code" className="block text-xs font-bold text-brand-gold uppercase tracking-wider">
              Access Code
            </label>
            <input
              id="access-code"
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter code here"
              className="w-full px-4 py-2.5 bg-brand-navy-light/60 border border-brand-grey-border/50 text-brand-offwhite text-sm rounded-lg focus:outline-none focus:border-brand-gold transition-all"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-xs font-bold text-red-400 tracking-wide">
              ⚠️ {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-brand-gold hover:bg-brand-gold-dark text-brand-navy-dark text-xs font-bold rounded-lg uppercase tracking-widest transition-all cursor-pointer shadow-lg"
          >
            Unlock Prototype
          </button>
        </form>

        <div className="text-center">
          <p className="text-[10px] text-brand-grey-text/60 italic leading-relaxed">
            Authorized access only. Draft planning support tool.
          </p>
        </div>
      </div>
    </div>
  );
}

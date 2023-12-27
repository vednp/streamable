"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
type ProviderProps = {
  children: React.ReactNode;
  session: any; 
};
function Provider({ children, session }: ProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default Provider;

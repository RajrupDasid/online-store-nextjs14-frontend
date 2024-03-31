"use client";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/sonner";
import { UpdateCartContext } from "@/context/UpdateCartcontext";
import { useState } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [updateCart, setUpdateCart] = useState(false);
  return (
    <PayPalScriptProvider
      options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
      <html lang="en">
        <body className={outfit.className}>
          <UpdateCartContext.Provider value={{ updateCart, setUpdateCart }}>
            <Header />
            {children}
            <Toaster />
          </UpdateCartContext.Provider>
        </body>
      </html>
    </PayPalScriptProvider>
  );
}

"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import Header from "@/components/Header";
import Toast from "@/components/Toast";
import History from "@/components/History";
import LoremGenerator from "@/components/generators/LoremGenerator";
import ProfileGenerator from "@/components/generators/ProfileGenerator";
import ProductGenerator from "@/components/generators/ProductGenerator";
import BlogGenerator from "@/components/generators/BlogGenerator";
import AddressGenerator from "@/components/generators/AddressGenerator";
import MiscGenerator from "@/components/generators/MiscGenerator";
import ImageGenerator from "@/components/generators/ImageGenerator";
import ApiResponseGenerator from "@/components/generators/ApiResponseGenerator";
import SqlInsertGenerator from "@/components/generators/SqlInsertGenerator";
import CreditCardGenerator from "@/components/generators/CreditCardGenerator";
import EmailGenerator from "@/components/generators/EmailGenerator";

export default function Home() {
  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="min-h-screen bg-[var(--background)] transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <Header />
        <div className="grid grid-cols-1 gap-6 mt-2">
          <LoremGenerator />
          <ProfileGenerator />
          <ProductGenerator />
          <BlogGenerator />
          <AddressGenerator />
          <CreditCardGenerator />
          <EmailGenerator />
          <MiscGenerator />
          <ApiResponseGenerator />
          <SqlInsertGenerator />
          <ImageGenerator />
          <History />
        </div>
        <footer className="mt-12 text-center text-xs text-gray-400 dark:text-gray-500">
          LoremGen · Open source · MIT License ·{" "}
          <a
            href="https://github.com"
            className="underline hover:text-purple-500"
          >
            GitHub
          </a>
        </footer>
      </div>
      <Toast />
    </div>
  );
}

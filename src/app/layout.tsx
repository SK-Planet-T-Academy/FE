// app/layout.tsx
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ASAC 교육 커뮤니티",
  description: "회원가입, 로그인, 게시판이 포함된 Next.js + shadcn 사이트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground font-sans antialiased",
          inter.className
        )}
      >
        {/* 여기에 Navbar 등 공통 UI 들어갈 수 있음 */}
        {children}
      </body>
    </html>
  );
}

import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { Suspense } from "react";
import Spinner from "@/components/ui/spinner"; // 🔹 Spinner 컴포넌트 import

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
        {/* 전역 Suspense로 로딩 스피너 처리 */}
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <Spinner size="lg" />
            </div>
          }
        >
          {children}
        </Suspense>
      </body>
    </html>
  );
}

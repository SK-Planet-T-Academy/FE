"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin") === "true";

    if (isLogin) {
      router.replace("/board");
    } else {
      router.replace("/login");
    }
  }, [router]);

  // 페이지가 이동되기 전까지는 스피너만 보여줌
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner />
    </div>
  );
}

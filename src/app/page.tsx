"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin") === "true";
    console.log("isLogin", isLogin);

    if (isLogin) {
      router.replace("/board");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return null; // 리다이렉트용이라 렌더링할 내용 없음
}

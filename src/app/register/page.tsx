"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  ExclamationTriangleIcon,
  EyeOpenIcon,
  EyeClosedIcon,
} from "@radix-ui/react-icons";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirm = () => setShowConfirm((prev) => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(""); // 입력할 때 에러 초기화
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    // TODO: 백엔드 연동
    console.log("회원가입 데이터:", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 bg-white rounded-xl shadow p-8 border"
      >
        <h1 className="text-2xl font-bold text-center">회원가입</h1>

        <div className="space-y-2">
          <Label htmlFor="name">이름</Label>
          <Input
            id="name"
            name="name"
            placeholder="신강희짱"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@email.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">비밀번호</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeClosedIcon className="w-4 h-4" />
              ) : (
                <EyeOpenIcon className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">비밀번호 확인</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="********"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={toggleConfirm}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
              tabIndex={-1}
            >
              {showConfirm ? (
                <EyeClosedIcon className="w-4 h-4" />
              ) : (
                <EyeOpenIcon className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>오류</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" className="w-full" variant="default">
          가입하기
        </Button>

        <p className="text-sm text-center text-muted-foreground">
          이미 계정이 있으신가요?{" "}
          <a href="/login" className="text-primary hover:underline">
            로그인
          </a>
        </p>
      </form>
    </div>
  );
}

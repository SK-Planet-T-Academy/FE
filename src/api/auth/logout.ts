// src/api/auth/logout.ts

export async function logoutUser() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`,
      {
        method: "POST",
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "로그아웃에 실패했습니다.");
    }

    return await res.json();
  } catch (error) {
    console.error("로그아웃 에러:", error);
    throw error;
  }
}

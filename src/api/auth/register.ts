export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export async function registerUser(payload: RegisterPayload) {
  console.log("회원가입 요청:", payload);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    console.log("회원가입 결과:", res);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "회원가입에 실패했습니다.");
    }

    return await res.json();
  } catch (error) {
    console.error("회원가입 에러:", error);
    throw error;
  }
}

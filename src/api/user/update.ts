export interface UpdateUserPayload {
  email: string;
  password: string;
  name: string;
}

export async function updateUser(id: number, payload: UpdateUserPayload) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "회원 정보 수정에 실패했습니다.");
    }

    return await res.json();
  } catch (error) {
    console.error("회원 정보 수정 에러:", error);
    throw error;
  }
}

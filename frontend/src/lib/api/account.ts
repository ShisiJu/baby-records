import { apiClient } from "./client";

export type RegisterInput = {
  email: string;
  password: string;
};

export type RegisterResponse = {
  token: string;
  user: {
    id: string;
    email: string;
  };
};

export async function registerUser({
  email,
  password,
}: RegisterInput): Promise<RegisterResponse> {
  const { data } = await apiClient.post<RegisterResponse>("/auth/register", {
    email,
    password,
  });
  return data;
}

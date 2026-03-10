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
    has_baby_profile: boolean;
  };
};

export type LoginInput = {
  email: string;
  password: string;
};

export type LoginResponse = RegisterResponse;

export type BabyProfile = {
  id: number;
  name: string;
  birth_date: string;
};

export type BabyProfileResponse = {
  baby_profile: BabyProfile | null;
};

export type CreateBabyProfileInput = {
  name: string;
  birth_date: string;
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

export async function loginUser({
  email,
  password,
}: LoginInput): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
  return data;
}

export async function getMyBabyProfile(): Promise<BabyProfileResponse> {
  const { data } = await apiClient.get<BabyProfileResponse>("/baby-profile/me");
  return data;
}

export async function createBabyProfile({
  name,
  birth_date,
}: CreateBabyProfileInput): Promise<BabyProfileResponse> {
  const { data } = await apiClient.post<BabyProfileResponse>("/baby-profile", {
    name,
    birth_date,
  });
  return data;
}

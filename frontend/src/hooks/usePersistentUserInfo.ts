import { useEffect, useState } from "react";
import type { UserInfo } from "./useUserInfo";

const USER_INFO_STORAGE_KEY = "user_info";
const USER_INFO_TTL_MS = 1000 * 60 * 60 * 24 * 30;

type StoredUserInfo = {
  value: UserInfo;
  expiresAt: number;
};

function hasAuthTokenCookie(): boolean {
  if (typeof document === "undefined") {
    return false;
  }

  return document.cookie
    .split("; ")
    .some((cookie) => cookie.startsWith("auth_token="));
}

function readStoredUserInfo(): UserInfo | null {
  if (typeof window === "undefined") {
    return null;
  }

  if (!hasAuthTokenCookie()) {
    window.localStorage.removeItem(USER_INFO_STORAGE_KEY);
    return null;
  }

  const rawValue = window.localStorage.getItem(USER_INFO_STORAGE_KEY);
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as StoredUserInfo;
    const isExpired = !parsed?.expiresAt || Date.now() > parsed.expiresAt;
    if (isExpired) {
      window.localStorage.removeItem(USER_INFO_STORAGE_KEY);
      return null;
    }

    if (!parsed?.value?.id || !parsed?.value?.email) {
      window.localStorage.removeItem(USER_INFO_STORAGE_KEY);
      return null;
    }

    return parsed.value;
  } catch {
    window.localStorage.removeItem(USER_INFO_STORAGE_KEY);
    return null;
  }
}

export function usePersistentUserInfo() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(() =>
    readStoredUserInfo(),
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!userInfo) {
      window.localStorage.removeItem(USER_INFO_STORAGE_KEY);
      return;
    }

    const payload: StoredUserInfo = {
      value: userInfo,
      expiresAt: Date.now() + USER_INFO_TTL_MS,
    };
    window.localStorage.setItem(USER_INFO_STORAGE_KEY, JSON.stringify(payload));
  }, [userInfo]);

  return { userInfo, setUserInfo };
}

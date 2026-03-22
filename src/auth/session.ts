export type AuthUser = {
  username: string;
  roles: string;
};

const AUTH_USER_COOKIE = "pi_plus_auth_user";

function joinUrl(base: string, path: string): string {
  const normalizedBase = base.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

function setCookie(name: string, value: string, maxAgeSeconds: number): void {
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax`;
}

function getCookie(name: string): string | null {
  const needle = `${name}=`;
  const cookie = document.cookie
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(needle));

  if (!cookie) {
    return null;
  }

  return decodeURIComponent(cookie.slice(needle.length));
}

function deleteCookie(name: string): void {
  document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
}

export function saveAuthUserToCookie(user: AuthUser): void {
  setCookie(AUTH_USER_COOKIE, JSON.stringify(user), 60 * 60 * 24);
}

export function getAuthUserFromCookie(): AuthUser | null {
  const raw = getCookie(AUTH_USER_COOKIE);

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<AuthUser>;
    if (!parsed.username) {
      return null;
    }

    return {
      username: parsed.username,
      roles: parsed.roles || "",
    };
  } catch {
    return null;
  }
}

export function clearAuthUserCookie(): void {
  deleteCookie(AUTH_USER_COOKIE);
}

export function apiUrl(path: string): string {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
  return joinUrl(baseUrl, path);
}

export async function getAuthenticatedUser(): Promise<AuthUser | null> {
  try {
    const response = await fetch(apiUrl("/api/auth/user"), {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as Partial<AuthUser> & { message?: string };

    if (!data.username) {
      clearAuthUserCookie();
      return null;
    }

    const authUser = {
      username: data.username,
      roles: data.roles || "",
    };

    saveAuthUserToCookie(authUser);
    return authUser;
  } catch {
    return null;
  }
}

export async function logoutUser(): Promise<void> {
  const response = await fetch(apiUrl("/api/auth/logout"), {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("No se pudo cerrar sesión.");
  }

  clearAuthUserCookie();
}

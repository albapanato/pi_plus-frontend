export type AuthUser = {
  username: string;
  roles: string;
};

function joinUrl(base: string, path: string): string {
  const normalizedBase = base.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
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
      return null;
    }

    return {
      username: data.username,
      roles: data.roles || "",
    };
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
}

export type Component = {
  name: string;
  description: string;
  technology: string;
};

export type TechStackItem = {
  name: string;
  reason: string;
};

export type DesignDecision = {
  decision: string;
  reason: string;
};

export type Risk = {
  risk: string;
  mitigation: string;
};

export type Architecture = {
  architectureName: string;
  overview: string;
  components: Component[];
  techStack: TechStackItem[];
  designDecisions: DesignDecision[];
  risks: Risk[];
};

export type GenerateRequest = {
  requirements: string;
  constraints?: string;
};

const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:8080";

export const API_BASE_URL = API_URL;

export async function pingHealth(signal?: AbortSignal, timeoutMs = 5000): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const externalAbort = () => controller.abort();
  signal?.addEventListener("abort", externalAbort);

  try {
    const res = await fetch(`${API_URL}/api/test`, {
      method: "GET",
      signal: controller.signal,
    });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", externalAbort);
  }
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

export async function generateArchitecture(
  body: GenerateRequest,
  signal?: AbortSignal,
): Promise<Architecture> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal,
    });
  } catch (err) {
    if ((err as Error).name === "AbortError") throw err;
    throw new ApiError(
      `Cannot reach backend at ${API_URL}. Is the server running?`,
      0,
    );
  }

  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    // non-JSON body — fall through to error handling below
  }

  if (!res.ok) {
    const message =
      (data && typeof data === "object" && "error" in data && typeof (data as { error: unknown }).error === "string"
        ? (data as { error: string }).error
        : null) ?? `Request failed with status ${res.status}`;
    throw new ApiError(message, res.status);
  }

  return data as Architecture;
}

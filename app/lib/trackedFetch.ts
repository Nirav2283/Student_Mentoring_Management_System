import { endRequest, startRequest } from "@/app/store/Loadingstore";

export async function trackedFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  startRequest();
  try {
    return await fetch(input, init);
  } finally {
    endRequest();
  }
}

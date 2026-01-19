// src/api/_withBoot.ts
/*
import {useBootStore} from "@/stores/boot"

export async function withBoot<T>(
  fn: () => Promise<T>,
  options?: { silent?: boolean; timeoutMs?: number }
): Promise<T> {
  const boot = useBootStore()
  const id = options?.silent ? null : boot.start()
  const timeout = options?.timeoutMs ?? 8000

  try {
    return await Promise.race([
      fn(),
      new Promise<T>((_, reject) =>
        setTimeout(() => reject(new Error("API_TIMEOUT")), timeout)
      ),
    ])
  } finally {
    if (id) boot.end(id)
  }
}
*/
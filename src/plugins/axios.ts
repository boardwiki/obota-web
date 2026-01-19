/*

// src/axios.ts
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios"

import { useAuthStore } from "@/stores/auth"
import { useBootStore } from "@/stores/boot"

declare module "axios" {
  export interface AxiosRequestConfig {
    __loading_id?: symbol
  }
}

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

api.interceptors.request.use((config) => {
  const boot = useBootStore()
  const id = boot.start()
  config.__loading_id = id
  return config
})

api.interceptors.response.use(
  (response) => {
    const boot = useBootStore()
    const id = response.config.__loading_id
    if (id) boot.end(id)
    return response
  },

  async (error) => {
    const boot = useBootStore()
    const id = error.config?.__loading_id
    if (id) boot.end(id)

    // ❗ 세션 만료 / 좀비 상태 → reload로 복구
    if (error.response?.status === 401) {
      console.warn("[axios] 401 detected → reload")
      window.location.reload()
    }

    return Promise.reject(error)
  }
)

export const requestApi = async <T = any>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  const auth = useAuthStore()

  const headers = {
    ...(config.headers ?? {}),
    apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    ...(auth.accessToken
      ? { Authorization: `Bearer ${auth.accessToken}` }
      : {}),
  }

  return api.request<T>({
    ...config,
    headers,
  })
}

*/
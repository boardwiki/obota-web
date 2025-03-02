import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: 'https://obota.kr/',
});

// 토큰 만료 상황을 처리하는 함수 정의
const handleExpiredToken = async () => {
  const stoAuth = useAuthStore();
  await stoAuth.authExtend(); 
};

// API 요청 함수 정의
export const requestApi = async (config: any) => {
  try {
    const stoAuth = useAuthStore();
    if (stoAuth.accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${stoAuth.accessToken}`
      };
    }
    return await api(config);
  } catch (error:any) {
    if (error.response && error.response.data && error.response.data.name === "EXPIRED_TOKEN") {
        await handleExpiredToken(); 
      return await api(config);
    }else {
      throw error; 
    }
  }
};
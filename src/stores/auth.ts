import { defineStore } from 'pinia';
import { requestApi } from '@/axios';
import router from '@/router';
import { ObjectUserProfile } from '@/types/user';
import axios from 'axios';

export type RootState = {
  accessToken: string;
  refreshToken: string;
  joined: boolean;
  info: ObjectUserProfile;
  version: string;
};

interface Join {
  nickName: string;
  instaId?: string;
  birth?: string;
  isExperienced: boolean;
  location: string;
  stance: string;
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
    joined: localStorage.getItem('joined') === 'true' || false,
    info: {},
    version: '0.0.0',
  } as RootState),
  actions: {
    async versionCheck() {
      try {
        const res = await requestApi({ url: 'v1/admin/config' });
        if (res.data.status === 'SUCCESS') {
          this.version = res.data.data;
        }
      } catch (error) {
        console.error('Version check failed:', error);
      }
    },
    async versionCategory(){
      try {
        const res = await requestApi({ url: 'v1/admin/skill-filter' });
        if (res.data.status === 'SUCCESS') {
          const foot = JSON.stringify(res.data.data.footTrickFilter);
          const dancing = JSON.stringify(res.data.data.dancingFilter);
          const hand = JSON.stringify(res.data.data.handTrickFilter);

          localStorage.setItem(`dancing_category_keyword`,dancing );
          localStorage.setItem(`foot_category_keyword`, foot);
          localStorage.setItem(`hand_category_keyword`, hand);

        }
      } catch (error) {
        console.error('Skill-filter check failed:', error);
      }
  },
    async login(code?: string) {
      let res:any;
      try {
        if(!(this.accessToken && this.refreshToken)){
          if (import.meta.env.MODE === 'development') {
            console.log('login - test mode');
            res = {
              data :{
                status : 'SUCCESS',
                data : {
                  accessToken : '',
                  refreshToken : '',
                  joined        : true,
                }
              }
            }
          } else if (code) {
            console.log('login - real mode');
            res = await requestApi({
              url: 'auth/login/google',
              params: { code },
              headers: { accept: '*/*' },
            });
          }

          if (res.data.status === 'SUCCESS') {
            const data = res.data.data;
            this.accessToken = data.accessToken;
            this.refreshToken = data.refreshToken;
            this.joined = data.joined;

            localStorage.setItem('accessToken', this.accessToken);
            localStorage.setItem('refreshToken', this.refreshToken);
            localStorage.setItem('joined', String(this.joined));
          } else {
            alert('로그인에 문제가 발생했습니다.');
          }
        }
      } catch (error) {
        console.error('Login failed:', error);
      }

      if(res.data.status === 'SUCCESS')
        window.location.href = window.location.origin;
      else
        alert('로그인에 문제가 발생했습니다.');

    },
    async join(data: Join) {
      try {
        let state = false;
        await this.authCheck();

        if (this.joined) {
          alert('이미 가입되어 있습니다.');
          window.location.href = window.location.origin;
        } else {
          const res = await requestApi({
            method: 'post',
            url: 'v1/users',
            data,
          });

          if (res.data.status === 'SUCCESS') {
            this.joined = true;
            state = true;
          }
        }

        return state;
      } catch (error) {
        console.error('Join failed:', error);
        return false;
      }
    },
    async logout() {
      this.accessToken = '';
      this.refreshToken = '';
      this.joined = false;
      localStorage.setItem('accessToken', '');
      localStorage.setItem('refreshToken', '');
      localStorage.setItem('joined', '');
      localStorage.setItem('email', '');
      router.push('/login');
    },
    async authCheck() {
      try {
        if (this.accessToken) {
          const res = await requestApi({
            url: 'v1/users/myInfo',
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
              Accept: '*/*',
              Connection: 'keep-alive',
            },
          });

          if (res.data.status === 'SUCCESS') {
            const userInfo = res.data.data;
            this.info = userInfo;
            this.joined = Boolean(userInfo.nickName);
            localStorage.setItem('email', userInfo.email);
            localStorage.setItem('joined', String(this.joined));
          } else {
            alert('잘못된 접근입니다. 다시 로그인해주세요.');
            this.logout();
          }
        } else {
          this.joined = false;
          localStorage.setItem('joined', 'false');
        }
      } catch (error:any) {
        if (error.response && error.response.data && error.response.data.name === 'EXPIRED_TOKEN') {
          await this.authExtend();
        } else {
          console.error('Auth check failed:', error);
          alert('잘못된 접근입니다. 다시 로그인해주세요.');
          this.logout();
        }
      }
    },
    async authExtend() {
      try {
        axios.get(`https://api.longboard.monster/api/auth/refresh/${localStorage.getItem('email')}`,{
          params: { refreshToken: this.refreshToken },
        }).then((res)=>{
          if (res.data.status === 'SUCCESS') {
            const data = res.data.data;
            this.accessToken = data.accessToken;
            this.refreshToken = data.refreshToken;
            this.joined = data.joined;
  
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('joined', String(data.joined));
          } else {
            this.logout();
          }
        }).catch(()=>{
          console.log('올바르지 않은 토큰입니다.')
          this.logout();
        })
      } catch (error) {
        console.log('올바르지 않은 토큰입니다.')
        console.error('Auth extension failed:', error);
        this.logout();
      }
    },
    async getParameterByName(name: string, url?: string) {
      try {
        if (!url) url = window.location.href;

        name = name.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
        const results = regex.exec(url);

        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
      } catch (error) {
        console.error('Get parameter by name failed:', error);
        return null;
      }
    },
    async decodeJWT(token: string) {
      try {
        const parts = token.split('.');
        if (parts.length !== 3) {
          throw new Error('Invalid JWT format');
        }

        const decoded = {
          /*
          header: JSON.parse(Buffer.from(parts[0], 'base64').toString('utf8')),
          payload: JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8')),
          */
          signature: parts[2],
        };

        return decoded;
      } catch (error) {
        console.error('Decode JWT failed:', error);
        throw error;
      }
    },
  },
});
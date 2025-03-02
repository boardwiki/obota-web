import { defineStore } from 'pinia';
import { useAuthStore } from './auth';

export type RootState = {
}

export const useStanceStore = defineStore({
  id: 'stance',
  state: () => ({
  } as RootState),
  actions: {
    getRrotation(stance:string,rotate:string){
        const stoAuth = useAuthStore();
        let side:string = '';

        if(stoAuth.info.stance == 'Goofy'){
            if(stance == 'LEFT_TAIL' || stance == 'LEFT_NOSE' || stance == 'RIGHT_NOSE'){
                if(rotate == 'cw'){
                    side = 'FrontSide'
                }else{
                    side =  'BackSide'
                }
            }else{
                if(rotate == 'cw'){
                    side =  'BackSide'
                }else{
                    side =  'FrontSide'
                }
            }
        }else{
            if(stance == 'LEFT_NOSE' || stance == 'RIGHT_TAIL' || stance == 'RIGHT_NOSE'){
                if(rotate == 'ccw'){
                    side =  'FrontSide'
                }else{
                    side =  'BackSide'
                }
            }else{
                if(rotate == 'cw'){
                    side =  'FrontSide'
                }else{
                    side =  'BackSide'
                }
            }
        }

        return side;
    },
    getStanceName(stance:string){
        const stoAuth = useAuthStore();

        if(stoAuth.info.stance == 'Goofy'){
            switch(stance){
                case 'LEFT_TAIL':
                    return '베이직';
                case 'RIGHT_TAIL':
                        return '스위치';
                case 'LEFT_NOSE':
                        return '널리';
                case 'RIGHT_NOSE':
                        return '페이키';
            }
        }else{

            switch(stance){
                case 'LEFT_TAIL':
                    return '스위치';
                case 'RIGHT_TAIL' || 'RIGHT':
                    return '베이직';
                case 'LEFT_NOSE':
                    return '페이키';
                case 'RIGHT_NOSE':
                    return '널리';
            }
        }
    },
    getCarviing(carving:string){
        const stoAuth = useAuthStore();

        if(stoAuth.info.stance == 'Goofy'){
            if(carving=='LEFT')
                return 'TOE';
            else if(carving=='RIGHT')
                return 'HEEL'
        }else{
            if(carving=='LEFT')
            return 'HEEL'
        else if(carving=='RIGHT')
            return 'TOE';
        }
    },
    getFootPosition(footPosition:string){
        const stoAuth = useAuthStore();

        if(stoAuth.info.stance == 'Goofy'){
            if(footPosition=='LEFT')
                return 'BACK';
            else if(footPosition=='RIGHT')
                return 'FRONT'
        }else{
            if(footPosition=='LEFT')
            return 'FRONT'
        else if(footPosition=='RIGHT')
            return 'BACK';
        }
    }
  }
});
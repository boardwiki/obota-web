import { defineStore } from 'pinia'

export type RootState = {
  la : null | number,
  ma : null | number,
  windType : string[][]
}

export const useGpsStore =  defineStore({
    id : 'gps',
    state: ()=>({
        la   : null,
        ma   : null,
        windType : [
          ['N0' ,'북'],
          ['NNE','북북동'],
          ['NE' ,'북동'],
          ['ENE','동북동'],
          ['E'  ,'동'],
          ['ESE','동남동'],
          ['SE' ,'남동'],
          ['SSE','남남동'],
          ['S'  ,'남'],
          ['SSW','남남서'],
          ['SW' ,'남서'],
          ['WSW','서남서'],
          ['W'  ,'서'],
          ['WNW','서북서'],
          ['NW' ,'북서'],
          ['NNW','북북서'],
          ['N16','북']
        ],
        local : ['서울','부산','인천','대구','대전','광주','수원','울산','고양','용인','창원','성남','청주','부천','화성','남양주','전주','천안','안산','안양','김해','평택','포항','제주','시흥','파주','의정부','김포','구미','광주','양산','원주','진주','세종','광명','아산','익산','춘천','경산','군포','군산','하남','여수','순천','경주','거제','목포','오산','이천','강릉','양주','충주','안성','구리','서산','서귀포','당진','안동','포천','의왕','광양','김천','제천','통영','논산','칠곡','사천','여주','공주','양평','정읍','영주','나주','음성','밀양','홍성','보령','완주','상주','영천','동두천','동해','김제','무안','남원','저천','예산','속초','문경','함안','삼척','홍천','해남','부여','창녕','태안','고흥','화순','거창','가평','영암','금산','고창','과천','서천','고성','부안','의성','옥천','영광','영동','울진','완도','예천','철원','태백','연천','담양','합천','하동','횡성','남해','계룡','장성','청도','성주','평창','보성','괴산','함양','증평','영월','장흥','영덕','정선','신안','산청','강진','고령','보은','청양','봉화','함평','인제','진도','곡성','고성','단양','순창','임실','의령','양양','화천','청송','구례','무주','진안','양구','군위','장수','영양','울릉']
    } as RootState),
    actions:{
        async getLocation() {
            if (navigator.geolocation) { // GPS를 지원하면
              await navigator.geolocation.getCurrentPosition((position) => {
                //console.log(position.coords.latitude + ' ' + position.coords.longitude);
                this.la = position.coords.latitude;
                this.ma = position.coords.longitude;
              },()=>{
                console.error('no-use-gps')
                this.la = 37.5112569223894;
                this.ma = 126.99753144838594;
              }, {
                enableHighAccuracy: false,
                maximumAge: 0,
                timeout: Infinity
              });
            } else {
              alert('GPS를 지원하지 않습니다.');
            }
        },

        async getLocationInfo(){
        },

        async getWeather(la:any,ma:any){
        },
    }
})
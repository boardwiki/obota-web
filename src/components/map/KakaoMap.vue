<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { useGpsStore } from '@/stores/gps'
const stoGps = useGpsStore()
import SpotData from '@/test/maker.json';
import {ObjectPosition} from '@/types/map'
const props = defineProps<{
  height ?: string;
}>();

let map: any = reactive({})
let geocoder: any
let clusterer: any = reactive({})
let markers: any = reactive({})
let customOverlay: any = {}
const positionInfo:any = [];

function initMap() {
  const container: any = document.getElementById('map')
  geocoder = new kakao.maps.services.Geocoder()

  const options = {
    center: new kakao.maps.LatLng(stoGps.la, stoGps.ma),
    level: 7,
  }

  map = new kakao.maps.Map(container, options)

  displayMarker(SpotData.maker)

  clusterer = new kakao.maps.MarkerClusterer({
    //markers: markers,
    map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
    averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
    minLevel: 10, // 클러스터 할 최소 지도 레벨
    styles: [
      {
        color: '#fff',
        width: '35px',
        height: '35px',
        borderRadius: '50%',
        fontSize: '16px',
        lineHeight: '35px',
        textAlign: 'center',
        background: '#67ADFF',
      },
    ],
  })
}



//마커표시함수
async function displayMarker(markerPositions: ObjectPosition[]) {
  if (markers.length > 0) markers.forEach((marker: any) => marker.setMap(null))

  const imageSrc = new URL('@/assets/map_icon01.png', import.meta.url).href, // 마커이미지의 주소입니다
        imageSize = new kakao.maps.Size(30, 38), // 마커이미지의 크기입니다
        imageOption = { offset: new kakao.maps.Point(18, 46) } // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

  let cc = 0

  //positionInfo.length = 0

  const positions = markerPositions.map((position, id) => {
    let obota = 0

    const arr = [position.la,position.ma]


    /*
    stoObota.today.map((bota) => {
      return bota.spot == markerPositions1Data[id].id ? (obota += 1) : obota
    })
    */

    const obj = {
      cate: 'spot',
      img: markerImage,
      title: obota,
    }
    positionInfo.push(obj)
    return new kakao.maps.LatLng(...arr)
  })

  /*
  const positions2: Position[] = markerPositions2.map((position) => {
    const obj = {
      cate: 'shop',
      img: markerImage2,
    }
    positionInfo.push(obj)
    return new kakao.maps.LatLng(...position)
  })
  */

  /*
  customOverlay = markerPositions.map((content, id) => {
    const position = new kakao.maps.LatLng(content[0], content[1])
    return new kakao.maps.CustomOverlay({
      map: map,
      position: position,
      //content: `<div class="obota_num">${positionInfo[id].title}</div>`,
      yAnchor: 1,
    })
  })
  */

  /*
    markerPositions.map( 
        (content,id)=>{
            infowindow[id] = new kakao.maps.InfoWindow({
                map:map,
                content: positionInfo[cc-1].title,
            })
        }
    )
    */

  //const positions = positions1.concat(positions2)

  markers = positions.map((position) => {
    cc++
    return new kakao.maps.Marker({
      image: positionInfo[cc - 1].img,
      map: map,
      position,
      zIndex: 999 - cc,
      title: positionInfo[cc - 1].title,
    })
  })

  markers.map((marker: any, id: number) => {
    marker.setClickable(true)
    kakao.maps.event.addListener(marker, 'click', function () {
      //infowindow[id].open(map, marker);//맵클릭시 정보보기
      /*
      if (positionInfo[id].cate == 'spot') {
        infoData.value = markerPositions1Data[id]
      } else if (positionInfo[id].cate == 'shop') {
        infoData.value = markerPositions2Data[id - positions1.length]
      }

      showInfo.value = true
      */

      //좌표주소구하기
      /*
                searchDetailAddrFromCoords(positions[cc], function(result:any, status:any) {
                    console.log(result)
                    console.log(status)
                    if (status === kakao.maps.services.Status.OK) console.log(result)
                });
                */
    })
  })

  /*
    const bounds = positions.reduce(
        (bounds:any, latlng:any) => bounds.extend(latlng),
        new kakao.maps.LatLngBounds()
    );
    */

  kakao.maps.event.addListener(
    map,
    'dragend',
    await function () {
      //const latlng = map.getCenter();
      //stoGps.la = latlng.getLat()
      //stoGps.ma = latlng.getLng()
      //getWeather();
    }
  )

  const ps = new kakao.maps.LatLng([stoGps.la, stoGps.ma])
  markers = await new kakao.maps.Marker({ map: map, ps })
  //await getWeather();
  await clusterer.addMarkers(markers)
  await map.setCenter(new kakao.maps.LatLng(stoGps.la, stoGps.ma))
}


onMounted(async () => {
  await stoGps.getLocation()

  if (window.kakao && window.kakao.maps) {
    initMap()
  } else {
    const script: any = document.createElement('script')
    //global kakao
    script.onload = () => kakao.maps.load(initMap)
    script.src = '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=5b53590ad2f04d240f1b4638b85d0da4&libraries=services,clusterer,drawing'
    document.head.appendChild(script)
  }
})

</script>

<template>
  <div id="map" :style="{'height':height?height:'100%'}"></div>
</template>

<style lang="scss" scoped>
#map {
  width: 100%;
  height:100%;
}


</style>
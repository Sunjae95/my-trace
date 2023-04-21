import { KakaoMapContext } from '@components';
import { useCallback, useContext, useMemo, useState } from 'react';

const IMAGE_SRC = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

export const useMarker = () => {
  const { kakaoMap } = useContext(KakaoMapContext);
  const [markerList, setMarkerList] = useState([]);

  const markerSize = useMemo(() => (kakaoMap ? new kakao.maps.Size(24, 35) : null), [kakaoMap]);
  const markerImage = useMemo(
    () => (markerSize ? new kakao.maps.MarkerImage(IMAGE_SRC, markerSize) : markerSize),
    [markerSize]
  );

  const handleSettingMarker = useCallback(
    (changedMarkerList) => {
      if (kakaoMap && markerImage) {
        changedMarkerList.forEach((marker) => {
          new kakao.maps.Marker({
            map: kakaoMap,
            position: marker.latlng, // 마커를 표시할 위치
            image: markerImage, // 마커 이미지
          });
        });
        setMarkerList(changedMarkerList);
      }
    },
    [markerImage, kakaoMap]
  );

  return { handleSettingMarker };
};

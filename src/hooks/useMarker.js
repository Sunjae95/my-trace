import { useCallback, useContext } from 'react';

import { KakaoMapContext } from '@contexts';
// NOTE 마커이미지가 더 필요하다면 상수화할 것
const IMAGE_SRC = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

export const useMarker = () => {
  const { kakaoMap } = useContext(KakaoMapContext);

  const handleAddClickEvent = useCallback(
    (marker, onClick) => {
      if (!kakaoMap) return;

      kakao.maps.event.addListener(marker, 'click', onClick);
    },
    [kakaoMap]
  );

  const handleRemoveClickEvent = useCallback(
    (marker, onClick) => {
      if (!kakaoMap) return;

      kakao.maps.event.removeListener(marker, 'click', onClick);
    },
    [kakaoMap]
  );

  const handleCreateMarker = useCallback(
    ({ latitude, longitude, width = 24, height = 35, src = IMAGE_SRC }) => {
      if (!kakaoMap) return;

      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(latitude, longitude),
        image: new kakao.maps.MarkerImage(src, new kakao.maps.Size(width, height)),
      });

      return marker;
    },
    [kakaoMap]
  );

  return { handleCreateMarker, handleAddClickEvent, handleRemoveClickEvent };
};

import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { KakaoMapContext } from '@components';

const IMAGE_SRC = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

export const useMarker = () => {
  const { kakaoMap } = useContext(KakaoMapContext);
  const [markerList, setMarkerList] = useState([]);

  const markerSize = useMemo(() => (kakaoMap ? new kakao.maps.Size(24, 35) : null), [kakaoMap]);
  const markerImage = useMemo(
    () => (markerSize ? new kakao.maps.MarkerImage(IMAGE_SRC, markerSize) : markerSize),
    [markerSize]
  );

  const handleClickMarker = useCallback(
    (marker) => () => {
      console.log('handleClickMarker', marker);
    },
    []
  );

  const handleAddMarker = useCallback(() => {
    if (!kakaoMap) return;

    markerList.forEach((marker) => {
      marker.setMap(kakaoMap);
      kakao.maps.event.addListener(marker, 'click', handleClickMarker(marker));
    });
  }, [kakaoMap, markerList, handleClickMarker]);

  const handleRemoveMarker = useCallback(() => {
    markerList.forEach((marker) => {
      marker.setMap(null);
      kakao.maps.event.addListener(marker, 'click', handleClickMarker(marker));
    });
  }, [markerList, handleClickMarker]);

  const handleSettingMarker = useCallback(
    (infoList) =>
      setMarkerList(
        infoList.map(
          (info) =>
            new kakao.maps.Marker({
              position: info.latlng,
              image: markerImage,
            })
        )
      ),
    [markerImage]
  );

  useEffect(() => {
    handleAddMarker();
    return () => handleRemoveMarker();
  }, [handleAddMarker, handleRemoveMarker]);

  return { handleSettingMarker };
};

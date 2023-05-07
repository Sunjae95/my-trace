import React, { memo, useCallback, useState } from 'react';
import styled from '@emotion/styled';

import { Button } from '../Button';
import { Text } from '../Text';

import { COLOR, FONT_SIZE, FONT_WEIGHT } from '@styles';

export const Information = memo(({ current, markerList, onFetchMarkerList }) => {
  const [title, setTitle] = useState('');

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleAddMarker = useCallback(() => {
    localStorage.setItem('markerList', JSON.stringify([...markerList, { ...current, title }]));
    setTitle('');
    onFetchMarkerList();
  }, [title, markerList, current, onFetchMarkerList]);

  const handleDeleteMarker = useCallback(() => {
    localStorage.setItem(
      'markerList',
      JSON.stringify(
        markerList.filter(
          ({ latitude, longitude }) => !(latitude === current.latitude && longitude === current.longitude)
        )
      )
    );

    onFetchMarkerList();
  }, [current, markerList, onFetchMarkerList]);

  return (
    <Container>
      {current?.title ? (
        <TitleContainer>
          <Text
            text={current.title}
            weight={FONT_WEIGHT.bold}
            size={FONT_SIZE.large}
          />
          <Button
            color={COLOR.white}
            onClick={handleDeleteMarker}
          >
            삭제
          </Button>
        </TitleContainer>
      ) : (
        <TitleContainer>
          <input
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={handleChangeTitle}
          />
          <Button
            color={COLOR.white}
            onClick={handleAddMarker}
          >
            추가
          </Button>
        </TitleContainer>
      )}
      <Text
        text={current ? `위도${current.latitude} 경도${current.longitude}` : null}
        color={COLOR.grey}
      />
      <Button
        size="large"
        disabled
      >
        즐겨찾기 보기
      </Button>
    </Container>
  );
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

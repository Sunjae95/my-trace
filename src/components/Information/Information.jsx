import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { Text } from '../Text';
import { Button } from '../Button';

import { CurrentContext } from '@contexts';
import { COLOR, FONT_SIZE, FONT_WEIGHT } from '@styles';
import { kakaoHttp } from '@utils';

export const Information = ({ title }) => {
  const { current } = useContext(CurrentContext);
  const [address, setAddress] = useState('현재 위치를 클릭해주세요.');

  const handleSearch = useCallback(async (longitude, latitude) => {
    try {
      const { documents } = await kakaoHttp.getConvertedAddress(longitude, latitude);
      setAddress(documents[0].address.address_name);
    } catch {
      setAddress('주소를 불러오지 못했습니다.');
    }
  }, []);

  useEffect(() => {
    if (!(current?.La && current?.Ma) || !process.env) return;

    handleSearch(current.La, current.Ma);
  }, [current, handleSearch]);

  return (
    <Container>
      <TextWrapper>
        <Text
          text={title ?? '제목'}
          weight={FONT_WEIGHT.bold}
          size={FONT_SIZE.large}
        />
      </TextWrapper>
      <TextWrapper>
        <Text
          text={address}
          color={COLOR.grey}
        />
      </TextWrapper>
      <Button
        size="large"
        disabled
      >
        즐겨찾기 보기
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TextWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

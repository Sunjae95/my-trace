import styled from '@emotion/styled';
import React from 'react';
import { Text } from '../Text';
import { COLOR, FONT_SIZE, FONT_WEIGHT } from '@styles';
import { Button } from '../Button';

export const Information = ({ title, longitude, latitude }) => {
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
          text={'주소 이름'}
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

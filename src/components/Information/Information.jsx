import React, { useContext } from 'react';
import styled from '@emotion/styled';

import { Text } from '../Text';
import { Button } from '../Button';

import { CurrentContext } from '@contexts';
import { COLOR, FONT_SIZE, FONT_WEIGHT } from '@styles';

export const Information = ({ title }) => {
  const { current } = useContext(CurrentContext);

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
          text={current ? `경도${current.La} 위도${current.Ma}` : ''}
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

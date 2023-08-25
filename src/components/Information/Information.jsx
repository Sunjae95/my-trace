import React, { memo, useCallback } from 'react';
import styled from '@emotion/styled';

import { COLOR, FONT_SIZE, FONT_WEIGHT, Z_INDEX } from '@styles';

import { Button, Input, Text } from '../_base';

export const Information = memo(
  ({ isEditable, current, onChangeEditable, onChangeCurrentTitle, onCreateMarker, onUpdateMarker, onDeleteMarker }) => {
    const handleSaveMarker = useCallback(
      ({ id, ...option }) => {
        if (id) {
          onUpdateMarker(id, option);
          return;
        }

        onCreateMarker(option);
      },
      [onCreateMarker, onUpdateMarker]
    );

    if (!current) {
      return (
        <Container>
          <Text
            text="지도위의 마커나 지도를 클릭해주세요."
            weight={FONT_WEIGHT.bold}
            size={FONT_SIZE.large}
          />
          <Button
            size="large"
            disabled
          >
            즐겨찾기 보기
          </Button>
        </Container>
      );
    }

    if (isEditable) {
      return (
        <Container>
          <TitleContainer>
            <Input
              size="large"
              placeholder="제목을 입력해주세요"
              value={current.title}
              onChange={onChangeCurrentTitle}
            />
            <Button
              color={COLOR.white}
              onClick={() => handleSaveMarker(current)}
            >
              저장
            </Button>
          </TitleContainer>
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
    }

    return (
      <Container>
        <TitleContainer>
          <Text
            text={current.id ? current.title : '등록된 마커가 없습니다.'}
            weight={FONT_WEIGHT.bold}
            size={FONT_SIZE.large}
          />
          <ButtonWrapper>
            <Button
              color={COLOR.white}
              onClick={onChangeEditable}
            >
              {current.id ? '수정' : '생성'}
            </Button>
            {current.id && (
              <Button
                color={COLOR.white}
                onClick={() => onDeleteMarker(current.id)}
              >
                삭제
              </Button>
            )}
          </ButtonWrapper>
        </TitleContainer>
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
  }
);

const Container = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: ${Z_INDEX.information};
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px 8px;
  background-color: ${COLOR.white};
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

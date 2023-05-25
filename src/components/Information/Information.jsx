import React, { memo } from 'react';
import styled from '@emotion/styled';

import { Button } from '../Button';
import { Text } from '../Text';

import { COLOR, FONT_SIZE, FONT_WEIGHT } from '@styles';

export const Information = memo(
  ({ isEditable, current, onChangeCurrentTitle, onUpdateMarkerList, onDeleteMarker, onChangeEditable }) => {
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

    if (!isEditable) {
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

    return (
      <Container>
        <TitleContainer>
          <input
            placeholder="제목을 입력해주세요"
            value={current.title}
            onChange={onChangeCurrentTitle}
          />
          <Button
            color={COLOR.white}
            onClick={() => onUpdateMarkerList(current)}
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
);

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

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

import React from 'react';
import styled from '@emotion/styled';

import { COLOR, FONT_WEIGHT, FONT_SIZE } from '@styles';

export const Text = ({ text, size, color, weight, onClick }) => {
  return (
    <StyledText
      weight={weight}
      fontColor={color}
      fontSize={size}
      onClick={onClick}
    >
      {text}
    </StyledText>
  );
};

const StyledText = styled.span`
  font-size: ${({ fontSize }) => fontSize ?? FONT_SIZE.middle};
  font-weight: ${({ weight }) => weight ?? FONT_WEIGHT.regular};
  color: ${({ fontColor }) => fontColor ?? COLOR.black};
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'auto')};
`;

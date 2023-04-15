import React from 'react';
import styled from '@emotion/styled';

import { COLOR, FONT_SIZE } from '@styles';

export const Button = ({ block, size = 'middle', color, disabled = false, children }) => {
  return (
    <StyledButton
      disabled={disabled}
      block={block}
      buttonColor={color}
      size={size}
    >
      {children}
    </StyledButton>
  );
};

const BUTTON_SIZE = {
  small: '4px 12px',
  middle: '6px 15px',
  large: '8px 18px',
};

const StyledButton = styled.button`
  text-align: center;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${({ disabled, buttonColor }) => (disabled ? COLOR.grey : buttonColor ?? COLOR.white)};
  font-size: ${({ size }) => FONT_SIZE[size] ?? FONT_SIZE.middle};
  padding: ${({ size }) => BUTTON_SIZE[size] ?? BUTTON_SIZE.middle};
`;

import React from 'react';
import styled from '@emotion/styled';
import { COLOR, FONT_SIZE } from '@styles';

export const Input = ({ value, onChange, size = 'middle', hasBorder = false, width, block, ...props }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <StyledInput
      {...props}
      value={value}
      size={size}
      width={block ? '100%' : width}
      hasBorder={hasBorder}
      onChange={handleChange}
    />
  );
};

const StyledInput = styled.input`
  width: ${({ width }) => width ?? '200px'};
  padding: ${({ hasBorder }) => (hasBorder ? '7px 4px' : '8px 5px')};
  font-size: ${({ size }) => FONT_SIZE[size]};
  border: ${({ hasBorder }) => (hasBorder ? `1px solid ${COLOR.grey}` : 'none')};
  border-radius: 4px;

  :focus-visible {
    outline: none;
  }
`;

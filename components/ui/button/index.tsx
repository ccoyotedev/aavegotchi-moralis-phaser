import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  position: relative;
  width: 11.8rem;
  height: 5.3rem;

  &:after {
    content: '';
    background-color: ${({ theme }) => theme.colors.dark0};
    position: absolute;
    top: -3px;
    bottom: -3px;
    left: 0;
    right: 0;
  }

  &:before {
    content: '';
    background-color: ${({ theme }) => theme.colors.dark0};
    position: absolute;
    left: -3px;
    right: -3px;
    height: 100%;
  }
`

const StyledButton = styled.button<{ primary?: boolean }>`
  background-color: ${({ theme, primary }) => primary ? theme.colors.primary : theme.colors.secondary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: none;
  z-index: 1;
  border-bottom: ${({ theme, primary }) => `4.5px solid ${primary ? theme.colors.primaryAccent : theme.colors.secondaryAccent}`};
  border-right: ${({ theme, primary }) => `4.5px solid ${primary ? theme.colors.primaryAccent : theme.colors.secondaryAccent}`};
  padding: 0.4rem;
  width: 100%;
  height: 100%;
  cursor: pointer;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.dark1};
    border-bottom: ${({ theme }) => `3px solid ${theme.colors.secondaryAccent}`};
    border-right: ${({ theme }) => `3px solid ${theme.colors.secondaryAccent}`};
    cursor: auto;
  }

  &:focus {
    outline: none;
  }

  &:active {
    border-bottom: none;
    border-right: none;
    border-top: ${({ theme, primary }) => `4.5px solid ${primary ? theme.colors.primaryAccent : theme.colors.secondaryAccent}`};
    border-left: ${({ theme, primary }) => `4.5px solid ${primary ? theme.colors.primaryAccent : theme.colors.secondaryAccent}`};
  }
`

interface Props {
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  primary?: boolean;
}

export const Button = ({ disabled, onClick, children, primary }: Props) => {
  const handleOnClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  }

  return (
    <ButtonWrapper>
      <StyledButton
        onClick={handleOnClick}
        disabled={disabled}
        primary={primary}
      >
        {children}
      </StyledButton>
    </ButtonWrapper>
  )
}
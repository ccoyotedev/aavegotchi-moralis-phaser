import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  position: relative;

  &:after {
    content: '';
    background-color: ${({ theme }) => theme.colors.dark0};
    position: absolute;
    top: -3px;
    bottom: -3px;
    width: 100%;
    left: 0;
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

const StyledButton = styled.button<{ small?: boolean }>`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: none;
  z-index: 1;
  border-bottom: ${({ theme, small}) => small ? 'none' : `4.5px solid ${theme.colors.secondaryAccent}`};
  border-right: ${({ theme, small }) => small ? 'none' : `4.5px solid ${theme.colors.secondaryAccent}`};
  padding: 0.4rem;
  min-width: ${({small}) => small ? '7.2rem' : '11.8rem'};
  height: ${({small}) => small ? '1.6rem' : '5.3rem'};
  cursor: pointer;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.dark1};
    border-bottom: ${({ theme, small}) => small ? 'none' : `3px solid ${theme.colors.secondaryAccent}`};
    border-right: ${({ theme, small}) => small ? 'none' : `3px solid ${theme.colors.secondaryAccent}`};
    cursor: auto;
  }

  &:focus {
    outline: none;
  }

  &:active {
    border-bottom: none;
    border-right: none;
    border-top: ${({ theme, small}) => small ? `2px solid ${theme.colors.secondaryAccent}` : `4.5px solid ${theme.colors.secondaryAccent}`};
    border-left: ${({ theme, small }) => small ? `2px solid ${theme.colors.secondaryAccent}` : `4.5px solid ${theme.colors.secondaryAccent}`};
  }
`

interface Props {
  disabled?: boolean;
  onClick?: () => void;
  small?: boolean;
  children?: React.ReactNode;
}

export const Button = ({ disabled, onClick, small, children }: Props) => {
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
        small={small}
      >
        {children}
      </StyledButton>
    </ButtonWrapper>
  )
}
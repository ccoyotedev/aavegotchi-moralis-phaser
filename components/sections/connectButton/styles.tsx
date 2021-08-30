import { styled } from 'theme';
import { css } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
`

export const ConnectedDetails = styled.div`
  margin-left: 1.6rem;
  p {
    font-size: 1.2rem;
    text-align: right;
    margin: 0;
    color: ${({ theme }) => theme.colors.light0}
  }
  p:last-of-type {
    color: ${({ theme }) => theme.colors.light1}
  }
`

export const Connected = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.4rem);
  left: 0;
  right: 0;
`

export const DropdownButton = styled.button`
  width: 100%;
  cursor: pointer;
  font-size: 1.4rem;
  padding: 0.2rem 0.6rem;
  min-height: 3.2rem;
  background-color: ${({ theme }) => theme.colors.light0};
  border: 2px solid ${({ theme }) => theme.colors.dark2};

  &:hover {
    border-color: ${({ theme }) => theme.colors.secondary};
  }
`
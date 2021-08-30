import { styled } from 'theme';

export const GotchiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.6rem;
  max-height: 60rem;
  overflow-y: scroll;

  @media ${({ theme }) => theme.mediaQueries.phone} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${({ theme }) => theme.mediaQueries.tablet} {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const GotchiCard = styled.div<{active: boolean}>`
  position: relative;
  border: 2px solid;
  cursor: pointer;
  border-color: ${({ theme, active }) => active ? theme.colors.primary : 'transparent'};
  width: 100%;

  transition: all 200ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

export const GotchiNamePlate = styled.div`
  position: absolute;
  bottom: 0.4rem;
  left: 0.4rem;
  right: 0.4rem;
  background-color: ${({theme }) => theme.colors.dark2};
  border: 2px solid ${({ theme })=> theme.colors.primary};
  border-radius: 1.6rem;
  padding: 0.4rem 1.6rem;
  color: ${({theme }) => theme.colors.light0};
  display: grid;
  place-items: center;

  p {
    text-transform: uppercase;
    margin: 0;
  }
`
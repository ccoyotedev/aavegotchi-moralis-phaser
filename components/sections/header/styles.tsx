import { styled } from 'theme';

export const Wrapper = styled.header`
  position: relative;
  width: 100%;
  background-color: ${({theme}) => theme.colors.secondaryAccent};
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 2.4rem;
  border-bottom: 1px solid ${({theme}) => theme.colors.dark2};

  @media ${({theme}) => theme.mediaQueries.laptop} {
    position: sticky;
    top:0;
  };
`

export const ButtonContainer = styled.div`
  display: flex;
  & > * + * {
    margin-left: 1.2rem;
  }
`

export const ButtonContents = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding-left: 0.4rem;
  justify-content: space-between;
  align-items: center;
`

export const GotchiIconWrapper = styled.div`
  background-color: ${({theme}) => theme.colors.light1};
  height: 3.2rem;
  width: 3.2rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  overflow: hidden;

  img {
    height: 110%;
    width: 110%;
  }
`

export const AavegotchiDetails = styled.div`
  margin-left: 0.8rem;
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
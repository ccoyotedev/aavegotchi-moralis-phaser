import React, { useState } from "react";
import * as Styled from "./styles";
import { useMoralis } from "react-moralis";
import { Button, GotchiSVG } from "components/ui";
import { GotchiSelectModal, ConnectButton  } from "..";
import { useAavegotchi } from "context/AavegotchiContext";
import { Aavegotchi } from "types";

const LoadingButton = () => {
  return (
    <Button disabled={true}>
      <Styled.ButtonContents>
        <Styled.GotchiIconWrapper>
          <img src="/assets/gifs/loading.gif" />
        </Styled.GotchiIconWrapper>
        <Styled.AavegotchiDetails>
          <p>Loading</p>
          <p>Aavegotchis</p>
        </Styled.AavegotchiDetails>
      </Styled.ButtonContents>
    </Button>
  );
};

const BuyButton = () => {
  return (
    <a
      href="https://aavegotchi.com/baazaar/aavegotchis?sort=latest"
      target="_blank"
    >
      <Button>Buy Aavegotchi</Button>
    </a>
  );
};

const GotchiSelectButton = ({ gotchi, onClick }: { gotchi?: Aavegotchi, onClick: () => void }) => {
  if (!gotchi) {
    return <LoadingButton />
  }
  return (
    <Button onClick={onClick}>
      <Styled.ButtonContents>
        <Styled.GotchiIconWrapper>
          <GotchiSVG tokenId={gotchi.id} />
        </Styled.GotchiIconWrapper>
        <Styled.AavegotchiDetails>
          <p>({gotchi.id})</p>
          <p>{gotchi.name}</p>
        </Styled.AavegotchiDetails>
      </Styled.ButtonContents>
    </Button>
  );
};

export const Header = () => {
  const { isAuthenticated } = useMoralis();
  const {
    state: { usersAavegotchis, networkId, selectedAavegotchiId },
  } = useAavegotchi();
  const [isGotchiSelectModalOpen, setIsGotchiSelectModalOpen] = useState(false);

  return (
    <Styled.Wrapper>
      {isGotchiSelectModalOpen && <GotchiSelectModal onHandleClose={() => setIsGotchiSelectModalOpen(false)} />}
      <Styled.ButtonContainer>
        {isAuthenticated &&
          networkId === 137 &&
          (usersAavegotchis === undefined ? (
            <LoadingButton />
          ) : usersAavegotchis.length === 0 ? (
            <BuyButton />
          ) : (
            <GotchiSelectButton
              onClick={() => setIsGotchiSelectModalOpen(true)}
              gotchi={usersAavegotchis.find(gotchi => gotchi.id === selectedAavegotchiId)}
            />
          ))}
        <ConnectButton />
      </Styled.ButtonContainer>
    </Styled.Wrapper>
  );
};

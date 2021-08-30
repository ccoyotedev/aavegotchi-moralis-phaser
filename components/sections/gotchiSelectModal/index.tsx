import { useState } from "react";
import { GotchiSVG, Modal } from "components/ui";
import { useAavegotchi } from "context/AavegotchiContext";
import * as Styled from "./styles";

interface Props {
  onHandleClose: () => void;
}

export const GotchiSelectModal = ({ onHandleClose }: Props) => {
  const {
    state: { usersAavegotchis, selectedAavegotchiId },
    dispatch,
  } = useAavegotchi();
  const [hoverIndex, setHoverIndex] = useState<number | undefined>();

  const handleSelect = (id: string) => {
    dispatch({
      type: "SET_SELECTED_AAVEGOTCHI",
      selectedAavegotchiId: id
    })
    onHandleClose();
  }

  return (
    <Modal onHandleClose={onHandleClose}>
      <h2>Select Aavegotchi</h2>
      <Styled.GotchiGrid>
        {usersAavegotchis?.map((gotchi, i) => (
          <Styled.GotchiCard
            key={gotchi.id}
            active={gotchi.id === selectedAavegotchiId}
            onClick={() => handleSelect(gotchi.id)}
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(undefined)}
          >
            <GotchiSVG
              tokenId={gotchi.id}
              options={{ animate: hoverIndex === i, armsUp: hoverIndex === i, eyes: hoverIndex === i ? "happy" : undefined }}
            />
            <Styled.GotchiNamePlate>
              <p>{gotchi.name}</p>
            </Styled.GotchiNamePlate>
          </Styled.GotchiCard>
        ))}
      </Styled.GotchiGrid>
    </Modal>
  );
};

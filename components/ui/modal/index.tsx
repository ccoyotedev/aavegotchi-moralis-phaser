import * as Styled from './styles';
import { Portal } from "components/util";

interface Props {
  children: React.ReactNode;
  onHandleClose?: () => void;
}

export const Modal = ({ children, onHandleClose }: Props) => {
  return (
    <Portal>
      <Styled.Wrapper>
        <Styled.Modal>
          {onHandleClose && <Styled.CloseIcon src="/assets/icons/close.svg" onClick={() => onHandleClose()} />}
          {children}
        </Styled.Modal>
      </Styled.Wrapper>
    </Portal>
  )
}
import React,{ useState } from 'react';
import * as Styled from "./styles";
import { useMoralis } from 'react-moralis';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { smartTrim, networkIdToName } from 'utils';
import { Button } from 'components/ui/button';
import { useAavegotchi } from "context/AavegotchiContext";
import { useEffect } from 'react';

export const ConnectButton = () => {
  const { state: { networkId, loading } } = useAavegotchi();
  const { authenticate, user, logout, isAuthenticated } = useMoralis();
  const [ networkName, setNetworkName ] = useState("");
  const [ openDropdown, setOpenDropdown ] = useState(false);

  const handleLogin = async () => {
    await authenticate();
  }

  const handleLogout = async () => {
    setOpenDropdown(false);
    await logout();
  }

  const handleClick = () => {
    if (!user) handleLogin();
    if (!loading && isAuthenticated) {
      setOpenDropdown(prevState => !prevState);
    }
  }

  useEffect(() => {
    if (networkId) {
      setNetworkName(networkIdToName[networkId]);
    }
  }, [networkId])

  return (
    <Styled.Wrapper>
      <Button onClick={handleClick} disabled={loading}>
        {loading ? "Loading" : !user ? "Connect" : (
          <>
            <Jazzicon diameter={28} seed={jsNumberForAddress(user.attributes.accounts[0])} />
            <Styled.ConnectedDetails>
              <p>{networkName}</p>
              <p>
                {smartTrim(user.attributes.accounts[0], 8)}
              </p>
            </Styled.ConnectedDetails>
          </>
        )}
      </Button>
      {openDropdown && (
        <Styled.Dropdown>
          <Styled.DropdownButton onClick={() => handleLogout()}>
            Logout
          </Styled.DropdownButton>
        </Styled.Dropdown>
      )}
    </Styled.Wrapper>
  )
}
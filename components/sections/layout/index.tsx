import React, { useEffect } from 'react'
import { Footer, Header } from 'components/sections'
import { Container } from 'components/layout'
import { updateNetworkId, useAavegotchi, updateAavegotchis, updateWithPreviewAavegotchis } from 'context/AavegotchiContext'
import { useMoralis } from 'react-moralis'
import { ErrorModal } from 'components/ui'
import Head from 'next/head'

interface Props {
  children: React.ReactNode;
  metadetails?: {
    title?: string;
  }
}

export const Layout = ({children, metadetails}: Props) => {
  const { web3, isWeb3Enabled, web3EnableError, enableWeb3, isAuthenticated, user, Moralis, logout  } = useMoralis();
  const { state: {error, usersAavegotchis} , dispatch } = useAavegotchi();

  const handleCloseErrorModal = () => {
    dispatch({
      type: "SET_ERROR",
      error: undefined,
    })
  };

  // Fetch preview gotchis if in dev and have no Aavegotchis
  useEffect(() => {
    if (usersAavegotchis && usersAavegotchis.length === 0 && process.env.NODE_ENV === "development") {
      updateWithPreviewAavegotchis(dispatch, web3, [
        {
          name: "GotchiDev",
          id: "OG",
          collateral: "aWETH",
          wearables: [117, 55, 0, 0, 0, 0 , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          numericTraits: [50, 50, 50, 50, 40, 40]
        },
        {
          name: "H4cker",
          id: "l33T",
          collateral: "aUSDT",
          wearables: [211, 212, 213, 214, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          numericTraits: [100, 100, 100, 100, 100, 100]
        }
      ])
    }
  }, [usersAavegotchis])

  // Update user aavegotchis
  useEffect(() => {
    if (isAuthenticated && isWeb3Enabled && user) {
      updateAavegotchis(dispatch, user.attributes.accounts[0]);
    }
  }, [isWeb3Enabled, isAuthenticated, user]);

  // Update network
  useEffect(() => {
    if (isWeb3Enabled) {
      updateNetworkId(dispatch, web3);
    } else {
      enableWeb3();
    }
  }, [isWeb3Enabled])

  // Listeners
  useEffect(() => {
    const accountListener = Moralis.Web3.onAccountsChanged((accounts) => {
      if (!user || accounts[0] !== user.attributes.accounts[0]) {
        logout();
      }
    })

    const chainListener = Moralis.Web3.onChainChanged(() => {
      if (isWeb3Enabled) {
        updateNetworkId(dispatch, web3);
      }
    })

    // Unsubscribe from listeners
    return () => {
      accountListener();
      chainListener();
    };
  }, [])

  return (
    <>
      <Head>
        <title>{metadetails?.title || "Aavegotchi"}</title>
      </Head>
      {web3EnableError && <ErrorModal error={web3EnableError} />}
      {error && <ErrorModal error={error} onHandleClose={handleCloseErrorModal} />}
      <Header />
      <Container>
        {children}
      </Container>
      <Footer />
    </>
  )
}

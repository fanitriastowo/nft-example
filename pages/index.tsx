import { Box, Button, Center, Fade } from "@chakra-ui/react";
import FileUpload from "components/FileUpload";
import NFTCollection from "components/NFTCollection";
import Head from "next/head";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useEffect, useState } from "react";

function MainBody() {
  const { address, isConnected } = useAccount();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  useEffect(() => {
    if (isConnected && address) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [address, isConnected]);

  if (isLoggedIn) {
    return (
      <Box p="5rem">
        <FileUpload />
        <NFTCollection />
      </Box>
    );
  } else {
    return (
      <Center p="5rem">
        <Button onClick={() => connect()}>Connect to Metamask</Button>
      </Center>
    );
  }
}

export default function Home() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (typeof Window !== "undefined") {
      setFadeOut(true);
    }
  }, []);

  return (
    <Fade in={fadeOut}>
      <Head>
        <title>NFT Marketplace</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainBody />
    </Fade>
  );
}

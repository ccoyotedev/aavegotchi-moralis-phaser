import Phaser from "phaser";
import { useState, useEffect } from "react";
import { IonPhaser, GameInstance } from "@ion-phaser/react";
import { useAavegotchi } from "context/AavegotchiContext";
import { useRouter } from 'next/router'
import Scenes from "game/scenes";
import { Aavegotchi } from "types";
import { useDiamondCall } from "actions/web3";
import { useMoralis } from "react-moralis";

const Main = () => {
  const router = useRouter()
  const { web3 } = useMoralis();
  const {
    state: { usersAavegotchis, selectedAavegotchiId },
  } = useAavegotchi();
  const [initialised, setInitialised] = useState(true);
  const [config, setConfig] = useState<GameInstance>();

  const startGame = async (selectedGotchi: Aavegotchi) => {
    let width = window.innerWidth;
    let height = width / 1.778;

    if (height > window.innerHeight) {
      height = window.innerHeight;
      width = height * 1.778;
    }

    if (!selectedGotchi.svg) {
      try {
        if (!web3) throw "Not connected to web3";
        const svg = await useDiamondCall<string>(web3, {name: "getAavegotchiSvg", parameters: [selectedGotchi.id]});
        selectedGotchi.svg = svg;
      } catch (err) {
        console.error(err);
      }
    }
    
    setConfig({
      type: Phaser.AUTO,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: process.env.NODE_ENV === "development",
        },
      },
      scale: {
        mode: Phaser.Scale.NONE,
        width,
        height,
      },
      scene: Scenes,
      fps: {
        target: 60,
      },
      callbacks: {
        preBoot: (game) => {
          // Makes sure the game doesnt create another game on rerender
          setInitialised(false);
          game.registry.merge({
            selectedGotchi,
          });
        },
      },
    });
  }

  useEffect(() => {
    if (usersAavegotchis && selectedAavegotchiId) {
      // Socket is called here so we can take advantage of the useEffect hook to disconnect upon leaving the game screen
      const selectedGotchi = usersAavegotchis.find(gotchi => gotchi.id === selectedAavegotchiId);
      if (selectedGotchi) startGame(selectedGotchi);
    } else if (typeof window !== "undefined") {
      router.push("/")
    }
  }, []);

  return <IonPhaser initialize={initialised} game={config} id="phaser-app" />;
};

export default Main;

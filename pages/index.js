import Head from "next/head";
import { useState, useEffect } from "react";
import Gallery from "../components/Gallery";
import EnterScreen from "../components/EnterScreen";
import AppHeader from "../components/AppHeader";

export default function App(options) {
  const [page, setPage] = useState("enter");
  const [fromPage, setFromPage] = useState("enter");

  const [appHeader, setAppHeader] = useState(null);

  let defaultPlayAudio;

  const [audio, setAudio] = useState(null);
  const [playing, setPlaying] = useState(false);

  const [menuClass, setMenuClass] = useState("close");

  useEffect(() => {
    setAudio(
      new Audio("/audios/The Gallery curated by Ripple - Ripple Gallery.mp3")
    );
  }, []);

  useEffect(() => {
    if (audio) {
      console.log(audio);
      audio.loop = true;
      audio.setAttribute("id", "main-audio");

      audio.addEventListener(
        "ended",
        () => {
          console.log("audio ended!");
          audio.currentTime = 0;
          audio.play();
        },
        false
      );

      defaultPlayAudio = localStorage.getItem("defaultPlayAudio");

      if (defaultPlayAudio == null) {
        localStorage.setItem("defaultPlayAudio", "true");
        defaultPlayAudio = "true";
      }

      return audio.removeEventListener("ended", audio, false);
    }
  }, [audio]);
  const playSound = () => {
    if (audio) {
      audio.volume = 0.5;
      setPlaying(true);
      audio.play();
    }
  };

  const stopSound = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setPlaying(false);
    }
  };

  const toggleSound = () => {
    if (playing === false) {
      playSound();
      localStorage.setItem("defaultPlayAudio", "true");
    } else {
      stopSound();
      localStorage.setItem("defaultPlayAudio", "false");
    }
  };

  const enterGallery = () => {
    if (defaultPlayAudio == "true") {
      playSound();
    }
    setFromPage(page);
    setPage("gallery");
  };

  const navigateToCard = () => {
    setFromPage(page);
    setPage("cardview");
  };

  const switchPage = () => {
    if (page == "gallery" && fromPage == "enter") {
      setFromPage(page);
      setPage("enter");
    } else if (page == "gallery" && fromPage == "cardview") {
      setFromPage(page);
      setPage("cardview");
    } else if (page == "cardview") {
      setFromPage(page);
      setPage("gallery");
    }
  };

  return (
    <>
      <Head>
        <title>Cards Platform</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {page != "enter" && (
        <AppHeader
          onRef={setAppHeader}
          className="pt-12"
          onToggleSound={toggleSound}
          onSwitchPage={switchPage}
        />
      )}
      <main className="main-app overflow-hidden">
        {page == "enter" ? (
          <EnterScreen onEnter={enterGallery} />
        ) : page == "gallery" ? (
          <Gallery onRef={() => {}} onNavigateToCard={navigateToCard} />
        ) : (
          <div>Hello</div>
        )}
      </main>
    </>
  );
}

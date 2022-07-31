import Head from "next/head";
import { useState, useEffect } from "react";
import Gallery from "../components/Gallery";
import EnterScreen from "../components/EnterScreen";
import AppHeader from "../components/AppHeader";

export default function App(options) {
  const [page, setPage] = useState("enter");
  const [fromPage, setFromPage] = useState("enter");

  const [appHeader, setAppHeader] = useState(null);

  const [defaultPlayAudio, setDefaultPlayAudio] = useState(null);

  const [audio, setAudio] = useState(null);

  const [justLoaded, setJustLoaded] = useState(true);

  const [menuClass, setMenuClass] = useState("close");

  useEffect(() => {
    setAudio(
      new Audio("/audios/The Gallery curated by Ripple - Ripple Gallery.mp3")
    );
  }, []);

  useEffect(() => {
    if (audio) {
      audio.loop = true;

      audio.addEventListener(
        "ended",
        () => {
          audio.currentTime = 0;
          audio.play();
        },
        false
      );

      const d_p_audio = localStorage.getItem("defaultPlayAudio");

      if (d_p_audio == null) {
        localStorage.setItem("defaultPlayAudio", "true");
        setDefaultPlayAudio("true");
      } else {
        setDefaultPlayAudio(d_p_audio);
        setJustLoaded(d_p_audio === "true");
      }

      return audio.removeEventListener("ended", audio, false);
    }
  }, [audio]);

  const playSound = (callback, onError) => {
    if (audio && (defaultPlayAudio === "false" || justLoaded)) {
      audio.volume = 0.5;
      audio
        .play()
        .then((_) => {
          localStorage.setItem("defaultPlayAudio", "true");
          setDefaultPlayAudio("true");

          if (justLoaded) setJustLoaded(false);

          return callback ? callback() : null;
        })

        .catch((err) => (onError ? onError(err) : null));
    }
  };

  const stopSound = () => {
    if (audio && defaultPlayAudio === "true") {
      audio.pause();
      audio.currentTime = 0;

      localStorage.setItem("defaultPlayAudio", "false");
      setDefaultPlayAudio("false");
    }
  };

  const toggleSound = () => {
    if (defaultPlayAudio === "false") {
      playSound(null, (err) => {
        console.log("an error occured while playing sound ==>", err);
      });
    } else {
      stopSound();
    }
  };

  const enterGallery = () => {
    if (defaultPlayAudio === "true") {
      playSound();
    }

    setFromPage(page);
    setPage("gallery");
  };

  const navigateToCard = () => {
    setFromPage(page);
    setPage("cardview");

    if (defaultPlayAudio === "true") {
      return audio.currentTime;
    }
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
          className="pt-12 absolute left-0 top-0 w-full z-50"
          menuClasses={`${page == "gallery" ? "closable" : ""}`}
          onToggleSound={toggleSound}
          onSwitchPage={switchPage}
          canPlayEnabled={defaultPlayAudio === "true"}
        />
      )}
      <main className="main-app overflow-hidden">
        {page == "enter" ? (
          <EnterScreen
            onEnter={enterGallery}
            soundMuted={defaultPlayAudio !== "true"}
          />
        ) : page == "gallery" ? (
          <Gallery
            onRef={() => {}}
            onNavigateToCard={navigateToCard}
            soundMuted={defaultPlayAudio !== "true"}
            cleanUp={stopSound}
          />
        ) : (
          <div>Hello</div>
        )}
      </main>
    </>
  );
}

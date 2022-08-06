import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Gallery from "../components/Gallery";
import EnterScreen from "../components/EnterScreen";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import CardScene from "../components/CardScene";

import siteContent from "/public/data/site-content.json";
import cardsData from "/public/data/cards-data.json";

export async function getServerSideProps({ query }) {
  if (query.model_id) {
    return {
      props: {
        showModelFromStart: true,
        model_id: parseInt(query.model_id),
      },
    };
  }

  return {
    props: {},
  };
}

export default function App({ showModelFromStart, model_id }) {
  const router = useRouter();
  const [page, setPage] = useState(showModelFromStart ? "cardview" : "enter");
  const [fromPage, setFromPage] = useState(
    showModelFromStart ? "gallery" : "enter"
  );

  const [appHeader, setAppHeader] = useState(null);
  const [galleryRef, setGalleryRef] = useState(null);

  const [defaultPlayAudio, setDefaultPlayAudio] = useState(null);

  const [audio, setAudio] = useState(null);

  const [justLoaded, setJustLoaded] = useState(true);

  const [menuClass, setMenuClass] = useState("close");

  const [abtButClasses, setAbtButClasses] = useState("");

  const [activeCard, setActiveCard] = useState(
    model_id ? cardsData[model_id - 1] : cardsData[0]
  );

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

  const exitGallery = () =>
    new Promise((resolve, reject) => {
      galleryRef.current.classList.add("slide-bottom");
      setAbtButClasses("exit");
      setTimeout(() => {
        galleryRef.current.classList.remove("slide-bottom");
        setAbtButClasses("");
        document.body.style.cursor = "initial";
        resolve(null);
      }, 2000);
    });

  const navigateToCard = (id) => {
    setFromPage(page);
    setPage("cardview");

    setActiveCard(cardsData.find((card) => card.id == id));

    if (defaultPlayAudio === "true") {
      return audio.currentTime;
    }
  };

  const navigateTo = async (newpage, beforeNavigate) => {
    if (beforeNavigate) await beforeNavigate();
    setFromPage(page);
    setPage(newpage);
  };

  const switchPage = () => {
    if (page == "gallery" && fromPage == "enter") {
      navigateTo("enter", exitGallery);
    } else if (page == "gallery" && fromPage == "cardview") {
      navigateTo("cardview", exitGallery);
    } else if (page == "cardview") {
      navigateTo("gallery");
    }
  };

  // useEffect(() => {
  //   appHeader.st
  // },[]);

  const setHeaderTheme = (card) => {
    if (appHeader)
      appHeader.current.style.color = card.theme == "light" ? "white" : "black";
  };

  return (
    <>
      <Head>
        <title>{siteContent.title}</title>
        <link rel="icon" href={siteContent.favIconUrl} />
      </Head>

      {page != "enter" && (
        <AppHeader
          onRef={setAppHeader}
          className="a-header pt-10 absolute left-0 top-0 w-full z-50"
          menuClasses={`${page == "gallery" ? "closable" : ""}`}
          onToggleSound={toggleSound}
          onSwitchPage={switchPage}
          canPlayEnabled={defaultPlayAudio === "true"}
          navigateHome={() => {
            navigateTo("enter");
          }}
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
            onRef={setGalleryRef}
            onNavigateToCard={navigateToCard}
            soundMuted={defaultPlayAudio !== "true"}
            cleanUp={stopSound}
            aboutButClasses={abtButClasses}
          />
        ) : (
          <CardScene
            soundMuted={defaultPlayAudio !== "true"}
            initialCard={activeCard}
            onSlideSwitch={setHeaderTheme}
          />
        )}
      </main>

      {page !== "cardview" && (
        <AppFooter
          soundMuted={defaultPlayAudio !== "true"}
          className="a-footer absolute left-0 right-0 bottom-0 z-40 mx-auto"
        />
      )}

      <style jsx>{`
        .a-footer,
        .a-header {
          margin: 0 auto;
          max-width: 1600px;
        }
      `}</style>
    </>
  );
}

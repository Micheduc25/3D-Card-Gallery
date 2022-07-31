import { useRouter } from "next/router";
import AppHeader from "../../components/AppHeader";
import { useEffect, useState } from "react";
import Gallery from "../../components/Gallery";
import Head from "next/head";
import Script from "next/script";
import CardScene from "../../components/CardScene";

export default function CardScreen({ children }) {
  const router = useRouter();
  const modelId = router.query.id;

  const [page, setPage] = useState("details");
  const [galleryRef, setGalleryRef] = useState(null);

  const [defaultPlayAudio, setDefaultPlayAudio] = useState(null);
  const [justLoaded, setJustLoaded] = useState(true);

  const [soundBlocked, setSoundBlocked] = useState(false);

  const [audio, setAudio] = useState(null);

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

      //try to play audio from current position if any
      if (router.query.csp) {
        audio.currentTime = router.query.csp;
      }

      playSound(null, (_) => {
        console.log("setting soundBlocked to true..");
        setSoundBlocked(true);
      });

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

          if (soundBlocked) setSoundBlocked(false);

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
    if (defaultPlayAudio === "false" || soundBlocked) {
      playSound(null, (err) => {
        console.log("an error occured while playing sound ==>", err);
      });
    } else {
      stopSound();
    }
  };

  const switchPage = (animate = true) => {
    if (page == "details") {
      setPage("gallery");
    } else {
      if (animate && galleryRef) {
        galleryRef.current.classList.add("slide-bottom");
      }

      setTimeout(() => {
        setPage("details");
      }, 1000);
    }
  };

  // useEffect(() => {
  //   return stopSound();
  // }, [audio]);

  return (
    <>
      <Head>
        <Script
          id="car1"
          strategy="afterInteractive"
          src="/scripts/index.b10eeb99.js"
          type="module"
        />

        <link rel="modulepreload" href="/scripts/vendor.9c14883d.js" />
      </Head>
      <main className="overflow-hidden">
        <AppHeader
          onToggleSound={toggleSound}
          onSwitchPage={switchPage}
          className="pt-10 absolute left-0 top-0 w-full z-50"
          menuClasses={`${page == "gallery" ? "closable" : ""}`}
          canPlayEnabled={defaultPlayAudio === "true"}
        ></AppHeader>

        {page == "gallery" ? (
          <Gallery
            onRef={setGalleryRef}
            onNavigateToCard={() => {
              switchPage(false);
            }}
            soundMuted={defaultPlayAudio !== "true"}
            cleanUp={stopSound}
          />
        ) : (
          <CardScene />
        )}
      </main>
    </>
  );
}

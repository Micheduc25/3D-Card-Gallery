import styles from "./layout.module.css";
import Link from "next/link";
import Head from "next/head";
import NavButton from "./NavButton";
import { useState, useEffect } from "react";
export default function Layout({ children }) {
  const [audio, setAudio] = useState(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setAudio(
      new Audio("/audios/The Gallery curated by Ripple - Ripple Gallery.mp3")
    );

    if (audio) {
      audio.loop = true;

      audio.addEventListener(
        "ended",
        () => {
          console.log("audio ended!");
          audio.currentTime = 0;
          audio.play();
        },
        false
      );
    }
  }, []);
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
  return (
    <div className="default-layout pt-12 pb-6 ">
      <Head></Head>
      <header className="mb-12 px-6">
        <nav className="flex justify-between items-center">
          <Link href="/">
            <a className="text-2xl font-light">
              {" "}
              Cards<span className="font-bold"> Gallery</span>
            </a>
          </Link>

          <div className="flex">
            <NavButton
              onButtonClick={playing ? stopSound : playSound}
              image="/images/headset.png"
              background="white"
            />

            <div className="mr-4"></div>
            <NavButton
              rotateOnHover={true}
              hasImage={false}
              background="#3f95f8"
            >
              <div className="menu-icon">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </NavButton>
          </div>
        </nav>
      </header>

      <div className="main-content">{children}</div>

      <style jsx>{`
        .main-content {
        }

        .menu-icon span {
          display: block;
          background-color: white;
          width: 18px;
          height: 2px;
          margin: 0 auto;
        }

        .menu-icon span:nth-child(2) {
          width: 25px;
        }

        .menu-icon span:not(:last-child) {
          margin-bottom: 3px;
        }
      `}</style>
    </div>
  );
}

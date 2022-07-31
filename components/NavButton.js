import Image from "next/image";
import { useEffect, useState } from "react";
export default function NavButton({
  children,
  image,
  background,
  hasImage = true,
  onButtonClick,
  rotateOnHover = false,
  classNames = "",
  style = {},

  muted = true,
}) {
  const [audio, setAudio] = useState(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setAudio(new Audio("/audios/mixkit-page-back-chime-1108.wav"));
  }, []);

  const playAudio = () => {
    if (audio && !muted && playing === false) {
      audio.volume = 0.3;
      setPlaying(true);
      audio.play();
    }
  };

  const stopAudio = () => {
    if (audio && playing === true) {
      audio.pause();
      audio.currentTime = 0;
      setPlaying(false);
    }
  };

  useEffect(() => {
    if (audio) {
      audio.addEventListener("ended", () => {
        stopAudio();
      });
      return () => {
        audio.removeEventListener("ended", () => {
          setPlaying(false);
        });
      };
    }
  }, []);

  return (
    <div
      onClick={onButtonClick}
      onMouseEnter={playAudio}
      onMouseLeave={stopAudio}
      className={`navButton cursor-pointer shadow-lg flex items-center justify-center rounded-full ${classNames}`}
      style={{ ...style, backgroundColor: background }}
    >
      <div
        className={`but-content mx-auto w-content flex select-none ${
          rotateOnHover ? "rot" : ""
        }`}
      >
        {hasImage ? <Image src={image} width={25} height={25} /> : children}
      </div>
      <style jsx>{`
        .navButton {
          width: 50px;
          height: 50px;
          z-index: 52;

          border-radius: 50%;
          transition: 0.3s;
          transition: opacity 0.3s;
        }

        .navButton:hover {
          transform: scale(1.1);
        }

        .navButton.disabled {
          position: relative;
          opacity: 0.2;
        }

        .navButton::before {
          content: "";
          position: absolute;
          display: block;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0);
          transition: background-color 0.3s;
        }

        .navButton.disabled::before {
          background-color: rgba(0, 0, 0, 0.3);
        }

        .but-content {
          backface-visibility: hidden;
          transform: scale(1) rotate(0);
          transition: 0.4s;
          perspective: 500px;
        }

        .but-content.rot {
          transition: 0.5s;
        }
        .navButton:hover .but-content:not(.rot) {
          transform: scale(1.2) rotate(-10deg);
        }

        .navButton:hover .but-content.rot {
          transform-style: preserve-3d;

          transform: rotateX(0) rotateY(360deg) rotateZ(90deg);
        }
      `}</style>
    </div>
  );
}

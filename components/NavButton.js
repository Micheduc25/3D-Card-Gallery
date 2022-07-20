import Image from "next/image";
import { useEffect, useState } from "react";
export default function NavButton({
  children,
  image,
  background,
  hasImage = true,
  onButtonClick,
  rotateOnHover = false,
}) {
  const [audio, setAudio] = useState(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setAudio(new Audio("/audios/mixkit-page-back-chime-1108.wav"));
  }, []);

  const playAudio = () => {
    if (audio && playing === false) {
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
      className={`navButton cursor-pointer shadow-lg flex items-center justify-center rounded-full `}
      style={{ backgroundColor: background }}
    >
      <div
        className={`but-content mx-auto w-content flex ${
          rotateOnHover ? "rot" : ""
        }`}
      >
        {hasImage ? <Image src={image} width={25} height={25} /> : children}
      </div>
      <style jsx>{`
        .navButton {
          width: 50px;
          height: 50px;

          border-radius: 50%;
        }

        .but-content {
          backface-visibility: hidden;
          transform: perspective(1px) scale(1) rotate(0);
          transition: transform 0.3s;
        }
        .navButton:hover .but-content {
          transform: perspective(1px) scale(1.2) rotate(-10deg);
        }

        .navButton:hover .but-content.rot {
          transform: scale(1.2) rotate(90deg);
        }

        @keyframes rotateContent {
          0% {
          }
          100% {
          }
        }
      `}</style>
    </div>
  );
}

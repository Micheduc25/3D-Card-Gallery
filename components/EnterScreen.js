import { useState, useEffect } from "react";
import siteContent from "/public/data/site-content.json";
export default function EnterScreen({ soundMuted = true, onEnter }) {
  const [audio, setAudio] = useState(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setAudio(new Audio("/audios/mixkit-page-back-chime-1108.wav"));
  }, []);

  const playAudio = () => {
    if (audio && !soundMuted && playing === false) {
      audio.volume = 0.3;
      setPlaying(true);

      audio.play().catch((err) => {
        console.log("Cannot play audio");
        setPlaying(false);
      });
    }
  };

  const stopAudio = () => {
    if (audio && !soundMuted && playing === true) {
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
  }, [audio]);

  return (
    <>
      <div className="enter slide-in-big flex flex-col justify-center items-center h-screen px-6">
        <h1 className="text-3xl md:text-4xl mb-6">
          <span className="font-light">{siteContent.home.title1}</span>{" "}
          <span className="font-black">{siteContent.home.title2}</span>
        </h1>

        <p className="text-xl mb-6 w-96 text-center">
          {siteContent.home.text1} <strong>{siteContent.home.text2}</strong>,{" "}
          {siteContent.home.text3} <strong>{siteContent.home.text4}</strong> .
        </p>

        <div
          onMouseEnter={playAudio}
          onMouseLeave={stopAudio}
          className="center mt-64"
        >
          <button className="enterButton btn" onClick={onEnter}>
            <svg
              width="180px"
              height="60px"
              viewBox="0 0 180 60"
              //   className="border"
            >
              <polyline
                points="179,1 179,59 1,59 1,1 179,1"
                className="bg-line"
              />
              <polyline
                points="179,1 179,59 1,59 1,1 179,1"
                className="hl-line"
              />
            </svg>
            <span className="">{siteContent.home.buttonText}</span>
          </button>
        </div>

        <style jsx>{`
          .center {
            width: 180px;
            height: 60px;
            position: absolute;
          }
          .btn {
            width: 180px;
            height: 60px;
            cursor: pointer;
            background: transparent;
            border: 2px solid #91c9ff;
            border-radius: 5px;
            outline: none;
            transition: 0.7s ease-in-out;
          }

          svg {
            position: absolute;
            left: 0;
            top: 0;
            fill: none;
            stroke: #fff;
            stroke-dasharray: 150 480;
            stroke-dashoffset: 150;
            transition: 0.7s ease-in-out;
          }

          .btn:hover {
            transition: 0.7s ease-in-out;
            background: #3f95f8;
          }

          .btn:hover svg {
            stroke-dashoffset: -480;
          }

          .btn span {
            color: #3f95f8;
            font-weight: bold;
            font-size: 18px;
            font-weight: 100;
            transition: 0.7s ease-in-out;
          }
          .btn:hover span {
            color: white;
          }
        `}</style>
      </div>
    </>
  );
}

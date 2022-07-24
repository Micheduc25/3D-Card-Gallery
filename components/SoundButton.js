import { useEffect, useState } from "react";

export default function SoundButton({
  children,
  url = "/audios/mixkit-page-back-chime-1108.wav",
}) {
  const [audio, setAudio] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    setAudio(new Audio(url));
  }, []);

  const playAudio = () => {
    if (audio && canPlay && playing === false) {
      audio.volume = 0.3;
      setPlaying(true);
      audio.play();
    }
  };

  const stopAudio = () => {
    if (audio && canPlay && playing === true) {
      audio.pause();
      audio.currentTime = 0;
      setPlaying(false);
    }
  };

  useEffect(() => {
    const defaultPlayAudio = localStorage.getItem("defaultPlayAudio");
    setCanPlay(defaultPlayAudio == "true");

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
    <>
      <div onMouseEnter={playAudio} onMouseLeave={stopAudio}>
        {children}
      </div>
    </>
  );
}

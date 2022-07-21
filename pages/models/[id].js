import { useRouter } from "next/router";
import AppHeader from "../../components/AppHeader";
import { useEffect } from "react";
export default function CardScreen({ children }) {
  const router = useRouter();
  const modelId = router.query.id;

  const toggleSound = () => {};

  const switchPage = () => {};

  useEffect(() => {
    const audio = document.getElementById("main-audio");
    const audios = document.getElementsByTagName("audio");
    console.log(audios);

    console.log(audio);
  });

  return (
    <>
      <AppHeader
        onToggleSound={toggleSound}
        onSwitchPage={switchPage}
      ></AppHeader>
      <div>Card {modelId}</div>
    </>
  );
}

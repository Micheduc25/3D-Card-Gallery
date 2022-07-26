import { useRouter } from "next/router";
import AppHeader from "../../components/AppHeader";
import { useEffect, useState } from "react";
import Gallery from "../../components/Gallery";
import Head from "next/head";
import Script from "next/script";
import Carousel from "../../components/GalleryCarousel";
import SwiperArrow from "../../components/SwiperArrow";
import SoundButton from "../../components/SoundButton";

export default function CardScreen({ children }) {
  const router = useRouter();
  const modelId = router.query.id;

  const [page, setPage] = useState("details");
  const [galleryRef, setGalleryRef] = useState(null);

  const toggleSound = () => {};

  const switchPage = () => {
    if (page == "details") {
      setPage("gallery");
    } else {
      galleryRef.current.classList.add("slide-bottom");

      setTimeout(() => {
        setPage("details");
      }, 1000);
    }
  };

  useEffect(() => {});

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
          className="pt-12 absolute left-0 top-0 w-full"
          menuClasses={`${page == "gallery" ? "closable" : ""}`}
        ></AppHeader>

        {page == "gallery" ? (
          <Gallery onRef={setGalleryRef} onNavigateToCard={() => {}} />
        ) : (
          <div>Hello {modelId}</div>
        )}
      </main>
    </>
  );
}

import { useRouter } from "next/router";
import AppHeader from "../../components/AppHeader";
import { useEffect, useState } from "react";
import Gallery from "../../components/Gallery";
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
      <main className="overflow-hidden">
        <AppHeader
          onToggleSound={toggleSound}
          onSwitchPage={switchPage}
          className="pt-12"
          menuClasses={`${page == "gallery" ? "closable" : ""}`}
        ></AppHeader>

        {page == "gallery" ? (
          <Gallery
            onRef={(ref) => {
              setGalleryRef(ref);
            }}
          />
        ) : (
          <div>Card {modelId}</div>
        )}
      </main>
    </>
  );
}

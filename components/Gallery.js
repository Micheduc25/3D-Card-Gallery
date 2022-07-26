import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import SwiperArrow from "../components/SwiperArrow";
import SoundButton from "../components/SoundButton";
import Carousel from "./GalleryCarousel";

export default function Gallery({ onNavigateToCard, onRef }) {
  const router = useRouter();
  const [swiper, setSwiper] = useState(null);
  const galleryRef = useRef(null);

  const slideNext = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };
  const slidePrev = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };

  const secondCursor = useRef(null);

  const moveSecondCursor = (x, y) => {
    if (secondCursor.current) {
      secondCursor.current.style.top = y + "px";
      secondCursor.current.style.left = x + "px";
    }
  };

  const onPageDrag = (e) => {
    console.log(e);
  };

  useEffect(() => {
    onRef(galleryRef);

    document.addEventListener("mousemove", (e) => {
      if (secondCursor.current) {
        moveSecondCursor(e.pageX, e.pageY);
      }
    });

    return () => {
      document.removeEventListener("mousemove", document, false);
    };
  }, []);

  const toggleCursor = (value) => {
    if (value) {
      secondCursor.current.style.display = "flex";
      document.body.style.cursor = "none";
    } else {
      secondCursor.current.style.display = "none";
      document.body.style.cursor = "grab";
    }
  };

  const openCard = (s, e) => {
    const card = e.target;
    const index = s.clickedIndex;
    card.classList.add("expand");

    setTimeout(() => {
      card.classList.remove("expand");
      onNavigateToCard();

      router.push(`/models/${index + 1}`);
    }, 1500);
  };

  return (
    <>
      <main
        ref={galleryRef}
        onDrag={onPageDrag}
        className="flex h-screen items-center justify-center  pt-12 pb-6"
      >
        <section className="slider-container w-full relative slide-in-big">
          <SoundButton>
            <SwiperArrow onArrowClick={slidePrev} />
          </SoundButton>

          <SoundButton>
            <SwiperArrow
              onArrowClick={slideNext}
              extendText="Next"
              direction="next"
            />
          </SoundButton>
          <Carousel
            onSwiper={setSwiper}
            onSliderMove={(s, e) => {
              e.stopPropagation();
              moveSecondCursor(e.clientX, e.clientY);
            }}
            onMouseEnterSlide={() => toggleCursor(true)}
            onMouseLeaveSlide={() => toggleCursor(false)}
            onSwiperClick={openCard}
          ></Carousel>
        </section>
        <div
          id="second-cursor"
          ref={secondCursor}
          className="select-none absolute hidden z-50 w-12 h-12 rounded-full bg-white text-blue-400 text-3xl shadow-lg items-center justify-center"
        >
          +
        </div>
      </main>

      <style jsx>{`
        .slide-item {
          height: 400px;
        }

        .slide-content {
          transition: all 0.7s ease-in-out;
        }

        .slide-content.expand {
        }

        // .slide-content.expand {
        //   position: absolute;
        //   left: 50%;
        //   top: 50%;
        //   transform: translate(-50%, -50%);
        //   z-index: 1000;
        //   width: 100vw;
        //   height: 100vh;
        // }
      `}</style>
    </>
  );
}

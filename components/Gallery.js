import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { Navigation, A11y, EffectCoverflow, EffectPanorama } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css"; // Import Swiper React components
import "swiper/css/bundle";

import Layout from "../components/layout";
import SwiperArrow from "../components/SwiperArrow";
import SoundButton from "../components/SoundButton";

export default function Gallery({ onNavigateToCard }) {
  const router = useRouter();
  const [swiper, setSwiper] = useState(null);

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

  useEffect(() => {
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
      document.body.style.cursor = "pointer";
    }
  };

  const openCard = (e, id) => {
    swiper.slideTo(id - 1, 500);
    const card = e.target;

    card.classList.add("expand");

    setTimeout(() => {
      card.classList.remove("expand");
      onNavigateToCard();
      //   const audios = document.getElementsByTagName("audio");

      //   for (let i = 0; i < audios.length; i++) {
      //     audios[i].pause();
      //     audios[i].currentTime = 0;
      //   }
      router.push(`/models/${id}`);
    }, 1500);
  };

  const slides = [
    { id: 1, text: "First Slide" },
    { id: 2, text: "Second Slide" },
    { id: 3, text: "Third Slide" },
    { id: 4, text: "Fourth Slide" },
    { id: 5, text: "Fifth Slide" },
    { id: 6, text: "Sixth Slide" },
    { id: 7, text: "Seventh Slide" },
    { id: 8, text: "Eight Slide" },
    { id: 9, text: "Ninth Slide" },
    { id: 10, text: "Tenth Slide" },
  ];
  return (
    <Layout>
      <main className="flex ">
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

          <Swiper
            modules={[Navigation, A11y, EffectCoverflow]}
            spaceBetween={50}
            // navigation
            slidesPerView={5}
            initialSlide={1}
            effect="coverflow"
            coverflowEffect={{
              rotate: 15,
              // stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(s) => setSwiper(s)}
            onSliderMove={(s, e) => {
              moveSecondCursor(e.clientX, e.clientY);
            }}
          >
            {slides.map((slide) => (
              <SwiperSlide
                className=" odd:bg-blue-400 even:bg-blue-700"
                onMouseEnter={() => toggleCursor(true)}
                onMouseLeave={() => toggleCursor(false)}
                onClick={(e) => openCard(e, slide.id)}
                key={slide.id}
              >
                <div className="slide-content cursor-none slide-item w-full flex items-center justify-center">
                  {slide.text}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
        <div
          id="second-cursor"
          ref={secondCursor}
          className="absolute hidden z-50 w-12 h-12 rounded-full bg-white text-blue-400 text-3xl shadow-lg items-center justify-center"
        >
          +
        </div>
      </main>

      <style jsx>{`
        .slide-item {
          height: 400px;
        }

        .slide-content {
          transition: transform 0.7s ease-in-out;
        }

        .slide-content.expand {
          transform: scale(2);
        }
      `}</style>
    </Layout>
  );
}

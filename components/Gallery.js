import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import SwiperArrow from "../components/SwiperArrow";
import SoundButton from "../components/SoundButton";
import Carousel from "./GalleryCarousel";
import Link from "next/link";

export default function Gallery({
  onNavigateToCard,
  onRef,
  soundMuted = true,
  cleanUp = () => {},
  aboutButClasses = "",
}) {
  const router = useRouter();
  const [swiper, setSwiper] = useState(null);

  const [sliderRef, setSliderRef] = useState(null);

  const [isDraggingScreen, setIsDraggingScreen] = useState(false);

  const galleryRef = useRef(null);

  const expandCardRef = useRef();

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

  const onPageDragHandler = (type, e) => {
    // if (type == "mousedown" && !isDraggingScreen) {
    //   setIsDraggingScreen(true);
    // } else if (type == "mousemove" && isDraggingScreen) {
    //   //move slider here
    //   swiper.translateTo(swiper.translate + e.movementX, 500);
    // } else if (type == "mouseup" && isDraggingScreen) {
    //   setIsDraggingScreen(false);
    // }
  };

  useEffect(() => {
    if (galleryRef.current) {
      onRef(galleryRef);
    }
  }, [galleryRef]);

  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      if (secondCursor.current) {
        moveSecondCursor(e.pageX, e.pageY);
      }
    });
    const swiperSlides = document.getElementsByClassName("swiper-slide");
    for (let i = 0; i < swiperSlides.length; i++) {
      swiperSlides[i].addEventListener("mouseenter", () => {
        toggleCursor(true);
      });

      swiperSlides[i].addEventListener("mouseleave", () => {
        toggleCursor(false);
      });
    }

    return () => {
      document.removeEventListener("mousemove", document, false);

      for (let i = 0; i < swiperSlides.length; i++) {
        swiperSlides[i].removeEventListener(
          "mouseenter",
          swiperSlides[i],
          false
        );

        swiperSlides[i].removeEventListener(
          "mouseleave",
          swiperSlides[i],
          false
        );
      }
    };
  }, []);

  const toggleCursor = (value) => {
    if (value) {
      secondCursor.current.classList.add("show");
      document.body.style.cursor = "none";
    } else {
      if (secondCursor.current) secondCursor.current.classList.remove("show");
      document.body.style.cursor = "grab";
    }
  };

  //method called when a slider card is clicked
  const openCard = (s, e) => {
    const card = e.target;

    const cardId = parseInt(e.target.id.split("-")[2]);
    const cardImage = card.children[0];

    const expandCard = expandCardRef.current;

    if (!expandCard) return;

    expandCard.children[0].src = cardImage.src;

    const cardRect = card.getBoundingClientRect();

    //set size of expand card
    expandCard.style.width = cardRect.width + "px";
    expandCard.style.height = cardRect.height + "px";

    //set position of expand card
    expandCard.style.left = cardRect.left + "px";
    expandCard.style.top = cardRect.top + "px";

    expandCard.classList.add("expand");
    expandCard.style.transform = `scaleX(${
      window.innerWidth / cardRect.width
    }) scaleY(${window.innerHeight / cardRect.height + 0.2})`;

    setTimeout(() => {
      if (sliderRef.current) sliderRef.current.style.opacity = 0;
      toggleCursor(false);
      expandCard.style.opacity = "0";
      onNavigateToCard(cardId);

      router.push(`/?model_id=${cardId}`, undefined, {
        shallow: true,
      });
    }, 1100);
  };

  return (
    <>
      <section
        onMouseDown={(e) => onPageDragHandler("mousedown")}
        onMouseUp={(e) => onPageDragHandler("mouseup")}
        onMouseMove={(e) => onPageDragHandler("mousemove", e)}
        className="flex h-screen items-center justify-center bg-gray-100   pb-6 relative"
      >
        <div ref={expandCardRef} className="slide-exapandable">
          <img className="slide-image" />
        </div>
        <section
          ref={galleryRef}
          className="slider-container w-full relative slide-in-big"
        >
          <SoundButton muted={soundMuted}>
            <SwiperArrow onArrowClick={slidePrev} />
          </SoundButton>

          <SoundButton muted={soundMuted}>
            <SwiperArrow
              onArrowClick={slideNext}
              extendText="Next"
              direction="next"
            />
          </SoundButton>
          <Carousel
            onRef={setSliderRef}
            onSwiper={setSwiper}
            onSliderMove={(s, e) => {
              e.stopPropagation();
              moveSecondCursor(e.clientX, e.clientY);
            }}
            onSwiperClick={openCard}
          ></Carousel>
        </section>
        <div
          id="second-cursor"
          ref={secondCursor}
          className="select-none absolute z-50 w-12 h-12 rounded-full bg-white text-blue-400 text-3xl shadow-lg items-center justify-center"
        >
          <span>+</span>
        </div>

        <SoundButton muted={soundMuted}>
          <Link href="/">
            <a
              className={
                "block about-but absolute z-40 left-1/2 bottom-0 cursor-pointer group " +
                aboutButClasses
              }
            >
              <div className="about-wrapper relative flex">
                <img
                  src="/images/shape5.svg"
                  alt="about holder"
                  className="group-hover:scale-125 duration-500 transition-transform"
                />

                <span
                  style={{ top: "60%" }}
                  className="absolute text-lg text-blue-400 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  About
                </span>
              </div>
            </a>
          </Link>
        </SoundButton>
      </section>

      <style jsx>{`
        .slide-exapandable {
          -webkit-user-select: none;
          user-select: none;
          position: absolute;
          z-index: 100;
          visibility: hidden;
          opacity: 1;
          pointer-events: none;
          transform-origin: center;
          transition: all 1.1s ease-in;
        }

        .slide-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          -webkit-user-select: none;
          user-select: none;
        }

        .slide-exapandable.expand {
          visibility: visible;
        }

        #second-cursor {
          display: flex;
          visibility: hidden;
          pointer-events: none;

          opacity: 0;
          transition: opacity 0.2s ease-in;
        }

        #second-cursor span {
          // display: block;
          transform: rotate(90deg);
          transition: transform 0.3s;
        }

        #second-cursor.show {
          visibility: visible;
          pointer-events: all;

          opacity: 1;
        }
        #second-cursor.show span {
          transform: rotate(0deg);
        }

        .about-wrapper img {
          width: 220px;
        }

        @media only screen and (min-width: 1024px) {
          .about-wrapper img {
            width: 260px;
          }
        }

        .about-but {
          animation: enter-fade 0.7s ease-out 0.2s both;
          transform-origin: bottom center;
        }
        .about-but.exit {
          animation: exit-fade 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1s both;
          transform-origin: bottom center;
        }

        @keyframes enter-fade {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-15px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0) scale(1);
          }
        }
        @keyframes exit-fade {
          from {
            opacity: 1;
            transform: translateX(-50%) translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateX(-50%) translateY(15px) scale(0.9);
          }
        }
      `}</style>
    </>
  );
}

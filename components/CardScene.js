import React, { Suspense, useEffect, useState } from "react";

import SoundButton from "./SoundButton";
import SwiperArrow from "./SwiperArrow";
import { useRouter } from "next/router";
import Head from "next/head";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import siteContent from "/public/data/site-content.json";

import Loader from "./Loader";

import cardsData from "/public/data/cards-data.json";
import SceneCanvas from "./SceneCanvas";

export default function CardScene({ soundMuted, initialCard, onSlideSwitch }) {
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: -4, z: 0 });
  const [defaultPlayAudio, setDefaultPlayAudio] = useState(null);

  const [swiper, setSwiper] = useState(null);
  const router = useRouter();

  const [model_id, setModelId] = useState(parseInt(router.query.model_id));

  const [slideChange, setSlideChange] = useState({
    active: false,
    direction: "next",
  });

  const slideDelay = 2500;

  useEffect(() => {
    setDefaultPlayAudio(localStorage.getItem("defaultPlayAudio") === "true");
  }, []);

  const slidePrev = () => {
    return new Promise((resolve, reject) => {
      if (swiper) {
        try {
          setSlideChange({ active: true, direction: "prev" });

          setTimeout(() => {
            swiper.slidePrev();
            resolve();
          }, slideDelay);
        } catch (err) {
          console.log("unable to slide prev");
          reject();
        }
      }
    });
  };
  const slideNext = () => {
    return new Promise((resolve, reject) => {
      if (swiper) {
        try {
          setSlideChange({ active: true, direction: "next" });
          setTimeout(() => {
            swiper.slideNext();
            resolve();
          }, slideDelay);
        } catch (err) {
          console.log("cannot swipe next");
          reject();
        }
      }
    });
  };

  //get real index of next slide
  const getNextSlideIndex = () => {
    const currentIndex = swiper.realIndex;
    const numSlides = cardsData.length;

    if (currentIndex == numSlides - 1) {
      return 0;
    } else return currentIndex + 1;
  };
  //get real index of previous slide
  const getPrevSlideIndex = () => {
    const currentIndex = swiper.realIndex;
    const numSlides = cardsData.length;

    if (currentIndex == 0) {
      return numSlides - 1;
    } else return currentIndex - 1;
  };

  const changeSlide = async (direction, beforeChange, afterChange) => {
    if (beforeChange) {
      await beforeChange(direction);
    }
    if (direction == "next") await slideNext();
    else await slidePrev();

    if (afterChange) await afterChange();
  };

  const setExitAnimation = (direction) =>
    new Promise((resolve, reject) => {
      const currentSlide = swiper.slides[swiper.activeIndex];

      document
        .querySelectorAll(".model-info")
        .forEach((node) => node.classList.remove("visible"));

      currentSlide.children[0].classList.remove("visible");

      document.querySelectorAll(".model-slide-arrow").forEach((node) => {
        node.classList.add("hide");
      });

      setTimeout(() => {
        resolve(null);
      }, 800);
    });

  const setEntryAnimation = (direction) =>
    new Promise((resolve, reject) => {
      const currentSlide = swiper.slides[swiper.activeIndex];

      document
        .querySelectorAll(".model-info")
        .forEach((node) => node.classList.remove("visible"));

      setTimeout(() => {
        currentSlide.children[0].classList.add("visible");
        document.querySelectorAll(".model-slide-arrow").forEach((node) => {
          node.classList.remove("hide");
        });
      }, 800);

      setTimeout(() => {
        resolve(null);
      }, 300);
    });

  const onSlideChange = (s) => {
    const currentSlide = s.slides[s.activeIndex];
    const s_id = parseInt(currentSlide.id.split("-")[2]);
    setModelId(s_id);
    onSlideSwitch(cardsData.find((card) => card.id == s_id));
    router.push(`/?model_id=${s_id}`, undefined, { shallow: true });
  };

  const onSwiper = (s) => {
    setSwiper(s);
    const c_slide = s.slides[s.activeIndex];
    c_slide.children[0].classList.add("visible");
  };

  // const loadNextModel = (card) => {
  //   return (
  //     (slideChange.active &&
  //       slideChange.direction == "next" &&
  //       card.id - 1 == getNextSlideIndex()) ||
  //     (slideChange.active &&
  //       slideChange.direction == "prev" &&
  //       card.id - 1 == getPrevSlideIndex())
  //   );
  // };

  return (
    <>
      <Head></Head>
      <section className="model-swiper">
        <SoundButton muted={soundMuted ?? defaultPlayAudio}>
          <SwiperArrow
            canExtend={true}
            extendText={siteContent.slider.previousText}
            direction="prev"
            className="model-slide-arrow"
            onArrowClick={() => {
              changeSlide("prev", setExitAnimation, setEntryAnimation);
            }}
          />
        </SoundButton>
        <SoundButton muted={soundMuted ?? defaultPlayAudio}>
          <SwiperArrow
            onArrowClick={() => {
              changeSlide("next", setExitAnimation, setEntryAnimation);
            }}
            canExtend={true}
            extendText={siteContent.slider.nextText}
            direction="next"
            className="model-slide-arrow"
          />
        </SoundButton>

        <Swiper
          spaceBetween={0}
          onSwiper={onSwiper}
          slidesPerView={1}
          loop={true}
          speed={300}
          grabCursor={false}
          allowTouchMove={false}
          allowSlideNext={true}
          allowSlidePrev={true}
          initialSlide={initialCard ? initialCard.id - 1 : model_id - 1}
          onSlideChange={onSlideChange}
          onSlideChangeTransitionEnd={() => {
            setSlideChange({ ...slideChange, active: false });
          }}
          // onSlideChangeTransitionStart={onTransitionStart}
        >
          {cardsData.map((card, index) => (
            <SwiperSlide
              id={`view-card-${card.id}`}
              className="overflow-hidden"
              key={`card ${index} ${card.id}`}
            >
              <div className="model-info z-50 flex absolute">
                <div className="info-wrapper relative">
                  <svg
                    className={"info-svg i-s"}
                    viewBox="0 0 286 278"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M91.0177 242.287C91.0177 242.287 105.618 276.086 138.318 276.686C171.018 277.286 235.918 277.987 235.918 277.987C235.918 277.987 284.118 273.686 284.718 229.387C285.318 185.087 285.618 51.9865 285.618 51.9865C285.618 51.9865 287.718 -5.11347 230.418 0.78653C173.118 6.68653 46.5177 20.3865 46.5177 20.3865C46.5177 20.3865 0.517725 28.0865 0.517725 71.5865C0.517725 71.5865 -0.0822744 84.6865 13.3177 107.987C26.6177 131.287 91.0177 242.287 91.0177 242.287Z"></path>
                  </svg>

                  <div
                    className={`flex flex-col absolute -right-20 ${
                      card.theme == "light" ? "text-white" : "text-black"
                    } top-28 -translate-x-1/2 -translate-y-1/2`}
                  >
                    <div className="text-2xl font-light">{card.firstName}</div>
                    <div className="text-2xl font-bold mb-4">
                      {card.lastName}
                    </div>
                    <div className="text-sm mb-4"> {card.title} </div>

                    <div className="more-buts flex">
                      <SoundButton
                        muted={soundMuted ?? defaultPlayAudio}
                        className="mr-4 slide-in"
                      >
                        <button className="like-but flex items-center justify-center bg-blue-500  w-12 h-12 rounded-full shadow-lg">
                          <img
                            className="w-6 h-6"
                            src="/images/like.svg"
                            alt="like"
                          />
                        </button>
                      </SoundButton>

                      <SoundButton
                        className="slide-in delay-400 "
                        muted={soundMuted ?? defaultPlayAudio}
                      >
                        <a
                          href={siteContent.cardView.moreLink}
                          target="_blank"
                          className="more-b flex rounded-full bg-white text-blue-300 px-6 py-3"
                        >
                          <div className="c-wrapper">
                            <span className="mr-3 text-md">
                              {siteContent.cardView.moreText}
                            </span>
                            <span className="text-xs">&#10095;</span>
                          </div>
                        </a>
                      </SoundButton>
                    </div>
                  </div>
                </div>
              </div>
              {swiper && swiper.realIndex == card.id - 1 ? (
                // ||
                // loadNextModel(card)
                <Suspense
                  fallback={
                    <Loader
                      backgroundColor={"#" + card.backgroundColor}
                      color={"#" + card.podiumColor}
                    />
                  }
                >
                  <SceneCanvas
                    cameraPosition={cameraPosition}
                    card={card}
                    slideChange={slideChange}
                  />
                </Suspense>
              ) : (
                <Loader
                  backgroundColor={"#" + card.backgroundColor}
                  color={"#" + card.podiumColor}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        <style jsx>{`
          .model-info {
            left: -7.5rem;
            bottom: -4rem;
            opacity: 0;
            transition: 0.3s cubic-bezier(0.2, 0.5, 0.07, 1);
          }

          .model-info.visible {
            left: -5rem;
            bottom: -4rem;
            opacity: 1;
          }

          .info-svg {
            height: 100%;
            width: 100%;
            fill: #f1f2f2;
            opacity: 0.2;

            transform: translate3d(0px, 0px, 0px) rotate(26deg) scale(1.4);

            transition: 0.3s;
          }

          .info-wrapper:hover .info-svg {
            opacity: 0.5;
            transform: translate3d(0px, 0px, 0px) rotate(26deg) scale(1.5);
          }

          .like-but {
            transition: transform 0.3s;
          }

          .like-but:hover {
            transform: scale(1.15) rotate(-26deg);
          }

          .more-b {
            overflow: hidden;
            transition: 0.3s;
          }

          .more-b:hover {
            transform: scale(1.15);
          }
          .more-b:hover .c-wrapper {
            animation: moveText 0.5s cubic-bezier(0.2, 0.5, 0.07, 1) both;
          }

          @keyframes moveText {
            0% {
              transform: translateY(0);
              opacity: 1;
            }

            35% {
              transform: translateY(-130%);
              opacity: 0;
            }
            35.00001% {
              transform: translateY(130%);
              opacity: 0;
            }

            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}</style>
      </section>
    </>
  );
}

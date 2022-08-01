import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SceneModel from "./SceneModels";
import SoundButton from "./SoundButton";
import SwiperArrow from "./SwiperArrow";
import { useRouter } from "next/router";
import Head from "next/head";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import Loader from "./Loader";

import cardsData from "/public/data/cards-data.json";

export default function CardScene({ soundMuted, initialCard }) {
  const [cameraPosition, setCameraPosition] = useState({ x: 7, y: 20, z: 3 });
  const [fieldOfView, setFieldOfView] = useState(35);
  const [defaultPlayAudio, setDefaultPlayAudio] = useState(null);

  const [swiper, setSwiper] = useState(null);
  const router = useRouter();

  const model_id = parseInt(router.query.model_id);

  useEffect(() => {
    setDefaultPlayAudio(localStorage.getItem("defaultPlayAudio") === "true");
  }, []);

  useEffect(() => {
    if (swiper) console.log("swiper set ", swiper);
  }, [swiper]);

  const slidePrev = () => {
    if (swiper) {
      try {
        swiper.slidePrev();
      } catch (err) {
        console.log("unable to slide prev");
      }
    }
  };
  const slideNext = () => {
    if (swiper) {
      try {
        swiper.slideNext();
      } catch (err) {
        console.log("cannot swipe next");
      }
    }
  };
  return (
    <>
      <Head></Head>
      <section className="model-swiper">
        <SoundButton muted={soundMuted ?? defaultPlayAudio}>
          <SwiperArrow
            canExtend={true}
            extendText="Previous"
            direction="prev"
            onArrowClick={slidePrev}
          />
        </SoundButton>
        <SoundButton muted={soundMuted ?? defaultPlayAudio}>
          <SwiperArrow
            onArrowClick={slideNext}
            canExtend={true}
            extendText="Next"
            direction="next"
          />
        </SoundButton>

        <Swiper
          spaceBetween={0}
          onSwiper={setSwiper}
          slidesPerView={1}
          loop={true}
          grabCursor={false}
          allowTouchMove={false}
          allowSlideNext={false}
          allowSlidePrev={false}
          initialSlide={initialCard ? initialCard.id - 1 : model_id - 1}
        >
          <div className="model-info z-50 flex fixed">
            <div className="info-wrapper relative">
              <svg
                className={"info-svg i-s"}
                viewBox="0 0 286 278"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M91.0177 242.287C91.0177 242.287 105.618 276.086 138.318 276.686C171.018 277.286 235.918 277.987 235.918 277.987C235.918 277.987 284.118 273.686 284.718 229.387C285.318 185.087 285.618 51.9865 285.618 51.9865C285.618 51.9865 287.718 -5.11347 230.418 0.78653C173.118 6.68653 46.5177 20.3865 46.5177 20.3865C46.5177 20.3865 0.517725 28.0865 0.517725 71.5865C0.517725 71.5865 -0.0822744 84.6865 13.3177 107.987C26.6177 131.287 91.0177 242.287 91.0177 242.287Z"></path>
              </svg>

              <div className="flex flex-col absolute -right-20 text-white top-28 -translate-x-1/2 -translate-y-1/2">
                <div className="text-2xl font-light">Samuel</div>
                <div className="text-2xl font-bold mb-4">Eto'o</div>
                <div className="text-sm mb-4">Fighting Spirit</div>

                <div className="more-buts flex">
                  <SoundButton
                    muted={soundMuted ?? defaultPlayAudio}
                    className="mr-4"
                  >
                    <button className="like-but flex items-center justify-center bg-blue-500  w-12 h-12 rounded-full shadow-lg">
                      <img
                        className="w-6 h-6"
                        src="/images/like.svg"
                        alt="like"
                      />
                    </button>
                  </SoundButton>

                  <SoundButton muted={soundMuted ?? defaultPlayAudio}>
                    <button className="more-b rounded-full bg-white text-blue-300 px-6 py-3">
                      <div className="c-wrapper">
                        <span className="mr-3 text-md">More</span>
                        <span className="text-xs">&#10095;</span>
                      </div>
                    </button>
                  </SoundButton>
                </div>
              </div>
            </div>
          </div>

          {cardsData.map((card, index) => (
            <SwiperSlide
              id={`view-card-${card.id}`}
              className="swiper-slide"
              key={`card ${index} ${card.id}`}
            >
              {swiper && swiper.realIndex == card.id - 1 ? (
                <Suspense fallback={<Loader />}>
                  <Canvas
                    camera={{
                      type: "PerspectiveCamera",
                      position: Object.values(cameraPosition),
                      fov: fieldOfView,
                      zoom: 1.8,
                      rotation: { y: Math.PI / 2 },
                    }}
                    shadows={true}
                    style={{
                      width: "100vw",
                      height: "100vh",
                      backgroundColor: `#${card.backgroundColor}`,
                    }}
                  >
                    <hemisphereLight
                      color={"white"}
                      groundColor={0x080820}
                      intensity={0.9}
                    />
                    <spotLight
                      intensity={0.9}
                      castShadow={true}
                      color={0xffffff}
                      // shadow={{
                      //   bias: -0.0001,
                      //   mapSize: [1024 * 4, 1024 * 4],

                      // }}
                      position={[
                        cameraPosition.x + 10,
                        cameraPosition.y + 10,
                        cameraPosition.z + 10,
                      ]}
                    />

                    <SceneModel
                      frontImage={card.image1}
                      backImage={card.image2}
                      podiumColor={parseInt(`0x${card.podiumColor}`)}
                    />

                    <OrbitControls
                      minPolarAngle={0}
                      maxPolarAngle={Math.PI / 2.5}
                    />
                  </Canvas>
                </Suspense>
              ) : (
                <Loader />
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        <style jsx>{`
          .model-info {
            left: -5rem;
            bottom: -4rem;
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
            }

            35% {
              transform: translateY(-130%);
            }
            35.00001% {
              transform: translateY(130%);
            }

            100% {
              transform: translateY(0);
            }
          }
        `}</style>
      </section>
    </>
  );
}

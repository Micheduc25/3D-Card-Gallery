import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SceneModel from "./SceneModels";
import SoundButton from "./SoundButton";
import SwiperArrow from "./SwiperArrow";
import Head from "next/head";
import Script from "next/script";
import { E, $, S, M } from "/public/scripts/index.b10eeb99.js";

export default function CardScene({}) {
  const [cameraPosition, setCameraPosition] = useState({ x: 7, y: 20, z: 3 });
  const [fieldOfView, setFieldOfView] = useState(35);

  const [swiper, setSwiper] = useState();

  useEffect(() => {
    setSwiper(
      new E(".model-slider .swiper", {
        modules: [$, S],
        effect: "panorama",
        slidesPerView: 1,
        loop: !0,
        loopedSlides: 1,
        centeredSlides: !0,
        grabCursor: false,
        spaceBetween: 0,
        autoHeight: false,
        speed: 1000,
        freeMode: true,
        pagination: false,
        resistance: false,
        // panoramaEffect: { depth: 150, rotate: 45 },
      })
    );
  }, []);

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
      <Head>
        <link rel="modulepreload" href="/scripts/vendor.9c14883d.js" />
      </Head>
      <section className="model-swiper swiper">
        <SoundButton>
          <SwiperArrow
            canExtend={true}
            extendText="Previous"
            direction="prev"
            onArrowClick={slidePrev}
          />
        </SoundButton>

        <SoundButton>
          <SwiperArrow
            onArrowClick={slideNext}
            canExtend={true}
            extendText="Next"
            direction="next"
          />
        </SoundButton>
        <Script
          id="car2"
          strategy="afterInteractive"
          onLoad={(e) => {}}
          src="/scripts/index.b10eeb99.js"
          type="module"
        />
        <div className="swiper-wrapper">
          <div className="swiper-slide">
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
                backgroundColor: "0xffffff",
              }}
            >
              <hemisphereLight
                color={"0xffffff"}
                groundColor={"0x080820"}
                intensity={0.8}
              />
              <spotLight
                intensity={0.8}
                castShadow={true}
                color={"0xffa95c"}
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
              <Suspense fallback={null}>
                <SceneModel />
              </Suspense>
              <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2.5} />
            </Canvas>
          </div>
        </div>
      </section>
    </>
  );
}

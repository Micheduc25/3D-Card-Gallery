import Head from "next/head";
import Script from "next/script";
import { useEffect, useState, useRef } from "react";
import { E, $, S, M } from "/public/scripts/index.b10eeb99.js";
export default function Carousel({
  children,
  onRef = () => {},
  onSwiper = () => {},
  onSwiperClick = () => {},
  onSliderMove = () => {},
}) {
  const [swiper, setSwiper] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    M();
    setSwiper(
      new E(".panorama-slider .swiper", {
        modules: [$, S],
        effect: "panorama",
        slidesPerView: 1.5,
        loop: !0,
        // loopedSlides: 10,
        centeredSlides: !0,
        grabCursor: false,
        spaceBetween: 20,
        autoHeight: false,
        speed: 1000,
        freeMode: true,
        // {
        //   enabled: true,
        //   momentum: true,
        //   momentumBounceRatio: 0.4,
        //   momentumVelocityRatio: 0.1,
        //   momentumRatio: 1,
        // },
        pagination: false,
        resistance: false,
        panoramaEffect: { depth: 150, rotate: 45 },
        breakpoints: {
          480: {
            slidesPerView: 2,
            spaceBetween: 20,
            panoramaEffect: { rotate: 35, depth: 150 },
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 25,
            panoramaEffect: { rotate: 30, depth: 150 },
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
            panoramaEffect: { rotate: 30, depth: 200 },
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 35,
            panoramaEffect: { rotate: 25, depth: 250 },
          },
        },
      })
    );
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      onRef(sliderRef);
    }
  }, [sliderRef]);
  useEffect(() => {
    if (swiper) {
      swiper.on(
        "click",
        (s, e) => {
          const dist = Math.abs(s.activeIndex - s.clickedIndex);
          swiper.slideTo(s.clickedIndex, dist * 400);

          swiper.on("transitionEnd", () => {
            setTimeout(() => {
              onSwiperClick(s, e);
              swiper.off("transitionEnd", () => {});
            }, 300);
          });
        },
        [swiper]
      );

      swiper.on("sliderMove", (s, e) => {
        onSliderMove(s, e);
      });

      onSwiper(swiper);
    }
  });
  return (
    <>
      <Head>
        <link rel="modulepreload" href="/scripts/vendor.9c14883d.js" />
      </Head>
      <div
        ref={sliderRef}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
        onMouseUp={(e) => {
          e.stopPropagation();
        }}
      >
        <Script
          id="car1"
          strategy="afterInteractive"
          onLoad={(e) => {}}
          src="/scripts/index.b10eeb99.js"
          type="module"
        />
        <div className="panorama-slider">
          <div className="swiper h-screen">
            {children}
            <div className="swiper-wrapper">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <div key={`slide${i}`} className={`swiper-slide s-slide${i}`}>
                  <img
                    className="slide-image"
                    src={`/images/carousel/${i}.jpg`}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        div[class^="s-slide"] {
          //   transform-origin: center;
          transition: transform ease-in-out 1s;
        }
        .swiper-slide.expand {
          z-index: 1000;
          transform: scale(10);
        }
      `}</style>
    </>
  );
}

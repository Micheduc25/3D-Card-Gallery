import NavButton from "./NavButton";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function AppHeader({
  className = "",
  onRef,
  onToggleSound,
  onSwitchPage,
}) {
  const appHeader = useRef(null);

  const [canPlay, setCanPlay] = useState(true);

  useEffect(() => {
    if (onRef) onRef(appHeader);

    const defaultPlayAudio = localStorage.getItem("defaultPlayAudio");
  }, [appHeader]);
  return (
    <>
      <header ref={appHeader} className={`mb-12 px-6 ${className}`}>
        <nav className="slide-in flex justify-between items-center">
          <Link href="/">
            <a className=" text-2xl font-light">
              {" "}
              <span
                style={{ animationDelay: "1.1s" }}
                className="slide-in inline-block mr-2"
              >
                Cards
              </span>
              <span
                style={{ animationDelay: "1.26s" }}
                className="slide-in font-bold inline-block"
              >
                {" "}
                Gallery
              </span>
            </a>
          </Link>

          <div className="flex ">
            <NavButton
              onButtonClick={() => {
                setCanPlay(!canPlay);
                onToggleSound();
              }}
              image="/images/headset.png"
              background="white"
              style={{ animationDelay: "1.5s" }}
              classNames={`slide-in ${!canPlay ? "disabled" : ""}`}
            />

            <div className="mr-4"></div>
            <NavButton
              rotateOnHover={true}
              hasImage={false}
              background="#3f95f8"
              style={{ animationDelay: "1.66s" }}
              classNames="slide-in"
              onButtonClick={onSwitchPage}
            >
              <div className="menu-icon">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </NavButton>
          </div>
        </nav>

        <style jsx>{`
          .menu-icon span {
            display: block;
            background-color: white;
            width: 18px;
            height: 2px;
            margin: 0 auto;
          }

          .menu-icon span:nth-child(2) {
            width: 25px;
          }

          .menu-icon span:not(:last-child) {
            margin-bottom: 3px;
          }
        `}</style>
      </header>
    </>
  );
}

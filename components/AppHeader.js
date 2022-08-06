import NavButton from "./NavButton";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import siteContent from "/public/data/site-content.json";
export default function AppHeader({
  className = "",
  onRef,
  onToggleSound,
  onSwitchPage,
  menuClasses = "",
  canPlayEnabled = false,

  navigateHome,
}) {
  const appHeader = useRef(null);

  useEffect(() => {
    if (onRef) onRef(appHeader);
  }, [appHeader]);

  return (
    <>
      <header ref={appHeader} className={`mb-12 px-6 md:px-12 ${className}`}>
        <nav className="slide-in flex justify-between items-center">
          <Link href="/">
            <a onClick={navigateHome} className=" text-2xl font-light">
              <span
                style={{ animationDelay: "1.1s" }}
                className="slide-in inline-block mr-2"
              >
                {siteContent.header.title1}
              </span>
              <span
                style={{ animationDelay: "1.26s" }}
                className="slide-in font-bold inline-block"
              >
                {" "}
                {siteContent.header.title2}
              </span>
            </a>
          </Link>

          <div className="flex">
            <NavButton
              onButtonClick={() => {
                onToggleSound();
              }}
              image="/images/headphone.svg"
              background="white"
              style={{ animationDelay: "1.5s" }}
              classNames={`slide-in ${canPlayEnabled ? "" : "disabled"}`}
              muted={!canPlayEnabled}
            />

            <div className="mr-4"></div>
            <NavButton
              rotateOnHover={true}
              hasImage={false}
              background="#3f95f8"
              style={{ animationDelay: "1.66s" }}
              classNames="slide-in m-butt"
              onButtonClick={onSwitchPage}
              muted={!canPlayEnabled}
            >
              <div className={`menu-icon ${menuClasses}`}>
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
            transition: 0.3s ease-in-out;
            transform-origin: center center;
          }

          .menu-icon span:nth-child(2) {
            width: 25px;
          }

          .menu-icon span:not(:last-child) {
            margin-bottom: 3px;
          }
          .menu-icon.closable span:nth-child(2) {
            width: 0;
          }
          .menu-icon.closable span:nth-child(1) {
            margin-bottom: 0px;
            transform: translateY(3px) rotate(-45deg);
          }
          .menu-icon.closable span:nth-child(3) {
            transform: translateY(-3px) rotate(45deg);
          }
        `}</style>
      </header>
    </>
  );
}

import Link from "next/link";
import SoundButton from "./SoundButton";
export default function AppFooter({ className = "", soundMuted = false }) {
  return (
    <>
      <div className="footer-left slide-in delay-500 flex items-center absolute left-4 md:left-12 bottom-8 z-50">
        <span className="mr-4">@Gallery</span>
        <Link href="/">
          <a className="mr-4">Legals</a>
        </Link>
        <Link href="/">
          <a className="mr-4">Cookies</a>
        </Link>
      </div>

      <div className="footer-right slide-in delay-1000 flex items-center absolute right-4 md:right-12 bottom-8 z-50">
        <Link href="/">
          <a className="mr-6 font-semibold">gallery.com</a>
        </Link>

        <SoundButton className="hidden md:block" muted={soundMuted}>
          <Link href="/">
            <a className="social mr-4 flex items-center justify-center w-9 h-9 rounded-full bg-white shadow">
              <img className="w-2" src="/images/facebook-blue.svg" />
            </a>
          </Link>
        </SoundButton>

        <SoundButton className="hidden md:block" muted={soundMuted}>
          <Link href="/">
            <a className="social mr-4 flex items-center justify-center w-9 h-9 rounded-full bg-white shadow">
              <img className="w-3" src="/images/twitter-blue.svg" />
            </a>
          </Link>
        </SoundButton>
      </div>

      <style jsx>{`
        a,
        span {
          color: #4f4f4d;
          cursor: pointer;
          font-size: 0.85rem;
        }
        a:not(.social) {
          position: relative;
        }

        a:not(.social)::before {
          content: "";
          display: flex;
          position: absolute;
          left: 0;
          bottom: 0px;
          height: 1px;
          width: 0px;
          background-color: #000000;
          transition: 0.3s;
        }

        a:not(.social):hover::before {
          width: 100%;
        }

        .social {
          overflow: hidden;
          transition: 0.3s;
        }
        .social:hover {
          transform: scale(1.15);
        }

        .social:hover img {
          animation: moveText 0.5s cubic-bezier(0.2, 0.5, 0.07, 1) both;
        }

        @keyframes moveText {
          0% {
            transform: translateY(0);
            opacity: 1;
          }

          35% {
            transform: translateY(-150%);
            opacity: 0;
          }
          35.00001% {
            transform: translateY(150%);
            opacity: 0;
          }

          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}

export default function SwiperArrow({
  direction = "prev",
  canExtend = false,
  extendText = "Previous",
  onArrowClick,
}) {
  return (
    <>
      <div
        onClick={onArrowClick}
        className={`swiper-arrow shadow-lg ${
          direction == "prev" ? "left" : "right"
        } ${canExtend ? "extended" : ""}`}
      >
        {canExtend && direction == "next" ? (
          <span className="button-text text-sm text-blue-400">
            {extendText}
          </span>
        ) : (
          ""
        )}
        <div className={`arrow-border`}></div>

        {canExtend && direction == "prev" ? (
          <span className="button-text text-sm text-blue-400">
            {extendText}
          </span>
        ) : (
          ""
        )}

        <style jsx>
          {`
            .swiper-arrow {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              z-index: 10;
              cursor: pointer;

              width: 50px;
              height: 50px;
              border-radius: 50px;

              background: white;
              display: flex;
              align-items: center;
              transition: all 0.3s;
              overflow: hidden;
            }
            

            .swiper-arrow:not(.extended):hover{
              transform: translateY(-50%) scale(1.1);

            }
            .swiper-arrow.left:hover:not(.extended) .arrow-border {
                animation: moveArrowLeft .3s
            }
            .swiper-arrow.right:not(.extended) .arrow-border {
                animation: moveArrowRight .3s;
                margin-left:20px;
            }

            .swiper-arrow.extended {
              opacity: 0.4;
            }

            .swiper-arrow.right.extended {
              justify-content: end;
            }

            .swiper-arrow.extended:hover {
              opacity: 1;
              width: 115px;
            }
            .swiper-arrow.right.extended:hover {
              width: 95px;
            }

            .swiper-arrow.extended .button-text {
              opacity: 0;
              visibility: hidden;
              width: 0;
              transition-property: opacity;
              transition-duration: 0.3s;
              transition-delay: 0.2s;
            }

            .swiper-arrow.right.extended .button-text {
            }

            .swiper-arrow.extended:hover .button-text {
              visibility: visible;
              opacity: 1;
            }

            .swiper-arrow.left {
              left: 50px;
            }

            .swiper-arrow.right {
              right: 50px;
            }

            .swiper-arrow.left .arrow-border {
              margin-left: 22px;
            }

            .swiper-arrow.right .arrow-border {
              margin-right: 21px;
            }

            .arrow-border {
              width: 10px;
              height: 10px;

              border-top: 2px solid #3f95f8;
              border-right: 2px solid #3f95f8;
              border-left: 2px solid transparent;
              border-bottom: 2px solid transparent;
              transition: 0.3s;
            }

            .swiper-arrow.right .arrow-border {
              transform: rotate(45deg);
            }

            .swiper-arrow.left .arrow-border {
              transform: rotate(-135deg);
            }

            .swiper-arrow.left.extended:hover .arrow-border {
              margin-right: 10px;
            }
            .swiper-arrow.right.extended:hover .arrow-border {
              margin-left: 35px;
            }

            @keyframes moveArrowLeft {
              0%,100% {
                opacity:1
                transform: translateY(0) rotate(-135deg);
              }
              
              44%{
                opacity:1;
                transform: translateY(-65px) rotate(-135deg);

              }
              45%{
                opacity:0;
                transform: translateY(-70px) rotate(-135deg);
              }

              47%{
                opacity:1;
                transform: translateY(70px) rotate(-135deg);

              }
            }

            @keyframes moveArrowRight {
                0%,100% {
                  opacity:1
                  transform: translateY(0) rotate(45deg);
                }
                
                44%{
                  opacity:1;
                  transform: translateY(-65px) rotate(45deg);
  
                }
                45%{
                  opacity:0;
                  transform: translateY(-70px) rotate(45deg);
                }
  
                47%{
                  opacity:1;
                  transform: translateY(70px) rotate(45deg);
  
                }
              }
          `}
        </style>
      </div>
    </>
  );
}

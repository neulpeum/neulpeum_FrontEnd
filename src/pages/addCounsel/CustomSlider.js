import React, { useState, useRef } from "react";
import "styles/ForPages/AddCounseling/Slider.css";

const CustomSlider = ({ selectDrugs, isOpening, drugImageData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dragStartX, setDragStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  const filteredDrugs = selectDrugs.filter(
    (drug) => drug.totalUsableAmount > 0
  );

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dragMoveX = e.clientX;

    if (dragMoveX < dragStartX) {
      // 오른쪽으로 드래그
      setCurrentSlide((prev) => (prev + 1) % filteredDrugs.length);
    } else if (dragMoveX > dragStartX) {
      // 왼쪽으로 드래그
      setCurrentSlide(
        (prev) => (prev - 1 + filteredDrugs.length) % filteredDrugs.length
      );
    }

    setIsDragging(false); // 슬라이드를 한 번 이동시키면 드래그 종료
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div
      className="slider-container"
      ref={sliderRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // 마우스가 슬라이더 밖으로 나갈 때 드래그 종료
    >
      {isOpening && filteredDrugs.length > 0 && (
        <div
          className="slider"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {filteredDrugs.map((drug) => (
            <div key={drug.id} className="slide">
              <img
                src={
                  drugImageData[drug.drugName]
                    ? `/drugImage/${drugImageData[drug.drugName]}.jpg`
                    : ""
                }
                alt={
                  drugImageData[drug.drugName]
                    ? `${drug.drugName}`
                    : ` ${drug.drugName} 이미지가 없습니다.`
                }
              />
              {/* <img
                src={`/drugImage/${drugImageData[drug.drugName]}.jpg`}
                alt={`${drug.drugName}는 이미지가 없습니다.`}
              /> */}
            </div>
          ))}
        </div>
      )}
      <div className="dots">
        {filteredDrugs.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentSlide === index ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomSlider;

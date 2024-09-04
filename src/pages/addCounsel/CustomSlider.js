import React, { useState, useRef } from "react";
import "styles/ForPages/AddCounseling/Slider.css";

const CustomSlider = ({ selectDrugs, isOpening, drugImageData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragMoveX, setDragMoveX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  const filteredDrugs = selectDrugs.filter(
    (drug) => drug.totalUsableAmount > 0
  );

  // 드래그 시작 시 좌표 저장
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
  };

  // 드래그 중 움직임 계산
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setDragMoveX(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setDragMoveX(e.touches[0].clientX);
  };

  // 드래그 종료 시 슬라이드 이동 판단
  const handleMouseUp = () => {
    handleSlideChange();
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    handleSlideChange();
    setIsDragging(false);
  };

  // 드래그 거리 판단 및 슬라이드 변경
  const handleSlideChange = () => {
    const dragDistance = dragMoveX - dragStartX;
    const minDragDistance = 50; // 슬라이드 변경 최소 드래그 거리

    if (dragDistance > minDragDistance) {
      // 왼쪽으로 드래그
      setCurrentSlide(
        (prev) => (prev - 1 + filteredDrugs.length) % filteredDrugs.length
      );
    } else if (dragDistance < -minDragDistance) {
      // 오른쪽으로 드래그
      setCurrentSlide((prev) => (prev + 1) % filteredDrugs.length);
    }

    // 드래그 상태 초기화
    setDragMoveX(0);
    setDragStartX(0);
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
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
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
                draggable="false" // 이미지 드래그 방지
              />
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

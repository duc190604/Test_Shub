import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const images = [
    "/images/carousel1.png",
    "/images/carousel2.png",
    "/images/carousel3.png",
    "/images/carousel4.png",
    "/images/carousel5.png",
    "/images/carousel6.png",
  ];

  // Nút custom cho slider
  const CustomPrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        left: "-8px",
        background: "white",
        borderRadius: "100%",
        padding: "15px",
        boxShadow: "-4px 10px 10px rgba(0, 0, 0, 0.2)",
        zIndex: 100,
        top: "50%",
      }}
    >
      <FaArrowLeft />
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        right: "-12px",
        background: "white",
        borderRadius: "100%",
        padding: "15px",
        boxShadow: "4px 10px 10px rgba(0, 0, 0, 0.2)",
        zIndex: 100,
        top: "50%",
      }}
    >
      <FaArrowRight />
    </button>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    focusOnSelect: false,
    draggable: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div style={{ marginTop: 50 }}>
      <div
        style={{
          width: "50%",
          margin: "auto",
        }}
      >
        <p
          style={{
            fontSize: 32,
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          Hoạt động tiêu biểu từ cộng đồng giáo dục
        </p>
        <p
          style={{
            fontSize: 20,
            fontWeight: 400,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Hình ảnh được chính những giáo viên từ khắp 3 miền ghi lại trong quá
          trình giảng dạy, dạy học ứng dụng công nghệ SHub Classroom.
        </p>
      </div>
      <div
        style={{
          width: "80%",
          margin: "auto",
          position: "relative",
          marginTop: 50,
        }}
      >
        <Slider {...settings}>
          {images.map((image, index) => (
            <div
              key={index}
              style={{ borderRadius: 15, tabIndex: -1, userSelect: "none" }}
            >
              <img
                src={image}
                alt={`Slide ${index}`}
                style={{
                  width: "100%",
                  height: 396,
                  objectFit: "cover",
                  paddingRight: 16,
                  paddingLeft: 16,
                  borderRadius: 28,
                  marginTop: index % 2 === 0 ? 30 : 0,
                }}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default App;

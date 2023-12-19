import React, { useEffect, useState } from "react";
import "./Carousel.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className}`}
      style={{ display: "none" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className}`}
      style={{ display: "none" }}
      onClick={onClick}
    />
  );
}

function Carousel(props) {
  let { slider, slider1, slider2 } = props;
  const [nav, setNav] = useState({ nav1: null, nav2: null });

  useEffect(() => {
    setNav({
      nav1: slider1,
      nav2: slider2,
    });
  }, []);

  const settings = {
    loop: true,
    dots: false,
    infinite: true,
    // autoplay: true,
    // autoplaySpeed: 2500,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const next = () => {
    slider1.slickNext();
  };
  const previous = () => {
    slider2.slickPrev();
  };

  return (
    <section id="carousel">
      <div className="carousel">
        <div className="carousel-left">
          <div className="carousel-left-slide">
            <Slider
              asNavFor={nav.nav2}
              ref={(slider) => (slider1 = slider)}
              {...settings}
            >
              <div key={1}>
                <img src="https://res.cloudinary.com/doylwhphq/image/upload/v1689501127/phon5_jfrcrk.jpg"></img>
              </div>
              <div key={2}>
                <img src="https://res.cloudinary.com/doylwhphq/image/upload/v1689501127/phon5_jfrcrk.jpg"></img>
              </div>
              <div key={3}>
                <img src="https://res.cloudinary.com/doylwhphq/image/upload/v1689501127/phon5_jfrcrk.jpg"></img>
              </div>
              <div key={4}>
                <img src="https://res.cloudinary.com/doylwhphq/image/upload/v1689501127/phon5_jfrcrk.jpg"></img>
              </div>
              <div key={5}>
                <img src="https://res.cloudinary.com/doylwhphq/image/upload/v1689501127/phon5_jfrcrk.jpg"></img>
              </div>
            </Slider>
            <div className="carousel-left-move" onClick={() => previous()}>
              <div className="prev">
                <LeftOutlined></LeftOutlined>
              </div>
              <div className="next" onClick={() => next()}>
                <RightOutlined></RightOutlined>
              </div>
            </div>
          </div>
          <div className="carousel-left-bottom">
            <Slider
              asNavFor={nav.nav1}
              ref={(slider) => (slider2 = slider)}
              slidesToShow={4}
              swipeToSlide={true}
              focusOnSelect={true}
            >
              <div>
                BỘ SƯU TẬP <br></br> Siêu hot
              </div>
              <div>
                PHỤ KIỆN CHẤT LỪ <br></br> Giá siêu hấp dẫn
              </div>
              <div>
                ĐỒNG THOẠI BÁN CHẠY <br></br> Được săn đón
              </div>
              <div>
                ƯU ĐÃI THÁNG SINH NHẬT <br></br> Mua đi chờ chi
              </div>
              <div>
                ƯU ĐÃI CHO BẠN <br></br> Sale hết mình
              </div>
            </Slider>
          </div>
        </div>
        {/* <div className="carousel-right">
          <div className="carousel-right-item">
            <img src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/RB_S21.png"></img>
          </div>
          <div className="carousel-right-item">
            <img src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/iPhone_12_690x300_copyssspng.png"></img>
          </div>
          <div className="carousel-right-item">
            <img src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/11lite-690-300-max.png"></img>
          </div>
        </div> */}
      </div>
    </section>
  );
}

export default Carousel;

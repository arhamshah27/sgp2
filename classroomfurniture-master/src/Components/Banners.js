import React from 'react'
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import slide1 from '../Components/Assets/BannerImages/1.png'
import slide2 from '../Components/Assets/BannerImages/2.png'
import slide3 from '../Components/Assets/BannerImages/3.png'
import slide4 from '../Components/Assets/BannerImages/4.png'

const Banners = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slide2}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slide3}
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slide4}
          alt="Forth slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Banners
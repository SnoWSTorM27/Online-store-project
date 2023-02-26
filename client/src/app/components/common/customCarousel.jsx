import React from "react";
import PropTypes from "prop-types";
import Loader from "./loader";
import Carousel from "react-bootstrap/Carousel";

function CustomCarousel({ items }) {
  if (items) {
  
    return (
      // <>
      //   {Object.values(items).map((item) => (
      //     <img key={item._id} src={item.imageSrc} className="img-fluid mb-5" alt={item.alt} ></ img>
      //   ))}
      // </>
      <Carousel>
        {Object.values(items).map((item) => (
          <Carousel.Item interval={1000} key={item._id}>
            <img
              className="d-block w-100"
              src={item.imageSrc}
              alt={item.alt}
            />
          </Carousel.Item>))}
      </Carousel>
    )
    
  } else { 
    return <Loader />;
  }
}
CustomCarousel.propTypes = {
  items: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object])
};

export default CustomCarousel;
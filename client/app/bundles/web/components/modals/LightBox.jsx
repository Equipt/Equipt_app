import React from 'react';
import Slider from 'react-slick';

const LightBox = ({
  images = []
}) => {

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  return (
    <div>
      <Slider { ...sliderSettings }>
      {
        images.map((image, index) => {
          if (image) {
            return (
              <img key={ `image_${ index }` } src={ image.file.url }/>
            )
          }
        })
      }
      </Slider>
    </div>
  );

}

export default LightBox;

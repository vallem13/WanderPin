import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import "./Splash.css";

function SplashPage() {
  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser) return <Redirect to="/home" />;

  return (
    <div className="splash-wrapper">
      <div className="splash-text-wrapper">
        <h1 className="splash-greeting-text1">Find your next</h1>
        <h1 className="splash-greeting-text2">travel adventure</h1>
      </div>
      <div className="splash-images">
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 1026: 7 }}
        >
          <Masonry gutter="10px">
          <img
                src='https://i.pinimg.com/564x/56/7c/bb/567cbb7a7eedce29e30026e0b73015d4.jpg'
                alt='Photo 1'
                className="splash-image"
                style={{ height: '300px'}}
              />
            <img
                src='https://i.pinimg.com/564x/bb/ba/73/bbba73b89119fe81e5b645e8d44a1406.jpg'
                alt='Photo 2'
                className="splash-image"
                style={{ height: '250px'}}
              />
              <img
                src='https://i.pinimg.com/564x/ba/7f/de/ba7fde9c8751c2c1af027dca0dba73f7.jpg'
                alt='Photo 3'
                className="splash-image"
                style={{ height: '200px'}}
              />
              <img
                src='https://i.pinimg.com/564x/81/01/ca/8101ca60815b6653d18a8d725a76b662.jpg'
                alt='Photo 4'
                className="splash-image"
                style={{ height: '150px'}}
              />
              <img
                src='https://i.pinimg.com/564x/69/d6/38/69d638185ec4a132b27f03d7a62b9243.jpg'
                alt='Photo 5'
                className="splash-image"
                style={{ height: '200px'}}
              />
              <img
                src='https://i.pinimg.com/564x/e9/23/65/e92365e738c7ff108b04cb3d84c11ee6.jpg'
                alt='Photo 6'
                className="splash-image"
                style={{ height: '250px'}}
              />
              <img
                src='https://i.pinimg.com/564x/b0/2e/c7/b02ec7834644257e7b8cca4d6791c771.jpg'
                alt='Photo 6'
                className="splash-image"
                style={{ height: '300px'}}
              />

               <img
                src='https://i.pinimg.com/564x/56/7c/bb/567cbb7a7eedce29e30026e0b73015d4.jpg'
                alt='Photo 1'
                className="splash-image-faded"
                style={{ height: '300px'}}
              />
            <img
                src='https://i.pinimg.com/564x/bb/ba/73/bbba73b89119fe81e5b645e8d44a1406.jpg'
                alt='Photo 2'
                className="splash-image-faded"
                style={{ height: '250px'}}
              />
              <img
                src='https://i.pinimg.com/564x/ba/7f/de/ba7fde9c8751c2c1af027dca0dba73f7.jpg'
                alt='Photo 3'
                className="splash-image-faded"
                style={{ height: '200px'}}
              />
              <img
                src='https://i.pinimg.com/564x/81/01/ca/8101ca60815b6653d18a8d725a76b662.jpg'
                alt='Photo 4'
                className="splash-image-faded"
                style={{ height: '150px'}}
              />
              <img
                src='https://i.pinimg.com/564x/69/d6/38/69d638185ec4a132b27f03d7a62b9243.jpg'
                alt='Photo 5'
                className="splash-image-faded"
                style={{ height: '200px'}}
              />
              <img
                src='https://i.pinimg.com/564x/e9/23/65/e92365e738c7ff108b04cb3d84c11ee6.jpg'
                alt='Photo 6'
                className="splash-image-faded"
                style={{ height: '250px'}}
              />
              <img
                src='https://i.pinimg.com/564x/b0/2e/c7/b02ec7834644257e7b8cca4d6791c771.jpg'
                alt='Photo 6'
                className="splash-image-faded"
                style={{ height: '300px'}}
              />
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
}

export default SplashPage;

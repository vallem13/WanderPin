import React, { useEffect } from "react";
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
          columnsCountBreakPoints={{ 350: 7, 750: 7, 1026: 7 }}
        >
          <Masonry gutter="10px">
            <img
              src='https://i.pinimg.com/564x/56/7c/bb/567cbb7a7eedce29e30026e0b73015d4.jpg'
              alt='Photo 1'
              className="splash-image"
              style={{ height: '300px' }}
            />
            <img
              src='https://i.pinimg.com/564x/bb/ba/73/bbba73b89119fe81e5b645e8d44a1406.jpg'
              alt='Photo 2'
              className="splash-image"
              style={{ height: '250px' }}
            />
            <img
              src='https://i.pinimg.com/564x/ba/7f/de/ba7fde9c8751c2c1af027dca0dba73f7.jpg'
              alt='Photo 3'
              className="splash-image"
              style={{ height: '200px' }}
            />
            <img
              src='https://i.pinimg.com/564x/81/01/ca/8101ca60815b6653d18a8d725a76b662.jpg'
              alt='Photo 4'
              className="splash-image"
              style={{ height: '150px' }}
            />
            <img
              src='https://i.pinimg.com/564x/69/d6/38/69d638185ec4a132b27f03d7a62b9243.jpg'
              alt='Photo 5'
              className="splash-image"
              style={{ height: '200px' }}
            />
            <img
              src='https://i.pinimg.com/564x/e9/23/65/e92365e738c7ff108b04cb3d84c11ee6.jpg'
              alt='Photo 6'
              className="splash-image"
              style={{ height: '250px' }}
            />
            <img
              src='https://i.pinimg.com/564x/b0/2e/c7/b02ec7834644257e7b8cca4d6791c771.jpg'
              alt='Photo 6'
              className="splash-image"
              style={{ height: '300px' }}
            />

            <img
              src='https://i.pinimg.com/564x/56/7c/bb/567cbb7a7eedce29e30026e0b73015d4.jpg'
              alt='Photo 1'
              className="splash-image-faded"
              style={{ height: '300px' }}
            />
            <img
              src='https://i.pinimg.com/564x/bb/ba/73/bbba73b89119fe81e5b645e8d44a1406.jpg'
              alt='Photo 2'
              className="splash-image-faded"
              style={{ height: '250px' }}
            />
            <img
              src='https://i.pinimg.com/564x/ba/7f/de/ba7fde9c8751c2c1af027dca0dba73f7.jpg'
              alt='Photo 3'
              className="splash-image-faded"
              style={{ height: '200px' }}
            />
            <img
              src='https://i.pinimg.com/564x/81/01/ca/8101ca60815b6653d18a8d725a76b662.jpg'
              alt='Photo 4'
              className="splash-image-faded"
              style={{ height: '150px' }}
            />
            <img
              src='https://i.pinimg.com/564x/69/d6/38/69d638185ec4a132b27f03d7a62b9243.jpg'
              alt='Photo 5'
              className="splash-image-faded"
              style={{ height: '200px' }}
            />
            <img
              src='https://i.pinimg.com/564x/e9/23/65/e92365e738c7ff108b04cb3d84c11ee6.jpg'
              alt='Photo 6'
              className="splash-image-faded"
              style={{ height: '250px' }}
            />
            <img
              src='https://i.pinimg.com/564x/b0/2e/c7/b02ec7834644257e7b8cca4d6791c771.jpg'
              alt='Photo 6'
              className="splash-image-faded"
              style={{ height: '300px' }}
            />
          </Masonry>
        </ResponsiveMasonry>
      </div>
      <div className="aboutMe">
        <div className="createdBy">
        <h2>Created By:</h2>
        <h1>Alexandra Valle</h1>
        </div>
        <div className='socials-icons'>
          <div className="linkedin">
          <a href="https://www.linkedin.com/in/alexandra-valle-m" target="_blank" ><i class="fa-brands fa-linkedin" style={{ color: "#282634", fontSize: "200px"}}></i></a>
            <div className="linkedin-img">
            <img
              src='https://i.pinimg.com/564x/b9/e6/59/b9e65985a9134347024c2be7a7e911f0.jpg'
              alt='Photo 6'
              className="img1"
              style={{ height: '100px', width: '100px' }}
            />
            <img
              src='https://i.pinimg.com/564x/8c/f7/c7/8cf7c7c125a0f8c8ac9c3df2819aed99.jpg'
              alt='Photo 6'
              className="img2"
              style={{ height: '100px', width: '100px' }}
            />
            </div>
          </div>
          <div className="github">
            <img
              src='https://i.pinimg.com/564x/27/07/39/27073939f1547ff2e06e6e9805b95d7f.jpg'
              alt='Photo 6'
              className=""
              style={{ height: '150px', width: '100px' }}
            />
            <a href="https://github.com/vallem13" target="_blank"><i class="fab fa-github" style={{ color: "#282634", fontSize: "100px"}}></i></a>
            <img
              src='https://i.pinimg.com/564x/57/e4/03/57e40361d7486e564ae934006094c498.jpg'
              alt='Photo 6'
              className=""
              style={{ height: '150px', width: '100px' }}
            />
          </div>
          <div className="portfolio">
            <img
              src='https://i.pinimg.com/564x/41/b2/93/41b2930881c2d312db81f97ddca8d356.jpg'
              alt='Photo 6'
              className=""
              style={{ height: '170px', width: '150px' }}
            />
            <a href="https://vallem13.github.io/" target="_blank"><i class="fa-solid fa-book" FontAwesomeIcon style={{ color: "#282634", fontSize: "200px"}}></i></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SplashPage;

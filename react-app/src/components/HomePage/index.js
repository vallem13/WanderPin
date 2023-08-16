import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { getAllPinsThunk } from "../../store/pin";
import PinCard from "./PinCard";
import './HomePage.css';


const HomePage = () => {

    const dispatch = useDispatch();
    const pinsObj = useSelector(state => state.pins.allPins)
    const pins = pinsObj ? Object.values(pinsObj) : [];

    useEffect(() => {
        dispatch(getAllPinsThunk());
    }, [dispatch]);

    if (!pins.length) return null

    return (
        <div className="image-grid">
            <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 1026: 5}}
            >
                <Masonry>
            {pins.map((pin) => (
                <div className="">
                <PinCard key={pin.id} pin={pin}/>
                </div>
                ))}
                </Masonry>
               </ResponsiveMasonry>
        </div>
    )
}

export default HomePage;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllPinsThunk } from "../../store/pin";
import PinCard from "./PinCard";
import './HomePage.css';


const HomePage = () => {

    const dispatch = useDispatch();
    const pinsObj = useSelector(state => state.pins.allPins)
    const pins = pinsObj ? Object.values(pinsObj) : [];

    // console.log('---------->', pinsObj)

    useEffect(() => {
        dispatch(getAllPinsThunk());
    }, [dispatch]);

    if (!pins.length) return null

    return (
        <div>
            {pins.map((pin) => (
                <PinCard key={pin.id} pin={pin}/>
            ))}
        </div>
    )
}

export default HomePage;

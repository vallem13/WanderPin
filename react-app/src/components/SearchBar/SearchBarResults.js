import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getAllPinsThunk } from "../../store/pin";
import PinCard from "../HomePage/PinCard";
import './SearchBar.css';

function SearchBarResults() {

    const dispatch = useDispatch()
    const location = useLocation()
    const pinsObj = useSelector(state => state.pins.allPins)
    const pinsArr = Object.values(pinsObj)
    const [searchPins, setSearchPins] = useState('');
    const searchQuery = new URLSearchParams(location.search).get('query')

    useEffect(() => {
        dispatch(getAllPinsThunk());
    }, [dispatch]);

    useEffect(() => {
        if (searchQuery) {
            const filtered = pinsArr.filter((pin) =>
                pin.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchPins(filtered);
        } else {
            setSearchPins([]);
        }
    }, [searchQuery, pinsArr]);

    if (!searchQuery || !searchPins.length) {
        return <h2>Sorry! We couldn't find any pins.</h2>
    }

    return (
        <div className="pins-container">
            {!searchPins.length ? (<h2>Sorry! We couldn't find any pins.</h2>) : (<ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 2, 750: 3, 1026: 5 }}
            >
                <Masonry>
                    {searchPins.map(pin => (
                        <div key={pin.id} className="">
                            <PinCard pin={pin} />
                        </div>
                    ))}
                </Masonry>
            </ResponsiveMasonry>)

            }

        </div>
    );
}

export default SearchBarResults;

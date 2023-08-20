import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { getAllPinsThunk } from "../../store/pin";
import PinCard from "../HomePage/PinCard";
import './SearchBar.css';

function SearchBar() {

    const dispatch = useDispatch();
    const pins = useSelector(state => state.pins.allPins)
    const [searchPins, setSearchPins] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        dispatch(getAllPinsThunk());
    }, [dispatch]);

    const handleSearchInputChange = (event) => {
        const pin = event.target.value;
        setSearchPins(pin);

        const filteredResults = pin.filter(pin =>
            pin.name.toLowerCase().includes(pin.toLowerCase())
        );
        setSearchResults(filteredResults);
    };

    return (
        <div>
            <button>test</button>
            <input
                type="text"
                placeholder="Search..."
                value={searchPins}
                onChange={handleSearchInputChange}
            />
            <ul>
        {searchResults.map((pin, index) => (
          <li key={index}>{pin.name}</li>
        ))}
      </ul>
        </div>
    );
}

export default SearchBar;

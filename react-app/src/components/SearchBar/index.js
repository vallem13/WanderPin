import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { getAllPinsThunk } from "../../store/pin";
import './SearchBar.css';

function SearchBar() {

    const dispatch = useDispatch();
    const history = useHistory()
    const pinsObj = useSelector(state => state.pins.allPins)
    const pinsArr = Object.values(pinsObj)
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(getAllPinsThunk());
    }, [dispatch]);

    const handleSearchInputChange = (e) => {
        const search = e.target.value;
        setSearchQuery(search);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            if (searchQuery.trim() !== '') {
                history.push(`/search?query=${encodeURIComponent(searchQuery)}`)
            }
        }
    }

    return (
        <div className="searchBar-container">
        <div className="search-container">
            <i className="fa-solid fa-magnifying-glass" style={{color: "#ff4057",}}></i>
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                onKeyPress={handleKeyPress}
                className="search-input"
            />
        </div>
        </div>
    );
}

export default SearchBar;

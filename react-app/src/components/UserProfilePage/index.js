import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllBoardsThunk } from "../../store/board";
import { getAllPinsThunk } from "../../store/pin";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import BoardCard from "./BoardCard";
import PinCard from "../HomePage/PinCard";
import './UserProfile.css';

const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const pinsObj = useSelector(state => state.pins.allPins)
    const pins = pinsObj ? Object.values(pinsObj) : [];
    const user_pins = pins.filter(pin => pin.user_id === user.id)
    const boardsObj = useSelector(state => state.boards.allBoards)
    const boards = boardsObj ? Object.values(boardsObj) : [];
    const user_boards = boards.filter(boards => boards.user_id === user.id)

    const [displayType, setDisplayType] = useState("pin");

    useEffect(() => {
        dispatch(getAllBoardsThunk());
        dispatch(getAllPinsThunk());
    }, [dispatch]);

    const handleDisplayTypeChange = (type) => {
        setDisplayType(type);
    }

    return (
        <div>
            <div className="profile-container">
                <img className='profile-user-image' src={user.profile_img} alt={user.first_name} />
                <h2>{user.first_name} {user.last_name}</h2>
                <div className="profile-buttons">
                    <button
                        className="profile-button"
                        onClick={() => handleDisplayTypeChange("pin")}
                    >
                        My Pins
                    </button>
                    <button
                        className="profile-button"
                        onClick={() => handleDisplayTypeChange("board")}
                    >
                        My Boards
                    </button>
                </div>
            </div>
            {user_pins.length > 0 ? (
                    <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 2, 750: 3, 1026: 5 }}
                >
                    <Masonry>
                        {displayType === "pin" && (
                            user_pins.map((pin) => (
                                <div className="grid-item" key={pin.id}>
                                    <PinCard pin={pin} />
                                </div>
                            ))
                        )}
                    </Masonry>
                </ResponsiveMasonry>
                ) : (
                    <div>
                    {displayType === "pin" && (
                        <h2>You have not created any Pins yet!</h2>
                    )}
                    </div>
                )}
                {user_boards.length > 0 ? (
                    <div className="grid-container">
                    {displayType === "board" && (
                        user_boards.map((board) => (
                            <div className="grid-item" key={board.id}>
                                <BoardCard board={board} />
                            </div>
                        ))
                    )}
                    </div>
                ) : (
                    <div>
                    {displayType === "board" && (
                        <h2>You have not created any Boards yet!</h2>
                    )}
                    </div>
                )}

        </div>
    )
}

export default UserProfile;

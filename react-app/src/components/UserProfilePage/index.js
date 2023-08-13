import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllBoardsThunk } from "../../store/board";
import { getAllPinsThunk } from "../../store/pin";
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

    console.log('------->', pinsObj)

    useEffect(() => {
        dispatch(getAllBoardsThunk());
        dispatch(getAllPinsThunk());
    }, [dispatch]);

    return (
        <div>
            <div>
                {user_pins.map((pin) => (
                    <PinCard key={pin.id} pin={pin}/>
                ))}
            </div>
            <div>
                {user_boards.map((board) => (
                    <BoardCard key={board.id} board={board}/>
                ))}
            </div>
        </div>
    )
}

export default UserProfile;

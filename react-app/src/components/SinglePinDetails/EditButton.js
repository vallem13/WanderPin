import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePinThunk } from "../../store/pin";
import OpenModalButton from "../OpenModalButton";
import EditSinglePin from "../Pins/EditSinglePin";
import DeleteSinglePin from "../Pins/DeleteSinglePin";

function EditButton() {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const pin = useSelector(state => state.pins.singlePin)
    const ulRef = useRef();

    useEffect(() => {
        dispatch(getSinglePinThunk());
    }, [dispatch]);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const ulClassName = "edit-delete-dropdown" + (showMenu ? "" : " hidden");

    return (
        <div >
            <button onClick={openMenu} class="oval-button">
                <span class="material-symbols-outlined">
                    steppers
                </span>
            </button>
            <ul className={ulClassName} ref={ulRef}>
                <div className="edit-delete-container">
                    <div className="delete-button">
                    <OpenModalButton
                        buttonText="Edit Pin"
                        onItemClick={closeMenu}
                        modalComponent={<EditSinglePin />}
                    />
                    </div>
                    <div className="delete-pin-button">
                    <OpenModalButton
                        buttonText="Delete Pin"
                        onItemClick={closeMenu}
                        modalComponent={<DeleteSinglePin pinId={pin.id} />}
                    />
                    </div>
                </div>
            </ul>
        </div>
    );
}

export default EditButton;

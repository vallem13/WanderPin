import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import EditSinglePin from "../Pins/EditSinglePin";
import DeleteSinglePin from "../Pins/DeleteSinglePin";

function EditButton() {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

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

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <div>
            <button onClick={openMenu} class="oval-button">
                <span class="material-symbols-outlined">
                    steppers
                </span>
            </button>
            <ul className={ulClassName} ref={ulRef}>

                <li>
                    <OpenModalButton
                        buttonText="Edit Pin"
                        onItemClick={closeMenu}
                        modalComponent={<EditSinglePin />}
                    />
                </li>
                <li>
                    <OpenModalButton
                        buttonText="Delete Pin"
                        onItemClick={closeMenu}
                        modalComponent={<DeleteSinglePin />}
                    />
                </li>
            </ul>
        </div>
    );
}

export default EditButton;

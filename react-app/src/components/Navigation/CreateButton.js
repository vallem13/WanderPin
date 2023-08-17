import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import CreateSinglePin from "../Pins/CreateSinglePin";
import CreateSingleBoard from "../Boards/CreateSingleBoard";
import './Navigation.css'

function CreateButton({ user }) {
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

  const ulClassName = "create-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="create-pin-board-buttons-navbar">
      <button onClick={openMenu}>Create</button>
      <ul className={ulClassName} ref={ulRef}>
            <OpenModalButton
              buttonText="Create Pin"
              onItemClick={closeMenu}
              modalComponent={<CreateSinglePin />}
            />

            <OpenModalButton
              buttonText="Create Board"
              onItemClick={closeMenu}
              modalComponent={<CreateSingleBoard />}
            />
      </ul>
    </div>
  );
}

export default CreateButton;

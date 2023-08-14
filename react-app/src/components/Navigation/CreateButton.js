import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import CreateSinglePin from "../Pins/CreateSinglePin";
import CreateSingleBoard from "../Boards/CreateSingleBoard";

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

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={openMenu}>Create</button>
      <ul className={ulClassName} ref={ulRef}>
          <>
            <OpenModalButton
              buttonText="Ceate Pin"
              onItemClick={closeMenu}
              modalComponent={<CreateSinglePin />}
            />

            <OpenModalButton
              buttonText="Create Board"
              onItemClick={closeMenu}
              modalComponent={<CreateSingleBoard />}
            />
          </>
      </ul>
    </>
  );
}

export default CreateButton;

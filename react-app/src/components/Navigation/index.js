import React, { useEffect, useState, useRef } from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import CreateButton from './CreateButton';
import './Navigation.css';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef(null);
  const sessionUser = useSelector(state => state.session.user);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div>
      {isLoaded && (
        <div className="navbar">
          <NavLink exact to="/home" className="navbar-logo">
            <img className="logo" src="../assets/Logo.png" alt="WanderPin" />
          </NavLink>
          <ul className="navbar-links">
            {sessionUser ? (
              <>
                <li className="navbar-link">
                  <CreateButton user={sessionUser} />
                </li>
                <li className="navbar-link">
                  <NavLink exact to="/home"><i id='home-button' className="fa-solid fa-house" sixe="2xl" style={{ color: "#dcdcdc", }} /></NavLink>
                </li>
                <li className="navbar-link">
                  <NavLink exact to="/user"><img className="profile-image-nav" src={sessionUser.profile_img} alt="Profile" /></NavLink>
                </li>
                <li>
                  <button className="navbar-button" onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket" style={{ color: "#dcdcdc", width: '40px', height: '40px' }} />
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="navbar-link">
                  <OpenModalButton
                    buttonText="Log In"
                    className='navbar-button'
                    modalComponent={<LoginFormModal />}
                  />
                </li>
                <li className="navbar-link">
                  <OpenModalButton
                    buttonText="Sign Up"
                    className='navbar-button'
                    modalComponent={<SignupFormModal />}
                  />
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navigation;

import React from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import CreateButton from './CreateButton';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css';

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user);

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    await history.push('/')

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
                <li id='create-pin-board-navbar' className="navbar-link">
                  <CreateButton user={sessionUser} />
                </li>
                <li className="navbar-link">
                  <div className="tooltip"><NavLink exact to="/home"><i id='home-button' className="fa-solid fa-house" sixe="2xl" style={{ color: "#dcdcdc", }} /></NavLink>
                    <span className="tooltiptext">Home</span>
                  </div>
                </li>
                <li className="navbar-link">
                  <div className="tooltip"><NavLink exact to="/user"><img className="profile-image-nav" src={sessionUser.profile_img} alt="Profile" /></NavLink>
                    <span className="tooltiptext">Your Profile</span>
                  </div>
                </li>
                <li>
                  <div className="tooltip"><button className="navbar-button" onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket" style={{ color: "#dcdcdc", width: '40px', height: '40px' }} />
                  </button>
                    <span className="tooltiptext">Log Out</span>
                  </div>
                </li>
              </>
            ) : (
              <div className="navbar-link-log-sign-container">
                <li className="navbar-link-log-sign">
                  <OpenModalButton
                    buttonText="Log In"
                    className='navbar-button'
                    modalComponent={<LoginFormModal />}
                  />
                </li>
                <li className="navbar-link-log-sign">
                  <OpenModalButton
                    buttonText="Sign Up"
                    className='navbar-button'
                    modalComponent={<SignupFormModal />}
                  />
                </li>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navigation;

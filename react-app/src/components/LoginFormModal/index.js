import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  const demoUser = (e) => {
    e.preventDefault();
    return dispatch(login("demo@aa.io", "password"))
      .then(closeModal)
  }

  return (
    <div className="login-modal-outer">
      <div className="login-modal">
        <img className='logo' src='../assets/Logo.png' alt='WanderPin' style={{ width: '100px', height: '50px' }}/>
        <h1>Welcome!</h1>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <div className="login-buttons">
            <div className="login-button">
            <button type="submit">Log In</button>
            </div>
            <button onClick={demoUser} >Demo User</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;

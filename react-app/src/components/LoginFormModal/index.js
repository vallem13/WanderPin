import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState([]);
  const [frontendErrors, setFrontendErrors] = useState({})
  const { closeModal } = useModal();

  useEffect(() => {

    const frontendErrors = {}

    const check_email = email.split('')
    const reversed_check_email = check_email.reverse()

    if (email.length < 2 || !(check_email.find((element) => element === '@') && (reversed_check_email[3] === '.' || reversed_check_email[2] === '.'))) {
      frontendErrors.email = "Please input a valid email"
    }
    if (password.length < 6 || password.length > 50) {
      frontendErrors.password = "Password must be at least 6 characters"
    }
    if (password.length > 50) {
      frontendErrors.password = "Password can not be longer than 50 characters"
    }

    setFrontendErrors(frontendErrors)

  }, [email, password])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
				setErrors(data);
				setFrontendErrors(frontendErrors)
			} else {
				history.push('/home')
				closeModal();
			}

  };

  const demoUser = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@aa.io", "password"))
    await history.push('/home')
    await closeModal()
  }

  return (
    <div className="login-modal-outer">
      <div className="login-modal">
        <img className='logo' src='../assets/Logo.png' alt='WanderPin' style={{ width: '100px', height: '50px' }} />
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
          {frontendErrors.email && submitted && (
            <p className='error-message'>{frontendErrors.email}</p>
          )}
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {frontendErrors.password && submitted && (
            <p className='error-message'>{frontendErrors.email}</p>
          )}
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

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [image, setImage] = useState(null)
	// const [imageLoading, setImageLoading] = useState(false);
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [birthDate, setBirthDate] = useState("")
	const [country, setCountry] = useState("")
	const [interests, setInterests] = useState("")
	const [frontendErrors, setFrontendErrors] = useState({})
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();


	useEffect(() => {

		const frontendErrors = {}

		const check_email = email.split('')
		const reversed_check_email = check_email.reverse()

		if (email.length < 2 || !(check_email.find((element) => element === '@') && (reversed_check_email[3] === '.' || reversed_check_email[2] === '.'))) {
			frontendErrors.email = "Please input a valid email"
		}
		if (password.length < 6) {
			frontendErrors.password = "Password must be at least 6 characters"
		}
		if (confirmPassword.length < 2) {
			frontendErrors.confirmPassword = "Confirm Password is required"
		}
		if (firstName.length < 2) {
			frontendErrors.firstName = "First Name is required"
		}
		if (lastName.length < 2) {
			frontendErrors.lastName = "Last Name is required"
		}

		setFrontendErrors(frontendErrors)

	}, [email, password, confirmPassword, firstName, lastName])

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();

		formData.append("email", email);
		formData.append("password", password);
		formData.append("profile_img", image);
		formData.append("first_name", firstName);
		formData.append("last_name", lastName);
		formData.append("birth_date", birthDate);
		formData.append("country", country);
		formData.append("interests", interests);

		if (!image) {
			console.log("No image selected");
			return;
		}

		if (password === confirmPassword) {
			const data = await dispatch(signUp(formData));
			if (data) {
				setErrors(data);
			} else {
				await closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit} encType="multipart/form-data">
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
					First Name
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</label>
				<label>
					Last Name
					<input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</label>
				<label>
					Birthday
					<input
						type="date"
						value={birthDate}
						onChange={(e) => setBirthDate(e.target.value)}
						required
					/>
				</label>
				<label>
					Country
					<input
						type="text"
						value={country}
						onChange={(e) => setCountry(e.target.value)}
						required
					/>
				</label>
				<label>
					What are you interested in?
					<textarea
						type="text"
						value={interests}
						onChange={(e) => setInterests(e.target.value)}
						required
					/>
				</label>
				<label>
					Profile Image
					<input
						type="file"
						accept="image/*"
						onChange={(e) => setImage(e.target.files[0])}
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
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>

				<button type="submit">Sign Up</button>
				{/* {(imageLoading) && <p>Loading...</p>} */}
			</form>
		</>
	);
}

export default SignupFormModal;

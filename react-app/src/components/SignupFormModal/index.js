import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script'
import "./SignupForm.css";

const clientId = '973670222630-04hnc8ldv5ndel1teal0nki98pcbllgt.apps.googleusercontent.com'

function SignupFormModal() {
	const dispatch = useDispatch();
	const history = useHistory()
	const { closeModal } = useModal();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [image, setImage] = useState(null)
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [birthDate, setBirthDate] = useState("")
	const [country, setCountry] = useState("")
	const [interests, setInterests] = useState("")
	const [submitted, setSubmitted] = useState(false)
	const [frontendErrors, setFrontendErrors] = useState({})
	const [errors, setErrors] = useState([]);

	const countries = [
		"afghanistan", "albania", "algeria", "andorra", "angola", "antigua and barbuda",
		"argentina", "armenia", "australia", "austria", "azerbaijan", "bahamas", "bahrain",
		"bangladesh", "barbados", "belarus", "belgium", "belize", "benin", "bhutan",
		"bolivia", "bosnia and herzegovina", "botswana", "brazil", "brunei", "bulgaria",
		"burkina faso", "burundi", "cabo verde", "cambodia", "cameroon", "canada", "central african republic",
		"chad", "chile", "china", "colombia", "comoros", "congo", "costa rica", "cote d'ivoire",
		"croatia", "cuba", "cyprus", "czech republic", "democratic republic of the congo", "denmark",
		"djibouti", "dominica", "dominican republic", "ecuador", "egypt", "el salvador", "equatorial guinea",
		"eritrea", "estonia", "eswatini", "ethiopia", "fiji", "finland", "france", "gabon", "gambia",
		"georgia", "germany", "ghana", "greece", "grenada", "guatemala", "guinea", "guinea-bissau",
		"guyana", "haiti", "honduras", "hungary", "iceland", "india", "indonesia", "iran", "iraq",
		"ireland", "israel", "italy", "jamaica", "japan", "jordan", "kazakhstan", "kenya", "kiribati",
		"korea, north", "korea, south", "kosovo", "kuwait", "kyrgyzstan", "laos", "latvia", "lebanon",
		"lesotho", "liberia", "libya", "liechtenstein", "lithuania", "luxembourg", "madagascar",
		"malawi", "malaysia", "maldives", "mali", "malta", "marshall islands", "mauritania",
		"mauritius", "mexico", "micronesia", "moldova", "monaco", "mongolia", "montenegro",
		"morocco", "mozambique", "myanmar", "namibia", "nauru", "nepal", "netherlands",
		"new zealand", "nicaragua", "niger", "nigeria", "north macedonia", "norway", "oman",
		"pakistan", "palau", "palestine", "panama", "papua new guinea", "paraguay", "peru",
		"philippines", "poland", "portugal", "qatar", "romania", "russia", "rwanda",
		"saint kitts and nevis", "saint lucia", "saint vincent and the grenadines",
		"samoa", "san marino", "sao tome and principe", "saudi arabia", "senegal", "serbia",
		"seychelles", "sierra leone", "singapore", "slovakia", "slovenia", "solomon islands",
		"somalia", "south africa", "south sudan", "spain", "sri lanka", "sudan", "suriname",
		"sweden", "switzerland", "syria", "taiwan", "tajikistan", "tanzania", "thailand",
		"timor-leste", "togo", "tonga", "trinidad and tobago", "tunisia", "turkey",
		"turkmenistan", "tuvalu", "uganda", "ukraine", "united arab emirates", "united kingdom",
		"united states", "uruguay", "uzbekistan", "vanuatu", "vatican city", "venezuela",
		"vietnam", "yemen", "zambia", "zimbabwe"
	]

	useEffect(() => {
		function start() {
			gapi.client.init({
				clientId: clientId,
				scope: ''
			})
		}
		gapi.load('client:auth2', start)
	})


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
		if (password.length > 50) {
			frontendErrors.password = "Password can not be longer than 50 characters"
		}
		if (confirmPassword.length < 2) {
			frontendErrors.confirmPassword = "Confirm Password is required"
		}
		if (confirmPassword.length > 50) {
			frontendErrors.confirmPassword = "Password can not be longer than 50 characters"
		}
		if (firstName.length < 2) {
			frontendErrors.firstName = "First Name is required"
		}
		if (firstName.length > 50) {
			frontendErrors.firstName = "First Name can not be longer than 50 characters"
		}
		if (lastName.length < 2) {
			frontendErrors.lastName = "Last Name is required"
		}
		if (lastName.length > 50) {
			frontendErrors.lastName = "Last Name can not be longer than 50 characters"
		}
		if (!birthDate) {
			frontendErrors.birthDate = "Please input your Birthday";
		}
		let currentDate = new Date();
		let birthDateObj = new Date(birthDate);
		let yearDifference = currentDate.getFullYear() - birthDateObj.getFullYear();
		if (yearDifference >= 100) frontendErrors.birthDate = "Please input a valid Birthday";
		if (yearDifference < 16) frontendErrors.birthDate = "You must be over 16 years old to own an account";
		if (!countries.find((element) => element === country.toLowerCase().trim())) {
			frontendErrors.country = "Please select a valid country";
		}
		if (interests.length < 2) {
			frontendErrors.interests = "Interests is required"
		}
		if (interests.length > 250) {
			frontendErrors.interests = "Interests can not be longer than 250 characters"
		}

		setFrontendErrors(frontendErrors)

	}, [email, password, confirmPassword, firstName, lastName, birthDate, country, interests])

	const handleSubmit = async (e) => {
		e.preventDefault();

		setSubmitted(true)

		const allErrors = Object.keys(frontendErrors).length > 0
		if (!allErrors) {
			if (password === confirmPassword) {

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

				const data = await dispatch(signUp(formData));
				if (data) {
					setErrors(data);
				} else {
					history.push('/home')
					closeModal();
				}
			} else {
				setErrors(["Confirm Password field must be the same as the Password field"]);
			}
		}
	};

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const onSuccess = (res) => {
		console.log('LOGIN SUCCESS! Current User: ', res.profileObj)
	}

	const onFailure = (res) => {
		console.log('LOGIN FAILED! Res: ', res)
	}

	return (
		<div className="signup-modal">
			<img className='logo' src='../assets/Logo.png' alt='WanderPin' style={{ width: '100px', height: '50px' }} />
			<h1>Welcome!</h1>
			<form onSubmit={handleSubmit} encType="multipart/form-data">

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
					First Name
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</label>
				{frontendErrors.firstName && submitted && (
					<p className='error-message'>{frontendErrors.firstName}</p>
				)}
				<label>
					Last Name
					<input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</label>
				{frontendErrors.lastName && submitted && (
					<p className='error-message'>{frontendErrors.lastName}</p>
				)}
				<label>
					Birthday
					<input
						type="date"
						value={birthDate}
						onChange={(e) => setBirthDate(e.target.value)}
						required
					/>
				</label>
				{frontendErrors.birthDate && submitted && (
					<p className='error-message'>{frontendErrors.birthDate}</p>
				)}
				<label>
					Country
					<select className="select-country" value={country} onChange={(e) => setCountry(e.target.value)} required>
						<option value="">Select a country</option>
						{countries.map((country, index) => (
							<option key={index} value={country}>
								{country}
							</option>
						))}
					</select>
				</label>
				{frontendErrors.country && submitted && (
					<p className="error-message">{frontendErrors.country}</p>
				)}
				<label>
					What are you interested in?
					<textarea
						type="text"
						value={interests}
						onChange={(e) => setInterests(e.target.value)}
						required
					/>
				</label>
				{frontendErrors.interests && submitted && (
					<p className='error-message'>{frontendErrors.interests}</p>
				)}
				<label>
					Profile Image
					<input
						type="file"
						accept="image/*"
						onChange={(e) => setImage(e.target.files[0])}
						className="input-button"
					/>
				</label>
				<label>
					Password
					<div className="input-with-icon">
						<input
							type={showPassword ? 'text' : 'password'}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<i
							className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
							style={{ color: '#ff4057', cursor: 'pointer' }}
							onClick={toggleShowPassword}
						></i>
					</div>
				</label>
				{frontendErrors.password && submitted && (
					<p className='error-message'>{frontendErrors.password}</p>
				)}
				<label>
					Confirm Password
					<div className="input-with-icon">
						<input
							type={showPassword ? 'text' : 'password'}
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
						<i
							className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
							style={{ color: '#ff4057', cursor: 'pointer' }}
							onClick={toggleShowPassword}
						></i>
					</div>
				</label>
				{frontendErrors.confirmPassword && submitted && (
					<p className='error-message'>{frontendErrors.confirmPassword}</p>
				)}
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<button type="submit">Sign Up</button>
			</form>
			<div id='signInButton'>
            <GoogleLogin
                clientId={clientId}
                buttonText='Login with Google'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
			<p id="already-member">Already a member? <OpenModalButton
				buttonText="Log In"
				// className='navbar-button'
				modalComponent={<LoginFormModal />}
			/></p>
		</div>
	);
}

export default SignupFormModal;

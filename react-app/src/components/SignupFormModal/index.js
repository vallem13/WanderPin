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
			frontendErrors.birthDate = "Please input your Birthday"
		}
		if (!countries.find((element) => element === country.toLowerCase().trim())) {
			frontendErrors.country = "Please input a valid country"
		}
		if (interests.length < 2) {
			frontendErrors.interests = "Interests is required"
		}
		if (interests.length > 250) {
			frontendErrors.interests = "Interests can not be longer than 2git checkout 50 characters"
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
		<div className="signup-modal">
			<img className='logo' src='../assets/Logo.png' alt='WanderPin' style={{ width: '100px', height: '50px' }} />
			<h1>Welcome!</h1>
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
				{frontendErrors.email && email.length > 0 && (
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
				{frontendErrors.firstName && firstName.length > 0 && (
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
				{frontendErrors.lastName && lastName.length > 0 && (
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
				{frontendErrors.birthDate && birthDate.length > 0 && (
					<p className='error-message'>{frontendErrors.birthDate}</p>
				)}
				<label>
					Country
					<input
						type="text"
						value={country}
						onChange={(e) => setCountry(e.target.value)}
						required
					/>
				</label>
				{frontendErrors.country && country.length > 0 && (
					<p className='error-message'>{frontendErrors.country}</p>
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
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				{frontendErrors.password && password.length > 0 && (
					<p className='error-message'>{frontendErrors.password}</p>
				)}
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				{frontendErrors.confirmPassword && confirmPassword.length > 0 && (
					<p className='error-message'>{frontendErrors.confirmPassword}</p>
				)}
				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
